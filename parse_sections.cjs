const fs = require('fs');
const html = fs.readFileSync('wix_site.html', 'utf-8');

// Find all image tags or components with their surrounding tags and text
const imgTags = [...html.matchAll(/<img[^>]+>/g)].map(m => m[0]);
fs.writeFileSync('extracted_img_tags.json', JSON.stringify(imgTags, null, 2));
console.log('Saved extracted_img_tags.json:', imgTags.length);

// Search for Wix components data or props in Thunderbolt model
// Look for comp- or data-mesh-id or section tags
const sections = [...html.matchAll(/<section[^>]*id=["']([^"']+)["'][^>]*>([\s\S]*?)<\/section>/gi)];
console.log('Sections found:', sections.length);
sections.forEach((s, idx) => {
  console.log(`Section ${idx}: id=${s[1]} length=${s[2].length}`);
  // Print preview text of each section
  const preview = s[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 150);
  console.log(`   Text: ${preview}`);
});

// Also check CSS colors in html
const colors = [...html.matchAll(/(--color_\d+:([a-fA-F0-9,\s#]+);)/g)].map(m => m[1]);
fs.writeFileSync('extracted_colors.json', JSON.stringify(colors, null, 2));

// Check font definitions
const fonts = [...html.matchAll(/(--font_\d+:([^;]+);)/g)].map(m => m[1]);
fs.writeFileSync('extracted_fonts.json', JSON.stringify(fonts, null, 2));
