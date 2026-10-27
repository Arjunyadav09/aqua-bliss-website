const fs = require('fs');
const html = fs.readFileSync('wix_site.html', 'utf-8');

// Find all wixstatic media tokens in the page
const matches = [...html.matchAll(/1d9cb8_[a-zA-Z0-9~_.]+/g)].map(m => m[0]);
const unique = [...new Set(matches)];
console.log('Unique media keys:', unique);

// Also look for URI / uri patterns in JSON objects inside wix_site.html
const uris = [...html.matchAll(/"uri"\s*:\s*"([^"]+)"/g)].map(m => m[1]);
console.log('URIs found:', [...new Set(uris)]);

// Look for image titles / names
const imageDefs = [...html.matchAll(/"name"\s*:\s*"([^"]+)"[^}]+"uri"\s*:\s*"([^"]+)"/g)]
  .map(m => ({ name: m[1], uri: m[2] }));
console.log('Image defs:', imageDefs);
