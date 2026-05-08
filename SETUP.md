# MC Summarizer PWA - Setup Guide
Built by Rama Prakash S | PWA conversion by Claude AI

## Files in this folder
- `index.html` -> Main app (all UI + logic)
- `manifest.json` -> PWA install config
- `sw.js` -> Service worker (offline support)
- `icon-192.svg` -> App icon (small)
- `icon-512.svg` -> App icon (large)
- `api/rss.js` -> Vercel serverless RSS proxy

---

## How to host and install on iPhone

### Option A - GitHub Pages
1. Create a new repo on GitHub, for example `mc-summarizer-pwa`.
2. Upload the app files to the repo root.
3. Enable Pages from the main branch root.
4. Open the site in Safari on iPhone.
5. Use Share -> Add to Home Screen.

### Option B - Netlify Drop
1. Open `app.netlify.com/drop`.
2. Drag the `mc-pwa` folder onto the page.
3. Open the generated URL in Safari on iPhone.
4. Use Add to Home Screen.

### Option C - Local network
1. Open a terminal in the `mc-pwa` folder.
2. Run `python -m http.server 8080`.
3. Find your computer's local IP address.
4. Open `http://YOUR_IP:8080` on the iPhone.

Note: full PWA installation works best over HTTPS, so hosted options are recommended.

---

## First-time setup in the app

1. Open the app and tap Settings.
2. Enter your Groq API key from `console.groq.com`.
3. Add companies to the Corporate Watchlist.
4. Enable the sectors you want to track.
5. Adjust topic and source toggles as needed.

---

## Daily use

1. Tap `Fetch RSS` to load the latest feeds.
2. Browse the tabs: All, Corporate, Breaking, Economy, Geo, Markets.
3. Tap `Summarize` to generate AI summaries with Groq.

---

## Android vs PWA

| Feature | Android App | PWA |
|---|---|---|
| RSS feed polling | Auto | Manual |
| Groq AI summarization | Yes | Yes |
| Filter engine | Yes | Yes |
| Tabbed UI | Yes | Yes |
| Settings screen | Yes | Yes |
| Telegram delivery | Yes | No |
| WhatsApp notification capture | Yes | No |
| Moneycontrol push capture | Yes | No |
| Background polling | Yes | No |
| Midnight reconciliation | Yes | No |

Recommendation: keep the Android app for notification capture. Use the PWA as the reading and summarization interface on iPhone and desktop.
