const fs = require('fs');

let out = '';

for (let i = 0; i <= 6; i++) {
  if (fs.existsSync(`section_${i}.html`)) {
    const s = fs.readFileSync(`section_${i}.html`, 'utf-8');
    out += `\n========================= SECTION ${i} =========================\n`;
    
    // Find background colors or classes
    const bgMatches = s.match(/(?:background(?:-color)?|fill|bg):\s*([^;"]+)/gi);
    if (bgMatches) {
      out += 'Backgrounds:\n' + [...new Set(bgMatches)].slice(0, 5).join('\n') + '\n';
    }
    
    // Find inline styles
    const styles = [...s.matchAll(/style="([^"]+)"/gi)].map(m => m[1]);
    out += `Inline styles count: ${styles.length}\n`;
    const uniqueStyles = [...new Set(styles.flatMap(st => st.split(';').map(x => x.trim())).filter(Boolean))];
    out += 'Key css properties:\n' + uniqueStyles.filter(x => x.includes('color') || x.includes('font') || x.includes('grid') || x.includes('flex')).slice(0, 15).join('\n') + '\n';
  }
}

fs.writeFileSync('design_summary.txt', out);
console.log('Wrote design_summary.txt');
