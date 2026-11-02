# فعال‌کردن «مجموع ساعت بازی» استیم

مرورگر اجازه نمی‌دهد مستقیم از استیم داده بگیرد و کلید API هم نباید داخل سایت باشد، پس یک سرور کوچک لازم است.

1. کلید رایگان بگیر: https://steamcommunity.com/dev/apikey
2. یکی از دو راه:
   - **Cloudflare Workers (رایگان):** فایل `steam-worker.js` را در یک Worker جدید بگذار و در Settings → Variables متغیر `STEAM_KEY` را با کلیدت بساز.
   - **سرور خودت:** `STEAM_KEY=کلید node steam-server.js`
3. آدرس سرور را در `config.js` بنویس: `steamApi:'https://...'`
4. کاربر باید در استیم → Edit Profile → Privacy Settings، بخش **Game details** را روی Public بگذارد.

بعد از این، در پروفایل هر کاربری که استیم وصل کرده نام، آواتار، مجموع ساعت بازی و تعداد بازی‌ها نمایش داده می‌شود. نتیجه ۶ ساعت کش می‌شود.
