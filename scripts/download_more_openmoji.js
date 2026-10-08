const fs = require('fs');
const path = require('path');
const https = require('https');

const emojiArtPath = path.resolve(__dirname, '../frontend/src/data/emojiArt.json');
const openmojiDir = path.resolve(__dirname, '../frontend/public/openmoji');
const emojiArt = JSON.parse(fs.readFileSync(emojiArtPath, 'utf8'));

// Mapa de emojis faltantes a su código OpenMoji
const missingMap = {
  '🚪': '1F6AA',
  '🧹': '1F9F9',
  '🤫': '1F92B',
  '🔴': '1F534',
  '🔵': '1F535',
  '🟢': '1F7E2',
  '🦘': '1F998',
  '🪆': '1FA86',
  '🚗': '1F697',
  '🪁': '1FA81',
  '🐶': '1F436',
  '🦆': '1F986',
  '🏃': '1F3C3',
  '🐾': '1F43E',
  '👀': '1F440',
  '📋': '1F4CB',
  '👖': '1F456',
  '👟': '1F45F',
  '🍌': '1F34C',
  '🥛': '1F95B',
  '🍞': '1F35E',
  '🐦': '1F426',
  '🐟': '1F41F',
  '🧍': '1F9CD',
  '🦒': '1F992',
  '🐰': '1F430',
  '😋': '1F60B',
  '🦅': '1F985',
  '🩳': '1FA73',
  '🎄': '1F384',
  '🕊️': '1F54A',
  '🕊': '1F54A',
  '2️⃣': '0032-FE0F-20E3',
  '3️⃣': '0033-FE0F-20E3',
  '5️⃣': '0035-FE0F-20E3',
  '6️⃣': '0036-FE0F-20E3',
  '8️⃣': '0038-FE0F-20E3',
  '9️⃣': '0039-FE0F-20E3',
  '⭐': '2B50',
  '🌟': '1F31F',
  '👨‍👩‍👦': '1F468-200D-1F469-200D-1F466'
};

function downloadSvg(emoji, hex) {
  return new Promise((resolve) => {
    const filename = `${hex}.svg`;
    const dest = path.join(openmojiDir, filename);

    if (fs.existsSync(dest)) {
      emojiArt[emoji] = `/openmoji/${filename}`;
      return resolve(true);
    }

    const url = `https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg/${hex}.svg`;
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          emojiArt[emoji] = `/openmoji/${filename}`;
          console.log(`✓ Downloaded ${emoji} -> ${filename}`);
          resolve(true);
        });
      } else {
        console.warn(`✕ Failed ${emoji} (${hex}) status: ${res.statusCode}`);
        resolve(false);
      }
    }).on('error', (err) => {
      console.warn(`✕ Error downloading ${emoji}:`, err.message);
      resolve(false);
    });
  });
}

async function run() {
  console.log('Downloading additional OpenMoji SVGs for classroom visual slides...');
  for (const [emoji, hex] of Object.entries(missingMap)) {
    await downloadSvg(emoji, hex);
  }

  fs.writeFileSync(emojiArtPath, JSON.stringify(emojiArt, null, 2), 'utf8');
  console.log(`Finished! Total illustrations in emojiArt.json: ${Object.keys(emojiArt).length}`);
}

run();
