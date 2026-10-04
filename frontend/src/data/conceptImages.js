/**
 * Diccionario de representación visual pedagógica.
 * Asocia palabras, conceptos y opciones de actividades con imágenes reales
 * de alta definición descargadas localmente en /cards/ y /topics/.
 */

export const CONCEPT_IMAGES = {
  // Saludos y Rutinas (Unidad 1)
  'hello': '/cards/hello.jpg',
  'hello!': '/cards/hello.jpg',
  'hi': '/cards/hi.jpg',
  'hi!': '/cards/hi.jpg',
  'bye': '/cards/bye.jpg',
  'bye-bye': '/cards/bye.jpg',
  'bye-bye!': '/cards/bye.jpg',
  'good morning': '/cards/morning.jpg',
  'good morning!': '/cards/morning.jpg',
  'clean up': '/cards/cleanup.jpg',
  'clean up!': '/cards/cleanup.jpg',
  'line up': '/cards/lineup.jpg',
  'line up!': '/cards/lineup.jpg',
  'sit down': '/cards/sitdown.jpg',
  'sit down, please': '/cards/sitdown.jpg',
  'quiet': '/cards/quiet.jpg',
  'quiet, please': '/cards/quiet.jpg',
  'my name is': '/cards/name.jpg',
  'my name is…': '/cards/name.jpg',
  'what is your name?': '/cards/ask_name.jpg',
  'what is your name': '/cards/ask_name.jpg',
  'nice to meet you!': '/cards/handshake.jpg',
  'nice to meet you': '/cards/handshake.jpg',

  // Colores y Útiles Escolares (Unidad 2)
  'red': '/cards/red.jpg',
  'rojo': '/cards/red.jpg',
  'blue': '/cards/blue.jpg',
  'azul': '/cards/blue.jpg',
  'yellow': '/cards/yellow.jpg',
  'amarillo': '/cards/yellow.jpg',
  'green': '/cards/green.jpg',
  'verde': '/cards/green.jpg',
  'orange': '/cards/orange_color.jpg',
  'naranja': '/cards/orange_color.jpg',
  'purple': '/cards/purple.jpg',
  'morado': '/cards/purple.jpg',
  'pink': '/cards/pink.jpg',
  'rosado': '/cards/pink.jpg',
  'brown': '/cards/brown.jpg',
  'marrón': '/cards/brown.jpg',
  'black': '/cards/black.jpg',
  'negro': '/cards/black.jpg',
  'white': '/cards/white.jpg',
  'blanco': '/cards/white.jpg',
  'colors': '/topics/colors.jpg',

  // Útiles y Salón
  'book': '/cards/book.jpg',
  'libro': '/cards/book.jpg',
  'un libro': '/cards/book.jpg',
  'pencil': '/cards/pencil.jpg',
  'lápiz': '/cards/pencil.jpg',
  'un lápiz': '/cards/pencil.jpg',
  'crayon': '/cards/crayon.jpg',
  'crayón': '/cards/crayon.jpg',
  'un crayón': '/cards/crayon.jpg',
  'chair': '/cards/chair.jpg',
  'silla': '/cards/chair.jpg',
  'una silla': '/cards/chair.jpg',
  'desk': '/cards/desk.jpg',
  'pupitre': '/cards/desk.jpg',
  'board': '/cards/board.jpg',
  'tablero': '/cards/board.jpg',
  'eraser': '/cards/eraser.jpg',
  'borrador': '/cards/eraser.jpg',
  'ruler': '/cards/ruler.jpg',
  'regla': '/cards/ruler.jpg',
  'backpack': '/cards/backpack.jpg',
  'mochila': '/cards/backpack.jpg',
  'teacher': '/cards/teacher.jpg',
  'classroom': '/topics/classroom.jpg',
  'school': '/topics/school_care.jpg',

  // Números 1 al 10 (Unidad 3 - 3D Clays)
  'one': '/cards/number1.jpg',
  '1': '/cards/number1.jpg',
  'uno': '/cards/number1.jpg',
  'two': '/cards/number2.jpg',
  '2': '/cards/number2.jpg',
  'dos': '/cards/number2.jpg',
  'three': '/cards/number3.jpg',
  '3': '/cards/number3.jpg',
  'tres': '/cards/number3.jpg',
  'four': '/cards/number4.jpg',
  '4': '/cards/number4.jpg',
  'cuatro': '/cards/number4.jpg',
  'five': '/cards/number5.jpg',
  '5': '/cards/number5.jpg',
  'cinco': '/cards/number5.jpg',
  'six': '/cards/number6.jpg',
  '6': '/cards/number6.jpg',
  'seis': '/cards/number6.jpg',
  'seven': '/cards/number7.jpg',
  '7': '/cards/number7.jpg',
  'siete': '/cards/number7.jpg',
  'eight': '/cards/number8.jpg',
  '8': '/cards/number8.jpg',
  'ocho': '/cards/number8.jpg',
  'nine': '/cards/number9.jpg',
  '9': '/cards/number9.jpg',
  'nueve': '/cards/number9.jpg',
  'ten': '/cards/number10.jpg',
  '10': '/cards/number10.jpg',
  'diez': '/cards/number10.jpg',
  'numbers': '/topics/numbers.jpg',

  // Conteo de Objetos (Unidad 3)
  'one apple': '/cards/one_apple.jpg',
  'una manzana': '/cards/one_apple.jpg',
  'apple': '/cards/apple.jpg',
  'manzana': '/cards/apple.jpg',
  'two books': '/cards/two_books.jpg',
  'dos libros': '/cards/two_books.jpg',
  'three pencils': '/cards/three_pencils.jpg',
  'tres lápices': '/cards/three_pencils.jpg',
  'ten fingers': '/cards/ten_fingers.jpg',
  'diez dedos': '/cards/ten_fingers.jpg',
  'fingers': '/cards/ten_fingers.jpg',
  'dedos': '/cards/ten_fingers.jpg',

  // Juego y Movimiento (Unidad 3 y 6)
  'jump': '/cards/body_jump.jpg',
  'salto': '/cards/body_jump.jpg',
  'saltar': '/cards/body_jump.jpg',
  'jump one!': '/cards/body_jump.jpg',
  'jump two!': '/cards/body_jump.jpg',
  'jump three!': '/cards/body_jump.jpg',
  'jump ten!': '/cards/body_jump.jpg',
  'jump one': '/cards/body_jump.jpg',
  'jump two': '/cards/body_jump.jpg',
  'jump three': '/cards/body_jump.jpg',
  'jump ten': '/cards/body_jump.jpg',
  '¡salto uno!': '/cards/body_jump.jpg',
  '¡salto dos!': '/cards/body_jump.jpg',
  '¡salto tres!': '/cards/body_jump.jpg',
  '¡salto diez!': '/cards/body_jump.jpg',
  'run': '/cards/run.jpg',
  'correr': '/cards/run.jpg',
  'clap': '/cards/hands_clap.jpg',
  'aplaudir': '/cards/hands_clap.jpg',
  'swim': '/cards/swim.jpg',
  'nadar': '/cards/swim.jpg',
  'dance': '/cards/dance.jpg',
  'bailar': '/cards/dance.jpg',
  'sing': '/cards/sing.jpg',
  'cantar': '/cards/sing.jpg',
  'stand up': '/cards/standup.jpg',
  'standup': '/cards/standup.jpg',
  'listen': '/cards/listen.jpg',
  'escuchar': '/cards/listen.jpg',
  'raise hand': '/cards/raisehand.jpg',

  // Partes del Cuerpo (Unidad 6)
  'head': '/cards/head.jpg',
  'cabeza': '/cards/head.jpg',
  'eyes': '/cards/eyes.jpg',
  'ojos': '/cards/eyes.jpg',
  'nose': '/cards/nose.jpg',
  'nariz': '/cards/nose.jpg',
  'mouth': '/cards/mouth.jpg',
  'boca': '/cards/mouth.jpg',
  'ears': '/cards/ears.jpg',
  'orejas': '/cards/ears.jpg',
  'arms': '/cards/arms.jpg',
  'brazos': '/cards/arms.jpg',
  'legs': '/cards/legs.jpg',
  'piernas': '/cards/legs.jpg',
  'feet': '/cards/feet.jpg',
  'pies': '/cards/feet.jpg',
  'hands': '/cards/hands.jpg',
  'manos': '/cards/hands.jpg',
  'shoulders': '/cards/shoulders.jpg',
  'hombros': '/cards/shoulders.jpg',
  'knees': '/cards/knees.jpg',
  'rodillas': '/cards/knees.jpg',
  'toes': '/cards/toes.jpg',
  'dedos del pie': '/cards/toes.jpg',
  'tummy': '/cards/tummy.jpg',
  'panza': '/cards/tummy.jpg',
  'body': '/topics/body_parts.jpg',

  // Juguetes (Unidad 4)
  'ball': '/cards/ball.jpg',
  'pelota': '/cards/ball.jpg',
  'doll': '/cards/doll.jpg',
  'muñeca': '/cards/doll.jpg',
  'car': '/cards/car.jpg',
  'carro': '/cards/car.jpg',
  'kite': '/cards/kite.jpg',
  'cometa': '/cards/kite.jpg',
  'teddy bear': '/cards/teddy.jpg',
  'teddy': '/cards/teddy.jpg',
  'oso de peluche': '/cards/teddy.jpg',
  'blocks': '/cards/blocks.jpg',
  'bloques': '/cards/blocks.jpg',
  'robot': '/cards/robot.jpg',
  'train': '/cards/train.jpg',
  'tren': '/cards/train.jpg',
  'toys': '/topics/toys.jpg',

  // Animales de Granja (Unidad 5)
  'cow': '/cards/cow.jpg',
  'vaca': '/cards/cow.jpg',
  'dog': '/cards/dog.jpg',
  'perro': '/cards/dog.jpg',
  'cat': '/cards/cat.jpg',
  'gato': '/cards/cat.jpg',
  'duck': '/cards/duck.jpg',
  'pato': '/cards/duck.jpg',
  'pig': '/cards/pig.jpg',
  'cerdo': '/cards/pig.jpg',
  'horse': '/cards/horse.jpg',
  'caballo': '/cards/horse.jpg',
  'chicken': '/cards/chicken.jpg',
  'gallina': '/cards/chicken.jpg',
  'sheep': '/cards/sheep.jpg',
  'oveja': '/cards/sheep.jpg',
  'elephant': '/cards/elephant.jpg',
  'elefante': '/cards/elephant.jpg',
  'monkey': '/cards/monkey.jpg',
  'mono': '/cards/monkey.jpg',
  'bird': '/cards/bird.jpg',
  'pájaro': '/cards/bird.jpg',
  'fish': '/cards/fish.jpg',
  'pez': '/cards/fish.jpg',
  'lion': '/cards/lion.jpg',
  'león': '/cards/lion.jpg',
  'giraffe': '/cards/giraffe.jpg',
  'jirafa': '/cards/giraffe.jpg',
  'animals': '/topics/farm_animals.jpg',

  // Familia (Unidad 7)
  'mommy': '/cards/mommy.jpg',
  'mamá': '/cards/mommy.jpg',
  'mother': '/cards/mommy.jpg',
  'daddy': '/cards/daddy.jpg',
  'papá': '/cards/daddy.jpg',
  'father': '/cards/daddy.jpg',
  'brother': '/cards/brother.jpg',
  'hermano': '/cards/brother.jpg',
  'sister': '/cards/sister.jpg',
  'hermana': '/cards/sister.jpg',
  'baby': '/cards/baby.jpg',
  'bebé': '/cards/baby.jpg',
  'grandma': '/cards/grandma.jpg',
  'abuela': '/cards/grandma.jpg',
  'grandpa': '/cards/grandpa.jpg',
  'abuelo': '/cards/grandpa.jpg',
  'family': '/cards/family_group.jpg',
  'familia': '/cards/family_group.jpg',

  // Fiesta y Celebración (Unidad 8)
  'cake': '/cards/cake.jpg',
  'torta': '/cards/cake.jpg',
  'pastel': '/cards/cake.jpg',
  'balloon': '/cards/number7.jpg',
  'globo': '/cards/number7.jpg',
  'globos': '/cards/number7.jpg',
  'music': '/cards/sing.jpg',
  'música': '/cards/sing.jpg',
  'happy': '/cards/happy.jpg',
  'feliz': '/cards/happy.jpg',
  'sad': '/cards/sad.jpg',
  'triste': '/cards/sad.jpg',

  // Clima y Entorno
  'sunny': '/cards/sunny.jpg',
  'soleado': '/cards/sunny.jpg',
  'rainy': '/cards/rainy.jpg',
  'lluvioso': '/cards/rainy.jpg',
  'cold': '/cards/cold.jpg',
  'frío': '/cards/cold.jpg',
  'hot': '/cards/hot.jpg',
  'calor': '/cards/hot.jpg',
  'house': '/cards/house.jpg',
  'casa': '/cards/house.jpg',
  'door': '/cards/door.jpg',
  'puerta': '/cards/door.jpg',
  'window': '/cards/window.jpg',
  'ventana': '/cards/window.jpg',
  'banana': '/cards/banana.jpg',
  'plátano': '/cards/banana.jpg',
  'milk': '/cards/milk.jpg',
  'leche': '/cards/milk.jpg',
  'bread': '/cards/bread.jpg',
  'pan': '/cards/bread.jpg',
  'water': '/cards/water.jpg',
  'agua': '/cards/water.jpg',
  'juice': '/cards/juice.jpg',
  'jugo': '/cards/juice.jpg',
  'doctor': '/cards/doctor.jpg',
  'police': '/cards/police.jpg',
  'policía': '/cards/police.jpg',
  'firefighter': '/cards/firefighter.jpg',
  'bombero': '/cards/firefighter.jpg',

  // Frases y opciones de actividades Jardín
  'i like the ball': '/cards/ball.jpg',
  'i like the doll': '/cards/doll.jpg',
  'i like the car': '/cards/car.jpg',
  'i like the train': '/cards/train.jpg',
  'i like the teddy': '/cards/teddy.jpg',
  'una muñeca': '/cards/doll.jpg',
  'una pelota': '/cards/ball.jpg',
  'un carro': '/cards/car.jpg',
  'un tren': '/cards/train.jpg',
  'aplaude': '/cards/hands_clap.jpg',
  'salta': '/cards/jump.jpg',
  'corre': '/cards/run.jpg',
  'toca tu cabeza': '/cards/head.jpg',
  'camina': '/cards/run.jpg',
  'dormir': '/cards/cold.jpg',
  'este es mi papá': '/cards/daddy.jpg',
  'esta es mi mamá': '/cards/mommy.jpg',
  'este es mi perro': '/cards/dog.jpg',
  'este es mi hermano': '/cards/brother.jpg',
  'globo': '/cards/number7.jpg',
  'balloon': '/cards/number7.jpg',
};

/**
 * Busca la imagen más alusiva para una palabra o frase pedagógica
 */
export function getConceptImage(text) {
  if (!text) return null;
  const raw = text.toLowerCase().trim();
  const clean = raw.replace(/[¡!¿?,.:;…"']/g, '').trim();

  // 1. Coincidencia exacta directa
  if (CONCEPT_IMAGES[clean]) return CONCEPT_IMAGES[clean];
  if (CONCEPT_IMAGES[raw]) return CONCEPT_IMAGES[raw];

  // 2. Coincidencia de frases completas (ordenadas de mayor a menor longitud)
  const multiWordKeys = Object.keys(CONCEPT_IMAGES)
    .filter((k) => k.includes(' '))
    .sort((a, b) => b.length - a.length);

  for (const key of multiWordKeys) {
    const cleanKey = key.replace(/[¡!¿?,.:;…"']/g, '');
    const regex = new RegExp(`(^|\\s)${cleanKey}(\\s|$)`, 'i');
    if (regex.test(clean)) {
      return CONCEPT_IMAGES[key];
    }
  }

  // 3. Coincidencia por palabra individual exacta (con límites de palabra para evitar falsos positivos)
  const tokens = clean.split(/\s+/);
  for (const token of tokens) {
    if (CONCEPT_IMAGES[token]) {
      // Reglas de seguridad: no permitir que palabras cortas se confundan en frases no alusivas
      if (token === 'hi' && clean !== 'hi' && !clean.includes('say hi')) continue;
      if (token === 'car' && clean.includes('carnival')) continue;
      if (token === 'red' && (clean.includes('reduce') || clean.includes('scared'))) continue;
      if (token === 'ball' && clean.includes('balloon')) continue;
      return CONCEPT_IMAGES[token];
    }
  }

  return null;
}
