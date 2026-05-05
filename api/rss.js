// Vercel Serverless Function: /api/rss
// Fetches Google News RSS server-side, parses XML using regex, returns clean JSON
// No browser XML parsing issues — server handles all the messy XML

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing ?url= parameter' });
  }

  const allowed = ['news.google.com', 'economictimes.indiatimes.com',
    'business-standard.com', 'thehindubusinessline.com'];
  let isAllowed = false;
  try {
    const parsed = new URL(url);
    isAllowed = allowed.some(d => parsed.hostname.endsWith(d));
  } catch(e) {}

  if (!isAllowed) {
    return res.status(403).json({ error: 'Domain not allowed' });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MCNewsBot/1.0)',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `Upstream ${response.status}` });
    }

    const xml = await response.text();

    // Parse items using regex — avoids all strict XML parser issues
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
    let match;

    while ((match = itemRegex.exec(xml)) !== null) {
      const block = match[1];
      const title   = extractTag(block, 'title');
      const link    = extractTag(block, 'link') || extractTag(block, 'guid');
      const pubDate = extractTag(block, 'pubDate');
      const desc    = stripHtml(extractTag(block, 'description') || '');
      const source  = extractTag(block, 'source') || '';
      if (title && link) {
        items.push({ title, link, pubDate, description: desc, source });
      }
    }

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=300');
    return res.status(200).json({ status: 'ok', items });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

function extractTag(xml, tag) {
  const cdataMatch = xml.match(new RegExp(`<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*<\\/${tag}>`, 'i'));
  if (cdataMatch) return cdataMatch[1].trim();
  const plainMatch = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  if (plainMatch) return plainMatch[1].trim();
  if (tag === 'link') {
    const linkMatch = xml.match(/<link\s*\/?>(.*?)(?=<|$)/i) || xml.match(/<link>(.*?)<\/link>/i);
    if (linkMatch) return linkMatch[1].trim();
  }
  return '';
}

function stripHtml(str) {
  return str.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
}
