# MC Summarizer PWA — Setup Guide
Built by Rama Prakash S | PWA conversion by Claude AI

## Files in this folder
- index.html    → Main app (all UI + logic)
- manifest.json → PWA install config
- sw.js         → Service worker (offline support)
- icon-192.svg  → App icon (small)
- icon-512.svg  → App icon (large)

---

## How to host & install on iPhone

### Option A — GitHub Pages (Free, Recommended)
1. Create a new repo on github.com (e.g. "mc-summarizer-pwa")
2. Upload all 5 files to the repo root
3. Go to Settings → Pages → Source: main branch / root
4. Your app URL: https://YOUR_USERNAME.github.io/mc-summarizer-pwa/
5. Open that URL in Safari on iPhone → Share → "Add to Home Screen"

### Option B — Netlify Drop (Free, Fastest)
1. Go to app.netlify.com/drop
2. Drag the entire mc-pwa folder onto the page
3. You get an instant URL like https://random-name.netlify.app
4. Open in iPhone Safari → Add to Home Screen

### Option C — Local network (no hosting needed)
1. Install Python if not already: python.org
2. cd into the mc-pwa folder
3. Run: python -m http.server 8080
4. Find your computer's local IP (e.g. 192.168.1.5)
5. On iPhone (same WiFi): open Safari → http://192.168.1.5:8080
   (Note: PWA install requires HTTPS — use Options A or B for full install)

---

## First-time Setup in the App

1. Open the app → tap ⚙️ (Settings)
2. Enter your **Groq API Key** (gsk_... from console.groq.com)
3. Enter your **Telegram Bot Token** (from @BotFather)
4. Enter your **Telegram Chat ID** (your user ID)
5. Add companies to **Corporate Watchlist** (e.g. Reliance, HDFC Bank)
6. Toggle **Sectors** you want to track
7. Enable/disable topic toggles as needed

---

## Daily Use

1. Open the app on iPhone
2. Tap **📡 Fetch RSS** → loads latest news from ET, BS, BL
3. Browse tabs: All | Corporate | Breaking | Economy | Geo | Markets
4. Tap **🤖 Summarize** → Groq AI generates category summaries
5. Tap **✈️ Send** → pushes summaries to your Telegram

---

## What's different from the Android app

| Feature                        | Android App | PWA (iPhone) |
|-------------------------------|-------------|--------------|
| RSS feed polling               | ✅ Auto 30min | ✅ Manual tap  |
| Groq AI summarization         | ✅           | ✅            |
| Filter engine (watchlist etc) | ✅           | ✅            |
| Tabbed UI                      | ✅           | ✅            |
| Telegram delivery              | ✅           | ✅            |
| Settings screen               | ✅           | ✅            |
| WhatsApp notification capture | ✅           | ❌ (Android only) |
| MC push notification capture  | ✅           | ❌ (Android only) |
| Auto background polling       | ✅ WorkManager | ❌ iOS kills bg |
| Midnight reconciliation       | ✅           | ❌            |

**Recommendation**: Keep Android app running for notification capture.
Use PWA on iPhone as the primary reading & summarization interface.

---

© Rama Prakash S Apps Studio 2026 | Powered by Groq + Claude AI
