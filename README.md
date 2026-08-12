# Aviator Demo — GitHub + Vercel

Demo-only Aviator page with a Vercel serverless endpoint that sends demo withdrawal notifications to a Telegram bot.

## Vercel environment variables

Set these in Vercel Project Settings → Environment Variables:

- `TELEGRAM_BOT_TOKEN` = your newly generated Telegram bot token
- `TELEGRAM_CHAT_ID` = your Telegram chat ID

Do NOT put the bot token in `public/index.html` or commit it to GitHub.

## Deploy

Import this repository into Vercel. The static page is `public/index.html` and the API endpoint is `api/withdraw.js`.

The withdrawal form posts to `/api/withdraw`.
