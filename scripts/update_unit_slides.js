const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, '../frontend/src/data/unitSlides.js');

const unitVideos = {
  'primero-instrucciones': {
    type: 'song',
    emoji: '🎬',
    title: 'Action Song: Stand Up, Sit Down & Listen!',
    description: 'Canta y sigue las instrucciones escolares con movimiento corporal.',
    videoUrl: 'https://www.youtube.com/embed/dUXk8Nc5qQ8',
  },
  'primero-this-is-me': {
    type: 'song',
    emoji: '🎬',
    title: "What's Your Name? Song",
    description: 'Aprende a presentarte y decir tu nombre y edad cantando.',
    videoUrl: 'https://www.youtube.com/embed/ALcL3MuU4xQ',
  },
  'primero-describo-familia': {
    type: 'song',
    emoji: '🎬',
    title: 'This Is My Family Song',
    description: 'Canción para identificar a los miembros de la familia y sus características.',
    videoUrl: 'https://www.youtube.com/embed/zMdq9jSaNLg',
  },
  'primero-colores-numeros': {
    type: 'song',
    emoji: '🎬',
    title: 'Numbers 1 to 20 Song',
    description: 'Cuenta del 1 al 20 cantando con ritmo y alegría.',
    videoUrl: 'https://www.youtube.com/embed/OEbRDtCAFdU',
  },
  'primero-cuido-escuela': {
    type: 'song',
    emoji: '🎬',
    title: 'Clean Up and Care Song',
    description: 'Canción para cuidar el aula de clase y reciclar.',
    videoUrl: 'https://www.youtube.com/embed/DR-cfDsHCGA',
  },
  'primero-salon-objetos': {
    type: 'song',
    emoji: '🎬',
    title: 'School Supplies Song',
    description: 'Reconoce lápices, libros y reglas con esta canción animada.',
    videoUrl: 'https://www.youtube.com/embed/0d6Ed3baRj8',
  },
  'primero-compañeros': {
    type: 'song',
    emoji: '🎬',
    title: 'We Are Friends Song',
    description: 'Celebra la amistad y el compañerismo en el colegio.',
    videoUrl: 'https://www.youtube.com/embed/vXXiyIGqliE',
  },
  'primero-repaso': {
    type: 'song',
    emoji: '🎬',
    title: 'Follow the Rules and Review Song',
    description: 'Repaso dinámico de todas las instrucciones y palabras del año.',
    videoUrl: 'https://www.youtube.com/embed/ckKQclquAXU',
  },
  'segundo-historias': {
    type: 'song',
    emoji: '🎬',
    title: 'Story Sequence Song: First, Next, Last',
    description: 'Aprende a ordenar el inicio, desarrollo y final de una historia.',
    videoUrl: 'https://www.youtube.com/embed/4XLQpRI_wOQ',
  },
  'segundo-casa-cosas': {
    type: 'song',
    emoji: '🎬',
    title: 'Parts of the House Song',
    description: 'Recorre y nombra cada habitación de la casa en inglés.',
    videoUrl: 'https://www.youtube.com/embed/loINl3Ln6Ck',
  },
  'segundo-quien-eres': {
    type: 'song',
    emoji: '🎬',
    title: 'Where Are You From? Song',
    description: 'Practica preguntar y responder de qué país y ciudad eres.',
    videoUrl: 'https://www.youtube.com/embed/mXMofxtDPUQ',
  },
  'segundo-ropa-clima': {
    type: 'song',
    emoji: '🎬',
    title: 'Weather and Clothes Song',
    description: 'Qué ropa usar cuando hace sol, frío o lluvia.',
    videoUrl: 'https://www.youtube.com/embed/rD6FRDd9Hew',
  },
  'segundo-festividades': {
    type: 'song',
    emoji: '🎬',
    title: 'Celebrations & Birthday Song',
    description: 'Canta sobre fiestas, cumpleaños y tradiciones familiares.',
    videoUrl: 'https://www.youtube.com/embed/13mftBvRmvM',
  },
  'segundo-cuento-historia': {
    type: 'song',
    emoji: '🎬',
    title: 'The Tortoise and the Hare Fable',
    description: 'Cuento clásico animado en inglés con moraleja sobre la perseverancia.',
    videoUrl: 'https://www.youtube.com/embed/4XLQpRI_wOQ',
  },
};

const unitHomework = {
  // === JARDÍN ===
  'jardin-hello': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: Saludos en familia',
    description: 'Practica los saludos en casa con el apoyo de tus papás.',
    tasks: [
      'Saluda a tus papás al despertar diciendo "Good morning!".',
      'Dibuja tu carita saludando con la mano: "Hello!".',
      'Despídete antes de dormir diciendo "Good night!".',
    ],
  },
  'jardin-colores': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: Cacería de colores',
    description: 'Busca colores en tu casa y nómbralos en inglés.',
    tasks: [
      'Encuentra un objeto "Blue" (azul) y uno "Red" (rojo) en tu casa.',
      'Muéstraselos a tu familia diciendo el color en voz alta.',
      'Colorea un sol amarillo diciendo "Yellow sun!".',
    ],
  },
  'jardin-numeros': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: Conteo con deditos',
    description: 'Practica los números del 1 al 10 con tus manos.',
    tasks: [
      'Muestra tus manos y cuenta del 1 al 5 en inglés.',
      'Busca 3 cucharas o juguetes y cuenta: "One, two, three!".',
      'Dibuja 5 bolitas de plastilina o bolitas de colores en tu cuaderno.',
    ],
  },
  'jardin-juguetes': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: Mi juguete favorito',
    description: 'Comparte y describe tu juguete preferido.',
    tasks: [
      'Elige tu juguete preferido y di: "I like my [ball / doll / car]".',
      'Dibuja tu juguete favorito en una hoja blanca.',
      'Guarda tus juguetes cantando la canción de "Clean Up".',
    ],
  },
  'jardin-animales': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: Sonidos de la granja',
    description: 'Imita a los animales y di su nombre en inglés.',
    tasks: [
      'Imita el sonido de una vaca ("Cow"), un perro ("Dog") y un gato ("Cat").',
      'Pide a un adulto que adivine qué animal estás imitando.',
      'Dibuja al animal de la granja que más te guste.',
    ],
  },
  'jardin-cuerpo-mueve': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: Mueve tu cuerpo',
    description: 'Actívate con movimiento y partes del cuerpo.',
    tasks: [
      'Toca tu cabeza diciendo "Head", tus manos diciendo "Hands" y tus pies diciendo "Feet".',
      'Da 3 saltos diciendo "Jump! Jump! Jump!".',
      'Aplaude fuerte diciendo "Clap your hands!".',
    ],
  },
  'jardin-familia': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: Abrazo familiar',
    description: 'Demuestra cariño a tu familia en inglés.',
    tasks: [
      'Abraza a tu mamá o papá diciendo "I love you Mommy / Daddy".',
      'Señala una foto familiar y nombra a quién ves: "Mom, Dad, Baby".',
      'Canta la canción de los deditos de la familia ("Finger Family").',
    ],
  },
  'jardin-repaso': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: Gran fiesta del saber',
    description: 'Repasa lo mejor que aprendiste en Jardín.',
    tasks: [
      'Dile a tus papás tu palabra favorita en inglés.',
      'Canta con tu familia la canción que más te gustó.',
      'Choca las cinco con todos en casa diciendo: "Great job!".',
    ],
  },

  // === TRANSICIÓN ===
  'transicion-familia': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: Mi familia en casa',
    description: 'Presenta a tu familia con orgullo.',
    tasks: [
      'Presenta a alguien en casa diciendo: "This is my mom" o "This is my dad".',
      'Dibuja a tu familia reunida en la sala o comedor.',
      'Di en inglés: "I love my family".',
    ],
  },
  'transicion-cuerpo': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: Head, shoulders, knees & toes',
    description: 'Baila y señala las partes del cuerpo.',
    tasks: [
      'Canta y baila "Head, Shoulders, Knees and Toes" frente al espejo.',
      'Toca tus ojos ("Eyes"), orejas ("Ears"), boca ("Mouth") y nariz ("Nose").',
      'Dibuja una carita feliz y señala cada parte aprendida.',
    ],
  },
  'transicion-casa': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: Recorrido por mi casa',
    description: 'Nombra los espacios de tu hogar en inglés.',
    tasks: [
      'Visita tu habitación diciendo "Bedroom" y la cocina diciendo "Kitchen".',
      'Dibuja la habitación de tu casa donde más te gusta jugar.',
      'Di a tu familia: "Welcome to our home!".',
    ],
  },
  'transicion-salon': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: Mochila lista',
    description: 'Organiza tus útiles escolares para la clase.',
    tasks: [
      'Revisa tu mochila y nombra 3 útiles: "Book, pencil, notebook".',
      'Dibuja un lápiz de tu color favorito.',
      'Deja tu cartuchera ordenada diciendo "Everything is ready!".',
    ],
  },
  'transicion-ropa-clima': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: El clima y mi ropa',
    description: 'Describe el clima de hoy y qué ropa llevas puesta.',
    tasks: [
      'Mira por la ventana y di si hoy está "Sunny" (soleado) o "Rainy" (lluvioso).',
      'Señala tu ropa y nombra: "Shirt" (camiseta), "Pants" (pantalón) y "Shoes" (zapatos).',
      'Dobla una prenda de ropa con ayuda de un adulto.',
    ],
  },
  'transicion-comidas': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: Alimentos ricos',
    description: 'Expresa tus gustos de comida en inglés.',
    tasks: [
      'En la cena di: "I like..." con una fruta o comida que te guste.',
      'Dibuja una manzana ("Red apple") o un plátano ("Yellow banana").',
      'Da las gracias en inglés: "Thank you for the delicious food!".',
    ],
  },
  'transicion-animales': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: Mundo animal',
    description: 'Identifica animales domésticos y salvajes.',
    tasks: [
      'Di qué animal te gusta más: "I like the dog" o "I like the cat".',
      'Dibuja un animal grande ("Big lion") y un animal pequeño ("Small bird").',
      'Haz el sonido de 3 animales para que tu familia los adivine.',
    ],
  },
  'transicion-comunidad-repaso': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: Ayudantes de la comunidad',
    description: 'Reconoce profesiones importantes de tu barrio.',
    tasks: [
      'Nombra una profesión que te inspire: "Teacher, Doctor o Firefighter".',
      'Dibuja a un miembro de la comunidad ayudando a los demás.',
      'Comparte con tus papás 3 palabras nuevas que aprendiste en Transición.',
    ],
  },

  // === PRIMERO ===
  'primero-instrucciones': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: Simon Says escolar',
    description: 'Juega en casa a dar y seguir instrucciones en inglés.',
    tasks: [
      'Juega a "Simon Says" con tus hermanos o papás: "Stand up, sit down, listen, clap!".',
      'Escribe en tu cuaderno las dos palabras mágicas: "Please" y "Thank you".',
      'Dibuja a un estudiante levantando la mano en clase.',
    ],
  },
  'primero-this-is-me': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: Mi tarjeta de identidad',
    description: 'Elabora tu carnet de presentación en inglés.',
    tasks: [
      'Escribe en tu cuaderno: "My name is [nombre]" y "I am [edad] years old".',
      'Dibuja tu autorretrato con tu ropa escolar o favorita.',
      'Preséntate frente a tu familia diciendo las dos frases con voz clara.',
    ],
  },
  'primero-describo-familia': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: Retrato descriptivo familiar',
    description: 'Describe a alguien de tu familia con palabras en inglés.',
    tasks: [
      'Elige a un familiar y escribe: "This is my [mom / dad]. He/She is [tall / short]".',
      'Describe el color de su cabello: "Black hair" o "Brown hair".',
      'Léele tu tarjeta en inglés y pídele que te dé su visto bueno.',
    ],
  },
  'primero-colores-numeros': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: Detective de números',
    description: 'Cuenta objetos cotidianos en casa en inglés.',
    tasks: [
      'Cuenta cuántos zapatos o libros hay en tu cuarto y dilo en inglés (ej: "Ten shoes").',
      'Pregunta la edad a un familiar: "How old are you?".',
      'Escribe los números del 1 al 15 en inglés en tu cuaderno.',
    ],
  },
  'primero-cuido-escuela': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: Misión ecológica en casa',
    description: 'Aplica el cuidado ambiental en tu hogar.',
    tasks: [
      'Ayuda a ordenar tu espacio diciendo: "Clean up, clean up!".',
      'Separa con tu familia una botella o papel para reciclar ("Recycle!").',
      'Dibuja un cartel pequeño que diga "Turn off the lights" para la pared.',
    ],
  },
  'primero-salon-objetos': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: Mi cartuchera en acción',
    description: 'Reconoce tus útiles y escribe oraciones cortas.',
    tasks: [
      'Abre tu cartuchera y nombra 4 útiles: "Pencil, eraser, ruler, notebook".',
      'Escribe una oración sencilla: "There is one pencil in my backpack".',
      'Deja tu bolso organizado para llegar con todo listo a la escuela.',
    ],
  },
  'primero-compañeros': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: Tarjeta para un amigo',
    description: 'Expresa valores de amistad y compañerismo.',
    tasks: [
      'Piensa en tu amigo(a) de clase y escribe: "My friend is happy and kind".',
      'Hazle un dibujo de ambos compartiendo en el colegio.',
      'Prepárate para saludarlo mañana con una sonrisa: "Hello, my good friend!".',
    ],
  },
  'primero-repaso': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: Gran repaso del año',
    description: 'Demuestra todo tu talento bilingüe en casa.',
    tasks: [
      'Di a tus papás tu nombre, tu edad y tus 3 colores favoritos sin mirar el cuaderno.',
      'Cuenta en inglés del 1 al 20 aplaudiendo con ritmo.',
      'Pide a un adulto que firme tu cuaderno con un mensaje de felicitación.',
    ],
  },

  // === SEGUNDO ===
  'segundo-cuerpo-familia': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: Mi cuerpo y acciones',
    description: 'Describe habilidades y partes del cuerpo en familia.',
    tasks: [
      'Señala 5 partes del cuerpo: "Shoulders, knees, elbows, eyes, mouth".',
      'Escribe una oración sobre alguien de tu familia: "My brother can jump high".',
      'Haz 5 saltos en un pie contando: "One, two, three, four, five!".',
    ],
  },
  'segundo-historias': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: Mini historieta en 3 pasos',
    description: 'Crea una secuencia ilustrada de tu día a día.',
    tasks: [
      'Dibuja 3 viñetas usando: "First (primero)", "Then (luego)" y "Finally (al final)".',
      'Escribe una acción en inglés debajo de cada dibujo (ej: "Eat lunch", "Play", "Sleep").',
      'Cuéntale la historia a tu familia en voz alta.',
    ],
  },
  'segundo-casa-cosas': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: Plano de mi casa',
    description: 'Ubica habitaciones y objetos de tu vivienda.',
    tasks: [
      'Dibuja un plano sencillo de tu casa con nombres: "Living room, Kitchen, Bedroom, Bathroom".',
      'Escribe una oración: "There is a bed in my bedroom".',
      'Cuenta cuántas puertas y ventanas hay en tu casa en inglés.',
    ],
  },
  'segundo-quien-eres': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: Pasaporte de identidad',
    description: 'Completa tu información personal y origen.',
    tasks: [
      'Escribe en tu cuaderno: "Name: [Tu nombre]", "Country: Colombia", "Language: Spanish and English".',
      'Escribe con orgullo: "I live in Colombia and I love learning English!".',
      'Pregunta a tus familiares de qué ciudad o región son originarios.',
    ],
  },
  'segundo-animales-habitats': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: Ficha del reino animal',
    description: 'Investiga sobre un animal y su hábitat natural.',
    tasks: [
      'Elige tu animal favorito y escribe: "The [lion / dolphin / eagle] lives in the [jungle / ocean / mountains]".',
      'Describe una cualidad: "It is fast, strong or big".',
      'Dibuja al animal en su hábitat natural con colores vivos.',
    ],
  },
  'segundo-ropa-clima': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: Pronóstico del clima',
    description: 'Juega a ser presentador del clima en inglés.',
    tasks: [
      'Mira el clima de hoy y di: "Today it is [sunny / rainy / cold]".',
      'Describe tu atuendo: "I wear my [jacket / t-shirt / boots]".',
      'Presenta el clima a tu familia como si estuvieras en el noticiero.',
    ],
  },
  'segundo-festividades': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: Tarjeta de celebración',
    description: 'Diseña una tarjeta festiva en inglés para alguien especial.',
    tasks: [
      'Escribe en una tarjeta: "Happy Birthday!" o "Happy Celebration! Best wishes for you".',
      'Decórala con dibujos de globos, flores o serpentinas.',
      'Entrégasela a la persona especial y felicítala en inglés.',
    ],
  },
  'segundo-cuento-historia': {
    type: 'homework',
    emoji: '🏠',
    title: 'Homework: Medalla de fin de grado',
    description: 'Reflexiona sobre tu aprendizaje en segundo grado.',
    tasks: [
      'Dibuja una medalla y escribe en el centro: "English Star - 2nd Grade".',
      'Escribe las 5 palabras o frases que más te gustó aprender este año.',
      'Agradece a tu profesor(a) y papás diciendo: "Thank you for supporting me!".',
    ],
  },
};

// Read original file
const originalCode = fs.readFileSync(targetFile, 'utf8');

// Parse the unitSlides object by evaluating in a clean sandbox
const sandbox = {};
const vm = require('vm');
const scriptCode = originalCode.replace('export const unitSlides =', 'unitSlides =');
vm.runInNewContext(scriptCode, sandbox);
const { unitSlides } = sandbox;

console.log('Original unitSlides loaded:', Object.keys(unitSlides).length, 'units');

// Enrich each unit
for (const [unitKey, slides] of Object.entries(unitSlides)) {
  // Check if unit lacks video
  const hasVideo = slides.some(s => s.type === 'song' || s.type === 'video');
  if (!hasVideo && unitVideos[unitKey]) {
    // Insert video after vocabulary or at slide index 2
    const vocabIndex = slides.findIndex(s => s.type === 'vocabulary');
    const insertIndex = vocabIndex !== -1 ? vocabIndex + 1 : 2;
    slides.splice(insertIndex, 0, unitVideos[unitKey]);
    console.log(`Inserted video into ${unitKey} at position ${insertIndex}`);
  }

  // Remove any existing homework slide if already present
  const hwIndex = slides.findIndex(s => s.type === 'homework');
  if (hwIndex !== -1) {
    slides.splice(hwIndex, 1);
  }

  // Append homework slide at the very end
  if (unitHomework[unitKey]) {
    slides.push(unitHomework[unitKey]);
    console.log(`Appended homework to ${unitKey}`);
  }
}

// Generate new unitSlides.js code
const newCode = `/**
 * Contenido de slides por unidad (32 unidades: 4 grados x 8 unidades).
 * Tipos: content | vocabulary | activity | song | homework.
 * Los videos embebidos son canales oficiales verificados
 * (Super Simple Songs, Noodle & Pals, The Kiboomers, The Singing Walrus).
 * Cada unidad cuenta con su video pedagógico y su slide final de homework.
 */

export const unitSlides = ${JSON.stringify(unitSlides, null, 2)};
`;

fs.writeFileSync(targetFile, newCode, 'utf8');
console.log('Successfully updated unitSlides.js!');
