// نسخهٔ Node.js (۱۸ به بالا) — اگر Cloudflare نمی‌خواهی:  STEAM_KEY=xxxx node steam-server.js
const http = require('http');
const API = 'https://api.steampowered.com', K = process.env.STEAM_KEY, PORT = process.env.PORT || 8787;
const cors = {'Access-Control-Allow-Origin':'*','Content-Type':'application/json; charset=utf-8'};
const send = (res, o, s = 200) => { res.writeHead(s, cors); res.end(JSON.stringify(o)); };
http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') { res.writeHead(204, cors); return res.end(); }
  try {
    let id = (new URL(req.url, 'http://x').searchParams.get('id') || '').trim();
    if (!K) return send(res, {error: 'server not configured'}, 500);
    if (!id) return send(res, {error: 'missing id'}, 400);
    if (!/^\d{17}$/.test(id)) {
      if (!/^[A-Za-z0-9_-]{2,32}$/.test(id)) return send(res, {error: 'bad id'}, 400);
      const r = await (await fetch(`${API}/ISteamUser/ResolveVanityURL/v1/?key=${K}&vanityurl=${id}`)).json();
      if (!r.response || r.response.success !== 1) return send(res, {error: 'not found'}, 404);
      id = r.response.steamid;
    }
    const [p, g] = await Promise.all([
      fetch(`${API}/ISteamUser/GetPlayerSummaries/v2/?key=${K}&steamids=${id}`).then(r => r.json()),
      fetch(`${API}/IPlayerService/GetOwnedGames/v1/?key=${K}&steamid=${id}&include_played_free_games=1`).then(r => r.json())
    ]);
    const pl = p.response && p.response.players && p.response.players[0];
    if (!pl) return send(res, {error: 'not found'}, 404);
    const games = g.response && g.response.games, out = {steamid: id, name: pl.personaname, avatar: pl.avatarfull, url: pl.profileurl, public: Array.isArray(games)};
    if (out.public) { out.games = games.length; out.hours = Math.round(games.reduce((a, x) => a + (x.playtime_forever || 0), 0) / 60); }
    send(res, out);
  } catch (e) { send(res, {error: 'failed'}, 500); }
}).listen(PORT, () => console.log('steam proxy on :' + PORT));
