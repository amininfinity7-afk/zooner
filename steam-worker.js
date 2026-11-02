// Cloudflare Worker — پروکسی امن استیم برای ZONER
// متغیر محیطی STEAM_KEY را در تنظیمات Worker بگذار (Steam Web API Key).
const API='https://api.steampowered.com';
export default {
  async fetch(req, env) {
    const cors = {'Access-Control-Allow-Origin':'*','Content-Type':'application/json; charset=utf-8','Cache-Control':'public, max-age=3600'};
    const J = (o, s = 200) => new Response(JSON.stringify(o), {status: s, headers: cors});
    if (req.method === 'OPTIONS') return new Response(null, {headers: cors});
    let id = (new URL(req.url).searchParams.get('id') || '').trim();
    const K = env.STEAM_KEY;
    if (!K) return J({error: 'server not configured'}, 500);
    if (!id) return J({error: 'missing id'}, 400);
    if (!/^\d{17}$/.test(id)) {
      if (!/^[A-Za-z0-9_-]{2,32}$/.test(id)) return J({error: 'bad id'}, 400);
      const r = await (await fetch(`${API}/ISteamUser/ResolveVanityURL/v1/?key=${K}&vanityurl=${id}`)).json();
      if (!r.response || r.response.success !== 1) return J({error: 'not found'}, 404);
      id = r.response.steamid;
    }
    const [p, g] = await Promise.all([
      fetch(`${API}/ISteamUser/GetPlayerSummaries/v2/?key=${K}&steamids=${id}`).then(r => r.json()),
      fetch(`${API}/IPlayerService/GetOwnedGames/v1/?key=${K}&steamid=${id}&include_played_free_games=1`).then(r => r.json())
    ]);
    const pl = p.response && p.response.players && p.response.players[0];
    if (!pl) return J({error: 'not found'}, 404);
    const games = g.response && g.response.games;
    const out = {steamid: id, name: pl.personaname, avatar: pl.avatarfull, url: pl.profileurl, public: Array.isArray(games)};
    if (Array.isArray(games)) {
      out.games = games.length;
      out.hours = Math.round(games.reduce((a, x) => a + (x.playtime_forever || 0), 0) / 60);
    }
    return J(out);
  }
};
