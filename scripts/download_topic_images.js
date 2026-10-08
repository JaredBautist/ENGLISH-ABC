const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.resolve(__dirname, '../frontend/public/topics');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const images = [
  {
    name: 'greetings.jpg',
    url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'colors.jpg',
    url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'numbers.jpg',
    url: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'toys.jpg',
    url: 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'farm_animals.jpg',
    url: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'body_parts.jpg',
    url: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'family.jpg',
    url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'classroom.jpg',
    url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'house.jpg',
    url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'clothes.jpg',
    url: 'https://images.unsplash.com/photo-1525562723836-dca67a71d5f1?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'weather.jpg',
    url: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'food.jpg',
    url: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'wild_animals.jpg',
    url: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'community_helpers.jpg',
    url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'celebration.jpg',
    url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'school_care.jpg',
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'stories.jpg',
    url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'routines.jpg',
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80'
  }
];

function download(item) {
  return new Promise((resolve) => {
    const dest = path.join(targetDir, item.name);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`✓ Already exists: ${item.name}`);
      return resolve(true);
    }

    const file = fs.createWriteStream(dest);
    https.get(item.url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        https.get(response.headers.location, (redirectRes) => {
          redirectRes.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`✓ Downloaded (redirect): ${item.name}`);
            resolve(true);
          });
        }).on('error', () => {
          fs.unlink(dest, () => {});
          resolve(false);
        });
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded: ${item.name}`);
        resolve(true);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      console.error(`Error downloading ${item.name}:`, err.message);
      resolve(false);
    });
  });
}

async function run() {
  console.log('Downloading high quality visual illustrations for classroom slides...');
  for (const item of images) {
    await download(item);
  }
  console.log('Done downloading topic images!');
}

run();
