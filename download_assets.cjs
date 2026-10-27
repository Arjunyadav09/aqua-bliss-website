const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, 'public', 'images');
fs.mkdirSync(dir, { recursive: true });

const images = [
  { name: 'logo.png', uri: 'https://static.wixstatic.com/media/1d9cb8_492a4a9795464de59e50945516d063db~mv2.png' },
  { name: 'hero.png', uri: 'https://static.wixstatic.com/media/1d9cb8_c0a1d5b646d5424c92eeda2d3c21da9b~mv2.png' },
  { name: 'bottle_cutout.png', uri: 'https://static.wixstatic.com/media/1d9cb8_8fa50035380c47c6a5f5d47ff07d68bd~mv2.png' },
  { name: 'range_performance.jpg', uri: 'https://static.wixstatic.com/media/1d9cb8_7235472f487e45969fc667c58d7f15d9~mv2.jpg' },
  { name: 'range_vitality.jpg', uri: 'https://static.wixstatic.com/media/1d9cb8_65c4b82f62374d589baa4c7a1db5af3f~mv2.jpg' },
  { name: 'range_recovery.jpg', uri: 'https://static.wixstatic.com/media/1d9cb8_d9f3012944354b26ac7b7e4225283f7e~mv2.jpg' },
  { name: 'product_glacier_blue.jpg', uri: 'https://static.wixstatic.com/media/1d9cb8_7b5315751b4947ad9f8343b3eecec36e~mv2.jpg' },
  { name: 'product_mango_sunshine.jpg', uri: 'https://static.wixstatic.com/media/1d9cb8_8c6650fa3e704f9badde4105f8a0e4b7~mv2.jpg' },
  { name: 'product_aqua_bliss_active.jpg', uri: 'https://static.wixstatic.com/media/1d9cb8_ed6bfb2d6d9e498e8f8f10c677578fa6~mv2.jpg' },
  { name: 'heart_aqua_bliss.jpg', uri: 'https://static.wixstatic.com/media/1d9cb8_1432573169c943079ee3618b8f7cd698~mv2.jpg' },
];

function download(item) {
  return new Promise((resolve) => {
    const dest = path.join(dir, item.name);
    const file = fs.createWriteStream(dest);
    https.get(item.uri, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          const sz = fs.statSync(dest).size;
          console.log(`Saved ${item.name} (${sz} bytes)`);
          resolve(true);
        });
      } else {
        console.error(`Failed ${item.name}: status ${res.statusCode}`);
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        resolve(false);
      }
    }).on('error', (err) => {
      console.error(`Error ${item.name}:`, err.message);
      resolve(false);
    });
  });
}

(async () => {
  for (const img of images) {
    await download(img);
  }
  console.log('All downloads finished.');
})();
