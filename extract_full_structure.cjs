const fs = require('fs');

for (let i = 0; i <= 6; i++) {
  if (fs.existsSync(`section_${i}.html`)) {
    const raw = fs.readFileSync(`section_${i}.html`, 'utf-8');
    // Extract readable DOM structure: tag, class, id, text, and img src
    const simplified = raw
      .replace(/<svg[\s\S]*?<\/svg>/gi, '<svg>[icon]</svg>')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<!--[\s\S]*?-->/gi, '')
      .replace(/\s+/g, ' ');
    
    // Extract all visible texts and their immediate parent tag
    const elements = [...simplified.matchAll(/<([a-z0-9]+)([^>]*)>([^<]+)<\/\1>/gi)]
      .map(m => {
        const tag = m[1];
        const attrs = m[2];
        const text = m[3].trim();
        if (text && text.length > 0) {
          const classMatch = attrs.match(/class=["']([^"']+)["']/i);
          return `<${tag} class="${classMatch ? classMatch[1] : ''}">${text}</${tag}>`;
        }
        return null;
      }).filter(Boolean);

    fs.writeFileSync(`section_${i}_clean.txt`, elements.join('\n'));
    console.log(`Section ${i}: ${elements.length} text elements`);
  }
}
