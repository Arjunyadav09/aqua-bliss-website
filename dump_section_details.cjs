const fs = require('fs');
const html = fs.readFileSync('wix_site.html', 'utf-8');

const sections = [...html.matchAll(/<section[^>]*id=["']([^"']+)["'][^>]*>([\s\S]*?)<\/section>/gi)];

sections.forEach((s, idx) => {
  const content = s[0];
  fs.writeFileSync(`section_${idx}.html`, content);
  
  // Extract all images in this section
  const imgs = [...content.matchAll(/<img[^>]+>/g)].map(m => m[0]);
  const bgImgs = [...content.matchAll(/url\(["']?([^"')]+)["']?\)/g)].map(m => m[1]);
  const text = content.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
                      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                      .replace(/<[^>]+>/g, ' ')
                      .replace(/\s+/g, ' ')
                      .trim();
  
  console.log(`\n=================== SECTION ${idx} ===================`);
  console.log('Images:', imgs.length, 'Bg images:', bgImgs.length);
  if (imgs.length > 0) {
    imgs.forEach(img => console.log('  IMG:', img.slice(0, 150)));
  }
  if (bgImgs.length > 0) {
    bgImgs.forEach(bg => console.log('  BG:', bg.slice(0, 150)));
  }
  console.log('Text snippet:', text.slice(0, 300));
});
