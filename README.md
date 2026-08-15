# Taana — Handloom Marketplace

A React + Vite storefront concept connecting Indian handloom weavers
directly to buyers. Built as a portfolio project.

## Stack
- React 19 + Vite
- Plain CSS (custom design tokens, no framework)
- Cart state in React, persisted to `localStorage`
- **AI weaving guide**: a chat widget backed by a Vercel serverless
  function (`api/chat.js`) that calls **Groq's free API** (Llama 3.3
  70B, OpenAI-compatible endpoint — no cost, no credit card). It only
  recommends products from the real catalog (`src/data/products.js`)
  — the system prompt is grounded in that data, so it won't invent
  products or prices.

## AI feature setup (required for the chat widget to work)
1. Get a **free** API key at https://console.groq.com → API Keys →
   Create API Key. No credit card needed; the free tier (30 requests/min,
   1,000 requests/day on Llama 3.3 70B as of mid-2026) is plenty for a
   demo/portfolio project.
2. **Local testing**: copy `.env.example` to `.env` and paste your key in,
   then run `vercel dev` (not `npm run dev`, since `npm run dev` doesn't
   run the `/api` serverless function — see below).
3. **On Vercel**: Project Settings → Environment Variables → add
   `GROQ_API_KEY` with your key → redeploy.

The key is only ever read server-side inside `api/chat.js` — it is never
sent to the browser.

## Run locally
```bash
npm install
npm run dev
```
This runs the frontend only. The `/api/chat` route won't respond in this
mode because `npm run dev` is plain Vite, not Vercel's dev server. To test
the AI chat locally, install the Vercel CLI and run `vercel dev` instead:
```bash
npm install -g vercel
vercel dev
```

## Build for production
```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
```

## Deploy (Vercel — free, ~2 minutes)
1. Push this folder to a GitHub repo.
2. Go to https://vercel.com → **Add New Project** → import the repo.
3. Framework preset: Vercel auto-detects **Vite**. Leave build command
   as `npm run build` and output directory as `dist`.
4. Add the `GROQ_API_KEY` environment variable (see above) *before*
   deploying, or add it after and click **Redeploy**.
5. Click **Deploy**. You'll get a live `https://<project>.vercel.app` URL,
   and the AI weaving guide will work on it.

Note: the drag-and-drop Netlify route (mentioned in earlier notes) only
works for static sites — it won't run `api/chat.js`, so the AI chat
widget needs Vercel (or another platform that supports serverless
functions) rather than a static host.

## Project structure
```
api/
  chat.js       Vercel serverless function — proxies chat to Anthropic API
src/
  components/   Header, Hero, Categories, ProductGrid, ProductCard,
                ProductModal, CartDrawer, ChatWidget, ArtisanStory,
                HowItWorks, Footer, Swatch
  data/         products.js — mock product & weave-cluster data
  App.jsx       state (cart, active filter, modal, chat) + page layout
  App.css       component styles
  index.css     design tokens (colors, type, base styles)
```
