const fs = require('fs');
const html = fs.readFileSync('wix_site.html', 'utf-8');

// Wix Thunderbolt renders the SSR markup inside #site-root or #masterPage
const siteRootMatch = html.match(/<div id="site-root"[^>]*>([\s\S]*?)<\/div>\s*<div id="SCROLL_TO_BOTTOM"/i) ||
                      html.match(/<main id="PAGES_CONTAINER"[^>]*>([\s\S]*?)<\/main>/i) ||
                      html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

if (siteRootMatch) {
  fs.writeFileSync('site_body.html', siteRootMatch[0]);
  console.log('Saved site_body.html, length:', siteRootMatch[0].length);
}

// Let's inspect all text in the HTML body by removing scripts and styles
let clean = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
fs.writeFileSync('clean_markup.html', clean);

// Extract text nodes
const textMatches = [...clean.matchAll(/>([^<]{2,})</g)]
  .map(m => m[1].replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim())
  .filter(t => t.length > 0 && !t.startsWith('<!--'));
console.log('Total text nodes found:', textMatches.length);
fs.writeFileSync('all_texts.json', JSON.stringify([...new Set(textMatches)], null, 2));

// Extract all image URLs
const imgMatches = [...html.matchAll(/(https:\/\/[^"'\s)]+wixstatic\.com\/media\/[^"'\s\)]+)/g)].map(m => m[1]);
fs.writeFileSync('all_images.json', JSON.stringify([...new Set(imgMatches)], null, 2));
console.log('Images found:', imgMatches.length);
