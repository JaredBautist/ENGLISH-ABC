const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.resolve(__dirname, '../frontend/public/cards');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Curated high-quality, child-friendly, alusive pedagogical photos (~20-40KB each)
const cards = [
  // Colores y Útiles
  { name: 'black.jpg', url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&auto=format&fit=crop&q=80' },
  { name: 'white.jpg', url: 'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?w=400&auto=format&fit=crop&q=80' },
  { name: 'crayon.jpg', url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&auto=format&fit=crop&q=80' },
  { name: 'chair.jpg', url: 'https://images.unsplash.com/photo-1580481077195-c3a821a506cb?w=400&auto=format&fit=crop&q=80' },
  { name: 'desk.jpg', url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&auto=format&fit=crop&q=80' },
  { name: 'board.jpg', url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&auto=format&fit=crop&q=80' },
  { name: 'eraser.jpg', url: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=400&auto=format&fit=crop&q=80' },
  { name: 'ruler.jpg', url: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=400&auto=format&fit=crop&q=80' },
  { name: 'clock.jpg', url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&auto=format&fit=crop&q=80' },
  { name: 'kite.jpg', url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80' },
  { name: 'train.jpg', url: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400&auto=format&fit=crop&q=80' },

  // Cuerpo Humano
  { name: 'eyes.jpg', url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80' },
  { name: 'nose.jpg', url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400&auto=format&fit=crop&q=80' },
  { name: 'mouth.jpg', url: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=400&auto=format&fit=crop&q=80' },
  { name: 'ears.jpg', url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&auto=format&fit=crop&q=80' },
  { name: 'arms.jpg', url: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=400&auto=format&fit=crop&q=80' },
  { name: 'legs.jpg', url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400&auto=format&fit=crop&q=80' },
  { name: 'feet.jpg', url: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=400&auto=format&fit=crop&q=80' },
  { name: 'hands.jpg', url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&auto=format&fit=crop&q=80' },
  { name: 'shoulders.jpg', url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80' },
  { name: 'knees.jpg', url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400&auto=format&fit=crop&q=80' },
  { name: 'toes.jpg', url: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=400&auto=format&fit=crop&q=80' },
  { name: 'tummy.jpg', url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&auto=format&fit=crop&q=80' },

  // Familia
  { name: 'brother.jpg', url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400&auto=format&fit=crop&q=80' },
  { name: 'sister.jpg', url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80' },
  { name: 'baby.jpg', url: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&auto=format&fit=crop&q=80' },
  { name: 'grandma.jpg', url: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=400&auto=format&fit=crop&q=80' },
  { name: 'grandpa.jpg', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80' },

  // Casa y Habitaciones
  { name: 'house.jpg', url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&auto=format&fit=crop&q=80' },
  { name: 'door.jpg', url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?w=400&auto=format&fit=crop&q=80' },
  { name: 'window.jpg', url: 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=400&auto=format&fit=crop&q=80' },
  { name: 'kitchen.jpg', url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&auto=format&fit=crop&q=80' },
  { name: 'bedroom.jpg', url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&auto=format&fit=crop&q=80' },
  { name: 'bathroom.jpg', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80' },
  { name: 'living_room.jpg', url: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&auto=format&fit=crop&q=80' },

  // Alimentos y Frutas
  { name: 'apple.jpg', url: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=400&auto=format&fit=crop&q=80' },
  { name: 'banana.jpg', url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&auto=format&fit=crop&q=80' },
  { name: 'milk.jpg', url: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&auto=format&fit=crop&q=80' },
  { name: 'bread.jpg', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80' },
  { name: 'water.jpg', url: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=400&auto=format&fit=crop&q=80' },
  { name: 'juice.jpg', url: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&auto=format&fit=crop&q=80' },

  // Animales
  { name: 'elephant.jpg', url: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=400&auto=format&fit=crop&q=80' },
  { name: 'monkey.jpg', url: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=400&auto=format&fit=crop&q=80' },
  { name: 'bird.jpg', url: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&auto=format&fit=crop&q=80' },
  { name: 'fish.jpg', url: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=400&auto=format&fit=crop&q=80' },
  { name: 'chicken.jpg', url: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&auto=format&fit=crop&q=80' },
  { name: 'pig.jpg', url: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&auto=format&fit=crop&q=80' },

  // Acciones y Sentimientos
  { name: 'standup.jpg', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&auto=format&fit=crop&q=80' },
  { name: 'listen.jpg', url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&auto=format&fit=crop&q=80' },
  { name: 'raisehand.jpg', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&auto=format&fit=crop&q=80' },
  { name: 'run.jpg', url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400&auto=format&fit=crop&q=80' },
  { name: 'swim.jpg', url: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&auto=format&fit=crop&q=80' },
  { name: 'dance.jpg', url: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&auto=format&fit=crop&q=80' },
  { name: 'sing.jpg', url: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&auto=format&fit=crop&q=80' },
  { name: 'happy.jpg', url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80' },
  { name: 'sad.jpg', url: 'https://images.unsplash.com/photo-1509909756405-be0199881695?w=400&auto=format&fit=crop&q=80' },

  // Clima y Naturaleza
  { name: 'sunny.jpg', url: 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=400&auto=format&fit=crop&q=80' },
  { name: 'rainy.jpg', url: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=400&auto=format&fit=crop&q=80' },
  { name: 'cold.jpg', url: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?w=400&auto=format&fit=crop&q=80' },
  { name: 'hot.jpg', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80' },
  { name: 'jungle.jpg', url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&auto=format&fit=crop&q=80' },
  { name: 'ocean.jpg', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80' },
  { name: 'desert.jpg', url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&auto=format&fit=crop&q=80' },

  // Comunidad
  { name: 'doctor.jpg', url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80' },
  { name: 'police.jpg', url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=400&auto=format&fit=crop&q=80' },
  { name: 'firefighter.jpg', url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&auto=format&fit=crop&q=80' },
];

function download(item) {
  return new Promise((resolve) => {
    const dest = path.join(targetDir, item.name);
    // Don't overwrite if it already exists and is valid
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      return resolve(true);
    }

    const file = fs.createWriteStream(dest);
    https.get(item.url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        https.get(response.headers.location, (redirectRes) => {
          redirectRes.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`✓ Card downloaded: ${item.name}`);
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
        console.log(`✓ Card downloaded: ${item.name}`);
        resolve(true);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      console.error(`Error downloading card ${item.name}:`, err.message);
      resolve(false);
    });
  });
}

async function run() {
  console.log(`Downloading ${cards.length} cards for all grades...`);
  for (const item of cards) {
    await download(item);
  }
  console.log('Finished downloading all cards!');
}

run();
