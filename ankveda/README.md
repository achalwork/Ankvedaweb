# AnkVeda — name & birth-number check, ₹99 PDF report

Frontend: React + Vite. Backend: `server/` (Express + Razorpay + Puppeteer for the PDF).

## Run locally (no Razorpay account needed)
    npm install
    MOCK_PAYMENT=1 npm run api      # terminal 1  (fake payments, real PDF)
    npm run dev                     # terminal 2  -> http://localhost:5173

## Go live
1. Razorpay Dashboard → API Keys → copy `Key Id` and `Key Secret`. Copy `.env.example` to `.env` (or set env vars) with those values.
2. (Recommended) Dashboard → Webhooks → URL `https://YOURDOMAIN/api/webhook`, event `payment.captured`, same secret as `RAZORPAY_WEBHOOK_SECRET`.
3. `npm run build && npm start` — the server also serves `dist/`. Needs HTTPS in production (Razorpay Checkout requires it).
4. Server must have Chrome for the PDF: `npm install` downloads one via Puppeteer; on a minimal Linux host install Chrome's system libs (or set `CHROME_PATH`).

## How payment is protected
- Price (₹99 = 9900 paise) is fixed in `server/index.js`; the browser cannot change it.
- `/api/verify` checks Razorpay's HMAC signature with your secret before any PDF is released.
- The PDF is generated server-side from the stored name/DOB, only for a paid order, behind an unguessable token.
- Orders live in `data/orders.json` — move to a real database when traffic grows.

## Before launch
Write real Privacy / Terms / Contact text (footer), add your refund policy if any, and keep the "not a prediction" disclaimers — Razorpay may review the site.
