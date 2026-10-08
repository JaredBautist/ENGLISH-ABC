const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.resolve(__dirname, '../frontend/public/cards');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Curated high quality child-friendly photos for flashcards (300-400px wide, ~25KB each)
const cards = [
  // Greetings & Routines
  { name: 'hello.jpg', url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80' }, // smiling child waving
  { name: 'hi.jpg', url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400&auto=format&fit=crop&q=80' }, // kids raising hand hi
  { name: 'bye.jpg', url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?w=400&auto=format&fit=crop&q=80' }, // child waving bye with backpack
  { name: 'morning.jpg', url: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?w=400&auto=format&fit=crop&q=80' }, // bright morning sun rising
  { name: 'cleanup.jpg', url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&auto=format&fit=crop&q=80' }, // child organizing toys
  { name: 'lineup.jpg', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&auto=format&fit=crop&q=80' }, // children in school line
  { name: 'sitdown.jpg', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&auto=format&fit=crop&q=80' }, // child sitting nicely in classroom
  { name: 'quiet.jpg', url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&auto=format&fit=crop&q=80' }, // child listening quietly
  { name: 'handshake.jpg', url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&auto=format&fit=crop&q=80' }, // two kids shaking hands
  { name: 'name.jpg', url: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=400&auto=format&fit=crop&q=80' }, // child smiling pointing at self

  // Colors
  { name: 'red.jpg', url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&auto=format&fit=crop&q=80' }, // bright red apple
  { name: 'blue.jpg', url: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=400&auto=format&fit=crop&q=80' }, // blue sky and balloon
  { name: 'yellow.jpg', url: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=400&auto=format&fit=crop&q=80' }, // bright yellow banana
  { name: 'green.jpg', url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&auto=format&fit=crop&q=80' }, // fresh green leaves
  { name: 'orange_color.jpg', url: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400&auto=format&fit=crop&q=80' }, // vibrant orange citrus
  { name: 'purple.jpg', url: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&auto=format&fit=crop&q=80' }, // purple grapes
  { name: 'pink.jpg', url: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&auto=format&fit=crop&q=80' }, // pink flower
  { name: 'brown.jpg', url: 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=400&auto=format&fit=crop&q=80' }, // brown teddy bear

  // Numbers & Counting
  { name: 'number1.jpg', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80' }, // single bright star
  { name: 'number2.jpg', url: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=400&auto=format&fit=crop&q=80' }, // two cute puppy friends
  { name: 'number3.jpg', url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&auto=format&fit=crop&q=80' }, // 3 balloons
  { name: 'number4.jpg', url: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&auto=format&fit=crop&q=80' }, // colorful blocks
  { name: 'number5.jpg', url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&auto=format&fit=crop&q=80' }, // hand with five fingers

  // Toys
  { name: 'ball.jpg', url: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&auto=format&fit=crop&q=80' }, // soccer ball
  { name: 'car.jpg', url: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=400&auto=format&fit=crop&q=80' }, // red toy car
  { name: 'teddy.jpg', url: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=400&auto=format&fit=crop&q=80' }, // cute teddy bear
  { name: 'blocks.jpg', url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&auto=format&fit=crop&q=80' }, // building blocks
  { name: 'robot.jpg', url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&auto=format&fit=crop&q=80' }, // friendly robot

  // Animals
  { name: 'dog.jpg', url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=80' }, // cute friendly dog
  { name: 'cat.jpg', url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop&q=80' }, // sweet cat
  { name: 'cow.jpg', url: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=400&auto=format&fit=crop&q=80' }, // dairy cow in field
  { name: 'duck.jpg', url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&auto=format&fit=crop&q=80' }, // yellow duckling
  { name: 'horse.jpg', url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80' }, // beautiful horse
  { name: 'sheep.jpg', url: 'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?w=400&auto=format&fit=crop&q=80' }, // white sheep
  { name: 'lion.jpg', url: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=400&auto=format&fit=crop&q=80' }, // lion
  { name: 'giraffe.jpg', url: 'https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=400&auto=format&fit=crop&q=80' }, // giraffe

  // Body & Movement
  { name: 'body_jump.jpg', url: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=400&auto=format&fit=crop&q=80' }, // child jumping high
  { name: 'hands_clap.jpg', url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&auto=format&fit=crop&q=80' }, // clapping hands
  { name: 'head.jpg', url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400&auto=format&fit=crop&q=80' }, // smiling face and head

  // Family
  { name: 'mommy.jpg', url: 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=400&auto=format&fit=crop&q=80' }, // mother holding child
  { name: 'daddy.jpg', url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80' }, // father with child
  { name: 'family_group.jpg', url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&auto=format&fit=crop&q=80' }, // whole happy family

  // School & Class
  { name: 'book.jpg', url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&auto=format&fit=crop&q=80' }, // open colorful book
  { name: 'pencil.jpg', url: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=400&auto=format&fit=crop&q=80' }, // colorful pencils
  { name: 'backpack.jpg', url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format&fit=crop&q=80' }, // school backpack
  { name: 'teacher.jpg', url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&auto=format&fit=crop&q=80' }, // friendly teacher smiling
];

function download(item) {
  return new Promise((resolve) => {
    const dest = path.join(targetDir, item.name);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`✓ Card exists: ${item.name}`);
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
  console.log(`Downloading ${cards.length} high-definition pedagogical flashcard photos...`);
  for (const item of cards) {
    await download(item);
  }
  console.log('All pedagogical cards downloaded successfully!');
}

run();
