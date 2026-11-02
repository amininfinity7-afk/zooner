/* ZONER — پیام‌رسان گیمرها (ذخیره‌سازی محلی؛ چند حساب روی یک مرورگر) */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const el=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e};
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);

/* ---------- آیکون‌ها ---------- */
const C=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}"/>`;
const P={
 menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',search:C(11,11,7)+'<path d="M21 21l-4.3-4.3"/>',edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
 info:C(12,12,10)+'<path d="M12 16v-4M12 8h.01"/>',pin:'<path d="M12 17v5M9 3h6l-1 7 3 3H7l3-3z"/>',down:'<path d="M6 9l6 6 6-6"/>',
 clip:'<path d="M21 12.5l-8.5 8.5a5 5 0 0 1-7-7L14 5.5a3.3 3.3 0 0 1 5 5L10.5 19a1.7 1.7 0 0 1-2.4-2.4L15 9.7"/>',
 check:'<path d="M5 13l4 4L19 7"/>',check2:'<path d="M2 13l4 4L16 7M10 15l2 2L22 7"/>',
 users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>'+C(9,7,4)+'<path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
 sun:C(12,12,4)+'<path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
 moon:'<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
 bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/>',bellOff:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0M2 2l20 20"/>',
 poll:'<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>',user:C(12,8,4)+'<path d="M4 21a8 8 0 0 1 16 0"/>',
 download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
 mega:'<path d="M3 11v2a1 1 0 0 0 1 1h3l8 5V5L7 10H4a1 1 0 0 0-1 1zM19 8a5 5 0 0 1 0 8"/>',userplus:C(9,7,4)+'<path d="M1 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2M20 8v6M23 11h-6"/>',
 clock:C(12,12,10)+'<path d="M12 6v6l4 2"/>',image:'<rect x="3" y="3" width="18" height="18" rx="3"/>'+C(8.5,8.5,1.5)+'<path d="M21 15l-5-5L5 21"/>',
 logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',send:'<path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>',
 back:'<path d="M15 18l-6-6 6-6"/>',plus:'<path d="M12 5v14M5 12h14"/>',smile:C(12,12,10)+'<path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
 trash:'<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>',reply:'<path d="M9 14L4 9l5-5M20 20v-7a4 4 0 0 0-4-4H4"/>',fwd:'<path d="M15 14l5-5-5-5M4 20v-7a4 4 0 0 1 4-4h12"/>',
 copy:'<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
 bookmark:'<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',close:'<path d="M18 6L6 18M6 6l12 12"/>',
 refresh:'<path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5"/>',gif:'<rect x="2" y="5" width="20" height="14" rx="4"/><path d="M9.5 10H8a2 2 0 0 0 0 4h1.5v-2H8.5M13 10v4M16 14v-4h3M16 12h2"/>',
 link:'<path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>',chat:'<path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-5.4A8 8 0 1 1 21 12z"/>',
 sendf:'<path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>',
 sliders:'<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
 file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/>',
 mic:'<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4"/>',
 micOff:'<path d="M2 2l20 20M9 9v2a3 3 0 0 0 5.1 2.1M15 9.3V5a3 3 0 0 0-5.9-.7M5 11a7 7 0 0 0 11.7 5.2M19 11a7 7 0 0 1-.6 2.8M12 18v4"/>',
 phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
 stop:'<rect x="6" y="6" width="12" height="12" rx="2.5"/>',play:'<path d="M7 4l13 8-13 8z"/>',pause:'<path d="M8 5v14M16 5v14"/>',
gear:C(12,12,3)+'<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
video:'<rect x="2" y="6" width="13" height="12" rx="3"/><path d="M15 10.5l6-3.5v10l-6-3.5"/>',
palette:'<path d="M12 2a10 10 0 0 0 0 20c1 0 1.7-.8 1.7-1.7 0-.5-.2-.8-.4-1.1a1.7 1.7 0 0 1 1.2-2.8H16a6 6 0 0 0 6-6c0-4.6-4.5-8.4-10-8.4z"/>'+C(7.5,11,1)+C(10.5,7,1)+C(15.5,7,1),
type:'<path d="M4 7V4h16v3M9 20h6M12 4v16"/>',globe:C(12,12,10)+'<path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
device:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',lock:'<rect x="4" y="11" width="16" height="10" rx="3"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
db:'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
cal:'<rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/>',
};
const ico=(n,s=22)=>`<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${P[n]}</svg>`;
const icon=(n,s)=>{const i=el('span','ic');i.innerHTML=ico(n,s);return i};

/* ---------- داده‌ها ---------- */
const GAMES=['Counter-Strike 2','Valorant','League of Legends','Dota 2','Fortnite','Minecraft','GTA V','Call of Duty: Warzone','Apex Legends','PUBG','Overwatch 2','Rocket League','EA Sports FC','Elden Ring','Rainbow Six Siege','Roblox','Among Us'];
const EMO='😀 😂 😍 😎 🥳 😭 😡 👍 👎 🙏 🔥 ❤️ 💚 🎮 🕹️ 🏆 👑 💀 😴 🤔 👀 🙌 ✨ 💯 🎧 ⚡ 🚀 🤝 😈 🤯'.split(' ');
const QR=['👍','❤️','🔥','😂','😮','😢','👎','💯'];
const nums=(p,n)=>Array.from({length:n},(_,i)=>p+'/'+p.split('/').pop()+String(i+1).padStart(2,'0'));
const PACKS=[
 {id:'neon',fa:'تاج نئونی',en:'Neon Crown',files:Array.from({length:20},(_,i)=>'neon/neon'+String(i+1).padStart(2,'0'))},
 {id:'cs',fa:'کانتر زون',en:'Counter Zone',files:Array.from({length:21},(_,i)=>'cs/cs'+String(i+1).padStart(2,'0'))},
 {id:'classic',fa:'زونر کلاسیک',en:'ZONER Classic',files:'1v5 afk boss clutch dead deskhosh ez gameover gg goodgame heal letsgo nob noob ontop pag rage team victory wp'.split(' ').map(n=>'classic/'+n)},
];
const BOTS={zoner_bot:{name:'ZONER Bot',bio:'🎲 /roll · /coin · /map · /agent · /loadout · /team · /pick · /tip · /gg'}};
function canon(x){x=String(x||'').replace(/[۰-۹]/g,d=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/[\s\-()]/g,'').replace(/^00/,'+');let m;if(m=x.match(/^\+?98(9\d{9})$/))return'0'+m[1];if(/^9\d{9}$/.test(x))return'0'+x;return x}
const djb=s=>{let h=5381;for(const c of 'zoner:'+s)h=(h*33)^c.charCodeAt(0);return'x'+(h>>>0).toString(16)};
function ensureBots(){for(const[id,b]of Object.entries(BOTS)){if(!D.users[id])D.users[id]={id,name:b.name,bot:1,bio:b.bio,pw:null,seen:Date.now(),created:Date.now(),read:{},muted:{},drafts:{},recent:[],gifs:[],saves:[],hid:[],contacts:[]};else D.users[id].bio=b.bio}delete D.users.steam_bot;for(const[k,sp]of Object.entries(D.spaces||{}))if((sp.members||[]).includes('steam_bot'))delete D.spaces[k]}
function migrate(){D.stories=(D.stories||[]).filter(s=>Date.now()-s.ts<2*864e5);for(const u of Object.values(D.users)){if(u.phone)u.phone=canon(u.phone);delete u.steam;for(const k of['read','muted','drafts'])u[k]=u[k]||{};for(const k of['recent','gifs','saves','hid','contacts','sched'])u[k]=u[k]||[]}for(const s of Object.values(D.spaces)){s.msgs=s.msgs||[];s.members=s.members||[];if((s.type==='group'||s.type==='channel')&&!s.link)s.link=newTok()}}
const VER='1.2.2',TK='zoner_typing',K='zoner_v3',AK='zoner_accts';
/* v1.0.3: ریست یک‌باره‌ی همه‌ی حساب‌ها (باگ آیدی تکراری) */
let KEEP={};
try{if(!localStorage.getItem('zoner_reset_103')){try{const o=JSON.parse(localStorage.getItem('zoner_v2'));if(o)KEEP={lang:o.lang,theme:o.theme}}catch{}
 ['zoner_v2','zoner_v3','zoner_seen','zoner_typing','zoner_last',AK].forEach(k=>localStorage.removeItem(k));sessionStorage.removeItem('zs');localStorage.setItem('zoner_reset_103','1')}}catch{}
let D={users:{},spaces:{},lang:KEEP.lang||'fa',theme:KEEP.theme||'dark'};
const fresh=()=>{try{const x=JSON.parse(localStorage.getItem(K));if(x&&x.users&&x.spaces)D=x}catch{}ensureBots();migrate()};
fresh();
const save=()=>{try{localStorage.setItem(K,JSON.stringify(D));return true}catch{toast(t('full'));return false}};
const mutate=fn=>{fresh();fn();if(save())return true;fresh();return false};
let SID=null;try{SID=sessionStorage.getItem('zs')||localStorage.getItem('zoner_last')}catch{}
let sopen=false,adding=false;
let lang=D.lang||'fa',curId=null,tab='all',q='',sq='',reply=null,edit=null,pickTab='emoji';
const me=()=>D.users[SID],S=()=>D.spaces[curId];
const HRE=/^[a-z][a-z0-9_]{3,19}$/;
const newTok=()=>Math.random().toString(36).slice(2,8)+Math.random().toString(36).slice(2,8);
const RESERVED=['admin','administrator','zoner','zoner_bot','support','system','root','official','moderator','staff'];
const taken=h=>RESERVED.includes(h)||!!D.users[h]||Object.values(D.spaces).some(s=>s.handle===h);
const byHandle=h=>D.users[h]?{u:D.users[h]}:(x=>x?{s:x}:null)(Object.values(D.spaces).find(s=>s.handle===h&&s.type!=='dm'));
const hash=async s=>{try{return[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode('zoner:'+s)))].map(b=>b.toString(16).padStart(2,'0')).join('')}catch{let h=5381;for(const c of 'zoner:'+s)h=(h*33)^c.charCodeAt(0);return'x'+(h>>>0).toString(16)}};
const hue=s=>{let h=7;for(const c of s)h=(h*31+c.charCodeAt(0))%360;return h};

const I={fa:{
 tag:'پیام‌رسان گیمرها',login:'ورود',register:'ثبت‌نام',enter:'ادامه',name:'نام نمایشی',uid:'آیدی یکتا (مثلاً zoner_pro)',pw:'رمز عبور',
 idBad:'آیدی باید با حرف انگلیسی شروع شود و ۴ تا ۲۰ کاراکتر (حروف کوچک، عدد، _) باشد',idTaken:'این آیدی قبلاً گرفته شده',wrong:'آیدی یا رمز اشتباه است',pwShort:'رمز حداقل ۴ کاراکتر باشد',nameReq:'نام را وارد کنید',
 search:'جستجو یا @آیدی',searchChat:'جستجو در پیام‌ها…',all:'همه',personal:'شخصی',groups:'گروه‌ها',channels:'کانال‌ها',saved:'پیام‌های ذخیره‌شده',pick:'یک گفتگو را انتخاب کنید',
 newGroup:'گروه جدید',newChannel:'کانال جدید',profile:'پروفایل من',theme:'تغییر تم',lng:'English',backup:'پشتیبان‌گیری',restore:'بازیابی پشتیبان',logout:'خروج',
 msg:'پیام…',reply:'پاسخ',fwd:'فوروارد',copy:'کپی',del:'حذف',editM:'ویرایش',pinM:'پین',unpinM:'برداشتن پین',pinned:'پیام پین‌شده',edited:'ویرایش‌شده',fwdFrom:'فوروارد از',fwdTo:'فوروارد به…',
 you:'شما',deleted:'پیام حذف‌شده',online:'آنلاین',seen:'آخرین بازدید',today:'امروز',yday:'دیروز',members:'عضو',subs:'مشترک',onl:'آنلاین',draft:'پیش‌نویس',
 photo:'عکس',sticker:'استیکر',poll:'نظرسنجی',pollQ:'سؤال نظرسنجی',opt:'گزینه',addOpt:'+ گزینه',votes:'رأی',
 gName:'نام',gBio:'توضیحات',gHandle:'آیدی عمومی (مثلاً cs_team)',gMembers:'افزودن اعضا با آیدی (با ویرگول جدا کنید)',create:'ساخت',cancel:'انصراف',close:'بستن',save:'ذخیره',
 noUser:'کاربری با این آیدی نیست:',owner:'مالک',admin:'ادمین',addMember:'افزودن عضو',add:'افزودن',added:'اضافه شد',already:'قبلاً عضو است',join:'پیوستن',leave:'ترک',
 kick:'حذف از گروه',promote:'ادمین کن',demote:'برداشتن ادمین',delSp:'حذف کامل',delQ:'برای همه حذف شود؟',leaveQ:'خارج می‌شوید؟',mute:'بی‌صدا',unmute:'فعال‌سازی اعلان',
 bio:'درباره من',birth:'تاریخ تولد',game:'بازی مورد علاقه',noGame:'انتخاب نشده',yrs:'ساله',copied:'کپی شد',sent:'فوروارد شد',noMsg:'هنوز پیامی نیست',typeCh:'کانال · فقط ادمین‌ها پست می‌گذارند',typeG:'گروه',
 editMode:'ویرایش پیام',replyTo:'پاسخ به',cnt:'نتیجه',big:'حجم فایل بیشتر از ۱۰ مگابایت است',full:'حافظه مرورگر پر شد؛ عکس‌های قدیمی را پاک کنید',
 recent:'اخیر',emoji:'ایموجی',results:'نتایج سراسری',mine:'گفتگوهای من',idLine:'آیدی',restoreQ:'همه داده‌های فعلی با فایل پشتیبان جایگزین شود؟',badFile:'فایل پشتیبان معتبر نیست',
 hint:'رمزها و داده‌ها فقط روی همین مرورگر هستند. چند حساب را می‌توانید در تب‌های مختلف باز کنید و زنده با هم چت کنید.',
 loginId:'آیدی، شماره یا ایمیل',phone:'شماره موبایل (مثلاً 09121234567)',code:'کد تأیید ۵ رقمی',first:'نام',last:'نام خانوادگی',email:'ایمیل',
 sendCode:'ارسال کد',verify:'تأیید کد',register2:'ساخت حساب',changePhone:'تغییر شماره',phoneBad:'شماره موبایل معتبر نیست',phoneTaken:'این شماره قبلاً ثبت شده',
 demoMsg:'نسخه آزمایشی است و هنوز پیامک وصل نشده. کد تأیید شما:',codeWrong:'کد واردشده اشتباه است',emailBad:'ایمیل معتبر نیست',emailTaken:'این ایمیل قبلاً ثبت شده',nameReq2:'نام و نام خانوادگی را وارد کنید',
 delTitle:'حذف پیام',delSure:'آیا از حذف این پیام اطمینان دارید؟',delAll:'حذف برای همه',nevermind:'بیخیال',delBtn:'حذف',
 typ_text:'در حال نوشتن…',typ_sticker:'در حال انتخاب استیکر…',typ_gif:'در حال انتخاب گیف…',typ_photo:'در حال ارسال عکس…',
 gif:'گیف',gifs:'گیف‌ها',saveM:'ذخیره',unsaveM:'حذف از ذخیره‌ها',saveGif:'افزودن به گیف‌های من',savedOk:'ذخیره شد',gifAdded:'به گیف‌ها اضافه شد',gifBig:'حجم گیف بیشتر از ۳ مگابایت است',
 sMsgs:'پیام‌ها',sLinks:'لینک‌ها',sGifs:'گیف‌ها',sSaves:'ذخیره‌ها',noItems:'موردی نیست',myGifs:'گیف‌های من',gifHelp:'با + گیف اضافه کنید',gone:'پیام حذف شده',
 about:'درباره و به‌روزرسانی',curVer:'نسخه فعلی',checkUp:'بررسی به‌روزرسانی',checking:'در حال بررسی…',upToDate:'نسخه شما به‌روز است ✅',newVer:'نسخه جدید',updateTo:'به‌روزرسانی به نسخه',updNow:'در حال به‌روزرسانی…',upFail:'بررسی ممکن نشد؛ اینترنت یا سرور را چک کنید',whatsNew:'تغییرات',
 attachNew:'گروه یا کانال جدید',
 rs:'جستجوهای اخیر',clearAll:'پاک کردن',noRecent:'جستجوی اخیری نیست',myAccts:'حساب‌های من',addAcct:'افزودن حساب',acctMax:'حداکثر ۲ حساب',
 delAcct:'حذف حساب کاربری',delAcctQ:'حساب، چت‌های خصوصی و استوری‌هایت برای همیشه پاک می‌شود. این کار برگشت‌ندارد.',delAcctPw:'برای تأیید، رمز عبور را وارد کن',acctGone:'حساب حذف شد',idChanged:'آیدی تغییر کرد',
 cropT:'برش عکس',cropHint:'عکس به‌صورت دایره نمایش داده می‌شود؛ بکش و با نوار پایین بزرگ/کوچکش کن',apply:'تأیید',imgBad:'عکس باز نشد',
 call:'تماس',calling:'در حال برقراری تماس…',incomingCall:'تماس ورودی',incomingGroup:'تماس گروهی ورودی',connecting:'در حال اتصال…',addToCall:'افزودن به تماس',callEnded:'تماس صوتی',callMissed:'تماس بی‌پاسخ',callDeclined:'تماس رد شد',callBusy:'مشغول بود',callNoAnswer:'پاسخ نداد',inCall:'هم‌اکنون در تماس هستی',noMic:'میکروفون در دسترس نیست (سایت باید با https باز شود)',micDenied:'اجازهٔ میکروفون/دوربین داده نشد؛ از آیکون قفل کنار آدرس سایت، اجازه را روی «مجاز» بگذار',permFrame:'مرورگر در این صفحهٔ جاسازی‌شده اجازهٔ میکروفون/دوربین نمی‌دهد؛ سایت را در یک تب مستقل باز کن',noDevice:'میکروفون یا دوربین پیدا نشد',devBusy:'میکروفون یا دوربین دست برنامهٔ دیگری است؛ آن را ببند و دوباره امتحان کن',
 voice:'ویس',recording:'در حال ضبط…',stopRec:'پایان ضبط',typ_voice:'در حال ضبط ویس…',caption:'توضیح (اختیاری)…',sendPhoto:'ارسال عکس',send:'ارسال',
 friends:'دوستان',noFriends:'هنوز دوستی نداری؛ آیدی را جستجو کن',searchUser:'جستجوی آیدی یا نام…',addMembers:'افزودن اعضا',zgifs:'گیف‌های زونر',emote:'ایموت',emotes:'ایموت‌ها',minimize:'کوچک‌کردن',secEmoji:'ایموجی',secSticker:'استیکر',secEmote:'ایموت',secGif:'گیف',gifZ:'زونر',
 pBg:'پس‌زمینهٔ چت',bgCustom:'تصویر خودت',pBlur:'محو (بلور)',pDim:'تیرگی',
 permT:'دسترسی میکروفون و دوربین',permD:'برای ویس، تماس و ویدیو، ZONER فقط یک‌بار اجازه می‌گیرد. در پنجرهٔ مرورگر گزینهٔ «اجازه بده / Allow» را بزن تا دیگر پرسیده نشود.',permOk:'اجازه می‌دهم',permLater:'بعداً',permDenied:'دسترسی میکروفون در مرورگر بسته است؛ از تنظیمات سایت بازش کن',
 storyDur:'مدت نمایش',hrs:'ساعت',vidBad:'ویدیو باید کمتر از ۶۰ ثانیه و ۳۰ مگابایت باشد',
 file:'فایل',sFiles:'فایل‌ها',attFile:'فایل',fileBig:'حجم فایل زیاد است (حداکثر ۵۰ مگابایت)',fileGone:'این فایل در این مرورگر پیدا نشد',rmPend:'حذف',
 personalize:'شخصی‌سازی',pBack:'بازگشت',pTheme:'تم',pDark:'تیره',pLight:'روشن',pAccent:'رنگ اصلی',pMsg:'پیام‌ها',pText:'اندازهٔ متن',pBox:'اندازهٔ باکس',pRound:'گردی گوشه‌ها',pFont:'فونت برنامه',pReset:'بازگشت به پیش‌فرض',pS1:'سلام! امشب کانتر؟',pS2:'آره، ساعت ۱۰ آنلاین باش 🎮',
 fontSahel:'ساحل',fontAria:'آریا',fontDubai:'دبی',fontDast:'دست‌نویس',fontSample:'سلام گیمر! GG EZ ۱۲۳',
 fBold:'بولد',fItalic:'کج',fStrike:'خط‌خورده',fSpoiler:'اسپویلر',fCode:'کد',
 pub:'عمومی',priv:'خصوصی',privHint:'فقط با لینک دعوت می‌شود عضو شد و جستجو نمی‌شود',pubHint:'با آیدی پیدا و عضو می‌شوند',inviteLink:'لینک دعوت',copyLink:'کپی',newLink:'لینک جدید',linkCopied:'لینک کپی شد',linkReset:'لینک قبلی باطل شد',joinQ:'عضویت در این مجموعه؟',joinBtn:'عضویت',linkBad:'این لینک معتبر نیست',privBadge:'🔒 خصوصی',
 dl:'دانلود',
 
 eSmile:'شکلک‌ها',eHand:'دست و حرکت',eHeart:'قلب و نماد',eGame:'گیم و سرگرمی',eFun:'حیوان و خوراکی',
 
 pinChat:'پین کردن چت',unpinChat:'برداشتن پین',markRead:'علامت‌گذاری خوانده‌شده',block:'مسدود کردن',unblock:'رفع مسدودی',delChat:'حذف چت',delChatQ:'تاریخچهٔ این گفتگو برای شما پاک شود؟',blockedOk:'مسدود شد',unblockedOk:'رفع مسدودی شد',
 bots:'بات‌ها',contacts:'مخاطبین',addContact:'افزودن مخاطب',findBy:'شماره موبایل یا @آیدی',find:'جستجو',notFound:'کاربری پیدا نشد',addedC:'به مخاطبین اضافه شد',noContacts:'موردی نیست؛ با دکمه + مخاطب اضافه کن',openChat:'باز کردن گفتگو',
 addStory:'استوری جدید',yourStory:'استوری من',storyText:'متن استوری…',post:'انتشار',views:'بازدید',phoneL:'شماره موبایل',notif:'اعلان‌ها',sPhotos:'عکس‌ها',changePhoto:'انتخاب عکس',removePhoto:'حذف عکس',
 fontPofak:'پفک',pTabLook:'ظاهر',pTabBg:'پس‌زمینه',pTabFont:'فونت',pBubble:'نوع باکس پیام',bubFrost:'شیشه‌ای مدرن',bubGlass:'شیشه‌ای ساده',bubNeu:'نئومورفیسم',
 bgAuto:'خودکار',bgDark:'گیمینگ دارک',bgLight:'گیمینگ روشن',bgNeonG:'گیمینگ نئون',pAutoHint:'در حالت «خودکار» پس‌زمینه با تم عوض می‌شود (تم روشن = گیمینگ روشن، تم تیره = گیمینگ دارک). اگر خودت پس‌زمینه‌ای انتخاب کنی، دیگر با تم تغییر نمی‌کند.',
 pPar:'حساسیت',pParHint:'میزان حرکت نرم پس‌زمینه با موس (فقط کادر چت)؛ صفر یعنی خاموش',
 settings:'تنظیمات',sGeneral:'عمومی',sAccount:'حساب',sData:'داده‌ها',sAbout:'درباره',lngLabel:'زبان',enterSend:'ارسال با Enter',enterSendD:'اگر خاموش باشد Enter خط جدید می‌زند و ارسال با Ctrl+Enter است',editProfile:'ویرایش پروفایل',backupD:'ذخیرهٔ همهٔ چت‌ها و تنظیمات در یک فایل',restoreD:'بازگرداندن اطلاعات از فایل پشتیبان',aboutD:'نسخه و به‌روزرسانی',
 schedule:'زمان‌بندی پیام',schedT:'ارسال زمان‌بندی‌شده',schNew:'زمان‌بندی',schList:'صف ارسال',schQuick:'زمان سریع',schCustom:'یا زمان دلخواه',q10:'۱۰ دقیقه دیگر',q60:'یک ساعت دیگر',qNight:'امشب',qTom:'فردا صبح',qWeek:'هفتهٔ بعد',schGo:'زمان‌بندی ارسال',schPast:'زمان باید در آینده باشد',schDone:'زمان‌بندی شد',schNone:'پیام زمان‌بندی‌شده‌ای نیست',schNoneD:'روی دکمهٔ ارسال نگه دار تا پیامت را زمان‌بندی کنی',schNow:'ارسال همین حالا',schDel:'حذف',schFired:'پیام زمان‌بندی‌شده ارسال شد',schHold:'نگه دار: زمان‌بندی',schEdit:'در حالت ویرایش نمی‌شود زمان‌بندی کرد',schTo:'به',
 videoMsg:'پیام ویدئویی',vidRetake:'ضبط دوباره',vidFlip:'چرخاندن دوربین',vidMax:'حداکثر ۱ دقیقه',vidShort:'ویدیو خیلی کوتاه است',vidNoCam:'دوربین در دسترس نیست (سایت باید با https باز شود)',vidCamDenied:'اجازهٔ دوربین داده نشد',vidStarting:'در حال راه‌اندازی دوربین…',typ_video:'در حال ضبط ویدیو…',vidBig:'حجم ویدیو زیاد است',vidTap:'برای شروع ضبط بزن',vidTapStop:'برای پایان بزن',
 bubFlat:'ساده',bgPurple:'گیمینگ بنفش',micHint:'ضربه: ویدئو · کشیدن به بالا: ویس',
 tgAccount:'حساب من',tgDevices:'دستگاه‌ها',tgNotif:'اعلان‌ها',tgPrivacy:'حریم خصوصی و امنیت',tgData:'داده و حافظه',tgChat:'تنظیمات چت',tgLook:'ظاهر و شخصی‌سازی',tgLang:'زبان',tgBlocked:'کاربران مسدود',
 nSound:'صدای اعلان',nSoundD:'پخش صدا هنگام دریافت پیام جدید',nToast:'اعلان درون‌برنامه',nToastD:'نمایش پیام‌های جدید چت‌های دیگر',nPrev:'پیش‌نمایش متن',nPrevD:'نمایش متن پیام داخل اعلان',
 hideSeen:'پنهان‌کردن آخرین بازدید',hideSeenD:'دیگران فقط «اخیراً آنلاین» را می‌بینند',recently:'اخیراً آنلاین',chgPw:'تغییر رمز عبور',oldPw:'رمز فعلی',newPw:'رمز جدید',pwChanged:'رمز عبور تغییر کرد',noBlocked:'کاربر مسدودی نیست',
 devNow:'این دستگاه · هم‌اکنون فعال',devAcc:'حساب‌های فعال روی این دستگاه',devNote:'اطلاعات ZONER فقط روی همین مرورگر ذخیره می‌شود و نشست دستگاه دیگری وجود ندارد.',
 stUsage:'مصرف حافظه',stMsgs:'پیام‌ها و تنظیمات',stMedia:'ویدیوها و فایل‌ها',clearMedia:'پاک‌کردن ویدیوها و فایل‌ها',clearMediaQ:'ویدیوها و فایل‌های ذخیره‌شده پاک می‌شوند و دیگر در چت‌ها قابل پخش نیستند. ادامه می‌دهی؟',cleared:'پاک شد',
},en:{
 tag:'A messenger for gamers',login:'Log in',register:'Sign up',enter:'Continue',name:'Display name',uid:'Unique ID (e.g. zoner_pro)',pw:'Password',
 idBad:'ID must start with a letter, 4–20 chars (a-z, 0-9, _)',idTaken:'This ID is already taken',wrong:'Wrong ID or password',pwShort:'Password needs 4+ characters',nameReq:'Enter a name',
 search:'Search or @id',searchChat:'Search messages…',all:'All',personal:'Personal',groups:'Groups',channels:'Channels',saved:'Saved Messages',pick:'Select a chat to start messaging',
 newGroup:'New group',newChannel:'New channel',profile:'My profile',theme:'Switch theme',lng:'فارسی',backup:'Backup',restore:'Restore backup',logout:'Log out',
 msg:'Message…',reply:'Reply',fwd:'Forward',copy:'Copy',del:'Delete',editM:'Edit',pinM:'Pin',unpinM:'Unpin',pinned:'Pinned message',edited:'edited',fwdFrom:'Forwarded from',fwdTo:'Forward to…',
 you:'You',deleted:'Deleted message',online:'online',seen:'last seen',today:'Today',yday:'Yesterday',members:'members',subs:'subscribers',onl:'online',draft:'Draft',
 photo:'Photo',sticker:'Sticker',poll:'Poll',pollQ:'Poll question',opt:'Option',addOpt:'+ Option',votes:'votes',
 gName:'Name',gBio:'Description',gHandle:'Public ID (e.g. cs_team)',gMembers:'Add members by ID (comma separated)',create:'Create',cancel:'Cancel',close:'Close',save:'Save',
 noUser:'No user with this ID:',owner:'owner',admin:'admin',addMember:'Add member',add:'Add',added:'Added',already:'Already a member',join:'Join',leave:'Leave',
 kick:'Remove',promote:'Make admin',demote:'Remove admin',delSp:'Delete',delQ:'Delete for everyone?',leaveQ:'Leave this chat?',mute:'Mute',unmute:'Unmute',
 bio:'About',birth:'Birthday',game:'Favorite game',noGame:'Not set',yrs:'years old',copied:'Copied',sent:'Forwarded',noMsg:'No messages yet',typeCh:'Channel · only admins can post',typeG:'Group',
 editMode:'Edit message',replyTo:'Reply to',cnt:'results',big:'File is larger than 10 MB',full:'Browser storage is full',
 recent:'Recent',emoji:'Emoji',results:'Global results',mine:'My chats',idLine:'ID',restoreQ:'Replace all current data with the backup file?',badFile:'Invalid backup file',
 hint:'Data lives only in this browser. Open several accounts in different tabs to chat live.',
 loginId:'ID, phone or email',phone:'Mobile number (e.g. 09121234567)',code:'5-digit code',first:'First name',last:'Last name',email:'Email',
 sendCode:'Send code',verify:'Verify code',register2:'Create account',changePhone:'Change number',phoneBad:'Invalid phone number',phoneTaken:'This number is already registered',
 demoMsg:'Beta build — SMS is not connected yet. Your verification code:',codeWrong:'The code you entered is wrong',emailBad:'Invalid email',emailTaken:'This email is already registered',nameReq2:'Enter first and last name',
 delTitle:'Delete message',delSure:'Are you sure you want to delete this message?',delAll:'Delete for everyone',nevermind:'Never mind',delBtn:'Delete',
 typ_text:'typing…',typ_sticker:'choosing a sticker…',typ_gif:'choosing a GIF…',typ_photo:'sending a photo…',
 gif:'GIF',gifs:'GIFs',saveM:'Save',unsaveM:'Remove from saved',saveGif:'Add to my GIFs',savedOk:'Saved',gifAdded:'Added to GIFs',gifBig:'GIF is larger than 3 MB',
 sMsgs:'Messages',sLinks:'Links',sGifs:'GIFs',sSaves:'Saved',noItems:'Nothing here',myGifs:'My GIFs',gifHelp:'Add GIFs with +',gone:'Message deleted',
 about:'About & updates',curVer:'Current version',checkUp:'Check for updates',checking:'Checking…',upToDate:'Your version is up to date ✅',newVer:'New version',updateTo:'Update to version',updNow:'Updating…',upFail:'Could not check; verify your connection',whatsNew:'What’s new',
 attachNew:'New group or channel',
 rs:'Recent searches',clearAll:'Clear',noRecent:'No recent searches',myAccts:'My accounts',addAcct:'Add account',acctMax:'Up to 2 accounts',
 delAcct:'Delete account',delAcctQ:'Your account, private chats and stories will be erased permanently. This cannot be undone.',delAcctPw:'Enter your password to confirm',acctGone:'Account deleted',idChanged:'ID changed',
 cropT:'Crop photo',cropHint:'Your photo is shown as a circle; drag it and use the slider to zoom',apply:'Apply',imgBad:'Could not open image',
 call:'Call',calling:'Calling…',incomingCall:'Incoming call',incomingGroup:'Incoming group call',connecting:'Connecting…',addToCall:'Add to call',callEnded:'Voice call',callMissed:'Missed call',callDeclined:'Call declined',callBusy:'Busy',callNoAnswer:'No answer',inCall:'You are already in a call',noMic:'Microphone unavailable (site must use https)',micDenied:'Microphone/camera permission denied; allow it from the lock icon next to the address',permFrame:'This embedded page is not allowed to use the mic/camera; open the site in its own tab',noDevice:'No microphone or camera found',devBusy:'The microphone or camera is in use by another app',
 voice:'Voice',recording:'Recording…',stopRec:'Stop',typ_voice:'recording a voice message…',caption:'Caption (optional)…',sendPhoto:'Send photo',send:'Send',
 friends:'Friends',noFriends:'No friends yet; search an ID',searchUser:'Search ID or name…',addMembers:'Add members',zgifs:'ZONER GIFs',emote:'Emote',emotes:'Emotes',minimize:'Minimize',secEmoji:'Emoji',secSticker:'Stickers',secEmote:'Emotes',secGif:'GIFs',gifZ:'ZONER',
 pBg:'Chat background',bgCustom:'Your image',pBlur:'Blur',pDim:'Dim',
 permT:'Microphone & camera access',permD:'ZONER asks only once for voice, calls and video. Choose “Allow” in the browser prompt so it never asks again.',permOk:'Allow',permLater:'Later',permDenied:'Microphone is blocked in the browser; enable it in site settings',
 storyDur:'Duration',hrs:'h',vidBad:'Video must be under 60 seconds and 30 MB',
 file:'File',sFiles:'Files',attFile:'File',fileBig:'File is too large (max 50 MB)',fileGone:'This file was not found in this browser',rmPend:'Remove',
 personalize:'Personalize',pBack:'Back',pTheme:'Theme',pDark:'Dark',pLight:'Light',pAccent:'Accent color',pMsg:'Messages',pText:'Text size',pBox:'Box size',pRound:'Corner roundness',pFont:'App font',pReset:'Reset to default',pS1:'Hey! CS tonight?',pS2:'Yep, be online at 10 🎮',
 fontSahel:'Sahel',fontAria:'Aria',fontDubai:'Dubai',fontDast:'Handwriting',fontSample:'Hi gamer! GG EZ 123',
 fBold:'Bold',fItalic:'Italic',fStrike:'Strikethrough',fSpoiler:'Spoiler',fCode:'Code',
 pub:'Public',priv:'Private',privHint:'Join only via invite link; not searchable',pubHint:'Found and joined by ID',inviteLink:'Invite link',copyLink:'Copy',newLink:'New link',linkCopied:'Link copied',linkReset:'Old link revoked',joinQ:'Join this chat?',joinBtn:'Join',linkBad:'This link is not valid',privBadge:'🔒 Private',
 dl:'Download',
 
 eSmile:'Smileys',eHand:'Gestures',eHeart:'Hearts & symbols',eGame:'Gaming & fun',eFun:'Animals & food',
 
 pinChat:'Pin chat',unpinChat:'Unpin chat',markRead:'Mark as read',block:'Block',unblock:'Unblock',delChat:'Delete chat',delChatQ:'Clear this chat history for you?',blockedOk:'Blocked',unblockedOk:'Unblocked',
 bots:'Bots',contacts:'Contacts',addContact:'Add contact',findBy:'Phone number or @id',find:'Search',notFound:'User not found',addedC:'Added to contacts',noContacts:'Nothing here; use + to add a contact',openChat:'Open chat',
 addStory:'New story',yourStory:'My story',storyText:'Story text…',post:'Post',views:'views',phoneL:'Phone',notif:'Notifications',sPhotos:'Photos',changePhoto:'Choose photo',removePhoto:'Remove photo',
 fontPofak:'Pofak',pTabLook:'Look',pTabBg:'Background',pTabFont:'Font',pBubble:'Message box style',bubFrost:'Modern glass',bubGlass:'Simple glass',bubNeu:'Neumorphism',
 bgAuto:'Auto',bgDark:'Gaming Dark',bgLight:'Gaming Light',bgNeonG:'Gaming Neon',pAutoHint:'In “Auto” the background follows the theme (light theme = Gaming Light, dark theme = Gaming Dark). If you pick a background yourself, it no longer changes with the theme.',
 pPar:'Sensitivity',pParHint:'How strongly the background drifts with your mouse (chat pane only); 0 turns it off',
 settings:'Settings',sGeneral:'General',sAccount:'Account',sData:'Data',sAbout:'About',lngLabel:'Language',enterSend:'Send with Enter',enterSendD:'When off, Enter adds a new line and Ctrl+Enter sends',editProfile:'Edit profile',backupD:'Save all chats and settings to a file',restoreD:'Restore data from a backup file',aboutD:'Version and updates',
 schedule:'Schedule message',schedT:'Scheduled send',schNew:'Schedule',schList:'Queue',schQuick:'Quick picks',schCustom:'Or pick a time',q10:'In 10 minutes',q60:'In one hour',qNight:'Tonight',qTom:'Tomorrow morning',qWeek:'Next week',schGo:'Schedule send',schPast:'Time must be in the future',schDone:'Scheduled',schNone:'No scheduled messages',schNoneD:'Press and hold the send button to schedule a message',schNow:'Send now',schDel:'Delete',schFired:'Scheduled message sent',schHold:'Hold: schedule',schEdit:'Cannot schedule while editing',schTo:'To',
 videoMsg:'Video message',vidRetake:'Retake',vidFlip:'Flip camera',vidMax:'Up to 1 minute',vidShort:'Video is too short',vidNoCam:'Camera unavailable (site must use https)',vidCamDenied:'Camera permission denied',vidStarting:'Starting camera…',typ_video:'recording a video…',vidBig:'Video is too large',vidTap:'Tap to record',vidTapStop:'Tap to stop',
 bubFlat:'Simple',bgPurple:'Gaming Purple',micHint:'Tap: video · swipe up: voice',
 tgAccount:'My account',tgDevices:'Devices',tgNotif:'Notifications',tgPrivacy:'Privacy & security',tgData:'Data & storage',tgChat:'Chat settings',tgLook:'Appearance',tgLang:'Language',tgBlocked:'Blocked users',
 nSound:'Sound',nSoundD:'Play a sound for new messages',nToast:'In-app alerts',nToastD:'Show new messages from other chats',nPrev:'Message preview',nPrevD:'Show message text in alerts',
 hideSeen:'Hide last seen',hideSeenD:'Others only see “recently”',recently:'last seen recently',chgPw:'Change password',oldPw:'Current password',newPw:'New password',pwChanged:'Password changed',noBlocked:'No blocked users',
 devNow:'This device · active now',devAcc:'Accounts active on this device',devNote:'ZONER data lives only in this browser; there are no other device sessions.',
 stUsage:'Storage usage',stMsgs:'Messages & settings',stMedia:'Videos & files',clearMedia:'Clear videos and files',clearMediaQ:'Saved videos and files will be deleted and can no longer be played in chats. Continue?',cleared:'Cleared',
}};
const t=k=>I[lang][k]??k;
const loc=()=>lang==='fa'?'fa-IR':'en-US';
const hm=d=>new Date(d).toLocaleTimeString(loc(),{hour:'2-digit',minute:'2-digit'});
const toast=x=>{const e=$('#toast');e.textContent=x;e.hidden=false;clearTimeout(toast.h);toast.h=setTimeout(()=>e.hidden=true,2200)};
const dayLabel=ts=>{const d=new Date(ts),n=new Date();if(d.toDateString()===n.toDateString())return t('today');n.setDate(n.getDate()-1);return d.toDateString()===n.toDateString()?t('yday'):d.toLocaleDateString(loc(),{day:'numeric',month:'long',year:d.getFullYear()===new Date().getFullYear()?undefined:'numeric'})};

function applyLang(){
 document.documentElement.lang=lang;document.documentElement.dir=lang==='fa'?'rtl':'ltr';document.documentElement.dataset.theme=D.theme||'dark';applyUI();
 $$('[data-i]').forEach(e=>e.textContent=t(e.dataset.i));$$('[data-ph]').forEach(e=>e.placeholder=t(e.dataset.ph));$$('[data-tt]').forEach(e=>e.title=t(e.dataset.tt));
 $$('.langBtn').forEach(b=>b.textContent=t('lng'));authUI();
 if(me()&&!$('#app').hidden){renderList();if(S())openSpace(curId,true)}
}
const toggleLang=()=>{lang=lang==='fa'?'en':'fa';mutate(()=>D.lang=lang);applyLang()};
$('#langA').onclick=toggleLang;
$$('[data-ico]').forEach(e=>e.innerHTML=ico(e.dataset.ico,+e.dataset.s||22));

/* ---------- ورود / ثبت‌نام ---------- */
let amode='login',rstep=0,otp=null;
const fa2en=x=>x.replace(/[۰-۹]/g,d=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d));
const normPhone=canon;
const PHRE=/^\+?\d{10,15}$/,EMRE=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function authUI(){
 const reg=amode==='reg';
 $('#stLogin').hidden=reg;$('#stPhone').hidden=!(reg&&rstep<2);$('#stReg').hidden=!(reg&&rstep===2);$('#codeBox').hidden=!(reg&&rstep===1);
 $('#rPhone').readOnly=rstep===1;$('#aBack').hidden=!(reg&&rstep>0);
 $('#aGo').textContent=t(!reg?'enter':rstep===0?'sendCode':rstep===1?'verify':'register2');$('#aErr').textContent='';
}
function authReset(){rstep=0;otp=null;['rPhone','rCode','rFirst','rLast','rEmail','rId','rPw','aId','aPw'].forEach(i=>$('#'+i).value='');authUI()}
$('#aTabs').onclick=e=>{const b=e.target.closest('button');if(!b)return;amode=b.dataset.m;$$('#aTabs button').forEach(x=>x.classList.toggle('on',x===b));rstep=0;otp=null;authUI()};
$('#aBack').onclick=()=>{rstep=0;otp=null;$('#rCode').value='';authUI()};
$('#verA').textContent='ZONER v'+VER;
function finishAuth(){ensureSaved();try{sessionStorage.setItem('zs',SID);localStorage.setItem('zoner_last',SID)}catch{}const a=accts().filter(x=>x!==SID);a.push(SID);setAccts(a);adding=false;$('#aCancel').hidden=true;authReset();enter()}
$('#authForm').onsubmit=async e=>{
 e.preventDefault();fresh();const err=m=>$('#aErr').textContent=t(m);
 if(amode==='login'){
  const key=fa2en($('#aId').value.trim()).toLowerCase().replace(/^@/,''),pw=$('#aPw').value,ph=normPhone(key);
  if(!key||!pw)return err('wrong');
  const u=D.users[key]||Object.values(D.users).find(x=>(x.email&&x.email===key)||(x.phone&&x.phone===ph));
  if(!u||!u.pw||(u.pw!==await hash(pw)&&u.pw!==djb(pw)))return err('wrong');
  SID=u.id;return finishAuth();
 }
 if(rstep===0){
  const p=normPhone($('#rPhone').value);if(!PHRE.test(p))return err('phoneBad');
  if(Object.values(D.users).some(x=>x.phone===p))return err('phoneTaken');
  otp=String(Math.floor(10000+Math.random()*90000));rstep=1;authUI();
  $('#demoCode').replaceChildren(t('demoMsg')+' ',el('b','',otp));$('#rCode').value='';$('#rCode').focus();return;
 }
 if(rstep===1){if(fa2en($('#rCode').value.trim())!==otp)return err('codeWrong');rstep=2;authUI();$('#rFirst').focus();return}
 const fn=$('#rFirst').value.trim(),ln=$('#rLast').value.trim(),em=$('#rEmail').value.trim().toLowerCase(),id=fa2en($('#rId').value.trim()).toLowerCase().replace(/^@/,''),pw=$('#rPw').value;
 if(!fn||!ln)return err('nameReq2');
 if(!EMRE.test(em))return err('emailBad');
 if(Object.values(D.users).some(x=>x.email===em))return err('emailTaken');
 if(!HRE.test(id))return err('idBad');if(taken(id))return err('idTaken');if(pw.length<4)return err('pwShort');
 const h=await hash(pw),phone=normPhone($('#rPhone').value);
 let dup=0;mutate(()=>{if(taken(id)){dup=1;return}D.users[id]={id,name:fn+' '+ln,first:fn,last:ln,email:em,phone,pw:h,bio:'',birth:'',game:'',seen:Date.now(),created:Date.now(),read:{},muted:{},drafts:{},recent:[],gifs:[],saves:[],hid:[]}});if(dup)return err('idTaken');
 SID=id;finishAuth();
};
function ensureSaved(){const id='saved:'+SID;if(!D.spaces[id])mutate(()=>{D.spaces[id]={id,type:'saved',members:[SID],msgs:[],created:Date.now()}})}
function logout(){if(CALL)hangup();const old=SID;setAccts(accts().filter(x=>x!==old));const nx=accts()[0];
 try{sessionStorage.removeItem('zs');localStorage.removeItem('zoner_last')}catch{}
 if(nx&&D.users[nx]){SID=nx;try{sessionStorage.setItem('zs',nx);localStorage.setItem('zoner_last',nx)}catch{}closeDrawer();ensureSaved();enter();return}
 SID=null;curId=null;adding=false;$('#aCancel').hidden=true;$('#app').hidden=true;$('#auth').hidden=false;closeDrawer();authReset()}
function enter(){$('#auth').hidden=true;$('#app').hidden=false;$('#app').classList.remove('in-chat');curId=null;$('#empty').hidden=false;$('#chatIn').hidden=true;q='';sopen=false;$('#side').classList.remove('searching');$('#search').value='';renderList();renderStories();touchSeen();requestAnimationFrame(updNav);setTimeout(checkJoin,250);setTimeout(askMediaOnce,1800);pruneStories();setTimeout(()=>flushSched(x=>x.ts<=Date.now()),500)}

/* ---------- ابزارهای فضا ---------- */
const meId=()=>SID,mySpaces=()=>Object.values(D.spaces).filter(s=>s.members.includes(SID));
const other=s=>s.members.find(x=>x!==SID)||SID;
const isAdmin=s=>s.owner===SID||(s.admins||[]).includes(SID);
const canPost=s=>s.type==='channel'?isAdmin(s):s.members.includes(SID)&&!(s.type==='dm'&&blockedBy(SID,other(s)));
const spName=s=>s.type==='saved'?t('saved'):s.type==='dm'?(D.users[other(s)]?.name||other(s)):s.name;
const blockedBy=(a,b)=>(D.users[a]?.blocked||[]).includes(b),pinned=s=>(me().pins||[]).includes(s.id)?1:0;
const vis=s=>{const h=me().hid||[];return s.msgs.filter(m=>!(m.blk&&m.from!==SID)&&!h.includes(m.id))};
const last=s=>{const v=vis(s);return v[v.length-1]};
const lastTs=s=>{const m=last(s);return m?m.ts:s.created||0};
const unread=s=>{const r=me().read[s.id]||0;return vis(s).filter(m=>m.from!==SID&&m.ts>r).length};
const SEEN='zoner_seen';let _sm=0,_smv={};
const seenMap=()=>{if(Date.now()-_sm>1000){try{_smv=JSON.parse(localStorage.getItem(SEEN))||{}}catch{_smv={}}_sm=Date.now()}return _smv};
const touchSeen=()=>{if(!SID)return;try{const o=JSON.parse(localStorage.getItem(SEEN))||{};o[SID]=Date.now();localStorage.setItem(SEEN,JSON.stringify(o))}catch{}};
const seenOf=u=>u.bot?Date.now():Math.max(u.seen||0,seenMap()[u.id]||0);
const isOn=u=>u&&!(u.hideSeen&&u.id!==SID)&&Date.now()-seenOf(u)<50000;
const isContact=h=>(me().contacts||[]).includes(h);
function seenTxt(u){if(u.hideSeen&&u.id!==SID)return t('recently');if(isOn(u))return t('online');const d=new Date(seenOf(u));return t('seen')+' '+(d.toDateString()===new Date().toDateString()?hm(seenOf(u)):d.toLocaleDateString(loc(),{day:'numeric',month:'short'}))}
function spSub(s){
 if(s.type==='saved')return '';
 if(s.type==='dm')return D.users[other(s)]?seenTxt(D.users[other(s)]):'';
 const n=s.members.length.toLocaleString(loc());
 if(s.type==='channel')return n+' '+t('subs');
 const on=s.members.filter(x=>isOn(D.users[x])).length;return n+' '+t('members')+(on?'، '+on.toLocaleString(loc())+' '+t('onl'):'');
}
const readT=()=>{try{return JSON.parse(localStorage.getItem(TK))||{}}catch{return{}}};
function typingTxt(s){
 const o=readT()[s.id];if(!o)return'';const now=Date.now();
 const ar=Object.entries(o).filter(([u,v])=>u!==SID&&now-v.ts<4500&&s.members.includes(u));if(!ar.length)return'';
 const [u,v]=ar[0];return(s.type==='dm'?'':(D.users[u]?.name||u)+' ')+t('typ_'+v.k);
}
const subLine=s=>typingTxt(s)||spSub(s);
let myT=null,lastTW=0;
function setTyping(kind){
 if(!SID||!curId)return;const now=Date.now();
 if(kind&&myT&&myT.k===kind&&myT.sp===curId&&now-lastTW<2500)return;
 if(!kind&&!myT)return;
 try{const o=readT();
  for(const sp in o){for(const u in o[sp])if(now-o[sp][u].ts>6000)delete o[sp][u];if(!Object.keys(o[sp]).length)delete o[sp]}
  if(myT&&o[myT.sp])delete o[myT.sp][SID];
  if(kind){(o[curId]=o[curId]||{})[SID]={k:kind,ts:now};myT={k:kind,sp:curId}}else myT=null;
  localStorage.setItem(TK,JSON.stringify(o));lastTW=now}catch{}
}
const pickKind=()=>$('#picker').hidden||pickTab==='emoji'?null:pickTab==='gif'?'gif':'sticker';
let typSig='';
function tickTyping(){
 if(!SID||!me())return;
 if(curId){const k=pickKind();if(k)setTyping(k);else if($('#text').value.trim())setTyping('text');else if(rec.st==='rec'||rec.st==='stopping')setTyping('voice');else if(vr.st==='rec')setTyping('video');else if(myT&&!['photo','voice','video'].includes(myT.k))setTyping(null)}
 const sig=mySpaces().map(s=>typingTxt(s)).join('|');
 if(sig!==typSig){typSig=sig;renderList();if(curId&&S())paintSub()}
}
function paintSub(){const s=S(),tt=typingTxt(s);$('#pSub').textContent=tt||spSub(s);$('#pSub').classList.toggle('typ',!!tt)}
function avatar(s,size){
 const a=el('span','avatar');if(size)a.style.setProperty('--sz',size+'px');
 if(s.type==='dm'&&isOn(D.users[other(s)])&&other(s)!==SID)a.classList.add('onl');
 if(s.type==='saved'){a.classList.add('sv');a.append(icon('bookmark'));return a}
 const nm=s.type==='dm'?spName(s):s.name,key=s.type==='dm'?other(s):s.id;
 const src=s.type==='dm'?D.users[other(s)]?.av:s.av;if(src){const im=el('img');im.src=src;im.alt='';a.append(im);return a}
 a.textContent=Array.from(nm||'?')[0].toUpperCase();a.style.background=`linear-gradient(135deg,hsl(${hue(key)} 70% 60%),hsl(${(hue(key)+40)%360} 65% 45%))`;return a;
}
const userAv=(u,size)=>avatar({type:'dm',members:[SID,u.id]},size);
function preview(m,plain){
 if(!m)return'';const who=!plain&&m.from===SID?t('you')+': ':'';
 return who+(m.text?plainT(m.text):(m.emote?'😺 '+t('emote'):m.sticker?'🎭 '+t('sticker'):m.gif?'🎞️ '+t('gif'):m.img?'🖼️ '+t('photo'):m.file?'📎 '+m.file.name:m.voice?'🎤 '+t('voice'):m.vid?'🎥 '+t('videoMsg'):m.poll?'📊 '+m.poll.q:''));
}
const ownerOfDM=()=>0;

/* ---------- فهرست ---------- */
function renderList(){
 const l=$('#list');l.replaceChildren();const qq=q.trim().replace(/^@/,'').toLowerCase();
 if(sopen&&!qq)return renderRecents(l);
 const mine=mySpaces().filter(s=>!(me().hsp?.[s.id]&&!vis(s).length)&&(tab==='all'||(tab==='personal'&&(s.type==='dm'||s.type==='saved')&&!D.users[other(s)]?.bot)||tab===s.type)&&(!qq||spName(s).toLowerCase().includes(qq)||(s.handle||'').includes(qq)||(s.type==='dm'&&other(s).includes(qq))))
  .sort((a,b)=>pinned(b)-pinned(a)||lastTs(b)-lastTs(a));
 const row=(av,title,sub,time,badge,act,onclick,extra)=>{
  const it=el('div','item'+(act?' act':'')),meta=el('div','meta'),r1=el('div','row'),r2=el('div','row');
  const b=el('b','',title);if(extra)b.prepend(extra);r1.append(b);if(time)r1.append(el('span','tm',time));
  const lst=el('div','last');if(typeof sub==='string')lst.textContent=sub;else lst.append(sub);r2.append(lst);if(badge)r2.append(badge);
  meta.append(r1,r2);it.append(av,meta);it.onclick=e=>{if(sopen){addRecent();onclick(e);closeSearch()}else onclick(e)};l.append(it);
 };
 if(tab==='contacts'||tab==='bot'){
  const ids=tab==='bot'?Object.keys(BOTS):(me().contacts||[]);
  ids.filter(h=>D.users[h]&&(!qq||h.includes(qq)||D.users[h].name.toLowerCase().includes(qq))).forEach(h=>{const u=D.users[h];row(userAv(u),u.name,'@'+h+(u.bot?' · BOT':''),'',null,false,()=>openDM(h))});
  if(!l.children.length)l.append(el('p','muted pad',t('noContacts')));return}
 if(qq&&mine.length)l.append(el('div','sec',t('mine')));
 mine.forEach(s=>{
  const m=last(s),n=unread(s),dr=me().drafts[s.id],tt=typingTxt(s);let sub;
  if(tt){sub=el('span','typ',tt)}else if(dr&&s.id!==curId){sub=el('span');const d=el('span','red',t('draft')+': ');sub.append(d,dr)}else sub=m?(s.type==='group'&&m.from!==SID?(D.users[m.from]?.name||'')+': ':'')+preview(m):(s.type==='dm'?'':plainT(s.bio||''));
  const bd=n?el('span','badge'+(me().muted[s.id]?' mut':''),n>99?'99+':n.toLocaleString(loc())):null;
  const ex=s.type==='group'?icon('users',14):s.type==='channel'?icon('mega',14):null;
  row(avatar(s),spName(s),sub,m?hm(m.ts):'',bd,s.id===curId,()=>openSpace(s.id),ex);
  const li=l.lastChild;if(pinned(s))li.classList.add('pin');let lp=0,lt;
  li.oncontextmenu=e=>{e.preventDefault();chatMenu(e,s.id)};
  li.ontouchstart=e=>{const p=e.touches[0];lt=setTimeout(()=>{lp=1;chatMenu({clientX:p.clientX,clientY:p.clientY},s.id)},550)};
  li.ontouchend=li.ontouchmove=()=>clearTimeout(lt);
  li.addEventListener('click',e=>{if(lp){e.stopImmediatePropagation();lp=0}},true);
 });
 if(qq&&tab==='all'){
  const res=[];
  Object.values(D.users).forEach(u=>{if(u.id!==SID&&!mySpaces().some(s=>s.type==='dm'&&other(s)===u.id)&&(u.id.includes(qq)||u.name.toLowerCase().includes(qq)))res.push({u})});
  Object.values(D.spaces).forEach(s=>{if((s.type==='group'||s.type==='channel')&&!s.priv&&!s.members.includes(SID)&&((s.handle||'').includes(qq)||s.name.toLowerCase().includes(qq)))res.push({s})});
  if(res.length)l.append(el('div','sec',t('results')));
  res.forEach(r=>{
   if(r.u)row(userAv(r.u),r.u.name,'@'+r.u.id,'',null,false,()=>{openEntity(r.u.id);$('#search').value=q='';renderList()});
   else row(avatar(r.s),r.s.name,'@'+r.s.handle+' · '+(r.s.type==='channel'?t('subs'):t('members'))+' '+r.s.members.length,'',null,false,()=>spaceInfo(r.s.id));
  });
  if(!mine.length&&!res.length)l.append(el('p','muted pad',t('noMsg')));
 }
 const tot=mySpaces().reduce((a,s)=>a+(me().muted[s.id]?0:unread(s)),0);document.title=(tot?'('+tot+') ':'')+'ZONER';renderStories();
}
$('#search').oninput=e=>{q=e.target.value;renderList()};
$('#tabs').onclick=e=>{const b=e.target.closest('button');if(!b)return;tab=b.dataset.tab;$$('#tabs button').forEach(x=>x.classList.toggle('on',x===b));renderList()};

function openEntity(h){
 const e=byHandle(h);if(!e)return toast(t('noUser')+' @'+h);
 if(e.u){if(e.u.id===SID)return openSpace('saved:'+SID);return openDM(e.u.id)}
 if(e.s.members.includes(SID))openSpace(e.s.id);else spaceInfo(e.s.id);
}
function openDM(o){const id='dm:'+[SID,o].sort().join(':'),nw=!D.spaces[id];if(me().hsp?.[id])mutate(()=>{delete me().hsp[id]});if(nw)mutate(()=>{D.spaces[id]={id,type:'dm',members:[SID,o],msgs:[],created:Date.now()}});openSpace(id);if(nw&&D.users[o]?.bot)botHandle(id,'/start')}

/* ---------- چت ---------- */
function openSpace(id,same){
 const s=D.spaces[id];if(!s)return;
 if(!same||curId!==id){if(rec.st!=='idle')recCancel();PE=[];renderPend();if(curId&&curId!==id)saveDraft();curId=id;clearBar();sq='';$('#sbar').hidden=true;$('#msgSearch').value='';$('#text').value=me().drafts[id]||'';autosize()}
 $('#empty').hidden=true;$('#chatIn').hidden=false;$('#app').classList.add('in-chat');if(!history.state||!history.state.c)history.pushState({c:1},'');
 paintHead();renderMsgs(true);markRead();renderList();if(!same&&matchMedia('(pointer:fine)').matches)$('#text').focus();
}
function paintHead(){
 const s=S();updComposer();{const _d=s.type==='dm'?D.users[other(s)]:null;$('#callBtn').hidden=!(_d&&!_d.bot&&_d.id!==SID&&!blockedBy(SID,_d.id)&&!blockedBy(_d.id,SID))}$('#pName').textContent=spName(s);paintSub();$('#pAv').replaceWith(Object.assign(avatar(s),{id:'pAv'}));
 const can=canPost(s);$('#composer').hidden=!can;$('#readonly').hidden=can;$('#muteBtn').textContent=s.type==='dm'&&blockedBy(SID,other(s))?t('unblock'):me().muted[s.id]?t('unmute'):t('mute');
 const p=s.pinned&&vis(s).find(m=>m.id===s.pinned);$('#pinbar').hidden=!p;if(p)$('#pinText').textContent=preview(p,1).slice(0,80);
 const bb=$('#botbar'),bu=s.type==='dm'&&D.users[other(s)];bb.hidden=!(bu&&bu.bot);bb.replaceChildren();
 if(bu&&bu.bot)['/roll','/coin','/map','/agent','/loadout','/tip','/help'].forEach(c=>{const b=el('button','',c);b.onclick=()=>{$('#text').value=c;send()};bb.append(b)});
}
function saveDraft(){const s=S();if(!s)return;const v=$('#text').value;if((me().drafts[s.id]||'')!==v)mutate(()=>{if(v)me().drafts[s.id]=v;else delete me().drafts[s.id]})}
const doBack=()=>{saveDraft();$('#down').classList.remove('show');$('#app').classList.remove('in-chat');curId=null;clearBar();$('#chatIn').hidden=true;$('#empty').hidden=false;$('#picker').hidden=true;renderList()};
$('#back').onclick=()=>history.state&&history.state.c?history.back():doBack();
addEventListener('popstate',()=>{if(curId)doBack()});
$('#who').onclick=$('#infoBtn').onclick=()=>spaceInfo(curId);
$('#muteBtn').onclick=()=>{const s=S();s.type==='dm'&&blockedBy(SID,other(s))?toggleBlock(other(s)):toggleMute(curId)};
function toggleMute(id){mutate(()=>{me().muted[id]?delete me().muted[id]:me().muted[id]=1});paintHead();renderList();if(!$('#modal').hidden)spaceInfo(id)}
function markRead(){const s=S();if(!s||document.hidden)return;const l=last(s);if(!l||(me().read[s.id]||0)>=l.ts)return;mutate(()=>{me().read[s.id]=Date.now()});renderList()}
document.addEventListener('visibilitychange',markRead);

const ticks=(m,s)=>{
 if(m.from!==SID||s.type==='saved'||s.type==='channel')return null;
 const rd=s.members.some(x=>x!==SID&&(D.users[x]?.bot||(D.users[x]?.read?.[s.id]||0)>=m.ts));const i=icon(rd?'check2':'check',15);i.classList.add('tick');if(rd)i.classList.add('rd');return i;
};
function linkify(txt,p){rich(txt,p)}
function renderMsgs(stick){
 const s=S(),box=$('#msgs'),atB=box.scrollHeight-box.scrollTop-box.clientHeight<90,old=box.scrollTop;box.replaceChildren();

 let list=vis(s);const f=sq.trim().toLowerCase();if(f){list=list.filter(m=>(m.text||m.poll?.q||'').toLowerCase().includes(f));$('#sCount').textContent=list.length.toLocaleString(loc())+' '+t('cnt')}
 if(!list.length)box.append(el('p','muted nomsg',t('noMsg')));
 let day='';
 list.forEach(m=>{
  const dk=new Date(m.ts).toDateString();if(dk!==day){day=dk;box.append(el('div','dsep',dayLabel(m.ts)))}
  box.append(mkMsg(m,s));
 });
 if(stick||atB)box.scrollTop=box.scrollHeight;else box.scrollTop=old;
 onScroll();
}
function mkMsg(m,s){
 const mine=m.from===SID,b=el('div','msg '+(mine?'mine':'their')+(m.sticker?' stk':'')+((m.emote&&!m.text)?' emo':'')+((m.gif&&m.tr&&!m.text)?' stk':'')+(m.vid?' stk vidw':'')+((m.emote&&m.text)?' ewtm':'')+((m.text&&!m.emote&&!m.replyTo&&!m.fwd&&EONLY.test(m.text))?' emo':''));b.dataset.id=m.id;let lt=null,lx=0,ly=0,fired=false;
 if(!mine&&s.type==='group'){const n=el('div','sn',D.users[m.from]?.name||m.from);n.style.color=`hsl(${hue(m.from)} 75% 62%)`;n.onclick=e=>{e.stopPropagation();openEntity(m.from)};b.append(n)}
 if(m.fwd)b.append(el('div','fwd','↪ '+t('fwdFrom')+' '+m.fwd));
 if(m.replyTo){const r=s.msgs.find(x=>x.id===m.replyTo),qd=el('div','quote');
  qd.append(el('b','',r?(r.from===SID?t('you'):D.users[r.from]?.name||''):''),el('span','',r?preview(r,1):t('deleted')));
  qd.onclick=e=>{e.stopPropagation();jumpTo(m.replyTo)};b.append(qd)}
 if(m.emote||m.emotes){const row=el('div','emorow');(m.emotes||[m.emote]).forEach(src=>{const i=el('img','emote');i.src=src;i.alt='emote';i.loading='lazy';row.append(i)});b.append(row)}
 if(m.sticker){const i=el('img','sticker');i.src='stickers/'+m.sticker+'.png';i.alt='sticker';i.loading='lazy';b.append(i)}
 if(m.gif||m.img){const src=m.gif||m.img,i=el('img','photo');i.src=src;i.onclick=e=>{e.stopPropagation();openModal(Object.assign(el('img','big'),{src}))};b.append(i)}
 if(m.poll)b.append(mkPoll(m));
 if(m.voice)b.append(mkVoice(m));
 if(m.vid)b.append(mkVid(m));
 if(m.file)b.append(mkFile(m));
 const meta=el('div','meta2');if(m.edited)meta.append(el('i','',t('edited')));meta.append(el('span','',hm(m.ts)));const tk=ticks(m,s);if(tk)meta.append(tk);
 const hasR=m.r&&Object.keys(m.r).length;
 let tx=null;if(m.text){tx=el('div','tx'+(EONLY.test(m.text)?' bigemo':''));tx.dir='auto';rich(m.text,tx)}
 if(tx&&!hasR){const bd=el('div','body');bd.append(tx,meta);b.append(bd)}else{if(tx)b.append(tx)}
 if(hasR){
  const rr=el('div','rx');
  Object.entries(m.r).forEach(([e,us])=>{if(!us.length)return;const c=el('button','chip'+(us.includes(SID)?' on':''));c.append(emoNode(e),el('b','',us.length>1?us.length.toLocaleString(loc()):''));
   c.title=us.map(u=>D.users[u]?.name||u).join('، ');c.onclick=ev=>{ev.stopPropagation();react(m.id,e)};rr.append(c)});
  b.append(rr)}
 if(!(tx&&!hasR)){meta.classList.add('alone');b.append(meta)}
 b.onclick=e=>{if(fired){fired=false;return}if(String(getSelection()).length)return;showCtx(e,m.id)};
 b.addEventListener('touchstart',e=>{fired=false;const p=e.touches[0];lx=p.clientX;ly=p.clientY;clearTimeout(lt);lt=setTimeout(()=>{fired=true;try{navigator.vibrate&&navigator.vibrate(12)}catch{}showCtx({clientX:lx,clientY:ly,stopPropagation(){},preventDefault(){}},m.id)},420)},{passive:true});
 b.addEventListener('touchmove',e=>{const p=e.touches[0];if(Math.hypot(p.clientX-lx,p.clientY-ly)>10)clearTimeout(lt)},{passive:true});
 ['touchend','touchcancel'].forEach(ev=>b.addEventListener(ev,e=>{clearTimeout(lt);if(fired&&e.cancelable)e.preventDefault()}));
 b.oncontextmenu=e=>{e.preventDefault();showCtx(e,m.id)};b.ondblclick=e=>{e.preventDefault();hideCtx();react(m.id,'❤️')};
 return b;
}
function mkPoll(m){
 const p=m.poll,tot=p.opts.reduce((a,o)=>a+o.v.length,0),w=el('div','poll');w.append(el('b','pq',p.q));
 p.opts.forEach((o,i)=>{const r=el('button','po'+(o.v.includes(SID)?' on':'')),pc=tot?Math.round(o.v.length/tot*100):0;
  const bar=el('i','bar');bar.style.width=pc+'%';r.append(bar,el('span','pt',o.t),el('span','pp',pc.toLocaleString(loc())+'٪'.replace('٪',lang==='fa'?'٪':'%')));
  r.onclick=e=>{e.stopPropagation();vote(m.id,i)};w.append(r)});
 w.append(el('small','muted',tot.toLocaleString(loc())+' '+t('votes')));return w;
}
function vote(id,i){mutate(()=>{const m=S().msgs.find(x=>x.id===id);if(!m)return;const had=m.poll.opts[i].v.includes(SID);m.poll.opts.forEach(o=>o.v=o.v.filter(x=>x!==SID));if(!had)m.poll.opts[i].v.push(SID)});renderMsgs()}
function react(id,e){mutate(()=>{const m=S().msgs.find(x=>x.id===id);if(!m)return;m.r=m.r||{};const had=(m.r[e]||[]).includes(SID);for(const k in m.r){m.r[k]=m.r[k].filter(x=>x!==SID);if(!m.r[k].length)delete m.r[k]}if(!had)(m.r[e]=m.r[e]||[]).push(SID)});renderMsgs();renderList()}
function jumpTo(id){const n=$(`#msgs [data-id="${id}"]`);if(!n)return toast(t('deleted'));n.scrollIntoView({block:'center',behavior:'smooth'});n.classList.add('flash');setTimeout(()=>n.classList.remove('flash'),1200)}
const onScroll=()=>{const b=$('#msgs');$('#down').classList.toggle('show',b.scrollHeight-b.scrollTop-b.clientHeight>260)};
$('#msgs').onscroll=onScroll;$('#down').onclick=()=>$('#msgs').scrollTo({top:1e9,behavior:'smooth'});
$('#sBtn').onclick=()=>{const b=$('#sbar');b.hidden=!b.hidden;if(!b.hidden)$('#msgSearch').focus();else{sq='';renderMsgs()}};
$('#sClose').onclick=()=>{$('#sbar').hidden=true;$('#msgSearch').value=sq='';renderMsgs()};
$('#msgSearch').oninput=e=>{sq=e.target.value;renderMsgs()};
$('#pinbar').onclick=e=>{if(e.target.closest('#unpin'))return;jumpTo(S().pinned)};
$('#unpin').onclick=()=>{mutate(()=>S().pinned=null);paintHead()};

/* ---------- منوی پیام (جای ثابت: بالای نوار پیام) ---------- */
const ctx=$('#ctx');
function hideCtx(){ctx.hidden=true;$$('.msg.sel').forEach(x=>x.classList.remove('sel'))}
function dockCtx(){
 ctx.hidden=false;const c=$('#chatIn').getBoundingClientRect(),ref=($('#composer').hidden?$('#readonly'):$('#composer')).getBoundingClientRect(),r=ctx.getBoundingClientRect();
 ctx.style.left=Math.max(8,Math.min(c.left+(c.width-r.width)/2,innerWidth-r.width-8))+'px';
 ctx.style.top=Math.max(8,ref.top-r.height-12)+'px';
}
function posCtx(e){ctx.hidden=false;ctx.style.left='0px';ctx.style.top='0px';const r={width:ctx.offsetWidth,height:ctx.offsetHeight},x=e.clientX||innerWidth/2,y=e.clientY||innerHeight/2;
 ctx.style.left=Math.max(8,Math.min(x-r.width/2,innerWidth-r.width-8))+'px';
 ctx.style.top=Math.max(8,Math.min(y+12>innerHeight-r.height-8?y-r.height-12:y+12,innerHeight-r.height-8))+'px'}
function anchorCtx(btn,below){
 ctx.hidden=false;ctx.style.left='0px';ctx.style.top='0px';const b=btn.getBoundingClientRect(),r=ctx.getBoundingClientRect();
 ctx.style.left=Math.max(8,Math.min(b.left,innerWidth-r.width-8))+'px';
 ctx.style.top=Math.max(8,Math.min(below?b.bottom+8:b.top-r.height-10,innerHeight-r.height-8))+'px';
}
const isSaved=(sp,id)=>(me().saves||[]).some(x=>x.id===id&&x.sp===sp);
function toggleSave(sp,m){mutate(()=>{const u=me();u.saves=u.saves||[];const i=u.saves.findIndex(x=>x.id===m.id&&x.sp===sp);if(i>=0)u.saves.splice(i,1);else u.saves.push({id:m.id,sp,from:m.from,ts:Date.now(),text:m.text||''})});toast(t(isSaved(sp,m.id)?'savedOk':'unsaveM'))}
function addGif(src){mutate(()=>{const u=me();u.gifs=u.gifs||[];if(!u.gifs.includes(src)){u.gifs.unshift(src);u.gifs.length=Math.min(u.gifs.length,30)}});toast(t('gifAdded'))}
function confirmDelete(id){
 const s=S(),m=s.msgs.find(x=>x.id===id);if(!m)return;
 const all=m.from===SID||(s.type!=='dm'&&s.type!=='saved'&&isAdmin(s)),cb=el('input');cb.type='checkbox';
 const lab=el('label','chk');lab.append(cb,el('span','',t('delAll')));
 const doDel=()=>{const x=cb.checked||s.type==='saved'&&m.from===SID;
  mutate(()=>{const sp=D.spaces[s.id];if(!sp)return;if(x&&all){if(m.vid)IDB.del(m.vid.key).catch(()=>{});sp.msgs=sp.msgs.filter(y=>y.id!==id);if(sp.pinned===id)sp.pinned=null}else{const u=me();u.hid=u.hid||[];u.hid.push(id)}});
  closeModal();paintHead();renderMsgs();renderList()};
 openModal(el('h3','',t('delTitle')),el('p','bio',t('delSure')),...(all&&s.type!=='saved'?[lab]:[]),btns(B(t('delBtn'),doDel,'btn del'),B(t('nevermind'),closeModal,'btn ghost')));
}
function showCtx(e,id){
 e.stopPropagation();const s=S(),m=s.msgs.find(x=>x.id===id);if(!m)return;hideCtx();$(`#msgs [data-id="${id}"]`)?.classList.add('sel');ctx.replaceChildren();
 const bar=el('div','qr');QR.forEach(x=>{const b=el('button','');b.append(emoNode(x));b.onclick=()=>{hideCtx();react(id,x)};bar.append(b)});if(canPost(s)||s.type==='channel')ctx.append(bar);
 const it=(n,k,fn,cls)=>{const b=el('button','ci'+(cls?' '+cls:''));b.append(icon(n,18),el('span','',t(k)));b.onclick=()=>{hideCtx();fn()};ctx.append(b)};
 if(canPost(s))it('reply','reply',()=>setReply(id));
 if(m.text)it('copy','copy',()=>{navigator.clipboard?.writeText(m.text);toast(t('copied'))});
 it('fwd','fwd',()=>openForward(id));
 it('bookmark',isSaved(s.id,id)?'unsaveM':'saveM',()=>toggleSave(s.id,m));
 if(m.gif)it('gif','saveGif',()=>addGif(m.gif));
 if(m.gif||m.img||m.voice||m.emote||m.file)it('download','dl',()=>dlMsg(m));
 if(m.from===SID&&m.text)it('edit','editM',()=>setEdit(id));
 if(canPost(s))it('pin',s.pinned===id?'unpinM':'pinM',()=>{mutate(()=>S().pinned=S().pinned===id?null:id);paintHead()});
 it('trash','del',()=>confirmDelete(id),'danger');
 posCtx(e);
}
document.addEventListener('click',e=>{if(!ctx.contains(e.target))hideCtx();if(!$('#picker').hidden&&!$('#picker').contains(e.target)&&!e.target.closest('#pickBtn')){$('#picker').hidden=true;tickTyping()}});
$('#msgs').addEventListener('scroll',hideCtx);

/* ---------- ارسال ---------- */
function clearBar(){reply=edit=null;$('#replyBar').hidden=true}
function setReply(id){const m=S().msgs.find(x=>x.id===id);edit=null;reply=id;$('#rIco').innerHTML=ico('reply',20);$('#rName').textContent=t('replyTo')+' '+(m.from===SID?t('you'):D.users[m.from]?.name||'');$('#rText').textContent=preview(m,1);$('#replyBar').hidden=false;$('#text').focus()}
function setEdit(id){const m=S().msgs.find(x=>x.id===id);reply=null;edit=id;$('#rIco').innerHTML=ico('edit',20);$('#rName').textContent=t('editMode');$('#rText').textContent=m.text;$('#replyBar').hidden=false;$('#text').value=m.text;autosize();$('#text').focus()}
$('#rCancel').onclick=()=>{if(edit)$('#text').value='';clearBar();autosize()};
function autosize(){const a=$('#text');a.style.height='auto';const h=Math.min(a.scrollHeight,140);a.style.height=h+'px';a.style.overflowY=a.scrollHeight>140?'auto':'hidden';updComposer()}
function send(extra={}){
 {const{caption,...ex}=extra;extra=ex;extra._c=caption}
 const s=S();if(!s||!canPost(s))return;const ta=$('#text'),free=extra.sticker||extra.img||extra.gif||extra.poll||extra.voice||extra.file||extra.vid,cap=extra._c;if(PE.length&&!edit){extra.emote=PE[0];if(PE.length>1)extra.emotes=PE.slice()}delete extra._c;const text=cap!=null?String(cap).trim():(free?'':ta.value.trim());
 if(!text&&!free&&!extra.emote)return;
 if(edit){const id=edit;mutate(()=>{const m=S().msgs.find(x=>x.id===id);if(m&&m.text!==text){m.text=text;m.edited=Date.now()}});ta.value='';clearBar();autosize();renderMsgs();return}
 const rid=reply;
 if(mutate(()=>{S().msgs.push({id:uid(),ts:Date.now(),from:SID,...(s.type==='dm'&&blockedBy(other(s),SID)&&{blk:1}),...(text&&{text}),...extra,...(rid&&{replyTo:rid})});if(!free)delete me().drafts[curId];
  if(extra.sticker){const r=me().recent=(me().recent||[]).filter(x=>x!==extra.sticker);r.unshift(extra.sticker);r.length=Math.min(r.length,16)}})){
  PE=[];renderPend();if(!free){ta.value='';autosize()}setTyping(null);clearBar();paintHead();renderMsgs(true);renderList();if(s.type==='dm'&&text)botHandle(s.id,text)}
}
$('#send').onclick=()=>send();
$('#text').oninput=()=>{autosize();setTyping($('#text').value.trim()?'text':null)};
$('#text').onkeydown=e=>{if(e.key==='Enter'&&!e.isComposing&&(UI.enter!==0?!e.shiftKey:(e.ctrlKey||e.metaKey))){e.preventDefault();send()}};
$('#clipBtn').onclick=e=>{e.stopPropagation();ctx.replaceChildren();
 const it=(n,k,fn)=>{const b=el('button','ci');b.append(icon(n,18),el('span','',t(k)));b.onclick=()=>{hideCtx();fn()};ctx.append(b)};
 it('image','photo',()=>$('#file').click());
 it('gif','gif',()=>setTimeout(()=>{pickTab='gif';pickSub.gif='mine';buildPicker();$('#picker').hidden=false;setTyping('gif')},0));
 it('file','attFile',()=>$('#docFile').click());
 it('poll','poll',newPoll);
 it('clock','schedule',schedFromComposer);anchorCtx(e.currentTarget)};
$('#file').onclick=()=>setTyping('photo');
$('#file').addEventListener('cancel',()=>setTyping(null));
$('#file').onchange=e=>{
 const f=e.target.files[0];e.target.value='';if(!f){setTyping(null);return}
 if(f.type==='image/gif'){if(f.size>3*1024*1024){setTyping(null);return toast(t('gifBig'))}const r=new FileReader();r.onload=()=>capPhoto(r.result,'gif');r.readAsDataURL(f);return}
 if(f.size>10*1024*1024){setTyping(null);return toast(t('big'))}
 const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const k=Math.min(1,900/Math.max(im.width,im.height)),c=el('canvas');c.width=im.width*k;c.height=im.height*k;c.getContext('2d').drawImage(im,0,0,c.width,c.height);capPhoto(c.toDataURL('image/jpeg',.82),'img')};im.src=r.result};r.readAsDataURL(f);
};
$('#gifFile').onchange=e=>{
 const f=e.target.files[0];e.target.value='';if(!f)return;if(f.size>3*1024*1024)return toast(t('gifBig'));
 const r=new FileReader();r.onload=()=>{addGif(r.result);buildPicker()};r.readAsDataURL(f);
};

/* ---------- ایموجی و استیکر ---------- */
let pickSub={sticker:null,gif:'zg'};
/* نگه‌داشتن = پیش‌نمایش بزرگ، کلیک کوتاه = ارسال */
function pressable(node,src,onTap){
 let tm=null,held=false,sx=0,sy=0;const pv=$('#pvw');
 const show=()=>{held=true;pv.querySelector('img').src=src;pv.hidden=false;requestAnimationFrame(()=>pv.classList.add('on'))};
 const hide=()=>{pv.classList.remove('on');setTimeout(()=>{if(!pv.classList.contains('on'))pv.hidden=true},180)};
 node.addEventListener('pointerdown',e=>{if(e.button>0)return;held=false;sx=e.clientX;sy=e.clientY;clearTimeout(tm);tm=setTimeout(show,320)});
 node.addEventListener('pointermove',e=>{if(!held&&Math.hypot(e.clientX-sx,e.clientY-sy)>10)clearTimeout(tm)});
 ['pointerup','pointercancel','pointerleave'].forEach(ev=>node.addEventListener(ev,()=>{clearTimeout(tm);if(held)hide()}));
 node.addEventListener('click',e=>{e.stopPropagation();if(held){held=false;return}onTap()});
 node.addEventListener('contextmenu',e=>e.preventDefault());
 node.draggable=false;
}
function buildPicker(){
 const tb=$('#ptabs'),sb=$('#psub'),g=$('#pgrid');tb.replaceChildren();sb.replaceChildren();
 [['emoji','secEmoji'],['sticker','secSticker'],['emote','secEmote'],['gif','secGif']].forEach(([id,k])=>{const b=el('button',pickTab===id?'on':'',t(k));b.onclick=e=>{e.stopPropagation();pickTab=id;buildPicker()};tb.append(b)});
 if(!pickSub.sticker)pickSub.sticker=PACKS[0].id;
 sb.hidden=pickTab==='emoji'||pickTab==='gif';
 if(pickTab==='sticker'){
  const add=(id,node,title)=>{const b=el('button',pickSub.sticker===id?'on':'');b.append(node);if(title)b.title=title;b.onclick=e=>{e.stopPropagation();pickSub.sticker=id;buildPicker()};sb.append(b)};
  add('recent',icon('clock',20),t('recent'));
  PACKS.forEach(p=>{const i=el('img');i.src='stickers/'+p.files[p.id==='cs'?0:2]+'.png';add(p.id,i,lang==='fa'?p.fa:p.en)});
 }else if(pickTab==='emote'){
  EMOGRP.forEach(([fa,en],i)=>{const b=el('button','txt',lang==='fa'?fa:en);b.onclick=e=>{e.stopPropagation();const n=g.querySelector('[data-grp="'+i+'"]');if(n)g.scrollTo({top:n.offsetTop-g.offsetTop-4,behavior:'smooth'})};sb.append(b)});
 }
 g.replaceChildren();g.scrollTop=0;g.className='pgrid '+({emoji:'eg',sticker:'sg',emote:'em',gif:'gg'}[pickTab]);
 if(pickTab==='emoji'){
  const sec=(title,list)=>{g.append(el('div','pname',title));list.forEach(c=>{const x=emoNode(c);x.onclick=e=>{e.stopPropagation();putEmoji(c)};g.append(x)})};
  const rc=me().remo||[];if(rc.length)sec(t('recent'),rc);EMOCAT.forEach(([k,l])=>sec(t(k),l));return}
 setTyping(pickTab==='gif'?'gif':'sticker');
 if(pickTab==='emote'){
  EMOGRP.forEach(([fa,en,fl],i)=>{const n=el('div','pname',lang==='fa'?fa:en);n.dataset.grp=i;g.append(n);
   fl.forEach(f=>{const im=el('img');im.src='emotes/'+f;im.alt=f;im.loading='lazy';pressable(im,im.src,()=>addPend('emotes/'+f));g.append(im)})});return}
 if(pickTab==='sticker'){
  const files=pickSub.sticker==='recent'?(me().recent||[]):PACKS.find(p=>p.id===pickSub.sticker).files;
  if(pickSub.sticker!=='recent'){const p=PACKS.find(x=>x.id===pickSub.sticker);g.append(el('div','pname',lang==='fa'?p.fa:p.en))}
  if(!files.length)g.append(el('div','pempty',t('noItems')));
  files.forEach(f=>{const im=el('img');im.src='stickers/'+f+'.png';im.loading='lazy';pressable(im,im.src,()=>{$('#picker').hidden=true;send({sticker:f})});g.append(im)});return}
 const add=el('div','gt add');add.append(icon('plus',28));add.onclick=e=>{e.stopPropagation();$('#gifFile').click()};g.append(el('div','pname',t('myGifs')),add);
 const gl=me().gifs||[];if(!gl.length)g.append(el('div','pempty',t('gifHelp')));
 gl.forEach(src=>{const c=el('div','gt'),im=el('img');im.src=src;im.loading='lazy';c.append(im);
  const x=el('button','x');x.append(icon('close',12));x.onpointerdown=ev=>ev.stopPropagation();x.onclick=ev=>{ev.stopPropagation();mutate(()=>{me().gifs=me().gifs.filter(v=>v!==src)});buildPicker()};c.append(x);
  pressable(c,src,()=>{$('#picker').hidden=true;sendGif(src)});g.append(c)});
}
$('#pickBtn').onclick=e=>{e.stopPropagation();const p=$('#picker');if(p.hidden){buildPicker();p.hidden=false}else{p.hidden=true;setTyping($('#text').value.trim()?'text':null)}};

/* ---------- پنجره‌ها ---------- */
const modal=$('#modal'),card=$('#card');
const closeModal=()=>{modal.hidden=true;card.replaceChildren()};
const openModal=(...n)=>{card.replaceChildren(...n);modal.hidden=false};
modal.onclick=e=>{if(e.target===modal)closeModal()};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!$('#crop').hidden)closeCrop();closeModal();hideCtx();$('#picker').hidden=true;closeDrawer();if(sopen)closeSearch()}});
const field=(l,n)=>{const f=el('div','fld');f.append(el('label','',l),n);return f};
const btns=(...b)=>{const r=el('div','btns');r.append(...b);return r};
const B=(txt,fn,c='btn')=>{const b=el('button',c,txt);b.onclick=fn;return b};
const ageOf=d=>{if(!d)return'';const b=new Date(d),n=new Date();let a=n.getFullYear()-b.getFullYear();if(n<new Date(n.getFullYear(),b.getMonth(),b.getDate()))a--;return a>0?a.toLocaleString(loc())+' '+t('yrs'):''};
const input=(v='',ph='',max=60)=>{const i=el('input');i.value=v;i.placeholder=ph;i.maxLength=max;return i};
const copyId=h=>{navigator.clipboard?.writeText('@'+h);toast(t('copied'))};

function spaceInfo(id){
 const s=D.spaces[id];if(!s)return;const inSp=s.members.includes(SID),top=el('div','top');
 let av,name,sub,bio,idl;
 if(s.type==='dm'){const u=D.users[other(s)];av=userAv(u,72);name=u.name;sub=seenTxt(u);bio=[u.bio,ageOf(u.birth),u.game&&'🎮 '+u.game].filter(Boolean).join(' · ');idl=u.id}
 else if(s.type==='saved'){av=avatar(s,72);name=t('saved');sub='';bio='';idl=null}
 else{av=avatar(s,72);name=s.name;sub=spSub(s);bio=s.bio;idl=s.priv?null:s.handle}
 const w=el('div');w.append(el('h3','',name),el('small','muted',sub));const xb=el('button','icon xbtn');xb.append(icon('close'));xb.onclick=closeModal;top.classList.add('prof-top');top.append(av,w,xb);const du=s.type==='dm'?D.users[other(s)]:null;
 const kids=[top];
 if(idl){const r=el('button','idrow');r.append(el('span','',t('idLine')),el('b','','@'+idl));r.onclick=()=>copyId(idl);kids.push(r)}
 if(du&&du.phone&&(du.id===SID||(du.contacts||[]).includes(SID))){const r=el('div','idrow');r.append(el('span','',t('phoneL')),el('b','',du.phone));kids.push(r)}
 if((s.type==='group'||s.type==='channel')&&s.priv)kids.push(el('div','privb',t('privBadge')));
 if((s.type==='group'||s.type==='channel')&&inSp)kids.push(linkRow(s));
 if(bio){const bp=el('p','bio');rich(bio,bp);kids.push(bp)}
 const acts=el('div','acts2');
 if(du&&!du.bot&&du.id!==SID)acts.append(B(t(blockedBy(SID,du.id)?'unblock':'block'),()=>toggleBlock(du.id),'btn danger'));
 if(du&&!du.bot&&du.id!==SID&&!isContact(du.id))acts.append(B(t('addContact'),()=>{mutate(()=>{(me().contacts=me().contacts||[]).push(du.id)});toast(t('addedC'));spaceInfo(id)},'btn ghost'));
 if(!inSp)acts.append(B(t('join'),()=>{mutate(()=>D.spaces[id].members.push(SID));closeModal();openSpace(id)}));
 else{
  {const nr=el('label','chk nrow'),sw=el('input','tg');sw.type='checkbox';sw.checked=!me().muted[id];sw.onchange=()=>toggleMute(id);nr.append(el('span','',t('notif')),sw);kids.push(nr)}
  if(s.type==='group'||s.type==='channel'){
   if(isAdmin(s)||s.type==='group'){kids.push(B(t('addMember'),()=>addMembersUI(id),'btn ghost'))}
   if(s.owner===SID)acts.append(B(t('editM'),()=>editSpace(id),'btn ghost'));
   const ml=el('div','mlist');
   s.members.forEach(uid2=>{const u=D.users[uid2];if(!u)return;const r=el('div','item mini'),mt=el('div','meta');
    mt.append(el('b','',u.name+(uid2===SID?' ('+t('you')+')':'')),el('div','last','@'+u.id+(isOn(u)?' · '+t('online'):'')));
    const role=s.owner===uid2?t('owner'):(s.admins||[]).includes(uid2)?t('admin'):'';
    r.append(userAv(u,36),mt);if(role)r.append(el('span','role',role));
    if(uid2!==SID&&uid2!==s.owner){
     if(s.owner===SID){const pb=el('button','mini-b',(s.admins||[]).includes(uid2)?t('demote'):t('promote'));pb.onclick=e=>{e.stopPropagation();mutate(()=>{const x=D.spaces[id];x.admins=x.admins||[];x.admins.includes(uid2)?x.admins=x.admins.filter(a=>a!==uid2):x.admins.push(uid2)});spaceInfo(id)};r.append(pb)}
     if(isAdmin(s)){const kb=el('button','mini-b danger',t('kick'));kb.onclick=e=>{e.stopPropagation();mutate(()=>{const x=D.spaces[id];x.members=x.members.filter(a=>a!==uid2);x.admins=(x.admins||[]).filter(a=>a!==uid2)});spaceInfo(id);paintHead()};r.append(kb)}}
    r.onclick=()=>{if(uid2!==SID){closeModal();openDM(uid2)}};ml.append(r)});
   kids.push(ml);
   if(s.owner!==SID)acts.append(B(t('leave'),()=>{if(!confirm(t('leaveQ')))return;mutate(()=>{const x=D.spaces[id];x.members=x.members.filter(a=>a!==SID);x.admins=(x.admins||[]).filter(a=>a!==SID)});closeModal();if(curId===id)$('#back').onclick();renderList()},'btn danger'));
   else acts.append(B(t('delSp'),()=>{if(!confirm(t('delQ')))return;mutate(()=>delete D.spaces[id]);closeModal();if(curId===id)$('#back').onclick();renderList()},'btn danger'));
  }else if(s.type==='dm')acts.append(B(t('delSp'),()=>{if(!confirm(t('delQ')))return;mutate(()=>delete D.spaces[id]);closeModal();if(curId===id)$('#back').onclick();renderList()},'btn danger'));
 }
 if(inSp)kids.push(sharedSection(s));
 kids.push(acts,B(t('close'),closeModal,'btn ghost'));openModal(...kids);
}
/* بخش پیام‌ها / لینک‌ها / گیف‌ها / ذخیره‌ها */
function sharedSection(s){
 const w=el('div','shared'),tb=el('div','stabs'),body=el('div','sbody');let cur='photos';
 const vs=vis(s),nm=u=>u===SID?t('you'):(D.users[u]?.name||u);
 const go=id=>{closeModal();if(curId!==s.id)openSpace(s.id);if(sq){sq='';$('#sbar').hidden=true;$('#msgSearch').value='';renderMsgs()}setTimeout(()=>jumpTo(id),50)};
 const row=(m,inner)=>{const r=el('div','srow');r.append(el('small','',nm(m.from)+' · '+dayLabel(m.ts)+' '+hm(m.ts)),...inner);r.onclick=()=>go(m.id);return r};
 const TABS=[['photos','image','sPhotos'],['files','file','sFiles'],['links','link','sLinks'],['gifs','gif','sGifs'],['saves','bookmark','sSaves']];
 const paint=()=>{
  body.replaceChildren();body.classList.toggle('g',cur==='gifs'||cur==='photos');
  [...tb.children].forEach(b=>b.classList.toggle('on',b.dataset.k===cur));
  let n=0;
  if(cur==='files')vs.filter(m=>m.file).slice().reverse().forEach(m=>{n++;const r=row(m,[el('div','st','📎 '+m.file.name+' · '+fmtSize(m.file.size))]),d=el('button','rm');d.append(icon('download',16));d.onclick=e=>{e.stopPropagation();dlFile(m.file)};r.append(d);body.append(r)});
  if(cur==='links')vs.slice().reverse().forEach(m=>{(m.text?.match(/https?:\/\/[^\s]+/g)||[]).forEach(u=>{n++;const a=el('a','',u);a.href=u;a.target='_blank';a.rel='noopener noreferrer';a.onclick=e=>e.stopPropagation();body.append(row(m,[a]))})});
  if(cur==='photos')vs.filter(m=>m.img).slice().reverse().forEach(m=>{n++;const c=el('div','gt'),i=el('img');i.src=m.img;i.loading='lazy';c.append(i);c.onclick=()=>go(m.id);body.append(c)});
  if(cur==='gifs')vs.filter(m=>m.gif).slice().reverse().forEach(m=>{n++;const c=el('div','gt'),i=el('img');i.src=m.gif;i.loading='lazy';c.append(i);c.onclick=()=>go(m.id);body.append(c)});
  if(cur==='saves')(me().saves||[]).filter(x=>x.sp===s.id).slice().reverse().forEach(x=>{
   const m=s.msgs.find(y=>y.id===x.id);n++;const r=el('div','srow');r.append(el('small','',nm(x.from)+' · '+dayLabel(x.ts)));
   if(m){if(m.text)r.append(el('div','st',m.text));const src=m.gif||m.img;if(src){const i=el('img');i.src=src;r.append(i)}if(m.sticker){const i=el('img');i.src='stickers/'+m.sticker+'.png';r.append(i)}if(m.poll)r.append(el('div','st','📊 '+m.poll.q));r.onclick=()=>go(m.id)}
   else r.append(el('div','st',x.text||t('gone')));
   const rm=el('button','rm');rm.append(icon('close',16));rm.onclick=e=>{e.stopPropagation();mutate(()=>{me().saves=me().saves.filter(y=>!(y.id===x.id&&y.sp===x.sp))});paint()};r.append(rm);body.append(r)});
  if(!n)body.append(el('div','sempty',t('noItems')));
 };
 TABS.forEach(([k,ic,lb])=>{const b=el('button');b.dataset.k=k;b.append(icon(ic,16),el('span','',t(lb)));b.onclick=()=>{cur=k;paint()};tb.append(b)});
 w.append(tb,body);paint();return w;
}
/* درباره و به‌روزرسانی */
const semCmp=(a,b)=>{const x=a.split('.').map(Number),y=b.split('.').map(Number);for(let i=0;i<3;i++){if((x[i]||0)!==(y[i]||0))return(x[i]||0)>(y[i]||0)?1:-1}return 0};
function aboutUpdate(){
 closeDrawer();const v=el('div','vbox'),res=el('div','vbox');
 v.append(el('h3','',t('about')),el('small','muted',t('curVer')),el('div','vbig','v'+VER));
 const check=async()=>{
  res.replaceChildren(el('small','muted',t('checking')));
  try{
   const r=await fetch('version.json?_='+Date.now(),{cache:'no-store'});if(!r.ok)throw 0;const j=await r.json();if(!/^\d+\.\d+\.\d+$/.test(j.version))throw 0;
   if(semCmp(j.version,VER)>0){
    res.replaceChildren(el('b','',t('newVer')+' '+j.version));
    if(Array.isArray(j.notes)&&j.notes.length){res.append(el('small','muted',t('whatsNew')));j.notes.forEach(n=>res.append(el('small','',' • '+n)))}
    const b=B(t('updateTo')+' '+j.version,async()=>{b.textContent=t('updNow');b.disabled=true;try{if(window.caches){for(const k of await caches.keys())await caches.delete(k)}const rg=await navigator.serviceWorker?.getRegistrations?.();for(const x of rg||[])await x.unregister()}catch{}location.replace(location.pathname+'?v='+j.version+'&_='+Date.now())});
    res.append(b);
   }else res.replaceChildren(el('b','',t('upToDate')));
  }catch{res.replaceChildren(el('small','red',t('upFail')))}
 };
 openModal(v,res,B(t('checkUp'),check,'btn ghost'),B(t('close'),closeModal,'btn ghost'));check();
}
function editSpace(id){
 const s=D.spaces[id],n=input(s.name,t('gName'),40),b=el('textarea');b.rows=3;b.maxLength=200;b.value=s.bio||'';const h=input(s.handle||'','',20);h.dir='ltr';const e=el('p','error');
 const pt=privToggle(!!s.priv),hw=field(t('gHandle'),h);pt.node.onchange=()=>{hw.hidden=pt.get()};hw.hidden=pt.get();
 let av=s.av;const ae=avEdit(()=>av,v=>av=v,src=>mkAv(src,s.name,s.id));openModal(el('h3','',t('editM')),ae,field(t('gName'),n),field(t('gBio'),b),pt.box,hw,e,btns(B(t('save'),()=>{
  const hv=h.value.trim().toLowerCase().replace(/^@/,'');if(!n.value.trim())return n.focus();fresh();
  if(!pt.get()){if(!HRE.test(hv))return e.textContent=t('idBad');if(hv!==s.handle&&taken(hv))return e.textContent=t('idTaken')}
  mutate(()=>{const x=D.spaces[id];x.name=n.value.trim();x.bio=b.value.trim();x.priv=pt.get();x.handle=pt.get()?null:hv;if(!x.link)x.link=newTok();if(av)x.av=av;else delete x.av});closeModal();paintHead();renderList();spaceInfo(id)}),B(t('cancel'),()=>spaceInfo(id),'btn ghost')));
}
function privToggle(init){
 let priv=init;const box=el('div','fld'),node=el('div','seg2'),a=el('button','','🌐 '+t('pub')),c=el('button','','🔒 '+t('priv')),hint=el('small','muted');a.type=c.type='button';
 const paint=()=>{a.classList.toggle('on',!priv);c.classList.toggle('on',priv);hint.textContent=priv?t('privHint'):t('pubHint')};
 a.onclick=()=>{priv=false;paint();node.onchange&&node.onchange()};c.onclick=()=>{priv=true;paint();node.onchange&&node.onchange()};paint();node.append(a,c);box.append(node,hint);
 return{box,node,get:()=>priv};
}
function newSpace(type){
 closeDrawer();const n=input('',t('gName'),40),h=input('',t('gHandle'),20);h.dir='ltr';const b=el('textarea');b.rows=2;b.maxLength=200;b.placeholder=t('gBio');const sel=new Set(),mp=memberPicker(sel),e=el('p','error');
 const pt=privToggle(false),hw=el('div');hw.append(h);pt.node.onchange=()=>{hw.hidden=pt.get()};
 openModal(el('h3','',t(type==='group'?'newGroup':'newChannel')),n,pt.box,hw,b,field(t('addMembers'),mp),e,btns(B(t('create'),()=>{
  const hv=h.value.trim().toLowerCase().replace(/^@/,'');if(!n.value.trim())return n.focus();fresh();
  if(!pt.get()){if(!HRE.test(hv))return e.textContent=t('idBad');if(taken(hv))return e.textContent=t('idTaken')}
  const ids=[...sel].filter(x=>D.users[x]&&x!==SID);
  const id=uid();mutate(()=>{D.spaces[id]={id,type,handle:pt.get()?null:hv,priv:pt.get(),link:newTok(),name:n.value.trim(),bio:b.value.trim(),owner:SID,admins:[],members:[SID,...ids],msgs:[],pinned:null,created:Date.now()}});
  closeModal();tab='all';$$('#tabs button').forEach(x=>x.classList.toggle('on',x.dataset.tab==='all'));openSpace(id)}),B(t('cancel'),closeModal,'btn ghost')));n.focus();
}
$('#newBtn').onclick=e=>{e.stopPropagation();ctx.replaceChildren();
 [['users','newGroup','group'],['mega','newChannel','channel']].forEach(([i,k,ty])=>{const b=el('button','ci');b.append(icon(i,18),el('span','',t(k)));b.onclick=()=>{hideCtx();newSpace(ty)};ctx.append(b)});
 [['userplus','addContact',addContactUI],['image','addStory',newStory]].forEach(([i,k,fn])=>{const b=el('button','ci');b.append(icon(i,18),el('span','',t(k)));b.onclick=()=>{hideCtx();fn()};ctx.append(b)});
 anchorCtx(e.currentTarget,true)};
function newPoll(){
 const qn=input('',t('pollQ'),120),box=el('div','popts'),opts=[],e=el('p','error');
 const add=()=>{if(opts.length>=6)return;const i=input('',t('opt')+' '+(opts.length+1),60);opts.push(i);box.append(i)};add();add();
 openModal(el('h3','',t('poll')),qn,box,B(t('addOpt'),add,'btn ghost'),e,btns(B(t('create'),()=>{
  const o=opts.map(i=>i.value.trim()).filter(Boolean);if(!qn.value.trim()||o.length<2)return e.textContent=t('nameReq');
  closeModal();send({poll:{q:qn.value.trim(),opts:o.map(x=>({t:x,v:[]}))}})}),B(t('cancel'),closeModal,'btn ghost')));qn.focus();
}
function openForward(id){
 const m=S().msgs.find(x=>x.id===id),list=el('div','flist'),from=m.fwd||spName(S());
 mySpaces().filter(canPost).forEach(s=>{const it=el('div','item'),mt=el('div','meta');mt.append(el('b','',spName(s)),el('div','last',spSub(s)));it.append(avatar(s,40),mt);
  it.onclick=()=>{const {text,img,gif,sticker,poll,voice,dur,emote,emotes,file}=m;mutate(()=>{D.spaces[s.id].msgs.push({id:uid(),ts:Date.now(),from:SID,...(text&&{text}),...(img&&{img}),...(gif&&{gif}),...(voice&&{voice,dur}),...(emote&&{emote}),...(emotes&&{emotes}),...(file&&{file}),...(sticker&&{sticker}),...(poll&&{poll:{q:poll.q,opts:poll.opts.map(o=>({t:o.t,v:[]}))}}),fwd:from})});toast(t('sent'));closeModal();if(curId)renderMsgs(true);renderList()};list.append(it)});
 openModal(el('h3','',t('fwdTo')),list,B(t('cancel'),closeModal,'btn ghost'));
}
function myProfile(){
 closeDrawer();const u=me(),fn=input(u.first||u.name,t('first'),20),ln=input(u.last||'',t('last'),20),em=input(u.email||'',t('email'),60);em.dir='ltr';const bio=el('textarea');bio.rows=3;bio.maxLength=200;bio.value=u.bio||'';bio.placeholder=t('bio');
 const bd=el('input');bd.type='date';bd.dir='ltr';bd.value=u.birth||'';const g=el('select');g.append(new Option(t('noGame'),''));GAMES.forEach(x=>g.append(new Option(x,x)));g.value=u.game||'';
 const idI=input(u.id,t('uid'),20);idI.dir='ltr';idI.autocapitalize='off';idI.spellcheck=false;const err=el('p','error');
 const top=el('div','top'),w=el('div');w.append(el('h3','',t('profile')));top.append(w);
 let av=u.av;const ae=avEdit(()=>av,v=>av=v,src=>mkAv(src,u.name,u.id));
 openModal(top,ae,field(t('idLine'),idI),field(t('first'),fn),field(t('last'),ln),field(t('email'),em),field(t('bio'),bio),field(t('birth'),bd),field(t('game'),g),err,
  btns(B(t('save'),()=>{
   const nid=fa2en(idI.value.trim()).toLowerCase().replace(/^@/,'');fresh();
   if(nid!==u.id){if(!HRE.test(nid))return err.textContent=t('idBad');if(taken(nid))return err.textContent=t('idTaken')}
   mutate(()=>{const me_=D.users[SID];if(av)me_.av=av;else delete me_.av;delete me_.steam;Object.assign(me_,{first:fn.value.trim(),last:ln.value.trim(),email:em.value.trim().toLowerCase(),name:((fn.value+' '+ln.value).trim())||u.name,bio:bio.value.trim(),birth:bd.value,game:g.value})});
   if(nid!==u.id){renameUser(u.id,nid);toast(t('idChanged'))}
   closeModal();paintMe();renderList();renderStories();if(curId)paintHead()}),B(t('close'),closeModal,'btn ghost')),
  B(t('delAcct'),delAccountUI,'btn danger'));
}

/* ---------- منوی کناری، تم، پشتیبان ---------- */
const drawer=$('#drawer'),scrim=$('#scrim');
const closeDrawer=()=>{drawer.classList.remove('open');scrim.hidden=true};
scrim.onclick=closeDrawer;
function paintMe(){if(!$('#sett').hidden)paintSettings()}
$('#menuBtn').onclick=()=>{
 const u=me();drawer.replaceChildren();const h=el('div','dh');h.append(userAv(u,56),el('b','',u.name),el('small','',  '@'+u.id));drawer.append(h);drawer.append(acctBlock());
 const it=(n,k,fn,tx)=>{const b=el('button','ci');b.append(icon(n,20),el('span','',tx||t(k)));b.onclick=fn;drawer.append(b)};
 it('user','profile',myProfile);it('users','newGroup',()=>newSpace('group'));it('mega','newChannel',()=>newSpace('channel'));
 it('bookmark','saved',()=>{closeDrawer();openSpace('saved:'+SID)});
 it(D.theme==='dark'?'sun':'moon','theme',()=>{mutate(()=>D.theme=D.theme==='dark'?'light':'dark');applyLang();$('#menuBtn').onclick()});
 it('sliders','personalize',openPersonalize);
 it('gear','settings',()=>openSettings());
 it('logout','logout',logout);
 drawer.append(el('small','muted ver pad','ZONER v'+VER));drawer.classList.add('open');scrim.hidden=false;
};
function backup(){fresh();const a=el('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(D)],{type:'application/json'}));a.download='zoner-backup-'+new Date().toISOString().slice(0,10)+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),2000);closeDrawer()}
$('#restoreFile').onchange=e=>{
 const f=e.target.files[0];e.target.value='';if(!f)return;const r=new FileReader();
 r.onload=()=>{try{const x=JSON.parse(r.result);if(!x.users||!x.spaces)throw 0;if(!confirm(t('restoreQ')))return;D=x;migrate();ensureBots();D.lang=D.lang||lang;save();if(!D.users[SID])logout();else{ensureSaved();enter()}closeDrawer();applyLang()}catch{toast(t('badFile'))}};r.readAsText(f);
};

/* ---------- همگام‌سازی زنده بین تب‌ها، اعلان، آنلاین ---------- */
let ac;function ping(){try{ac=ac||new AudioContext();const o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);o.frequency.value=880;g.gain.setValueAtTime(.06,ac.currentTime);g.gain.exponentialRampToValueAtTime(.001,ac.currentTime+.25);o.start();o.stop(ac.currentTime+.25)}catch{}}
const snap=()=>{const o={};if(me())mySpaces().forEach(s=>o[s.id]=s.msgs.length);return o};
addEventListener('storage',e=>{
 if(e.key===SIGK){if(e.newValue)onSig(e.newValue);return}
 if(e.key===TK){tickTyping();return}
 if(e.key===SEEN){_sm=0;if(SID&&me()){renderList();if(curId&&S())paintSub()}return}
 if(e.key!==K||!SID)return;const prev=snap();fresh();if(!me()){logout();return}
 mySpaces().forEach(s=>{const l=s.msgs[s.msgs.length-1];if(l&&l.from!==SID&&s.msgs.length>(prev[s.id]??0)&&!me().muted[s.id]&&(s.id!==curId||document.hidden)){if(UI.nSound!==0)ping();if(s.id!==curId&&UI.nToast!==0)toast(spName(s)+(UI.nPrev!==0?': '+preview(l).slice(0,40):''))}});
 if(curId&&!D.spaces[curId]?.members.includes(SID)){$('#back').onclick();return}
 renderList();renderStories();if(curId){paintHead();renderMsgs();markRead()}
});
setInterval(()=>{if(!SID||!me())return;touchSeen();if(curId&&S())paintSub();renderList();renderStories()},25000);
setInterval(tickTyping,1500);
addEventListener('beforeunload',()=>{saveDraft();touchSeen()});

/* ---------- v1.0.1: عکس پروفایل، مخاطب، بات، استوری ---------- */
function shrink(f,max,q,cb,sq){const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const w=sq?Math.min(im.width,im.height):im.width,h=sq?w:im.height,k=Math.min(1,max/Math.max(w,h)),c=el('canvas');c.width=w*k;c.height=h*k;c.getContext('2d').drawImage(im,(im.width-w)/2,(im.height-h)/2,w,h,0,0,c.width,c.height);cb(c.toDataURL('image/jpeg',q))};im.src=r.result};r.readAsDataURL(f)}
function mkAv(src,name,key){const a=el('span','avatar');a.style.setProperty('--sz','72px');if(src){const i=el('img');i.src=src;a.append(i)}else{a.textContent=Array.from(name||'?')[0].toUpperCase();a.style.background=`linear-gradient(135deg,hsl(${hue(key)} 70% 60%),hsl(${(hue(key)+40)%360} 65% 45%))`}return a}
function avEdit(get,set,mk){const row=el('div','avrow'),f=el('input'),prev=el('div');f.type='file';f.accept='image/*';f.hidden=true;
 const paint=()=>prev.replaceChildren(mk(get()));paint();
 f.onchange=()=>{const x=f.files[0];f.value='';if(x)openCrop(x,d=>{set(d);paint()})};
 row.append(prev,f,B(t('changePhoto'),()=>f.click(),'btn ghost'),B(t('removePhoto'),()=>{set(null);paint()},'btn ghost'));return row}
function addContactUI(){
 const i=input('',t('findBy'),40),res=el('div'),e=el('p','error');i.dir='ltr';
 const go=()=>{res.replaceChildren();e.textContent='';fresh();const k=fa2en(i.value.trim()).toLowerCase().replace(/^@/,''),ph=canon(k);
  const u=D.users[k]||Object.values(D.users).find(x=>!x.bot&&x.phone&&x.phone===ph);
  if(!k||!u||u.id===SID)return e.textContent=t('notFound');
  const it=el('div','item'),mt=el('div','meta');mt.append(el('b','',u.name),el('div','last','@'+u.id));it.append(userAv(u,44),mt);
  it.append(B(isContact(u.id)||u.bot?t('openChat'):t('add'),()=>{if(!isContact(u.id)&&!u.bot)mutate(()=>{(me().contacts=me().contacts||[]).push(u.id)});if(!u.bot)toast(t('addedC'));closeModal();openDM(u.id)}));res.append(it)};
 i.onkeydown=ev=>{if(ev.key==='Enter')go()};
 openModal(el('h3','',t('addContact')),i,res,e,btns(B(t('find'),go),B(t('close'),closeModal,'btn ghost')));i.focus();
}
function botSay(sp,bot,text){mutate(()=>{D.spaces[sp]?.msgs.push({id:uid(),ts:Date.now(),from:bot,text})})}
function botHandle(sp,text){
 const s=D.spaces[sp],bot=s&&other(s);if(!bot||!D.users[bot]?.bot)return;
 const fa=lang==='fa',say=x=>setTimeout(()=>{botSay(sp,bot,x);if(curId===sp)renderMsgs(true);renderList()},350);
 const tx=text.trim(),a=tx.split(/\s+/),cmd=a[0].toLowerCase().replace(/@.*$/,''),rest=tx.slice(a[0].length).trim();
 const pick=l=>l[Math.floor(Math.random()*l.length)],shuf=l=>{l=l.slice();for(let i=l.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[l[i],l[j]]=[l[j],l[i]]}return l};
 const help=fa?'دستورها:\n🎲 /roll [n] ← تاس\n🪙 /coin ← شیر یا خط\n🗺️ /map ← مپ شانسی\n🦸 /agent ← ایجنت شانسی (Valorant)\n🔫 /loadout ← لودات شانسی (CS2)\n👥 /team a b c d ← تیم‌بندی شانسی\n🎯 /pick a, b, c ← انتخاب شانسی\n💡 /tip ← نکتهٔ گیمری\n🔥 /gg ← انرژی بگیر':'Commands:\n🎲 /roll [n]\n🪙 /coin\n🗺️ /map\n🦸 /agent (Valorant)\n🔫 /loadout (CS2)\n👥 /team a b c d\n🎯 /pick a, b, c\n💡 /tip\n🔥 /gg';
 if(cmd==='/start')return say((fa?'سلام! من بات زونرم 🎮\n\n':'Hi! I am the ZONER bot 🎮\n\n')+help);
 if(cmd==='/help')return say(help);
 if(cmd==='/roll'){const n=Math.max(2,Math.min(1000,+fa2en(a[1]||'')||6));return say('🎲 '+(1+Math.floor(Math.random()*n))+' / '+n)}
 if(cmd==='/coin')return say('🪙 '+(Math.random()<.5?(fa?'شیر':'Heads'):(fa?'خط':'Tails')));
 if(cmd==='/map')return say('🗺️ '+pick(['Mirage','Inferno','Nuke','Ancient','Anubis','Dust II','Vertigo','Overpass']));
 if(cmd==='/agent')return say('🦸 '+pick(['Jett','Reyna','Sage','Phoenix','Sova','Omen','Brimstone','Viper','Cypher','Killjoy','Raze','Breach','Skye','Yoru','Astra','KAY/O','Chamber','Neon','Fade','Harbor','Gekko','Deadlock','Iso','Clove','Vyse']));
 if(cmd==='/loadout'){const side=pick(['T','CT']),prim=pick(side==='T'?['AK-47','Galil AR','SG 553','MAC-10','AWP']:['M4A4','M4A1-S','FAMAS','AUG','MP9','AWP']),sec=pick(['Glock-18','USP-S','P250','Five-SeveN','CZ75-Auto','Desert Eagle']),nd=shuf(['🔥 Molotov','💨 Smoke','⚡ Flash','💥 HE']).slice(0,3);
  return say('🔫 '+side+'\n'+(fa?'اصلی: ':'Primary: ')+prim+'\n'+(fa?'فرعی: ':'Sidearm: ')+sec+'\n'+(fa?'نارنجک: ':'Utility: ')+nd.join(' · '))}
 if(cmd==='/team'){const n=rest.split(/[\s,،]+/).filter(Boolean);if(n.length<2)return say(fa?'مثال: /team علی رضا سینا امیر':'Example: /team ali reza sina amir');
  const m=shuf(n),h=Math.ceil(m.length/2);return say('🟣 '+(fa?'تیم A: ':'Team A: ')+m.slice(0,h).join('، ')+'\n🟢 '+(fa?'تیم B: ':'Team B: ')+m.slice(h).join('، '))}
 if(cmd==='/pick'){const o=rest.split(/[,،|\n]+/).map(x=>x.trim()).filter(Boolean),l=o.length>1?o:rest.split(/\s+/).filter(Boolean);if(l.length<2)return say(fa?'مثال: /pick پیتزا, برگر, ساندویچ':'Example: /pick pizza, burger, sandwich');return say('🎯 '+pick(l))}
 if(cmd==='/tip')return say('💡 '+pick(fa?['کراس‌هیر را هم‌سطح سر نگه دار؛ پیش‌اکیم کن.','قبل از هر راند دو ثانیه مینی‌مپ را چک کن.','کالاوت کوتاه و دقیق بده: جای دشمن + تعداد.','وقتی تیلت شدی ۵ دقیقه استراحت کن؛ رنک مهم‌تر از لج‌بازی است.','۵ دقیقه گرم‌کردن اکیم قبل از رنک اثر واقعی دارد.','آب بخور و هر ساعت چشم‌هایت را از مانیتور بگیر.','خرید اکو را با تیم هماهنگ کن، تک‌رو نباش.','ریپلی بازی‌های باخته بهترین مربی است.']:['Keep your crosshair at head level and pre-aim.','Glance at the minimap for two seconds every round.','Keep callouts short: enemy position + count.','Tilted? Take a 5-minute break; rank matters more than pride.','A 5-minute aim warm-up before ranked really helps.','Drink water and rest your eyes every hour.','Sync eco buys with the team; don’t go solo.','Replays of lost games are the best coach.']));
 if(cmd==='/gg')return say(pick(fa?['GG! 🔥 رفتیم بالا!','هر باخت یه درس تازه‌ست 💪 راند بعد مال ماست.','کلاچ بعدی با توئه 😎','تیم خوب یعنی ارتباط خوب 🎧 ادامه بده!']:['GG! 🔥 Let’s climb!','Every loss is a lesson 💪 next round is ours.','The next clutch is yours 😎','Good comms win games 🎧 keep going!']));
 say(help);
}
const liveStories=()=>(D.stories||[]).filter(s=>(s.exp||s.ts+864e5)>Date.now());
function pruneStories(){(D.stories||[]).forEach(s=>{if(s.vid&&(s.exp||s.ts+864e5)<=Date.now())IDB.del(s.vid).catch(()=>{})})}
function renderStories(){
 const box=$('#stories');if(!box||!SID||!me())return;
 const ok=new Set([SID]);mySpaces().forEach(s=>s.members.forEach(m=>ok.add(m)));
 const by={};liveStories().filter(s=>ok.has(s.by)&&D.users[s.by]).forEach(s=>(by[s.by]=by[s.by]||[]).push(s));
 const allSeen=u=>by[u].every(s=>(s.seen||[]).includes(SID));
 const sig=lang+(me().av?me().av.length:0)+Object.keys(by).map(u=>u+by[u].length+allSeen(u)+(D.users[u].av?D.users[u].av.length:0)).join();
 if(box.dataset.sig===sig)return;box.dataset.sig=sig;box.replaceChildren();
 const btn=(u,label,fn)=>{const b=el('button','st'+(by[u]&&u!==SID&&allSeen(u)?' seen':'')),a=userAv(D.users[u],52);if(by[u])a.classList.add('ring');b.append(a,el('small','',label));b.onclick=fn;box.append(b);return b};
 const mine=btn(SID,by[SID]?t('yourStory'):t('addStory'),()=>by[SID]?viewStories(SID):newStory());
 const pl=el('span','plus','+');pl.onclick=e=>{e.stopPropagation();newStory()};mine.append(pl);
 Object.keys(by).filter(u=>u!==SID).sort((x,y)=>(allSeen(x)?1:0)-(allSeen(y)?1:0)).forEach(u=>btn(u,D.users[u].name,()=>viewStories(u)));requestAnimationFrame(updNav)
}
function newStory(){
 closeDrawer();const ta=el('textarea'),prev=el('div','spv'),f=el('input'),sw=el('div','sw'),ds=el('div','seg2 dur');let img=null,vid=null,vurl=null,bg=0,dur=24;ta.rows=2;ta.maxLength=140;ta.placeholder=t('storyText');f.type='file';f.accept='image/*,video/*';
 const BG=['linear-gradient(135deg,#7c3aed,#d946ef)','linear-gradient(135deg,#0ea5e9,#7c3aed)','linear-gradient(135deg,#f97316,#e11d48)','linear-gradient(135deg,#10b981,#0ea5e9)'];
 const paint=()=>{prev.replaceChildren();prev.style.background=img?`center/cover url(${img})`:vid?'#000':BG[bg];
  if(vid){const v=el('video');v.src=vurl;v.muted=true;v.loop=true;v.autoplay=true;v.playsInline=true;v.className='spvid';prev.append(v);if(ta.value){const pp=el('p','spt');rich(ta.value,pp);prev.append(pp)}}
  else if(img){if(ta.value){const pp=el('p','spt');rich(ta.value,pp);prev.append(pp)}}else rich(ta.value,prev)};
 BG.forEach((g,i)=>{const b=el('button');b.style.background=g;b.onclick=()=>{bg=i;img=null;vid=null;paint()};sw.append(b)});
 [24,12,6,2].forEach(h=>{const b=el('button',h===dur?'on':'',h.toLocaleString(loc())+' '+t('hrs'));b.type='button';b.onclick=()=>{dur=h;[...ds.children].forEach(x=>x.classList.toggle('on',x===b))};ds.append(b)});
 ta.oninput=paint;
 f.onchange=async()=>{const x=f.files[0];if(!x)return;
  if(x.type.startsWith('video/')){if(x.size>30*1048576)return toast(t('vidBad'));
   const d=await new Promise(res=>{const v=document.createElement('video');v.preload='metadata';v.onloadedmetadata=()=>{res(v.duration);URL.revokeObjectURL(v.src)};v.onerror=()=>res(0);v.src=URL.createObjectURL(x)});
   if(!d||d>60)return toast(t('vidBad'));vid=x;if(vurl)URL.revokeObjectURL(vurl);vurl=URL.createObjectURL(x);img=null;paint()}
  else shrink(x,720,.75,d=>{img=d;vid=null;paint()})};
 paint();
 openModal(el('h3','',t('addStory')),prev,ta,sw,f,el('small','muted',t('storyDur')),ds,btns(B(t('post'),async()=>{const tx=ta.value.trim();if(!img&&!vid&&!tx)return ta.focus();
  const base={id:uid(),by:SID,ts:Date.now(),seen:[]};base.exp=base.ts+dur*36e5;let st;
  if(vid){const key='sv_'+base.id;try{await IDB.put(key,vid)}catch{return toast(t('vidBad'))}st={...base,vid:key,vtype:vid.type,text:tx}}
  else st=img?{...base,img,text:tx}:{...base,text:tx,bg:BG[bg]};
  if(mutate(()=>{D.stories.push(st)})){closeModal();renderStories()}}),B(t('cancel'),closeModal,'btn ghost')));
}
function viewStories(u){
 const list=liveStories().filter(s=>s.by===u),ov=$('#story');if(!list.length||!D.users[u])return;
 let i=u===SID?0:Math.max(0,list.findIndex(s=>!(s.seen||[]).includes(SID))),tok=0,raf=0,vEl=null,url=null,paused=false;const rtl=lang==='fa';
 ov.hidden=false;ov.dir=rtl?'rtl':'ltr';ov.classList.remove('hold');
 const stop=()=>{cancelAnimationFrame(raf);if(vEl){try{vEl.pause();vEl.removeAttribute('src');vEl.load()}catch{}vEl=null}if(url){URL.revokeObjectURL(url);url=null}};
 const close=()=>{tok++;stop();ov.hidden=true;ov.classList.remove('hold');ov.replaceChildren();renderStories()};
 const go=n=>{if(n>=list.length)return close();i=Math.max(0,n);show()};
 const setPause=p=>{if(paused===p)return;paused=p;ov.classList.toggle('hold',p);if(vEl){if(p)vEl.pause();else vEl.play().catch(()=>{})}};
 async function show(){
  const my=++tok;stop();paused=false;ov.classList.remove('hold');const s=list[i];if(!s)return close();
  if(u!==SID&&!(s.seen||[]).includes(SID))mutate(()=>{const x=D.stories.find(y=>y.id===s.id);if(x)(x.seen=x.seen||[]).push(SID)});
  const bars=el('div','sbars'),fills=list.map((_,k)=>{const b=el('i',k<i?'d':''),f=el('b');b.append(f);bars.append(b);return f});
  const hd=el('div','shead'),x=el('button','icon');x.append(icon('close'));x.onclick=close;hd.append(userAv(D.users[u],38),el('b','',D.users[u].name),el('small','',hm(s.ts)),x);
  const body=el('div','sbody2');ov.replaceChildren(bars,hd,body);
  if(s.vid){let blob=null;try{blob=await IDB.get(s.vid)}catch{}if(my!==tok)return;if(!blob){toast(t('fileGone'));return go(i+1)}
   url=URL.createObjectURL(blob);vEl=el('video');vEl.playsInline=true;vEl.src=url;body.append(vEl);vEl.onended=()=>{if(my===tok)go(i+1)};vEl.play().catch(()=>{vEl.muted=true;vEl.play().catch(()=>{})})}
  else if(s.img){const im=el('img');im.src=s.img;body.append(im)}else body.style.background=s.bg;
  if(s.text){const pp=el('p','');rich(s.text,pp);body.append(pp)}if(u===SID)body.append(el('small','sv2',(s.seen||[]).length.toLocaleString(loc())+' '+t('views')));
  const zone=el('div','szone');let ht=0,held=false;
  zone.onpointerdown=()=>{held=false;clearTimeout(ht);ht=setTimeout(()=>{held=true;setPause(true)},220)};
  zone.onpointerup=e=>{clearTimeout(ht);if(held){held=false;setPause(false);return}const r=zone.getBoundingClientRect(),left=(e.clientX-r.left)<r.width/2;(rtl?left:!left)?go(i+1):go(i-1)};
  zone.onpointerleave=zone.onpointercancel=()=>{clearTimeout(ht);if(held){held=false;setPause(false)}};
  zone.oncontextmenu=e=>e.preventDefault();ov.append(zone);
  let last=0,acc=0;
  const tick=ts=>{if(my!==tok)return;if(!last)last=ts;const dt=ts-last;last=ts;let p;
   if(s.vid){p=vEl&&vEl.duration?vEl.currentTime/vEl.duration:0}else{if(!paused)acc+=dt;p=acc/5000}
   fills[i].style.transform='scaleX('+Math.min(1,p)+')';
   if(!s.vid&&p>=1)return go(i+1);raf=requestAnimationFrame(tick)};
  raf=requestAnimationFrame(tick);
 }
 show();
}

function toggleBlock(h){const was=blockedBy(SID,h),sp='dm:'+[SID,h].sort().join(':');
 mutate(()=>{const u=me();u.blocked=(u.blocked||[]).filter(x=>x!==h);if(!was)u.blocked.push(h)});
 toast(t(was?'unblockedOk':'blockedOk'));if(curId)paintHead();renderList();if(!$('#modal').hidden&&D.spaces[sp])spaceInfo(sp)}
function delChat(id){const s=D.spaces[id];if(!s)return;
 if(s.type==='group'||s.type==='channel'){
  if(s.owner===SID){if(!confirm(t('delQ')))return;mutate(()=>delete D.spaces[id])}
  else{if(!confirm(t('leaveQ')))return;mutate(()=>{const x=D.spaces[id];x.members=x.members.filter(a=>a!==SID);x.admins=(x.admins||[]).filter(a=>a!==SID)})}
 }else{if(!confirm(t('delChatQ')))return;mutate(()=>{const u=me();u.hid=u.hid||[];D.spaces[id].msgs.forEach(m=>u.hid.push(m.id));(u.hsp=u.hsp||{})[id]=Date.now();u.pins=(u.pins||[]).filter(x=>x!==id)})}
 if(curId===id)$('#back').onclick();renderList()}
function chatMenu(e,id){
 const s=D.spaces[id],u=me(),du=s.type==='dm'?D.users[other(s)]:null,pn=pinned(s);ctx.replaceChildren();
 const it=(n,k,fn,cls)=>{const b=el('button','ci'+(cls?' '+cls:''));b.append(icon(n,18),el('span','',t(k)));b.onclick=()=>{hideCtx();fn()};ctx.append(b)};
 it('pin',pn?'unpinChat':'pinChat',()=>{mutate(()=>{const x=me();x.pins=(x.pins||[]).filter(a=>a!==id);if(!pn)x.pins.push(id)});renderList()});
 it(u.muted[id]?'bell':'bellOff',u.muted[id]?'unmute':'mute',()=>toggleMute(id));
 if(unread(s))it('check2','markRead',()=>{mutate(()=>{me().read[id]=Date.now()});renderList()});
 if(du&&!du.bot&&du.id!==SID)it('close',blockedBy(SID,du.id)?'unblock':'block',()=>toggleBlock(du.id),'danger');
 if(s.type!=='saved')it('trash',s.type==='dm'?'delChat':s.owner===SID?'delSp':'leave',()=>delChat(id),'danger');
 posCtx(e)}


/* ---------- v1.0.3: جستجوی انیمیشنی، ناوبری استوری/تب، حساب‌ها، برش عکس ---------- */
function addRecent(){const v=q.trim().replace(/^@/,'');if(v.length<2)return;mutate(()=>{const u=me();u.rs=[v,...(u.rs||[]).filter(x=>x!==v)].slice(0,8)})}
function renderRecents(l){
 const rec=me().rs||[],h=el('div','rhead');h.append(el('b','',t('rs')));
 if(rec.length){const cl=el('button','link',t('clearAll'));cl.onclick=()=>{mutate(()=>{me().rs=[]});renderList()};h.append(cl)}
 l.append(h);if(!rec.length)l.append(el('p','muted pad',t('noRecent')));
 rec.forEach(x=>{const r=el('div','item rs'),mt=el('div','meta'),b=el('b','',x);mt.append(b);
  const rm=el('button','icon sm');rm.append(icon('close',16));rm.onclick=e=>{e.stopPropagation();mutate(()=>{me().rs=(me().rs||[]).filter(y=>y!==x)});renderList()};
  r.append(icon('clock',18),mt,rm);r.onclick=()=>{q=x;$('#search').value=x;renderList()};l.append(r)});
}
function openSearch(){sopen=true;$('#side').classList.add('searching');setTimeout(()=>$('#search').focus(),240);renderList()}
function closeSearch(){sopen=false;q='';$('#search').value='';$('#search').blur();$('#side').classList.remove('searching');renderList()}
$('#sOpen').onclick=openSearch;$('#sShut').onclick=closeSearch;$('#logoBtn').onclick=aboutUpdate;
$('#search').onkeydown=e=>{if(e.key==='Enter'){addRecent();renderList()}if(e.key==='Escape')closeSearch()};

function edge(n){const mx=n.scrollWidth-n.clientWidth,x=n.scrollLeft,rtl=getComputedStyle(n).direction==='rtl';return{l:rtl?mx+x:x,r:rtl?-x:mx-x,mx,rtl}}
function updNav(){const st=$('#stories'),e=edge(st);$('#stL').classList.toggle('on',e.l>2);$('#stR').classList.toggle('on',e.r>2)}
$('#stL').onclick=()=>$('#stories').scrollBy({left:-190,behavior:'smooth'});
$('#stR').onclick=()=>$('#stories').scrollBy({left:190,behavior:'smooth'});
$('#stories').addEventListener('scroll',updNav,{passive:true});
try{new ResizeObserver(()=>updNav()).observe($('#side'))}catch{addEventListener('resize',updNav)}

/* چند حساب روی یک دستگاه (حداکثر ۲) */
const rawAccts=()=>{try{return JSON.parse(localStorage.getItem(AK))||[]}catch{return[]}};
const accts=()=>rawAccts().filter(h=>D.users[h]&&!D.users[h].bot);
const setAccts=a=>{try{localStorage.setItem(AK,JSON.stringify([...new Set(a)].slice(-2)))}catch{}};
function switchTo(h){if(!D.users[h]||h===SID)return;if(CALL)hangup();saveDraft();SID=h;try{sessionStorage.setItem('zs',h);localStorage.setItem('zoner_last',h)}catch{}closeDrawer();ensureSaved();enter();toast(D.users[h].name)}
function addAcct(){closeDrawer();adding=true;$('#app').hidden=true;$('#auth').hidden=false;$('#aCancel').hidden=false;authReset()}
$('#aCancel').onclick=()=>{adding=false;$('#aCancel').hidden=true;authReset();$('#auth').hidden=true;$('#app').hidden=false};
function acctBlock(){
 const w=el('div','accs'),ac=accts();if(!ac.includes(SID)){ac.unshift(SID);setAccts(ac)}w.append(el('small','',t('myAccts')));
 ac.forEach(h=>{const u=D.users[h],b=el('button','acc'+(h===SID?' cur':''));b.append(userAv(u,34),el('span','',u.name));if(h===SID)b.append(icon('check',16));b.onclick=()=>switchTo(h);w.append(b)});
 if(ac.length<2){const b=el('button','acc add'),ring=el('span','ac-plus');ring.append(icon('plus',18));b.append(ring,el('span','',t('addAcct')));b.onclick=addAcct;w.append(b)}else w.append(el('small','',t('acctMax')));
 return w;
}

/* تغییر آیدی: همه‌ی ارجاع‌ها به‌روز می‌شوند */
function renameUser(old,neu){
 mutate(()=>{
  const u=D.users[old];if(!u||D.users[neu])return;
  const sm=id=>{if(id==='saved:'+old)return'saved:'+neu;if(id.startsWith('dm:'))return'dm:'+id.slice(3).split(':').map(x=>x===old?neu:x).sort().join(':');return id},rn=x=>x===old?neu:x;
  delete D.users[old];u.id=neu;D.users[neu]=u;const ns={};
  for(const[k,sp]of Object.entries(D.spaces)){const nk=sm(k);sp.id=nk;sp.members=sp.members.map(rn);if(sp.owner)sp.owner=rn(sp.owner);if(sp.admins)sp.admins=sp.admins.map(rn);
   sp.msgs.forEach(m=>{m.from=rn(m.from);if(m.r)for(const e in m.r)m.r[e]=m.r[e].map(rn);if(m.poll)m.poll.opts.forEach(o=>o.v=o.v.map(rn))});ns[nk]=sp}
  D.spaces=ns;
  for(const x of Object.values(D.users)){
   for(const f of['read','muted','drafts','hsp'])if(x[f]){const o={};for(const k in x[f])o[sm(k)]=x[f][k];x[f]=o}
   if(x.pins)x.pins=x.pins.map(sm);for(const f of['contacts','blocked'])if(x[f])x[f]=x[f].map(rn);
   if(x.saves)x.saves.forEach(v=>{v.sp=sm(v.sp);v.from=rn(v.from)})}
  (D.stories||[]).forEach(st=>{st.by=rn(st.by);st.seen=(st.seen||[]).map(rn)});
 });
 if(!D.users[neu])return;SID=neu;
 try{sessionStorage.setItem('zs',neu);localStorage.setItem('zoner_last',neu);setAccts(rawAccts().map(x=>x===old?neu:x));const o=JSON.parse(localStorage.getItem(SEEN))||{};if(o[old]){o[neu]=o[old];delete o[old];localStorage.setItem(SEEN,JSON.stringify(o))}}catch{}
 if(curId&&!D.spaces[curId]){const nid=curId.startsWith('dm:')||curId.startsWith('saved:')?null:curId;if(!nid){curId=null;$('#chatIn').hidden=true;$('#empty').hidden=false;$('#app').classList.remove('in-chat')}}
}

/* حذف کامل حساب */
function delAccountUI(){
 const pw=input('',t('delAcctPw'),60);pw.type='password';pw.dir='ltr';const e=el('p','error');
 openModal(el('h3','red',t('delAcct')),el('p','bio',t('delAcctQ')),pw,e,btns(B(t('delBtn'),async()=>{
  fresh();const u=me();if(!u||!u.pw||(u.pw!==await hash(pw.value)&&u.pw!==djb(pw.value)))return e.textContent=t('wrong');deleteAccount()},'btn del'),B(t('cancel'),myProfile,'btn ghost')));
}
function deleteAccount(){
 const id=SID;
 mutate(()=>{delete D.users[id];
  for(const[k,sp]of Object.entries(D.spaces)){if(!sp.members.includes(id))continue;
   if(sp.type==='dm'||sp.type==='saved'){delete D.spaces[k];continue}
   sp.members=sp.members.filter(x=>x!==id);sp.admins=(sp.admins||[]).filter(x=>x!==id);
   if(!sp.members.length){delete D.spaces[k];continue}
   if(sp.owner===id)sp.owner=sp.admins[0]||sp.members[0]}
  D.stories=(D.stories||[]).filter(x=>x.by!==id)});
 closeModal();logout();toast(t('acctGone'));
}

/* برش دایره‌ای عکس */
const closeCrop=()=>{$('#crop').hidden=true;$('#crop').replaceChildren()};
function openCrop(file,done){
 const fr=new FileReader();
 fr.onload=()=>{const im=new Image();im.onerror=()=>toast(t('imgBad'));im.onload=()=>{
  const S=300,R=125,cv=el('canvas'),c=cv.getContext('2d');cv.width=cv.height=S*2;c.scale(2,2);
  const base=2*R/Math.min(im.width,im.height);let z=1,ox=0,oy=0,drag=null;
  const clamp=()=>{const sc=base*z,mx=Math.max(0,(im.width*sc-2*R)/2),my=Math.max(0,(im.height*sc-2*R)/2);ox=Math.max(-mx,Math.min(mx,ox));oy=Math.max(-my,Math.min(my,oy))};
  const draw=()=>{clamp();const sc=base*z;c.clearRect(0,0,S,S);c.fillStyle='#1a1030';c.fillRect(0,0,S,S);
   c.drawImage(im,S/2+ox-im.width*sc/2,S/2+oy-im.height*sc/2,im.width*sc,im.height*sc);
   c.save();c.fillStyle='rgba(8,4,20,.66)';c.beginPath();c.rect(0,0,S,S);c.arc(S/2,S/2,R,0,Math.PI*2,true);c.fill('evenodd');c.restore();
   c.strokeStyle='rgba(255,255,255,.9)';c.lineWidth=2;c.beginPath();c.arc(S/2,S/2,R,0,Math.PI*2);c.stroke()};
  const rg=el('input');rg.type='range';rg.min=1;rg.max=4;rg.step=.01;rg.value=1;rg.className='zoom';rg.oninput=()=>{z=+rg.value;draw()};
  const k=()=>S/cv.getBoundingClientRect().width;
  cv.onpointerdown=e=>{drag={x:e.clientX,y:e.clientY};cv.setPointerCapture(e.pointerId);cv.style.cursor='grabbing'};
  cv.onpointermove=e=>{if(!drag)return;const f=k();ox+=(e.clientX-drag.x)*f;oy+=(e.clientY-drag.y)*f;drag={x:e.clientX,y:e.clientY};draw()};
  cv.onpointerup=cv.onpointercancel=()=>{drag=null;cv.style.cursor='grab'};
  cv.onwheel=e=>{e.preventDefault();z=Math.max(1,Math.min(4,z-e.deltaY*.002));rg.value=z;draw()};
  const ok=B(t('apply'),()=>{const o=el('canvas');o.width=o.height=256;const g=o.getContext('2d'),f=256/(2*R),sc=base*z,x0=S/2-R;g.fillStyle='#1a1030';g.fillRect(0,0,256,256);
   g.drawImage(im,(S/2+ox-im.width*sc/2-x0)*f,(S/2+oy-im.height*sc/2-x0)*f,im.width*sc*f,im.height*sc*f);done(o.toDataURL('image/jpeg',.86));closeCrop()});
  const cd=el('div','card');cd.append(el('h3','',t('cropT')),el('small','muted',t('cropHint')),cv,rg,btns(ok,B(t('cancel'),closeCrop,'btn ghost')));
  const ov=$('#crop');ov.replaceChildren(cd);ov.hidden=false;draw()};
  im.src=fr.result};
 fr.readAsDataURL(file);
}


/* ---------- v1.0.4 ---------- */
const EMOGRP=[
 ['اصلی','Classic',['pepe.png','linus.png','bang.png','beluga.gif','blob.gif','cat.gif','pray.gif','rock.gif','volume.gif','asmon.gif','bearded.gif']],
 ["پپه","Pepe",["pepeangry.gif", "peperage.gif", "pepe_redfury.gif", "pepe_smug.gif", "pepe_guns.gif", "pepe_flex.gif", "pepebass.gif", "pepe_wink.gif", "pepe_lurk.gif", "peepoleave.gif", "jamgie.gif", "pepe_big_brain.gif", "pepepoop.gif", "pepe_enchanted_diamond_sword.gif", "pepeban.png", "pepe_kekw.png", "lookupwtf.png"]],
 ["گربه‌ها","Cats",["happycat.gif", "catslap.gif", "cronchycat.gif", "cat_falling.gif", "cat_shocked.gif","yes_cat.gif"]],
 ["میم‌ها","Memes",["cinema.png", "absolutecinema.png", "doakes.png", "what_the_flip.gif", "cod_bruh.gif", "plankton_aaug.png", "flighttounge.gif", "adios.gif"]],
 ["عصبانی","Rage",["rage_big.gif", "rage_1.gif", "rage_2.gif", "rage_png.png"]],
 ["باب‌اسفنجی و بقیه","SpongeBob & co",["hmbob.png", "panicshock.png", "patrickpee.gif", "patrickwarrior.png", "pointing.png", "sadhappybob.png", "satisfiedbob.png", "squidwardcoffee.png", "staringbob.png", "unamusedsquidward.png", "knifebob.png", "middlefinger.png", "thumbsup.png", "unamused.gif", "wavehello.png"]],
 ["واکنش‌ها","Reactions",[ "bye.webp", "facepalm.webp", "lol.webp", "no.webp", "oops.webp", "thank_you.webp", "this_is_fine.webp", "wow.webp", "yes_w.webp"]],
 ["CS و گیم","CS & Games",["awp.png", "cs2.gif", "cs2_png.png", "cs.gif", "cs2_1.gif", "donkscream.gif", "level.gif", "pepe_knife_m9_bayonet.png"]],
 ["GTA و CJ","GTA & CJ",["gta6.png", "wasted.png", "gtaahhh.png", "gtabignose.png", "gtacry.png", "gtalol.png", "gtaouch.png", "gtathumbup.png", "cj_smiling_face_with_tear.png", "cjdance.gif", "cjpls.gif", "cjxdd.png", "nomela.png", "miedo.png", "discussing.gif"]],
 ["ماینکرافت","Minecraft",["dyn_stevedance.gif", "steveclap.gif", "steve_dab.gif"]],
 ["حیوانات","Animals",["cat.png", "please.gif", "soldjacat.png", "lava.gif", "cooked.png", "popcorn.png", "lizard.gif"]],
 ["میم‌های دیگر","More memes",["elonmyheargoesout.png", "jinx_bored_1.png", "dafoe.gif", "nowaying.gif", "punch_you.gif", "rightthere.gif", "scarypatrick.png", "funny_clown.gif", "scuffled_clown.gif", "sad.png", "shaqtimeout.png", "timeisticking.png", "scream.gif", "rage.png"]]
];
const EMOCAT=[
 ['eSmile','😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 😉 😍 🥰 😘 😋 😛 😜 🤪 😎 🤩 🥳 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 🥺 😢 😭 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 🤗 🤔 🤭 🤫 😶 😐 😑 😬 🙄 😯 😮 😲 🥱 😴 🤤 😵 🤐 🥴 🤢 🤮 😷 🤒 😈 👿 💀 👻 👽 🤖'.split(' ')],
 ['eHand','👍 👎 👌 ✌️ 🤞 🤟 🤘 🤙 👈 👉 👆 👇 ☝️ ✋ 🖐️ 🖖 👋 🤝 🙏 👏 🙌 👐 💪 🦾 ✊ 👊 🤛 🤜'.split(' ')],
 ['eHeart','❤️ 🧡 💛 💚 💙 💜 🖤 🤍 💔 ❣️ 💕 💞 💓 💗 💖 💘 💝 ✨ ⭐ 🌟 💫 🔥 💥 💯 ✅ ❌ ⚠️ ❓ ❗'.split(' ')],
 ['eGame','🎮 🕹️ 👾 🎯 🏆 🥇 🥈 🥉 🏅 👑 💎 🎲 ♟️ 🧩 🎧 🎤 🎵 🎶 🔊 📱 💻 ⌨️ 🖱️ 🖥️ 🔫 ⚔️ 🛡️ 🗡️ 💣 🚀 🛸 ⚡ 🎉 🎊 🎁'.split(' ')],
 ['eFun','🐶 🐱 🦊 🐼 🦁 🐯 🐸 🐵 🦄 🐉 🍕 🍔 🍟 🌭 🍿 🍩 🍪 🍫 🥤 ☕ 🍺'.split(' ')],
];
function putEmoji(c){
 const ta=$('#text'),a=ta.selectionStart??ta.value.length,b=ta.selectionEnd??a;ta.setRangeText(c,a,b,'end');
 if(matchMedia('(pointer:fine)').matches)ta.focus();autosize();setTyping('text');
 mutate(()=>{const u=me();u.remo=[c,...(u.remo||[]).filter(x=>x!==c)].slice(0,14)});
}
function updComposer(){const has=$('#text').value.trim().length>0||!!edit||PE.length>0;$('#send').hidden=!has;$('#mic').hidden=has;updSch()}

/* انتخاب عضو: جستجوی آیدی/نام یا دوستان */
function memberPicker(sel,skip=[]){
 const w=el('div','mpick'),chips=el('div','mchips'),inp=input('',t('searchUser'),40),list=el('div','mlist2');inp.dir='auto';
 const cand=()=>{const ids=new Set(me().contacts||[]);mySpaces().filter(x=>x.type==='dm').forEach(x=>ids.add(other(x)));return[...ids].filter(x=>D.users[x]&&!D.users[x].bot&&x!==SID&&!skip.includes(x))};
 const paint=()=>{
  chips.replaceChildren();[...sel].forEach(x=>{const u=D.users[x];if(!u)return;const c=el('button','mchip');c.append(userAv(u,22),el('span','',u.name),icon('close',12));c.onclick=()=>{sel.delete(x);paint()};chips.append(c)});chips.hidden=!sel.size;
  list.replaceChildren();const k=inp.value.trim().toLowerCase().replace(/^@/,'');
  const mt=x=>x.includes(k)||D.users[x].name.toLowerCase().includes(k);
  const ids=cand().filter(x=>!k||mt(x)),ex=k?Object.keys(D.users).filter(x=>!D.users[x].bot&&x!==SID&&!skip.includes(x)&&!ids.includes(x)&&mt(x)).slice(0,8):[];
  const row=x=>{const u=D.users[x],it=el('div','item mini'),m=el('div','meta'),ck=el('span','ck'+(sel.has(x)?' on':''));m.append(el('b','',u.name),el('div','last','@'+x));ck.append(icon('check',14));it.append(userAv(u,36),m,ck);it.onclick=()=>{sel.has(x)?sel.delete(x):sel.add(x);paint()};return it};
  if(!k&&ids.length)list.append(el('div','sec',t('friends')));ids.forEach(x=>list.append(row(x)));
  if(ex.length){list.append(el('div','sec',t('results')));ex.forEach(x=>list.append(row(x)))}
  if(!ids.length&&!ex.length)list.append(el('p','muted pad',k?t('notFound'):t('noFriends')));
 };
 inp.oninput=paint;paint();w.append(inp,chips,list);return w;
}
function addMembersUI(id){
 const sp=D.spaces[id];if(!sp)return;const sel=new Set(),mp=memberPicker(sel,sp.members);
 openModal(el('h3','',t('addMember')),mp,btns(B(t('add'),()=>{const ids=[...sel].filter(x=>D.users[x]&&!sp.members.includes(x));if(ids.length)mutate(()=>{D.spaces[id].members.push(...ids)});toast(t('added'));spaceInfo(id);paintHead()}),B(t('cancel'),()=>spaceInfo(id),'btn ghost')));
}

/* استیم */

/* کپشن عکس/گیف */
function capPhoto(src,kind){
 const ta=el('textarea');ta.rows=2;ta.maxLength=500;ta.placeholder=t('caption');ta.dir='auto';const im=el('img','capimg');im.src=src;
 const go=()=>{const c=ta.value;closeModal();kind==='gif'?sendGif(src,c):send({img:src,caption:c})};
 ta.onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();go()}};
 openModal(el('h3','',t('sendPhoto')),im,ta,btns(B(t('send'),go),B(t('cancel'),()=>{closeModal();setTyping(null)},'btn ghost')));setTimeout(()=>ta.focus(),60);
}

/* پیام صوتی */
const fmtDur=n=>{n=Math.max(0,Math.round(n));return '\u200E'+Math.floor(n/60).toLocaleString(loc())+':'+String(n%60).padStart(2,'0').replace(/\d/g,d=>(+d).toLocaleString(loc()))};
/* دسترسی میکروفون/دوربین: یک‌بار گرفته می‌شود و برای ضبط‌های بعدی چند لحظه نگه داشته می‌شود تا مرورگر دوباره نپرسد */
const MEDIA={st:null,key:'',tm:0};
const mediaStop=()=>{clearTimeout(MEDIA.tm);try{MEDIA.st&&MEDIA.st.getTracks().forEach(x=>x.stop())}catch{}MEDIA.st=null;MEDIA.key=''};
const mediaIdle=()=>{clearTimeout(MEDIA.tm);MEDIA.tm=setTimeout(mediaStop,60000)};
const isIOS=()=>/iPhone|iPad|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
function mediaErr(e){
 const n=e&&e.name;if(!window.isSecureContext||!navigator.mediaDevices)return 'noMic';
 let blocked=false;try{const fp=document.featurePolicy||document.permissionsPolicy;blocked=!!(fp&&fp.allowsFeature&&!fp.allowsFeature('microphone'))}catch{}
 if(blocked)return 'permFrame';
 if(n==='NotFoundError'||n==='OverconstrainedError')return 'noDevice';
 if(n==='NotReadableError'||n==='AbortError'||n==='TrackStartError')return 'devBusy';
 return 'micDenied';
}
async function getMedia(video,fm){
 clearTimeout(MEDIA.tm);const key=video?'v'+fm:'a',live=MEDIA.st&&MEDIA.st.getTracks().length&&MEDIA.st.getTracks().every(x=>x.readyState==='live');
 if(live){if(MEDIA.key===key)return MEDIA.st;if(!video&&MEDIA.key[0]==='v')return new MediaStream(MEDIA.st.getAudioTracks())}
 mediaStop();
 const tries=video?[{video:{facingMode:fm,width:{ideal:480},height:{ideal:480},aspectRatio:{ideal:1},frameRate:{ideal:24,max:30}},audio:{echoCancellation:true,noiseSuppression:true}},{video:{facingMode:fm},audio:true},{video:true,audio:true}]:[{audio:true}];
 let err;for(const c of tries){try{MEDIA.st=await navigator.mediaDevices.getUserMedia(c);MEDIA.key=key;return MEDIA.st}catch(e){err=e;if(['NotAllowedError','SecurityError','NotFoundError','NotReadableError'].includes(e.name))break}}
 throw err;
}
const rec={st:'idle',mr:null,chunks:[],t0:0,tm:null,dur:0,blob:null,url:null,stream:null,au:null,ac:null,an:null,buf:null,lv:0,peaks:[],live:[],wave:null};
const recMime=()=>['audio/webm;codecs=opus','audio/webm','audio/mp4','audio/ogg;codecs=opus'].find(x=>window.MediaRecorder&&MediaRecorder.isTypeSupported(x))||'';
const LVN=34;
/* موج صدا: اندازه‌گیری زندهٔ بلندی صدا هنگام ضبط */
function recLevel(){
 if(!rec.an)return;rec.an.getByteTimeDomainData(rec.buf);let s=0;for(let i=0;i<rec.buf.length;i++){const x=(rec.buf[i]-128)/128;s+=x*x}
 const lv=Math.min(1,Math.pow(Math.sqrt(s/rec.buf.length)*3.4,.7));rec.peaks.push(lv);rec.live.push(Math.max(.08,lv));rec.live.shift();
 const bars=$('#rlive');if(bars)for(let i=0;i<bars.children.length;i++)bars.children[i].style.height=Math.round(rec.live[i]*100)+'%';
}
function recMeterOff(){clearInterval(rec.lv);rec.lv=0;try{rec.ac&&rec.ac.close()}catch{}rec.ac=rec.an=null}
function recMeter(stream){
 recMeterOff();
 if(isIOS())return;
 try{const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;rec.ac=new AC();rec.ac.resume&&rec.ac.resume();
  const src=rec.ac.createMediaStreamSource(stream);rec.an=rec.ac.createAnalyser();rec.an.fftSize=1024;src.connect(rec.an);rec.buf=new Uint8Array(rec.an.fftSize);rec.lv=setInterval(recLevel,70)}catch{rec.an=null}
}
function recWave(){
 const p=rec.peaks||[],n=44;if(p.length<4)return null;const out=[];
 for(let i=0;i<n;i++){const a=Math.floor(i*p.length/n),b=Math.max(a+1,Math.floor((i+1)*p.length/n));let mx=0;for(let k=a;k<b&&k<p.length;k++)mx=Math.max(mx,p[k]);out.push(mx)}
 const top=Math.max(...out,.06);return out.map(v=>Math.max(12,Math.round(v/top*100)));
}
/* ویس‌های قدیمی موج ذخیره‌شده ندارند؛ یک موج ثابت از روی شناسهٔ پیام ساخته می‌شود */
function waveOf(m){
 if(Array.isArray(m.wave)&&m.wave.length)return m.wave;
 let h=5381;for(const c of String(m.id||m.dur||'v'))h=(h*33)^c.charCodeAt(0);h>>>=0;
 const r=()=>{h=(Math.imul(h,1664525)+1013904223)>>>0;return h/4294967296};const out=[];let p=.5;
 for(let i=0;i<44;i++){p=p*.55+r()*.45+(i%7===3?.14:0);out.push(Math.round(Math.max(.14,Math.min(1,p*1.15))*100))}
 return out;
}
function mkWave(vals){const w=el('div','vwave');vals.forEach(v=>{const i=el('i');i.style.height=Math.max(14,v)+'%';w.append(i)});return w}
function paintWave(w,ratio){const n=w.children.length,k=Math.round(ratio*n);for(let i=0;i<n;i++)w.children[i].classList.toggle('p',i<k)}
function bindSeek(w,fn){
 let on=false;const at=e=>{const r=w.getBoundingClientRect();return Math.max(0,Math.min(1,(e.clientX-r.left)/(r.width||1)))};
 w.addEventListener('pointerdown',e=>{e.stopPropagation();on=true;try{w.setPointerCapture(e.pointerId)}catch{}fn(at(e))});
 w.addEventListener('pointermove',e=>{if(on)fn(at(e))});
 ['pointerup','pointercancel'].forEach(ev=>w.addEventListener(ev,()=>{on=false}));
 w.addEventListener('click',e=>e.stopPropagation());
}
async function recStart(){
 if(rec.st!=='idle')return;if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder)return toast(t('noMic'));
 if(await micDenied())return toast(t('permDenied'));let stream;try{stream=await getMedia(false)}catch(e){return toast(t(mediaErr(e)))}
 rec.stream=stream;const mt=recMime();rec.mr=new MediaRecorder(stream,{...(mt&&{mimeType:mt}),audioBitsPerSecond:24000});rec.chunks=[];
 rec.mr.ondataavailable=e=>{if(e.data&&e.data.size)rec.chunks.push(e.data)};
 rec.mr.onstop=()=>{mediaIdle();if(rec.st==='stopping'){rec.blob=new Blob(rec.chunks,{type:rec.mr.mimeType||mt||'audio/webm'});rec.url=URL.createObjectURL(rec.blob);rec.au=new Audio(rec.url);rec.st='review';paintRec()}};
 rec.peaks=[];rec.wave=null;rec.live=Array(LVN).fill(.08);recMeter(stream);
 rec.mr.start(250);rec.t0=Date.now();rec.dur=0;rec.st='rec';setTyping('voice');
 rec.tm=setInterval(()=>{rec.dur=Math.round((Date.now()-rec.t0)/1000);const e=$('#recT');if(e)e.textContent=fmtDur(rec.dur);setTyping('voice');if(rec.dur>=120)recStop()},250);
 paintRec();
}
function recStop(){if(rec.st!=='rec')return;clearInterval(rec.tm);rec.dur=Math.max(1,Math.round((Date.now()-rec.t0)/1000));rec.wave=recWave();recMeterOff();rec.st='stopping';try{rec.mr.stop()}catch{}}
function recCancel(){clearInterval(rec.tm);recMeterOff();const was=rec.st;rec.st='idle';rec.wave=null;try{if(rec.mr&&rec.mr.state!=='inactive')rec.mr.stop()}catch{}mediaIdle();try{rec.au?.pause()}catch{}if(rec.url)URL.revokeObjectURL(rec.url);rec.url=rec.blob=rec.au=null;paintRec();if(was!=='idle')setTyping(null)}
function recSend(){
 if(rec.st!=='review'||!rec.blob)return;const d=rec.dur,wv=rec.wave,fr=new FileReader();
 fr.onload=()=>{const v=fr.result;if(v.length>1.6e6)return toast(t('big'));recCancel();send({voice:v,dur:d,...(wv&&{wave:wv})})};fr.readAsDataURL(rec.blob);
}
function paintRec(){
 const on=rec.st!=='idle';$('#cbar').hidden=on;$('#recbar').hidden=!on;if(!on)return;
 const mid=$('#recMid'),go=$('#recGo');mid.replaceChildren();go.replaceChildren();
 if(rec.st==='rec'||rec.st==='stopping'){
  const tm=el('b','',fmtDur(rec.dur));tm.id='recT';const lv=el('span','rlive');lv.id='rlive';for(let i=0;i<LVN;i++){const b=el('i');b.style.height=Math.round((rec.live[i]||.08)*100)+'%';lv.append(b)}
  mid.append(el('i','rdot'),tm,lv);go.append(icon('stop',20));go.title=t('stopRec');
 }else{
  const pb=el('button','vplay'),wv=mkWave(rec.wave||waveOf({id:String(rec.t0)})),tm=el('small','',fmtDur(rec.dur));pb.append(icon('play',18));const au=rec.au;
  au.ontimeupdate=()=>{paintWave(wv,Math.min(1,au.currentTime/rec.dur));tm.textContent=fmtDur(au.currentTime)};
  au.onended=()=>{pb.replaceChildren(icon('play',18));paintWave(wv,0);tm.textContent=fmtDur(rec.dur)};
  pb.onclick=()=>{if(au.paused){au.play();pb.replaceChildren(icon('pause',18))}else{au.pause();pb.replaceChildren(icon('play',18))}};
  bindSeek(wv,r=>{au.currentTime=r*rec.dur;paintWave(wv,r)});
  mid.append(pb,wv,tm);go.append(icon('send',22));go.title=t('send');
 }
}
$('#recDel').onclick=recCancel;$('#recGo').onclick=()=>rec.st==='rec'?recStop():recSend();
let curV=null;
function mkVoice(m){
 const w=el('div','vm'),b=el('button','vplay'),mid=el('div','vmid'),wv=mkWave(waveOf(m)),row=el('div','vrow2'),tm=el('small','',fmtDur(m.dur||0)),sp=el('button','vspd','1×');
 b.append(icon('play',18));row.append(tm,sp);mid.append(wv,row);w.append(b,mid);
 let au=null,rate=1;const dur=()=>m.dur||(au&&isFinite(au.duration)&&au.duration)||1;
 const reset=()=>{b.replaceChildren(icon('play',18));paintWave(wv,0);tm.textContent=fmtDur(m.dur||0)};
 const ensure=()=>{if(au)return au;au=new Audio(m.voice);au.preload='auto';au.ontimeupdate=()=>{paintWave(wv,Math.min(1,au.currentTime/dur()));tm.textContent=fmtDur(au.currentTime)};au.onended=reset;return au};
 b.onclick=e=>{e.stopPropagation();ensure();if(curV&&curV.au!==au){curV.au.pause();curV.reset()}
  if(au.paused){au.playbackRate=rate;au.play();b.replaceChildren(icon('pause',18));curV={au,reset}}else{au.pause();b.replaceChildren(icon('play',18))}};
 sp.onclick=e=>{e.stopPropagation();rate=rate===1?1.5:rate===1.5?2:1;sp.textContent=rate+'×';if(au)au.playbackRate=rate};
 bindSeek(wv,r=>{ensure();try{au.currentTime=r*dur()}catch{}paintWave(wv,r)});
 return w;
}

/* تماس صوتی (WebRTC؛ سیگنال از طریق localStorage بین تب‌های همین مرورگر) */
const SIGK='zoner_sig',ICE={iceServers:[{urls:'stun:stun.l.google.com:19302'}]};
const sig=(to,type,room,data)=>{try{localStorage.setItem(SIGK,JSON.stringify({n:uid(),to,from:SID,type,room,data}))}catch{}};
let CALL=null,ringI=null,callTm=null,rAC=null;
async function getMic(){if(!navigator.mediaDevices?.getUserMedia){toast(t('noMic'));return null}if(await micDenied()){toast(t('permDenied'));return null}try{return await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true}})}catch{toast(t('micDenied'));return null}}
function startRing(){stopRing();const beep=()=>{try{rAC=rAC||new AudioContext();const o=rAC.createOscillator(),g=rAC.createGain();o.type='sine';o.frequency.value=720;o.connect(g);g.connect(rAC.destination);g.gain.setValueAtTime(.12,rAC.currentTime);g.gain.exponentialRampToValueAtTime(.001,rAC.currentTime+.55);o.start();o.stop(rAC.currentTime+.55)}catch{}};beep();ringI=setInterval(beep,1500);try{navigator.vibrate?.([300,200,300])}catch{}}
function stopRing(){clearInterval(ringI);ringI=null}
async function startCall(h){
 if(CALL)return toast(t('inCall'));const u=D.users[h];if(!u||u.bot||h===SID)return;
 const local=await getMic();if(!local)return;if(CALL){local.getTracks().forEach(x=>x.stop());return}
 CALL={room:uid(),st:'out',caller:SID,withId:h,peers:{},local,muted:false,members:[SID],ringing:new Set([h]),t0:0};
 CALL.to=setTimeout(()=>{if(CALL&&CALL.st==='out'){[...CALL.ringing].forEach(x=>sig(x,'bye',CALL.room));endCall('noanswer')}},40000);
 sig(h,'ring',CALL.room,{members:[SID]});paintCall();
}
async function acceptCall(){
 if(!CALL||CALL.st!=='in')return;const c=CALL;stopRing();clearTimeout(c.to);
 const local=await getMic();if(!local){if(CALL===c)declineCall();return}if(CALL!==c){local.getTracks().forEach(x=>x.stop());return}
 c.local=local;c.st='conn';sig(SID,'elsewhere',c.room);[...new Set([c.from,...c.members])].forEach(x=>{if(x!==SID)sig(x,'accept',c.room)});paintCall();
}
function declineCall(timeout){if(!CALL||CALL.st!=='in')return;sig(CALL.from,'decline',CALL.room);endCall(timeout?'missed':'declined')}
function hangup(){
 if(!CALL)return;if(CALL.st==='in'&&!CALL.local)return declineCall();
 const tg=new Set([...Object.keys(CALL.peers),...(CALL.ringing||[]),...(CALL.members||[])]);if(CALL.withId)tg.add(CALL.withId);tg.delete(SID);
 tg.forEach(x=>sig(x,'bye',CALL.room));endCall('hangup');
}
function makePeer(h,offerer){
 const c=CALL;if(!c)return null;if(c.peers[h])return c.peers[h];
 const pc=new RTCPeerConnection(ICE),p={pc,q:[],au:null};c.peers[h]=p;
 c.local.getTracks().forEach(tr=>pc.addTrack(tr,c.local));
 pc.onicecandidate=e=>{if(e.candidate)sig(h,'ice',c.room,e.candidate.toJSON())};
 pc.ontrack=e=>{if(!p.au){p.au=new Audio();p.au.srcObject=e.streams[0];p.au.play().catch(()=>{})}};
 pc.onconnectionstatechange=()=>{if(CALL!==c)return;const st=pc.connectionState;
  if(st==='connected'){if(!c.t0){c.t0=Date.now();c.st='live';clearInterval(callTm);callTm=setInterval(()=>{const e=$('#callT');if(e&&CALL&&CALL.t0)e.textContent=fmtDur((Date.now()-CALL.t0)/1000)},500)}paintCall()}
  if(st==='failed'||st==='closed')dropPeer(h)};
 if(offerer){if(c.st==='out')c.st='conn';pc.createOffer().then(o=>pc.setLocalDescription(o)).then(()=>sig(h,'offer',c.room,{type:pc.localDescription.type,sdp:pc.localDescription.sdp}))}
 return p;
}
const flushQ=async p=>{while(p.q.length){try{await p.pc.addIceCandidate(p.q.shift())}catch{}}};
function dropPeer(h){const c=CALL,p=c&&c.peers[h];if(!p)return;try{p.pc.close()}catch{}try{p.au&&(p.au.pause(),p.au.srcObject=null)}catch{}delete c.peers[h];
 if(!Object.keys(c.peers).length&&!(c.ringing&&c.ringing.size))endCall('ended');else paintCall()}
async function onSig(raw){
 let m;try{m=JSON.parse(raw)}catch{return}if(!m||!SID)return;
 if(m.type==='elsewhere'){if(m.from===SID&&CALL&&CALL.st==='in'&&CALL.room===m.room){stopRing();clearTimeout(CALL.to);CALL=null;paintCall()}return}
 if(m.to!==SID||m.from===SID)return;const from=m.from,c=CALL;
 if(m.type==='ring'){
  if(c||!D.users[from]||blockedBy(SID,from)){sig(from,'busy',m.room);return}
  CALL={room:m.room,st:'in',peers:{},local:null,muted:false,members:(m.data&&m.data.members)||[from],from,t0:0};
  CALL.to=setTimeout(()=>{if(CALL&&CALL.st==='in')declineCall(true)},40000);startRing();paintCall();return}
 if(!c||c.room!==m.room)return;
 try{
  if(m.type==='accept'){c.ringing&&c.ringing.delete(from);clearTimeout(c.to);if(c.local)makePeer(from,true);return}
  if(m.type==='offer'){if(!c.local)return;const p=makePeer(from,false);await p.pc.setRemoteDescription(m.data);await flushQ(p);const a=await p.pc.createAnswer();await p.pc.setLocalDescription(a);sig(from,'answer',c.room,{type:a.type,sdp:a.sdp});return}
  if(m.type==='answer'){const p=c.peers[from];if(p){await p.pc.setRemoteDescription(m.data);await flushQ(p)}return}
  if(m.type==='ice'){const p=c.peers[from];if(!p)return;if(p.pc.remoteDescription)await p.pc.addIceCandidate(m.data).catch(()=>{});else p.q.push(m.data);return}
 }catch{}
 if(m.type==='bye'){if(c.st==='in'&&!c.local){endCall('missed')}else dropPeer(from);return}
 if(m.type==='decline'||m.type==='busy'){c.ringing&&c.ringing.delete(from);if(!Object.keys(c.peers).length&&!(c.ringing&&c.ringing.size))endCall(m.type==='busy'?'busy':'declined');else paintCall()}
}
function endCall(reason){
 const c=CALL;if(!c)return;CALL=null;clearTimeout(c.to);clearInterval(callTm);callTm=null;stopRing();
 Object.values(c.peers).forEach(p=>{try{p.pc.close()}catch{}try{p.au&&(p.au.pause(),p.au.srcObject=null)}catch{}});
 try{c.local&&c.local.getTracks().forEach(x=>x.stop())}catch{}
 paintCall();
 if(c.caller===SID&&c.withId&&me()){const sp='dm:'+[SID,c.withId].sort().join(':');
  if(D.spaces[sp]){const dur=c.t0?Math.round((Date.now()-c.t0)/1000):0;
   const tx='📞 '+(dur?t('callEnded')+' · '+fmtDur(dur):reason==='declined'?t('callDeclined'):reason==='busy'?t('callBusy'):t('callMissed'));
   mutate(()=>{D.spaces[sp].msgs.push({id:uid(),ts:Date.now(),from:SID,text:tx})});if(curId===sp)renderMsgs(true);renderList()}}
 if(reason==='noanswer')toast(t('callNoAnswer'));else if(reason==='busy')toast(t('callBusy'));else if(reason==='declined')toast(t('callDeclined'));else if(reason==='missed'&&c.st==='in')toast(t('callMissed'));
}
function paintCall(){
 const o=$('#call');if(!CALL){o.hidden=true;o.replaceChildren();return}
 const c=CALL;o.hidden=false;o.className='call'+(c.min?' min':'');
 const ids=c.st==='in'&&!c.local?[...new Set([c.from,...c.members])].filter(x=>x!==SID):[...new Set([...(c.withId?[c.withId]:[]),...Object.keys(c.peers),...(c.ringing||[])])];
 const w=el('div','call-in card'),av=el('div','call-av'+(c.st==='live'?'':' ringing'));
 ids.slice(0,4).forEach(x=>{if(D.users[x])av.append(userAv(D.users[x],ids.length>1?(c.min?40:96):(c.min?60:150)))});
 const names=ids.map(x=>D.users[x]?.name||x).join('، ');
 const stt=c.st==='in'&&!c.local?(c.members.length>1?t('incomingGroup'):t('incomingCall')):c.st==='out'?t('calling'):c.st==='conn'?t('connecting'):'';
 const tm=el('b','call-t',c.st==='live'?fmtDur((Date.now()-c.t0)/1000):'');tm.id='callT';
 const ctr=el('div','call-ctr'),cb=(ic,cls,fn)=>{const b=el('button','cbtn '+cls);b.append(icon(ic,24));b.onclick=fn;ctr.append(b);return b};
 if(c.st==='in'&&!c.local){cb('phone','ok',acceptCall);cb('phone','bad',()=>declineCall())}
 else{cb(c.muted?'micOff':'mic',c.muted?'on':'',()=>{c.muted=!c.muted;c.local.getAudioTracks().forEach(x=>x.enabled=!c.muted);paintCall()});cb('userplus','',addToCall);cb('phone','bad',hangup)}
 const mb=el('button','icon call-min');mb.title=t('minimize');mb.append(icon('down',20));mb.onclick=()=>{c.min=!c.min;paintCall()};
 w.append(mb,av,el('b','call-n',names),el('small','call-st',stt),tm,ctr);o.replaceChildren(w);
}
function addToCall(){
 if(!CALL)return;const skip=[SID,...Object.keys(CALL.peers),...(CALL.ringing||[])],sel=new Set(),mp=memberPicker(sel,skip);
 openModal(el('h3','',t('addToCall')),mp,btns(B(t('call'),()=>{
  if(!CALL||!sel.size)return closeModal();const mem=[SID,...Object.keys(CALL.peers)];CALL.ringing=CALL.ringing||new Set();
  sel.forEach(x=>{CALL.ringing.add(x);sig(x,'ring',CALL.room,{members:mem});const rm=CALL.room;setTimeout(()=>{if(CALL&&CALL.room===rm&&CALL.ringing.delete(x))paintCall()},40000)});closeModal();paintCall()}),B(t('cancel'),closeModal,'btn ghost')));
}
$('#callBtn').onclick=()=>{const s=S();if(s&&s.type==='dm')startCall(other(s))};


/* ---------- v1.0.8 ---------- */
const EONLY=/^(?:\s*\p{Extended_Pictographic}(?:\uFE0F|\u200D\p{Extended_Pictographic}|[\u{1F3FB}-\u{1F3FF}])*\s*){1,3}$/u;
function emoNode(c){return el('span','',c)}
const plainT=x=>x.replace(/\*\*|__|~~|\|\||`/g,'');
function emoSplit(p,seg){p.append(seg)}
function plainSeg(p,seg){
 seg.split(/(@[a-zA-Z][a-zA-Z0-9_]{3,19})/g).forEach(x=>{if(!x)return;
  if(x[0]==='@'&&byHandle(x.slice(1).toLowerCase())){const a=el('a','lk',x);a.onclick=e=>{e.stopPropagation();openEntity(x.slice(1).toLowerCase())};p.append(a)}
  else emoSplit(p,x)});
}
const FMTS=[['**','strong'],['__','em'],['~~','s'],['||','span'],['`','code']];
function fmtInto(p,txt){
 let best=null;for(const[mk,tag]of FMTS){const i=txt.indexOf(mk);if(i<0)continue;const j=txt.indexOf(mk,i+mk.length);if(j<0||j===i+mk.length)continue;if(!best||i<best.i)best={i,j,mk,tag}}
 if(!best){plainSeg(p,txt);return}
 plainSeg(p,txt.slice(0,best.i));const inner=txt.slice(best.i+best.mk.length,best.j);let n;
 if(best.mk==='`'){n=el('code','ic');n.textContent=inner}
 else{n=el(best.tag,best.mk==='||'?'spoiler':'');fmtInto(n,inner);if(best.mk==='||')n.onclick=e=>{e.stopPropagation();n.classList.toggle('rev')}}
 p.append(n);fmtInto(p,txt.slice(best.j+best.mk.length));
}
function rich(txt,p){
 txt.split(/(https?:\/\/[^\s]+)/g).forEach(x=>{if(!x)return;
  if(/^https?:\/\//.test(x)){const a=el('a','lk',x);a.href=x;a.target='_blank';a.rel='noopener noreferrer';a.onclick=e=>e.stopPropagation();p.append(a)}
  else fmtInto(p,x)});
}
/* نوار فرمت متن هنگام انتخاب */
const FBTN=[['**','<b>B</b>','fBold'],['__','<i>I</i>','fItalic'],['~~','<s>S</s>','fStrike'],['||','<span class="fsp">Aa</span>','fSpoiler'],['`','<span class="fcode">&lt;/&gt;</span>','fCode']];
let FT=null;
const fmtOK=n=>n&&n.tagName==='TEXTAREA';
function wrapSel(mk){
 const ta=FT;if(!fmtOK(ta))return;let a=ta.selectionStart,b=ta.selectionEnd;if(a===b)return;const v=ta.value,L=mk.length;
 while(a<b&&/\s/.test(v[a]))a++;while(b>a&&/\s/.test(v[b-1]))b--;if(a===b)return;
 const sel=v.slice(a,b);let nv,na,nb;
 if(v.slice(a-L,a)===mk&&v.slice(b,b+L)===mk){nv=v.slice(0,a-L)+sel+v.slice(b+L);na=a-L;nb=b-L}
 else if(sel.length>2*L&&sel.startsWith(mk)&&sel.endsWith(mk)){const x=sel.slice(L,-L);nv=v.slice(0,a)+x+v.slice(b);na=a;nb=a+x.length}
 else{nv=v.slice(0,a)+mk+sel+mk+v.slice(b);na=a+L;nb=b+L}
 ta.value=nv;ta.setSelectionRange(na,nb);ta.focus();ta.dispatchEvent(new Event('input',{bubbles:true}));updFmt();
}
function updFmt(){
 const ta=document.activeElement,bar=$('#fmtbar');
 const on=fmtOK(ta)&&ta.selectionStart!==ta.selectionEnd&&!(ta.id==='text'&&rec.st==='rec');
 if(!on){bar.hidden=true;return}
 FT=ta;
 if(!bar.childElementCount){FBTN.forEach(([mk,lab,k])=>{const b=el('button','');b.type='button';b.innerHTML=lab;b.title=t(k);b.dataset.mk=mk;b.onpointerdown=e=>e.preventDefault();b.onclick=()=>wrapSel(mk);bar.append(b)})}
 const v=ta.value,a=ta.selectionStart,e=ta.selectionEnd;
 [...bar.children].forEach(b=>{const mk=b.dataset.mk,L=mk.length;b.classList.toggle('on',(v.slice(a-L,a)===mk&&v.slice(e,e+L)===mk)||(e-a>2*L&&v.slice(a,a+L)===mk&&v.slice(e-L,e)===mk))});
 bar.hidden=false;
 const r=ta.getBoundingClientRect(),bw=bar.offsetWidth,bh=bar.offsetHeight;
 let x=r.left+r.width/2-bw/2;x=Math.max(8,Math.min(x,innerWidth-bw-8));
 let y=r.top-bh-8;if(y<8)y=Math.min(r.bottom+8,innerHeight-bh-8);
 bar.style.left=x+'px';bar.style.top=y+'px';
}
document.addEventListener('selectionchange',updFmt);
['select','keyup','mouseup','touchend','input'].forEach(ev=>document.addEventListener(ev,()=>setTimeout(updFmt,0),true));
document.addEventListener('focusout',()=>setTimeout(updFmt,140));
document.addEventListener('keydown',e=>{const ta=document.activeElement;if(!fmtOK(ta)||!(e.ctrlKey||e.metaKey)||e.shiftKey||e.altKey)return;const k=e.key.toLowerCase();if(k!=='b'&&k!=='i')return;e.preventDefault();FT=ta;wrapSel(k==='b'?'**':'__')});

/* دانلود رسانهٔ پیام */
function dlMsg(m){
 if(m.file)return dlFile(m.file);
 const src=m.gif||m.img||m.voice||m.emote,a=el('a');a.href=src;
 const ext=(src.startsWith('data:')?(src.match(/^data:[^/]+\/([a-z0-9]+)/i)||[])[1]:src.split('.').pop())||'bin';
 a.download='zoner-'+m.id+'.'+(ext==='jpeg'?'jpg':ext);document.body.append(a);a.click();a.remove();
}

/* لینک دعوت گروه/کانال */
const linkOf=s=>location.href.split('#')[0]+'#join='+s.link;
function linkRow(s){
 const w=el('div','linkrow'),lab=el('span','',t('inviteLink')),inp=el('input');inp.readOnly=true;inp.dir='ltr';inp.value=linkOf(s);inp.onfocus=()=>inp.select();
 const cp=B(t('copyLink'),()=>{navigator.clipboard?.writeText(linkOf(s));toast(t('linkCopied'))},'btn ghost');w.append(lab,inp,cp);
 if(isAdmin(s)||s.owner===SID)w.append(B(t('newLink'),()=>{mutate(()=>{D.spaces[s.id].link=newTok()});toast(t('linkReset'));spaceInfo(s.id)},'btn ghost'));
 return w;
}
function checkJoin(){
 const m=location.hash.match(/#join=([a-z0-9]{6,24})/i);if(!m||!SID||!me())return;
 history.replaceState(null,'',location.href.split('#')[0]);fresh();
 const s=Object.values(D.spaces).find(x=>x.link===m[1]&&(x.type==='group'||x.type==='channel'));
 if(!s)return toast(t('linkBad'));if(s.members.includes(SID))return openSpace(s.id);
 const top=el('div','top prof-top'),w=el('div');w.append(el('h3','',s.name),el('small','muted',spSub(s)));top.append(avatar(s,64),w);
 openModal(top,el('p','bio',s.bio||t('joinQ')),btns(B(t('joinBtn'),()=>{mutate(()=>D.spaces[s.id].members.push(SID));closeModal();openSpace(s.id)}),B(t('cancel'),closeModal,'btn ghost')));
}
addEventListener('hashchange',checkJoin);

const FONTS=[['sahel','fontSahel','Sahel,system-ui,"Segoe UI",Tahoma,sans-serif'],['pofak','fontPofak','Pofak,Sahel,system-ui,"Segoe UI",Tahoma,sans-serif'],['aria','fontAria','Aria,Sahel,system-ui,"Segoe UI",sans-serif'],['dubai','fontDubai','Dubai,Sahel,system-ui,"Segoe UI",sans-serif'],['dast','fontDast','Dastnevis,Sahel,system-ui,serif']];
const ACCS=[['default',null,'#8b5cf6'],['blue',215,'#3b82f6'],['cyan',186,'#06b6d4'],['green',150,'#22c55e'],['pink',330,'#ec4899'],['orange',24,'#f97316'],['red',2,'#ef4444']];
const UI_DEF={fs:15,box:1,rad:20,font:'sahel',acc:'default',bg:'auto',bub:'frost',enter:1,blur:0,dim:0,par:0};
let UI={...UI_DEF};try{UI={...UI_DEF,...JSON.parse(localStorage.getItem('zoner_ui')||'{}')}}catch{}
if(!['auto','dark','purple','light','neon','custom'].includes(UI.bg))UI.bg='auto';if(!['frost','glass','neu','flat'].includes(UI.bub))UI.bub='frost';
const saveUI=()=>{try{localStorage.setItem('zoner_ui',JSON.stringify(UI))}catch{}};
function applyUI(){
 document.documentElement.dataset.bubble=UI.bub||'frost';applyBg();const r=document.documentElement.style,dark=(D.theme||'dark')==='dark';
 r.setProperty('--mfs',UI.fs+'px');r.setProperty('--mbox',UI.box);r.setProperty('--mrad',UI.rad+'px');
 r.setProperty('--ff',(FONTS.find(f=>f[0]===UI.font)||FONTS[0])[2]);
 const A=ACCS.find(a=>a[0]===UI.acc),keys=['--acc','--acc2','--act','--g-out','--hover','--sel','--orb1','--orb2','--orb3'];
 if(!A||A[1]==null){keys.forEach(k=>r.removeProperty(k));return}
 const h=A[1];
 r.setProperty('--acc',dark?`hsl(${h} 95% 78%)`:`hsl(${h} 75% 46%)`);r.setProperty('--acc2',`hsl(${h} 85% 62%)`);
 r.setProperty('--act',dark?`hsla(${h},85%,62%,.55)`:`hsla(${h},85%,60%,.88)`);
 r.setProperty('--g-out',dark?`linear-gradient(145deg,hsla(${h},100%,72%,.68),hsla(${h},75%,40%,.34))`:`linear-gradient(145deg,hsla(${h},100%,66%,.9),hsla(${h},70%,42%,.64))`);
 r.setProperty('--hover',`hsla(${h},85%,70%,.14)`);r.setProperty('--sel',`hsla(${h},85%,65%,.25)`);
 r.setProperty('--orb1',`hsl(${h} 85% 62%)`);r.setProperty('--orb2',`hsl(${(h+50)%360} 80% 62%)`);r.setProperty('--orb3',`hsl(${(h+160)%360} 80% 60%)`);
}
function closePersonalize(){const o=$('#pers');o.classList.remove('on');setTimeout(()=>{o.hidden=true;o.replaceChildren()},230)}
function openPersonalize(){closeDrawer();const o=$('#pers');o.hidden=false;paintPers();requestAnimationFrame(()=>o.classList.add('on'))}
let PT='look';
function mkNav(items,cur,fn,cls=''){const n=el('nav','pnav '+cls);items.forEach(([k,ic,lb])=>{const b=el('button',k===cur?'on':'');b.append(k===cur?el('i','dot'):icon(ic,18),el('span','',lb));b.onclick=()=>fn(k);n.append(b)});return n}
function paintPers(){
 const o=$('#pers'),keep=o.scrollTop,inn=el('div','pers-in'),top=el('div','pers-top');
 const bk=el('button','icon');bk.append(icon('back',22));bk.onclick=closePersonalize;top.append(bk,el('h3','',t('personalize')));
 const card=(title,...k)=>{const c=el('div','pcard');if(title)c.append(el('h4','',title));c.append(...k);return c};
 inn.append(top);
 {
  const tm=el('div','themec');[['dark','pDark','moon'],['light','pLight','sun']].forEach(([v,k,ic])=>{const b=el('button',(D.theme||'dark')===v?'on':'');b.append(icon(ic,22),el('span','',t(k)));b.onclick=()=>{mutate(()=>D.theme=v);applyLang();paintPers()};tm.append(b)});
  const sw=el('div','sw');ACCS.forEach(([id,h,c])=>{const b=el('button',UI.acc===id?'on':'');b.style.background=c;b.onclick=()=>{UI.acc=id;saveUI();applyUI();paintPers()};sw.append(b)});
  inn.append(card(t('pTheme'),tm),card(t('pAccent'),sw));
 }
 {
  const pv=el('div','pprev'),m1=el('div','msg their'),b1=el('div','body'),x1=el('div','tx',t('pS1')),mt1=el('div','meta2');x1.dir='auto';mt1.append(el('span','','21:30'));b1.append(x1,mt1);m1.append(b1);
  const m2=el('div','msg mine'),b2=el('div','body'),x2=el('div','tx');x2.dir='auto';rich(t('pS2'),x2);const mt2=el('div','meta2');mt2.append(el('span','','21:31'));b2.append(x2,mt2);m2.append(b2);pv.append(m1,m2);
  const sl=(label,key,min,max,step,fmt)=>{const r=el('div','prow'),i=el('input'),out=el('output','',fmt(UI[key]));i.type='range';i.min=min;i.max=max;i.step=step;i.value=UI[key];i.oninput=()=>{UI[key]=+i.value;out.textContent=fmt(UI[key]);saveUI();applyUI()};r.append(el('label','',label),i,out);return r};
  const bg=el('div','bubg');[['frost','bubFrost'],['glass','bubGlass'],['neu','bubNeu'],['flat','bubFlat']].forEach(([id,k])=>{
   const b=el('button','bubo'+(UI.bub===id?' on':'')),pw=el('div','bpv');pw.dataset.bubble=id;
   const a=el('div','msg their');a.append(el('div','tx',t('pS1')));const c=el('div','msg mine');c.append(el('div','tx',t('pS2')));pw.append(a,c);
   b.append(pw,el('span','',t(k)));b.onclick=()=>{UI.bub=id;saveUI();applyUI();paintPers()};bg.append(b)});
  inn.append(card(t('pMsg'),pv,sl(t('pText'),'fs',12,22,1,v=>v.toLocaleString(loc())+'px'),sl(t('pBox'),'box',.7,1.7,.05,v=>Math.round(v*100).toLocaleString(loc())+'%'),sl(t('pRound'),'rad',6,30,1,v=>v.toLocaleString(loc()))),card(t('pBubble'),bg));
 }
 inn.append(card(t('pBg'),...bgCard()));
 {
  const fl=el('div','fonts');FONTS.forEach(([id,k,ff])=>{const b=el('button','fontrow'+(UI.font===id?' on':''));b.style.fontFamily=ff;const nm=el('b','',t(k)),sm=el('span','',t('fontSample'));const ck=el('i','ckk');ck.append(icon('check',16));b.append(el('div','',''),ck);b.firstChild.append(nm,sm);b.onclick=()=>{UI.font=id;saveUI();applyUI();paintPers()};fl.append(b)});
  inn.append(card(t('pFont'),fl));
 }
 inn.append(B(t('pReset'),()=>{UI={...UI_DEF};saveUI();applyUI();paintPers()},'btn ghost'));
 o.replaceChildren(inn);o.scrollTop=keep;
}

/* ---------- v1.0.9 ---------- */
/* ذخیره‌ی فایل‌ها/ویدیوها در IndexedDB (جدا از localStorage) */
const IDB={db:null,open(){return this.db||(this.db=new Promise((res,rej)=>{const r=indexedDB.open('zoner_media',1);r.onupgradeneeded=()=>r.result.createObjectStore('b');r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)}))},
 async put(k,b){const d=await this.open();return new Promise((res,rej)=>{const tx=d.transaction('b','readwrite');tx.objectStore('b').put(b,k);tx.oncomplete=()=>res(true);tx.onerror=tx.onabort=()=>rej(tx.error)})},
 async get(k){const d=await this.open();return new Promise((res,rej)=>{const r=d.transaction('b').objectStore('b').get(k);r.onsuccess=()=>res(r.result||null);r.onerror=()=>rej(r.error)})},
 async keys(){const d=await this.open();return new Promise(res=>{const r=d.transaction('b').objectStore('b').getAllKeys();r.onsuccess=()=>res(r.result||[]);r.onerror=()=>res([])})},
 async del(k){const d=await this.open();return new Promise(res=>{const tx=d.transaction('b','readwrite');tx.objectStore('b').delete(k);tx.oncomplete=()=>res(true);tx.onerror=()=>res(false)})}};
const fmtSize=n=>n<1024?n+' B':n<1048576?(n/1024).toFixed(0)+' KB':(n/1048576).toFixed(1)+' MB';
async function dlFile(f){try{const b=await IDB.get(f.key);if(!b)return toast(t('fileGone'));const a=el('a');a.href=URL.createObjectURL(b);a.download=f.name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),5000)}catch{toast(t('fileGone'))}}
function mkFile(m){
 const f=m.file,w=el('div','filec'),ic=el('div','fic'),mt=el('div','fmeta'),dl=el('button','fdl');
 ic.append(icon('file',24));mt.append(el('b','',f.name),el('small','',fmtSize(f.size)));dl.append(icon('download',18));w.append(ic,mt,dl);
 w.onclick=e=>{e.stopPropagation();dlFile(f)};return w;
}
$('#docFile').onchange=async e=>{const f=e.target.files[0];e.target.value='';if(!f)return;if(f.size>50*1048576)return toast(t('fileBig'));
 const key='f_'+uid();try{await IDB.put(key,f)}catch{return toast(t('fileBig'))}send({file:{key,name:f.name,size:f.size,type:f.type}})};

/* ایموت کنار متن */
let PE=[];
function addPend(src){if(PE.length>=4)return;PE.push(src);$('#picker').hidden=true;renderPend();updComposer();if(matchMedia('(pointer:fine)').matches)$('#text').focus();setTyping('text')}
function renderPend(){const p=$('#pend');p.replaceChildren();p.hidden=!PE.length;
 PE.forEach((src,k)=>{const c=el('div','pe'),i=el('img');i.src=src;i.alt='';const x=el('button','');x.type='button';x.title=t('rmPend');x.append(icon('close',12));x.onclick=()=>{PE.splice(k,1);renderPend();updComposer()};c.append(i,x);p.append(c)});}

/* گیف/ایموت بدون زمینه => بدون حباب */
function isTransparent(src){return new Promise(res=>{const im=new Image();im.onload=()=>{try{const c=document.createElement('canvas'),w=c.width=Math.min(48,im.naturalWidth||48),h=c.height=Math.min(48,im.naturalHeight||48),g=c.getContext('2d');g.drawImage(im,0,0,w,h);const d=g.getImageData(0,0,w,h).data;let n=0;for(let k=3;k<d.length;k+=4)if(d[k]<40)n++;res(n/(w*h)>.03)}catch{res(false)}};im.onerror=()=>res(false);im.src=src})}
async function sendGif(src,cap){const tr=await isTransparent(src);send({gif:src,...(tr&&{tr:1}),caption:cap})}

/* دسترسی میکروفون/دوربین: فقط یک‌بار */
async function micDenied(){try{const st=await navigator.permissions.query({name:'microphone'});return st.state==='denied'}catch{return false}}
async function askMediaOnce(){
 if(!SID||!me()||localStorage.getItem('zoner_perm')||!navigator.mediaDevices?.getUserMedia||!window.isSecureContext||!$('#modal').hidden)return;
 try{localStorage.setItem('zoner_perm','1')}catch{}
 try{const st=await navigator.permissions.query({name:'microphone'});if(st.state!=='prompt'){localStorage.setItem('zoner_perm','1');return}}catch{}
 const done=()=>{try{localStorage.setItem('zoner_perm','1')}catch{}};
 openModal(el('h3','',t('permT')),el('p','bio',t('permD')),btns(B(t('permOk'),async()=>{done();closeModal();let st=null;
  try{st=await navigator.mediaDevices.getUserMedia({audio:true,video:true})}catch{try{st=await navigator.mediaDevices.getUserMedia({audio:true})}catch{toast(t('micDenied'))}}
  if(st)st.getTracks().forEach(x=>x.stop())}),B(t('permLater'),()=>{done();closeModal()},'btn ghost')));
}


/* ---------- v1.1.0: پس‌زمینهٔ چت (بلور + حرکت نرم با موس) ---------- */
const BGS=[['auto','bgAuto'],['dark','bgDark'],['purple','bgPurple'],['light','bgLight'],['neon','bgNeonG'],['custom','bgCustom']];
const BGIMG={dark:'bg/bg-black.jpg',purple:'bg/bg-dark.jpg',light:'bg/bg-light.jpg',neon:'bg/bg-neon.jpg'};
/* خودکار: تم روشن ← گیمینگ روشن، تم تیره ← گیمینگ دارک. اگر کاربر خودش انتخاب کرده باشد با تم عوض نمی‌شود */
const bgKey=()=>UI.bg==='auto'?((D.theme||'dark')==='light'?'light':'dark'):UI.bg;
async function setBgLayer(L){
 const my=L._tk=(L._tk||0)+1,i=L.firstElementChild,light=document.documentElement.dataset.theme==='light';
 L.style.setProperty('--bgblur',UI.blur+'px');L.style.setProperty('--dim',UI.dim>0?(light?`rgba(255,255,255,${UI.dim})`:`rgba(8,4,20,${UI.dim})`):'transparent');
 if(UI.bg==='custom'){let b=null;try{b=await IDB.get('bg_custom')}catch{}if(my!==L._tk)return;if(!b){i.style.background=`#0b0b10 center top/440px auto repeat url(${BGIMG.dark})`;return}
  const u=URL.createObjectURL(b);if(L._u)URL.revokeObjectURL(L._u);L._u=u;i.style.background=`center/cover url(${u})`}
 else i.style.background=`${UI.bg==='auto'&&bgKey()==='dark'?'#0b0b10':''} center top/440px auto repeat url(${BGIMG[bgKey()]})`;
}
function bindParallax(host,L){
 if(host._par)return;host._par=1;const st={x:0,y:0,tx:0,ty:0,raf:0};
 const tick=()=>{st.x+=(st.tx-st.x)*.05;st.y+=(st.ty-st.y)*.05;L.style.setProperty('--px',st.x.toFixed(2)+'px');L.style.setProperty('--py',st.y.toFixed(2)+'px');st.raf=(Math.abs(st.tx-st.x)>.04||Math.abs(st.ty-st.y)>.04)?requestAnimationFrame(tick):0};
 const kick=()=>{if(!st.raf)st.raf=requestAnimationFrame(tick)};
 host.addEventListener('mousemove',e=>{if(!UI.par||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const r=host.getBoundingClientRect();st.tx=-((e.clientX-r.left)/r.width-.5)*2*UI.par;st.ty=-((e.clientY-r.top)/r.height-.5)*2*UI.par;kick()});
 host.addEventListener('mouseleave',()=>{st.tx=st.ty=0;kick()});
}
async function applyBg(){
 const chat=document.querySelector('.chat'),L=$('#chatbg');if(!chat||!L)return;
 chat.classList.add('cbg');bindParallax(chat,L);if(!UI.par){L.style.setProperty('--px','0px');L.style.setProperty('--py','0px')}
 await setBgLayer(L);
}
function bgCard(){
 const out=[],grid=el('div','bgg'),f=el('input');f.type='file';f.accept='image/*';f.hidden=true;
 f.onchange=()=>{const x=f.files[0];f.value='';if(!x)return;shrink(x,1600,.82,async d=>{try{const blob=await (await fetch(d)).blob();await IDB.put('bg_custom',blob);UI.bg='custom';saveUI();await applyBg();paintPers()}catch{toast(t('full'))}})};
 BGS.forEach(([id,k])=>{const b=el('button','bgt'+(UI.bg===id?' on':'')),i=el('i');
  if(id==='auto')i.className='auto';else if(id==='custom'){i.className='cust';i.append(icon('plus',22))}else i.style.background=`#0b0b10 center top/110px auto repeat url(${BGIMG[id]})`;
  b.append(i,el('span','',t(k)));b.onclick=()=>{if(id==='custom'){f.click();return}UI.bg=id;saveUI();applyBg();paintPers()};grid.append(b)});
 const pv=el('div','bgprev'),L=el('div','chatbg'),li=el('i');L.append(li);pv.append(L);
 const m1=el('div','msg their'),b1=el('div','body');b1.append(el('div','tx',t('pS1')));m1.append(b1);const m2=el('div','msg mine'),b2=el('div','body');b2.append(el('div','tx',t('pS2')));m2.append(b2);
 const col=el('div','bgmsgs');col.append(m1,m2);pv.append(col);bindParallax(pv,L);setBgLayer(L);
 const row=(label,key,min,max,step,fmt)=>{const r=el('div','prow'),i=el('input'),o=el('output','',fmt(UI[key]));i.type='range';i.min=min;i.max=max;i.step=step;i.value=UI[key];
  i.oninput=()=>{UI[key]=+i.value;o.textContent=fmt(UI[key]);saveUI();applyBg();setBgLayer(L)};r.append(el('label','',label),i,o);return r};
 out.push(pv,grid,f,el('small','muted',t('pAutoHint')),row(t('pBlur'),'blur',0,30,1,v=>v.toLocaleString(loc())+'px'),row(t('pDim'),'dim',0,.7,.05,v=>Math.round(v*100).toLocaleString(loc())+'%'),row(t('pPar'),'par',0,30,1,v=>v?v.toLocaleString(loc()):'—'),el('small','muted',t('pParHint')));
 return out;
}

/* ---------- v1.2.1: تنظیمات به سبک تلگرام ---------- */
let ST='main';
function closeSettings(){const o=$('#sett');o.classList.remove('on');setTimeout(()=>{o.hidden=true;o.replaceChildren()},230)}
function openSettings(tab){closeDrawer();ST=tab||'main';const o=$('#sett');o.hidden=false;paintSettings();requestAnimationFrame(()=>o.classList.add('on'))}
const devInfo=()=>{const u=navigator.userAgent;return{br:/Edg\//.test(u)?'Edge':/OPR\//.test(u)?'Opera':/Firefox\//.test(u)?'Firefox':/Chrome\//.test(u)?'Chrome':/Safari\//.test(u)?'Safari':'Browser',os:/Android/.test(u)?'Android':/iPhone|iPad/.test(u)?'iOS':/Windows/.test(u)?'Windows':/Mac OS/.test(u)?'macOS':/Linux/.test(u)?'Linux':''}};
async function mediaKeys(){let k=[];try{k=await IDB.keys()}catch{}return k.filter(x=>/^(f_|vid_)/.test(String(x)))}
function paintSettings(){
 const o=$('#sett'),keep=o.scrollTop,inn=el('div','pers-in'),top=el('div','pers-top'),u=me();
 const TT={main:'settings',account:'tgAccount',devices:'tgDevices',notif:'tgNotif',privacy:'tgPrivacy',blocked:'tgBlocked',data:'tgData',chat:'tgChat',lang:'tgLang',about:'sAbout'};
 const go=k=>{ST=k;paintSettings();o.scrollTop=0};
 const bk=el('button','icon');bk.append(icon('back',22));bk.onclick=()=>{if(ST==='main')closeSettings();else go(ST==='blocked'?'privacy':'main')};
 top.append(bk,el('h3','',t(TT[ST]||'settings')));inn.append(top);
 const grp=(...r)=>{const g=el('div','tgg');g.append(...r);return g};
 const trow=(c,ic,label,val,fn,cls='')=>{const b=el('button','tgr '+cls),i=el('span','tgi');i.style.background=`linear-gradient(145deg,${c},color-mix(in srgb,${c} 68%,#000))`;i.append(icon(ic,18));b.append(i,el('span','tgl',label));if(val)b.append(el('span','tgv',val));if(!cls.includes('red')){const ch=icon('back',16);ch.classList.add('tgc');b.append(ch)}b.onclick=fn;return b};
 const tog=(label,sub,get,set)=>{const r=el('div','tgr plain'),g=el('div','tgl'),w=el('span','chk'),cb=el('input','tg');cb.type='checkbox';cb.checked=!!get();cb.onchange=()=>set(cb.checked);g.append(el('b','',label));if(sub)g.append(el('small','',sub));w.append(cb);r.append(g,w);return r};
 const info=(l,v)=>{const r=el('div','tgr plain info');r.append(el('b','',v||'—'),el('small','',l));return r};
 const cap=x=>el('div','tgcap',x);
 const prof=(click)=>{const p=el(click?'button':'div','tg-prof');p.append(userAv(u,click?88:76),el('b','',u.name),el('small','','@'+u.id+(u.phone?' · '+u.phone:'')));if(click)p.onclick=click;return p};
 const accts_=()=>{const ab=acctBlock();ab.classList.add('tgacc');ab.addEventListener('click',e=>{if(e.target.closest('button'))setTimeout(closeSettings,0)});return ab};
 if(ST==='main'){
  inn.append(prof(()=>go('account')),
   grp(trow('#3b82f6','user',t('tgAccount'),'',()=>go('account')),trow('#38bdf8','bookmark',t('saved'),'',()=>{closeSettings();openSpace('saved:'+SID)}),trow('#f59e0b','device',t('tgDevices'),'',()=>go('devices'))),
   grp(trow('#ef4444','bell',t('tgNotif'),'',()=>go('notif')),trow('#64748b','lock',t('tgPrivacy'),'',()=>go('privacy')),trow('#22c55e','db',t('tgData'),'',()=>go('data')),trow('#f97316','chat',t('tgChat'),'',()=>go('chat')),trow('#a855f7','palette',t('tgLook'),'',()=>openPersonalize())),
   grp(trow('#14b8a6','globe',t('tgLang'),lang==='fa'?'فارسی':'English',()=>go('lang')),trow('#8b5cf6','info',t('sAbout'),'v'+VER,()=>go('about'))),
   grp(trow('#ef4444','logout',t('logout'),'',()=>{closeSettings();logout()},'red')));
 }
 if(ST==='account')inn.append(prof(),grp(info(t('first'),u.first||u.name),info(t('last'),u.last),info(t('idLine'),'@'+u.id),info(t('phoneL'),u.phone),info(t('email'),u.email),info(t('bio'),u.bio)),
  grp(trow('#3b82f6','edit',t('editProfile'),'',()=>myProfile())),grp(accts_()),grp(trow('#ef4444','trash',t('delAcct'),'',delAccountUI,'red')));
 if(ST==='devices'){
  const d=devInfo(),r=el('div','tgr plain'),i=el('span','tgi');i.style.background='linear-gradient(145deg,#f59e0b,#b45309)';i.append(icon('device',18));
  const g=el('div','tgl');g.append(el('b','',d.br+(d.os?' · '+d.os:'')),el('small','',t('devNow')));r.append(i,g);
  inn.append(grp(r),el('div','tgcap',t('devAcc')),grp(accts_()),cap(t('devNote')));
 }
 if(ST==='notif')inn.append(grp(
  tog(t('nSound'),t('nSoundD'),()=>UI.nSound!==0,v=>{UI.nSound=v?1:0;saveUI()}),
  tog(t('nToast'),t('nToastD'),()=>UI.nToast!==0,v=>{UI.nToast=v?1:0;saveUI()}),
  tog(t('nPrev'),t('nPrevD'),()=>UI.nPrev!==0,v=>{UI.nPrev=v?1:0;saveUI()})));
 if(ST==='privacy'){
  const nb=(u.blocked||[]).length;
  inn.append(grp(tog(t('hideSeen'),t('hideSeenD'),()=>u.hideSeen,v=>{mutate(()=>{D.users[SID].hideSeen=v?1:0})})),
   grp(trow('#ef4444','close',t('tgBlocked'),nb.toLocaleString(loc()),()=>go('blocked')),trow('#64748b','lock',t('chgPw'),'',changePw)));
 }
 if(ST==='blocked'){
  const bl=(me().blocked||[]);
  if(!bl.length)inn.append(el('div','sempty',t('noBlocked')));
  else inn.append(grp(...bl.map(h=>{const x=D.users[h],r=el('div','tgr plain');r.append(userAv(x||{id:h,name:h},38),el('div','tgl',x?x.name:h));const b=B(t('unblock'),()=>{mutate(()=>{D.users[SID].blocked=(D.users[SID].blocked||[]).filter(y=>y!==h)});paintSettings();renderList()},'btn ghost');b.style.padding='6px 12px';r.append(b);return r})));
 }
 if(ST==='data'){
  const bar=el('div','stbar'),a=el('i'),b2=el('i'),leg=el('div','stleg'),l1=el('span'),l2=el('span');a.style.background='var(--acc2)';b2.style.background='#22c55e';bar.append(a,b2);
  const msgB=((localStorage.getItem(K)||'').length)*2;l1.innerHTML='';l1.append(t('stMsgs')+': ',el('b','',fmtSize(msgB)));l2.append(t('stMedia')+': ',el('b','','…'));leg.append(l1,l2);
  const card=el('div','tgr plain info');card.append(el('b','',t('stUsage')),bar,leg);
  (async()=>{const ks=await mediaKeys();let tot=0;for(const k of ks){try{const bl=await IDB.get(k);if(bl)tot+=bl.size}catch{}}
   l2.lastChild.textContent=fmtSize(tot);const all=Math.max(msgB+tot,1);a.style.width=(msgB/all*100)+'%';b2.style.width=(tot/all*100)+'%'})();
  inn.append(grp(card),grp(trow('#ef4444','trash',t('clearMedia'),'',()=>openModal(el('h3','',t('clearMedia')),el('p','bio',t('clearMediaQ')),btns(B(t('delBtn'),async()=>{for(const k of await mediaKeys())await IDB.del(k);closeModal();toast(t('cleared'));paintSettings()},'btn del'),B(t('cancel'),closeModal,'btn ghost'))),'red')),
   grp(trow('#22c55e','download',t('backup'),'',backup),trow('#3b82f6','upload',t('restore'),'',()=>$('#restoreFile').click())),cap(t('backupD')));
 }
 if(ST==='chat')inn.append(grp(tog(t('enterSend'),t('enterSendD'),()=>UI.enter!==0,v=>{UI.enter=v?1:0;saveUI()})),grp(trow('#a855f7','palette',t('tgLook'),'',()=>openPersonalize())));
 if(ST==='lang'){
  const row=(v,lb)=>{const r=el('button','tgr plain');r.append(el('span','tgl',lb));if(lang===v){const c=icon('check',20);c.style.color='var(--acc)';r.append(c)}r.onclick=()=>{if(v!==lang)toggleLang();paintSettings()};return r};
  inn.append(grp(row('fa','فارسی'),row('en','English')));
 }
 if(ST==='about'){
  const vc=el('div','vcard');vc.append(el('small','muted',t('curVer')),el('div','vbig','v'+VER));
  const nt=el('div','notes');
  fetch('version.json?_='+Date.now(),{cache:'no-store'}).then(r=>r.json()).then(j=>{if(j&&j.version===VER&&Array.isArray(j.notes)&&j.notes.length){nt.append(el('small','',t('whatsNew')));j.notes.forEach(n=>nt.append(el('span','','• '+n)))}}).catch(()=>{});
  const c=el('div','pcard');c.append(vc,nt);inn.append(c,grp(trow('#8b5cf6','refresh',t('checkUp'),'',aboutUpdate)));
 }
 o.replaceChildren(inn);o.scrollTop=keep;
}
function changePw(){
 const a=input('',t('oldPw'),60),b=input('',t('newPw'),60),err=el('p','error');a.type=b.type='password';a.dir=b.dir='ltr';
 openModal(el('h3','',t('chgPw')),a,b,err,btns(B(t('save'),async()=>{fresh();const u=me();
  if(!u||!u.pw||(u.pw!==await hash(a.value)&&u.pw!==djb(a.value)))return err.textContent=t('wrong');
  if(b.value.length<4)return err.textContent=t('pwShort');const h=await hash(b.value);mutate(()=>{D.users[SID].pw=h});closeModal();toast(t('pwChanged'))}),B(t('cancel'),closeModal,'btn ghost')));
}

/* ---------- v1.2.0: پیام زمان‌بندی‌شده ---------- */
function schOf(){return (me()&&me().sched)||[]}
function updSch(){const b=$('#schBtn');if(!b)return;const n=SID&&me()&&curId?schOf().filter(x=>x.sp===curId).length:0;b.hidden=!n;$('#schN').textContent=n.toLocaleString(loc())}
/* ارسال پیام‌های زمان‌بندی‌شدهٔ سررسیده (یا یک مورد دلخواه) */
function flushSched(pred){
 if(!SID||!me()||!schOf().some(pred))return 0;if(flushSched.bad&&Date.now()-flushSched.bad<30000)return 0;
 let fired=0;const touched=new Set();
 const ok=mutate(()=>{const u=D.users[SID];if(!u)return;const keep=[];
  for(const x of u.sched||[]){if(!pred(x)){keep.push(x);continue}const s=D.spaces[x.sp];
   if(s&&canPost(s)){s.msgs.push({id:uid(),ts:Date.now(),from:SID,...(s.type==='dm'&&blockedBy(other(s),SID)&&{blk:1}),...x.msg});fired++;touched.add(x.sp)}}
  u.sched=keep});
 if(!ok){flushSched.bad=Date.now();return 0}
 if(fired){renderList();if(curId&&touched.has(curId)){paintHead();renderMsgs(true)}toast(t('schFired'))}
 updSch();return fired;
}
setInterval(()=>{const n=Date.now();flushSched(x=>x.ts<=n)},1000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden){const n=Date.now();flushSched(x=>x.ts<=n)}});
/* نگه‌داشتن دکمه (تاچ و موس) */
function holdBtn(b,fn){
 let tm=0,fired=false;
 const fire=()=>{fired=true;clearTimeout(tm);try{navigator.vibrate&&navigator.vibrate(14)}catch{}b.classList.add('hold');setTimeout(()=>b.classList.remove('hold'),460);fn()};
 b.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;fired=false;clearTimeout(tm);tm=setTimeout(fire,480)});
 ['pointerup','pointerleave','pointercancel'].forEach(ev=>b.addEventListener(ev,()=>clearTimeout(tm)));
 b.addEventListener('click',e=>{if(fired){fired=false;e.preventDefault();e.stopImmediatePropagation()}},true);
 b.addEventListener('contextmenu',e=>{e.preventDefault();if(!fired)fire()});
}
function schedFromComposer(){
 const s=S();if(!s||!canPost(s))return;if(edit)return toast(t('schEdit'));
 const ta=$('#text'),text=ta.value.trim();
 if(!text&&!PE.length)return openSched(null);
 const msg={...(text&&{text}),...(PE.length&&{emote:PE[0],...(PE.length>1&&{emotes:PE.slice()})}),...(reply&&{replyTo:reply})};
 openSched({msg,drafts:true,done(){ta.value='';PE=[];renderPend();clearBar();autosize();setTyping(null)}});
}
function schedVoice(){
 if(rec.st!=='review'||!rec.blob)return;const d=rec.dur,wv=rec.wave,fr=new FileReader();
 fr.onload=()=>{const v=fr.result;if(v.length>1.6e6)return toast(t('big'));openSched({msg:{voice:v,dur:d,...(wv&&{wave:wv}),...(reply&&{replyTo:reply})},done(){recCancel();clearBar()}})};fr.readAsDataURL(rec.blob);
}
function closeSheet(){const h=$('#sheet');h.classList.remove('on');setTimeout(()=>{h.hidden=true;h.replaceChildren()},260)}
function openSched(draft){
 const sp=curId,s=S();if(!sp||!s)return;
 const host=$('#sheet');let tab=draft?'new':'list',when=null;
 const pad=n=>String(n).padStart(2,'0');
 const fmtL=ts=>new Date(ts).toLocaleString(loc(),{weekday:'short',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'});
 const fmtS=ts=>{const d=new Date(ts),n=new Date();return d.toDateString()===n.toDateString()?hm(ts):d.toLocaleString(loc(),{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'})};
 const at=(d,h,m=0)=>{const x=new Date(d);x.setHours(h,m,0,0);return x.getTime()};
 const now0=Date.now(),n0=new Date(),tmr=new Date(n0);tmr.setDate(tmr.getDate()+1);const wk=new Date(n0);wk.setDate(wk.getDate()+7);
 const chips=[['q10',now0+10*60e3],['q60',now0+60*60e3],n0.getHours()*60+n0.getMinutes()<20*60+30?['qNight',at(n0,21)]:['qWeek',at(wk,9)],['qTom',at(tmr,9)]];
 const nextHour=()=>{const d=new Date();d.setMinutes(0,0,0);d.setHours(d.getHours()+1);return d.getTime()};
 const paint=()=>{
  host.replaceChildren();const sh=el('div','sheet');host.onclick=e=>{if(e.target===host)closeSheet()};
  const head=el('div','sh-head'),ic=el('div','sh-ico');ic.append(icon('clock',24));const gr=el('div','grow'),x=el('button','icon');x.append(icon('close',20));x.onclick=closeSheet;
  gr.append(el('h3','',t('schedT')),el('small','',t('schTo')+' '+spName(s)));head.append(ic,gr,x);sh.append(el('div','grab'),head);
  const cnt=schOf().length;
  if(draft)sh.append(mkNav([['new','cal',t('schNew')],['list','clock',t('schList')+(cnt?' · '+cnt.toLocaleString(loc()):'')]],tab,k=>{tab=k;paint()},'sm'));
  if(tab==='new'&&draft){
   /* پیش‌نمایش */
   const pv=el('div','sh-pv'),m=el('div','msg mine'),m_=draft.msg;
   if(m_.voice){const vm=el('div','vm'),b=el('div','vplay'),mid=el('div','vmid');b.append(icon('play',18));mid.append(mkWave(waveOf({wave:m_.wave,dur:m_.dur,id:'p'})),el('small','',fmtDur(m_.dur||0)));vm.append(b,mid);m.append(vm)}
   if(m_.emote||m_.emotes){const r=el('div','emorow');(m_.emotes||[m_.emote]).forEach(src=>{const i=el('img','emote');i.src=src;i.style.height='38px';r.append(i)});m.append(r)}
   if(m_.text){const tx=el('div','tx');tx.dir='auto';rich(m_.text,tx);m.append(tx)}
   const wh=el('div','when');wh.append(icon('clock',13),el('span','',''));pv.append(m,wh);sh.append(pv);
   const cta=el('button','cta'),setCta=()=>{wh.lastChild.textContent=when?fmtL(when):'—';cta.replaceChildren();cta.disabled=!when;cta.append(icon('clock',20),el('span','',t('schGo')));if(when)cta.append(el('small','','· '+fmtL(when)))};
   const grid=el('div','chips'),dI=el('input'),tI=el('input');dI.type='date';tI.type='time';
   const toInputs=ts=>{const d=new Date(ts);dI.value=`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;tI.value=`${pad(d.getHours())}:${pad(d.getMinutes())}`};
   const mark=()=>[...grid.children].forEach((b,i)=>b.classList.toggle('on',when===chips[i][1]));
   chips.forEach(([k,ts])=>{const b=el('button','chipx');b.append(el('b','',t(k)),el('small','',fmtS(ts)));b.onclick=()=>{when=ts;toInputs(ts);mark();setCta()};grid.append(b)});
   const nd=new Date();dI.min=`${nd.getFullYear()}-${pad(nd.getMonth()+1)}-${pad(nd.getDate())}`;
   const fromInputs=()=>{if(!dI.value||!tI.value){when=null}else{const v=new Date(dI.value+'T'+tI.value).getTime();when=isNaN(v)?null:v}mark();setCta()};
   dI.oninput=tI.oninput=fromInputs;
   if(!when)when=nextHour();toInputs(when);
   const dt=el('div','dtrow');dt.append(dI,tI);
   cta.onclick=()=>{
    if(!when||when<Date.now()+5000)return toast(t('schPast'));
    if(mutate(()=>{const u=D.users[SID];u.sched=u.sched||[];u.sched.push({id:uid(),sp,ts:when,msg:draft.msg});if(draft.drafts)delete u.drafts[sp]})){const w=when;draft.done&&draft.done();closeSheet();updSch();toast(t('schDone')+' · '+fmtL(w))}
   };
   sh.append(el('div','sh-lab',t('schQuick')),grid,el('div','sh-lab',t('schCustom')),dt,cta);mark();setCta();
  }else{
   const list=el('div','sch-list'),items=schOf().slice().sort((a,b)=>a.ts-b.ts);
   if(!items.length){const em=el('div','sch-empty'),i2=el('div','sh-ico');i2.append(icon('clock',24));em.append(i2,el('b','',t('schNone')),el('small','',t('schNoneD')));list.append(em)}
   items.forEach(x=>{
    const sp2=D.spaces[x.sp],it=el('div','sch-item'),g=el('div','grow'),mm=x.msg||{};
    const lbl=mm.text?plainT(mm.text):mm.voice?'🎤 '+t('voice'):mm.emote?'😺 '+t('emote'):'…';
    g.append(el('b','',lbl),el('small','t',fmtL(x.ts)),el('small','',t('schTo')+' '+(sp2?spName(sp2):'—')));
    const act=el('div','sch-act'),go=el('button','icon go'),del=el('button','icon');go.title=t('schNow');del.title=t('schDel');go.append(icon('send',18));del.append(icon('trash',18));
    go.onclick=()=>{flushSched(y=>y.id===x.id);paint()};
    del.onclick=()=>{mutate(()=>{const u=D.users[SID];u.sched=(u.sched||[]).filter(y=>y.id!==x.id)});updSch();paint()};
    act.append(go,del);it.append(g,act);list.append(it)});
   sh.append(list);
  }
  host.append(sh);
 };
 paint();host.hidden=false;requestAnimationFrame(()=>host.classList.add('on'));
}
$('#schBtn').onclick=()=>openSched(null);
holdBtn($('#send'),schedFromComposer);
holdBtn($('#recGo'),()=>{if(rec.st==='review')schedVoice()});

/* ---------- v1.2.0: پیام ویدئویی (حداکثر ۱ دقیقه) ---------- */
const VMAX=60,VR_C=2*Math.PI*48;
const vr={st:'idle',stream:null,mr:null,chunks:[],t0:0,tm:null,dur:0,blob:null,url:null,fm:'user',poster:null};
const vrMime=()=>['video/webm;codecs=vp9,opus','video/webm;codecs=vp8,opus','video/webm','video/mp4'].find(x=>window.MediaRecorder&&MediaRecorder.isTypeSupported(x))||'';
const vrStopStream=()=>{if(vr.stream)mediaIdle();vr.stream=null};
async function openVidRec(){
 const s=S();if(!s||!canPost(s)||vr.st!=='idle')return;
 if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder)return toast(t('vidNoCam'));
 const h=$('#vrec');h.hidden=false;requestAnimationFrame(()=>h.classList.add('on'));vr.st='init';vr.blob=vr.poster=null;paintVr();await vrCam();
}
async function vrCam(){
 vr.stream=null;let st;
 try{st=await getMedia(true,vr.fm)}
 catch(e){closeVidRec();return toast(t(mediaErr(e)))}
 if(vr.st==='idle'){mediaIdle();return}
 vr.stream=st;vr.st='ready';paintVr();
}
function closeVidRec(){
 clearInterval(vr.tm);if(vr.mr){vr.mr.onstop=null;try{if(vr.mr.state!=='inactive')vr.mr.stop()}catch{}}vr.mr=null;vrStopStream();
 if(vr.url)URL.revokeObjectURL(vr.url);vr.url=vr.blob=vr.poster=null;const was=vr.st;vr.st='idle';
 const h=$('#vrec');h.classList.remove('on');setTimeout(()=>{if(vr.st==='idle'){h.hidden=true;h.replaceChildren()}},240);if(was==='rec')setTyping(null);
}
function vrSnap(){
 const v=$('#vrec video');if(!v||!v.videoWidth)return;
 try{const c=el('canvas'),sz=Math.min(v.videoWidth,v.videoHeight);c.width=c.height=240;c.getContext('2d').drawImage(v,(v.videoWidth-sz)/2,(v.videoHeight-sz)/2,sz,sz,0,0,240,240);vr.poster=c.toDataURL('image/jpeg',.72)}catch{}
}
function vrTick(){
 const e=(Date.now()-vr.t0)/1000;vr.dur=Math.min(e,VMAX);const tt=$('#vrT'),fg=$('#vrFg');
 const ts=$('#vrTs');if(ts)ts.textContent=fmtDur(vr.dur);if(fg)fg.style.strokeDashoffset=VR_C*(1-vr.dur/VMAX);
 if(!vr.poster&&e>.8)vrSnap();setTyping('video');if(e>=VMAX)vrStop();
}
function vrStart(){
 if(vr.st!=='ready'||!vr.stream)return;const mt=vrMime();vr.chunks=[];vr.poster=null;
 try{vr.mr=new MediaRecorder(vr.stream,{...(mt&&{mimeType:mt}),videoBitsPerSecond:650000,audioBitsPerSecond:48000})}catch{return toast(t('vidNoCam'))}
 vr.mr.ondataavailable=e=>{if(e.data&&e.data.size)vr.chunks.push(e.data)};
 vr.mr.onstop=()=>{if(vr.st!=='stopping')return;vrStopStream();vr.blob=new Blob(vr.chunks,{type:vr.mr.mimeType||mt||'video/webm'});vr.url=URL.createObjectURL(vr.blob);vr.st='review';paintVr()};
 vr.mr.start(500);vr.t0=Date.now();vr.dur=0;vr.st='rec';paintVr();vr.tm=setInterval(vrTick,200);
}
function vrStop(){
 if(vr.st!=='rec')return;clearInterval(vr.tm);vr.dur=Math.min(VMAX,(Date.now()-vr.t0)/1000);
 if(vr.dur<1){vr.mr.onstop=null;try{vr.mr.stop()}catch{}vr.mr=null;vr.st='ready';paintVr();setTyping(null);return toast(t('vidShort'))}
 if(!vr.poster)vrSnap();vr.st='stopping';try{vr.mr.stop()}catch{}
}
function vrFlip(){if(vr.st!=='ready')return;vr.fm=vr.fm==='user'?'environment':'user';vr.st='init';paintVr();vrCam()}
function vrRetake(){if(vr.st!=='review')return;if(vr.url)URL.revokeObjectURL(vr.url);vr.url=vr.blob=vr.poster=null;vr.st='init';paintVr();vrCam()}
async function vrSend(){
 if(vr.st!=='review'||!vr.blob)return;if(vr.dur<1)return toast(t('vidShort'));
 const size=vr.blob.size,type=vr.blob.type,dur=Math.max(1,Math.round(vr.dur)),poster=vr.poster,key='vid_'+uid();
 if(size>40*1048576)return toast(t('vidBig'));
 try{await IDB.put(key,vr.blob)}catch{return toast(t('vidBig'))}
 closeVidRec();send({vid:{key,dur,type,size,...(poster&&{poster})}});
}
function paintVr(){
 const h=$('#vrec');h.replaceChildren();
 const top=el('div','vr-top'),x=el('button','icon');x.append(icon('close',22));x.onclick=closeVidRec;
 const fl=el('button','icon');fl.append(icon('refresh',20));fl.title=t('vidFlip');fl.onclick=vrFlip;fl.style.visibility=vr.st==='ready'?'visible':'hidden';
 top.append(x,el('h3','',t('videoMsg')),fl);
 const stage=el('div','vr-stage');
 stage.insertAdjacentHTML('beforeend',`<svg class="vr-ring" viewBox="0 0 100 100"><circle class="bg" cx="50" cy="50" r="48"/><circle class="fg" id="vrFg" cx="50" cy="50" r="48" stroke-dasharray="${VR_C}" stroke-dashoffset="${vr.st==='review'?0:VR_C}"/></svg>`);
 if(vr.st==='ready'||vr.st==='rec'||vr.st==='stopping'){const v=el('video');v.muted=true;v.playsInline=true;v.autoplay=true;v.srcObject=vr.stream;if(vr.fm==='user')v.className='mir';stage.prepend(v);v.play&&v.play().catch(()=>{})}
 if(vr.st==='review'){const v=el('video');v.src=vr.url;v.playsInline=true;v.loop=true;stage.prepend(v);v.play().catch(()=>{});stage.onclick=()=>{v.paused?v.play().catch(()=>{}):v.pause()}}
 if(vr.st==='init')stage.append(el('div','vr-state',t('vidStarting')));
 const tm=el('div','vr-time');tm.id='vrT';{const sp=el('span','',fmtDur(vr.dur||0));sp.id='vrTs';tm.append(sp,el('small','','/ '+fmtDur(VMAX)))}if(vr.st==='rec')tm.prepend(el('i','rdot'));
 const ctr=el('div','vr-ctr');
 if(vr.st==='ready'||vr.st==='rec'||vr.st==='stopping'){const rb=el('button','vr-rec'+(vr.st==='rec'?' on':''));rb.append(el('i'));rb.onclick=()=>vr.st==='rec'?vrStop():vrStart();ctr.append(rb)}
 if(vr.st==='review'){const rt=el('button','vr-b');rt.append(icon('refresh',22));rt.title=t('vidRetake');rt.onclick=vrRetake;const sd=el('button','vr-b send');sd.append(icon('send',26));sd.title=t('send');sd.onclick=vrSend;ctr.append(rt,sd)}
 const hint=el('div','vr-hint',vr.st==='ready'?t('vidTap')+' · '+t('vidMax'):vr.st==='rec'?t('vidTapStop'):'');
 h.append(top,stage,tm,ctr,hint);
}
/* دکمهٔ یکپارچه: ضربه = پیام ویدئویی، کشیدن به بالا = ویس */
(function(){
 const b=$('#mic');let sx=0,sy=0,down=false,done=false,hint=null;
 const end=()=>{down=false;b.classList.remove('drag');b.style.removeProperty('--dy');if(hint){hint.remove();hint=null}};
 b.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;down=true;done=false;sx=e.clientX;sy=e.clientY;try{b.setPointerCapture(e.pointerId)}catch{}
  hint=el('div','swh');hint.append(icon('mic',22));b.append(hint);b.classList.add('drag');
  try{if(!localStorage.getItem('zoner_mic_hint')){localStorage.setItem('zoner_mic_hint','1');toast(t('micHint'))}}catch{}});
 b.addEventListener('pointermove',e=>{if(!down||done)return;const dy=sy-e.clientY,k=Math.max(0,Math.min(1,dy/48));b.style.setProperty('--dy',Math.max(0,Math.min(dy,26))+'px');if(hint){hint.style.setProperty('--k',k);hint.classList.toggle('on',k>=1)}
  if(dy>=48){done=true;try{navigator.vibrate&&navigator.vibrate(14)}catch{}end();recStart()}});
 b.addEventListener('pointerup',e=>{if(!down)return;const dy=sy-e.clientY,dx=Math.abs(e.clientX-sx);end();if(!done&&dy<14&&dx<24){done=true;openVidRec()}});
 b.addEventListener('pointercancel',end);
 b.addEventListener('click',e=>{if(e.detail===0)openVidRec()});
})();
function mkVid(m){
 const v=m.vid,w=el('div','vidm'),dur=el('div','vdur',fmtDur(v.dur||0)),vp=el('div','vp'),pi=el('span');pi.append(icon('play',24));vp.append(pi);
 if(v.poster)w.style.backgroundImage=`url(${v.poster})`;
 w.insertAdjacentHTML('beforeend',`<svg class="vring" viewBox="0 0 100 100"><circle class="fg" cx="50" cy="50" r="48" stroke-dasharray="${VR_C}" stroke-dashoffset="${VR_C}"/></svg>`);
 const fg=w.querySelector('.fg');w.append(vp,dur);
 let vd=null;
 const reset=()=>{w.classList.remove('play');fg.style.strokeDashoffset=VR_C;dur.textContent=fmtDur(v.dur||0)};
 w.onclick=async e=>{e.stopPropagation();
  if(!vd){let bl=null;try{bl=await IDB.get(v.key)}catch{}if(!bl)return toast(t('fileGone'));
   vd=document.createElement('video');vd.src=URL.createObjectURL(bl);vd.playsInline=true;vd.preload='auto';w.prepend(vd);
   vd.ontimeupdate=()=>{fg.style.strokeDashoffset=VR_C*(1-Math.min(1,vd.currentTime/(v.dur||vd.duration||1)));dur.textContent=fmtDur(vd.currentTime)};
   vd.onended=()=>{reset();try{vd.currentTime=0}catch{}}}
  if(curV&&curV.au!==vd){curV.au.pause();curV.reset()}
  if(vd.paused){try{await vd.play()}catch{return}w.classList.add('play');curV={au:vd,reset}}else{vd.pause();w.classList.remove('play')}};
 return w;
}
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!$('#sheet').hidden)closeSheet();if(!$('#vrec').hidden)closeVidRec()}});
/* ---------- شروع ---------- */
applyLang();
if(SID&&D.users[SID]){ensureSaved();enter()}else{SID=null;$('#auth').hidden=false}
