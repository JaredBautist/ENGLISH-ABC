/**
 * Grados institucionales y currículo por DBA (MEN, Colombia).
 *
 * Los DBA de Transición, 1° y 2° son los textos oficiales de la cartilla
 * "Derechos Básicos de Aprendizaje de Inglés — grados Transición a 5º de
 * primaria" del Ministerio de Educación Nacional. Jardín no tiene DBA
 * oficiales de inglés, por lo que usa referentes de preescolar.
 *
 * Estructura: 4 periodos escolares por grado, 2 unidades por periodo.
 * Las unidades del periodo 1 tienen slides completas; los periodos 2-4
 * quedan planificados (ready: false) y se muestran "en preparación".
 */

export const grades = {
  jardin: {
    id: 'jardin',
    name: 'Jardín',
    levelLabel: 'Jardín',
    color: '#f59e0b',
    accent: 'from-amber-400 to-orange-500',
    description:
      'Apropiación lúdica del inglés: saludos, objetos cercanos, partes del cuerpo e instrucciones sencillas por medio de canciones, juegos y rutinas de salón.',
    dbas: [
      { number: 1, text: 'Saluda y responde a su nombre con gestos y frases modeladas por el docente (referente preescolar).' },
      { number: 2, text: 'Asocia imágenes con sonidos de palabras de su entorno inmediato: colores, objetos del salón y juguetes.' },
      { number: 3, text: 'Sigue rutinas de clase acompañadas de gestos (Hello! / Bye-bye / Clean up!).' },
    ],
    units: [
      {
        week: 1, period: 1, title: 'Hello! Saludos y rutinas de salón',
        subtitle: 'Greetings • Hello/Bye-bye • My name is...',
        dba: 1, route: '/jardin/unidad-1', slides: 'jardin-hello', ready: true,
      },
      {
        week: 2, period: 1, title: 'Colores y objetos del salón',
        subtitle: 'Colors • School objects',
        dba: 2, route: '/jardin/unidad-2', slides: 'jardin-colores', ready: true,
      },
      {
        week: 3, period: 2, title: 'Números del 1 al 10',
        subtitle: 'Numbers • Counting fingers • One, two, three!',
        dba: 2, route: '/jardin/unidad-3', ready: false,
      },
      {
        week: 4, period: 2, title: 'Mis juguetes',
        subtitle: 'Toys • Ball, doll, car • I like…',
        dba: 2, route: '/jardin/unidad-4', ready: false,
      },
      {
        week: 5, period: 3, title: 'Animales de la granja',
        subtitle: 'Farm animals • Cow, dog, cat • Animal sounds',
        dba: 2, route: '/jardin/unidad-5', ready: false,
      },
      {
        week: 6, period: 3, title: 'Mi cuerpo se mueve',
        subtitle: 'Body parts • Jump, run, clap',
        dba: 3, route: '/jardin/unidad-6', ready: false,
      },
      {
        week: 7, period: 4, title: 'La familia en casa',
        subtitle: 'Family • Mommy, daddy, baby',
        dba: 1, route: '/jardin/unidad-7', ready: false,
      },
      {
        week: 8, period: 4, title: 'Celebramos y repaso',
        subtitle: 'Review • Hello, colors, numbers • Party words',
        dba: 3, route: '/jardin/unidad-8', ready: false,
      },
    ],
  },

  transicion: {
    id: 'transicion',
    name: 'Transición',
    levelLabel: 'Transición',
    color: '#8b5cf6',
    accent: 'from-violet-500 to-fuchsia-500',
    description:
      'Identificación de palabras del entorno inmediato: saludos, despedidas, familia y cuerpo, a partir de imágenes, canciones y juegos.',
    dbas: [
      { number: 1, text: 'Construye su identidad en relación con los otros; se siente miembro de su familia y de su comunidad y reconoce palabras propias de estos entornos en inglés.' },
      { number: 2, text: 'Identifica palabras en inglés que son relacionadas entre sí sobre temas que le son familiares.' },
      { number: 3, text: 'Asocia imágenes con sonidos de palabras relacionadas con su casa y salón de clases.' },
    ],
    units: [
      {
        week: 1, period: 1, title: 'Mi familia y yo',
        subtitle: 'Family members • This is my mommy/daddy',
        dba: 1, route: '/transicion/unidad-1', slides: 'transicion-familia', ready: true,
      },
      {
        week: 2, period: 1, title: 'Mi cuerpo habla',
        subtitle: 'Body parts • Head, shoulders, knees and toes',
        dba: 2, route: '/transicion/unidad-2', slides: 'transicion-cuerpo', ready: true,
      },
      {
        week: 3, period: 2, title: 'Mi casa',
        subtitle: 'House • Rooms and objects • Home words',
        dba: 3, route: '/transicion/unidad-3', ready: false,
      },
      {
        week: 4, period: 2, title: 'Mi salón de clases',
        subtitle: 'Classroom objects • School words',
        dba: 3, route: '/transicion/unidad-4', ready: false,
      },
      {
        week: 5, period: 3, title: 'Ropa y clima',
        subtitle: 'Clothes • Hot, cold • Put on your…',
        dba: 2, route: '/transicion/unidad-5', ready: false,
      },
      {
        week: 6, period: 3, title: 'Comidas que me gustan',
        subtitle: 'Food • Fruits • I like / I don\'t like',
        dba: 2, route: '/transicion/unidad-6', ready: false,
      },
      {
        week: 7, period: 4, title: 'Animales de mi entorno',
        subtitle: 'Pets and wild animals • Big, small',
        dba: 2, route: '/transicion/unidad-7', ready: false,
      },
      {
        week: 8, period: 4, title: 'Mi comunidad y repaso',
        subtitle: 'Community • Review family, body, house',
        dba: 1, route: '/transicion/unidad-8', ready: false,
      },
    ],
  },

  primero: {
    id: 'primero',
    name: 'Primero',
    levelLabel: '1°',
    color: '#0ea5e9',
    accent: 'from-sky-500 to-cyan-500',
    description:
      'Respuesta a instrucciones de clase, información personal sencilla, cualidades físicas propias y de sus compañeros, y cuidado del entorno escolar.',
    dbas: [
      { number: 1, text: 'Comprende y responde a instrucciones sobre tareas escolares básicas, de manera verbal y no verbal.' },
      { number: 2, text: 'Expresa oralmente algunas cualidades físicas propias y de las personas que le rodean, a través de palabras y frases previamente estudiadas.' },
      { number: 3, text: 'Comprende y realiza declaraciones sencillas, y pone en práctica estrategias de cuidado del medio ambiente en la escuela.' },
      { number: 4, text: 'Responde preguntas sencillas sobre información personal básica, como su nombre, edad, familia y compañeros de clase.' },
    ],
    units: [
      {
        week: 1, period: 1, title: 'Classroom instructions',
        subtitle: 'Stand up • Sit down • Open your book • Listen',
        dba: 1, route: '/primero/unidad-1', slides: 'primero-instrucciones', ready: true,
      },
      {
        week: 2, period: 1, title: 'This is me!',
        subtitle: 'My name is... • I am 7 years old • Personal information',
        dba: 4, route: '/primero/unidad-2', slides: 'primero-this-is-me', ready: true,
      },
      {
        week: 3, period: 2, title: 'Describo a mi familia',
        subtitle: 'Physical descriptions • Tall, short • His/Her hair is…',
        dba: 2, route: '/primero/unidad-3', ready: false,
      },
      {
        week: 4, period: 2, title: 'Colores, números y edad',
        subtitle: 'Colors • Numbers 1-30 • How old are you?',
        dba: 4, route: '/primero/unidad-4', ready: false,
      },
      {
        week: 5, period: 3, title: 'Cuido mi escuela',
        subtitle: 'School care • Clean up • Reduce, reuse, recycle',
        dba: 3, route: '/primero/unidad-5', ready: false,
      },
      {
        week: 6, period: 3, title: 'Mi salón y mis objetos',
        subtitle: 'Classroom objects • There is / There are',
        dba: 3, route: '/primero/unidad-6', ready: false,
      },
      {
        week: 7, period: 4, title: 'Mis compañeros y yo',
        subtitle: 'My classmates • He is… / She is… • Qualities',
        dba: 2, route: '/primero/unidad-7', ready: false,
      },
      {
        week: 8, period: 4, title: 'Repaso del año',
        subtitle: 'Review • Instructions, personal info, descriptions',
        dba: 1, route: '/primero/unidad-8', ready: false,
      },
    ],
  },

  segundo: {
    id: 'segundo',
    name: 'Segundo',
    levelLabel: '2°',
    color: '#10b981',
    accent: 'from-emerald-500 to-teal-500',
    description:
      'Expresión de ideas sencillas sobre temas estudiados, comprensión de historias cortas, intercambio de información personal y aspectos culturales del entorno.',
    dbas: [
      { number: 1, text: 'Expresa ideas sencillas sobre temas estudiados, usando palabras y frases.' },
      { number: 2, text: 'Comprende la secuencia de una historia corta y sencilla sobre temas familiares, y la cuenta nuevamente a partir de ilustraciones y palabras conocidas.' },
      { number: 3, text: 'Intercambia información personal como su nombre, edad y procedencia con compañeros y profesores, usando frases sencillas, siguiendo modelos provistos por el docente.' },
      { number: 4, text: 'Menciona aspectos culturales propios de su entorno, usando vocabulario y expresiones conocidas.' },
    ],
    units: [
      {
        week: 1, period: 1, title: 'Mi cuerpo y mi familia',
        subtitle: 'Body parts • Family members • Actions',
        dba: 1, route: '/segundo/unidad-1', slides: 'segundo-cuerpo-familia', ready: true,
      },
      {
        week: 2, period: 1, title: 'Historias cortas con imágenes',
        subtitle: 'Story sequence • First, then, finally',
        dba: 2, route: '/segundo/unidad-2', slides: 'segundo-historias', ready: true,
      },
      {
        week: 3, period: 2, title: 'Mi casa y mis cosas',
        subtitle: 'House parts • Objects • Numbers 11-20',
        dba: 1, route: '/segundo/unidad-3', ready: false,
      },
      {
        week: 4, period: 2, title: 'Cuéntame quién eres',
        subtitle: 'Personal information • Where are you from?',
        dba: 3, route: '/segundo/unidad-4', ready: false,
      },
      {
        week: 5, period: 3, title: 'Animales y hábitats',
        subtitle: 'Wild animals • Can/Can\'t • Habitats',
        dba: 1, route: '/segundo/unidad-5', ready: false,
      },
      {
        week: 6, period: 3, title: 'La ropa y el clima',
        subtitle: 'Clothes • Weather • I wear…',
        dba: 1, route: '/segundo/unidad-6', ready: false,
      },
      {
        week: 7, period: 4, title: 'Festividades de Colombia',
        subtitle: 'Cultural celebrations • Carnival, Christmas',
        dba: 4, route: '/segundo/unidad-7', ready: false,
      },
      {
        week: 8, period: 4, title: 'Cuento mi historia',
        subtitle: 'Review • Tell a short story with pictures',
        dba: 2, route: '/segundo/unidad-8', ready: false,
      },
    ],
  },
};

export const defaultGradeId = 'jardin';

export const gradeOrder = ['jardin', 'transicion', 'primero', 'segundo'];

export const periodLabels = {
  1: 'Periodo 1',
  2: 'Periodo 2',
  3: 'Periodo 3',
  4: 'Periodo 4',
};

export function getGrade(gradeId) {
  return grades[gradeId] || null;
}

export function unitsByPeriod(grade) {
  if (!grade) return [];
  const periods = [];
  for (const unit of grade.units) {
    let bucket = periods.find((p) => p.period === unit.period);
    if (!bucket) {
      bucket = { period: unit.period, label: periodLabels[unit.period] || `Periodo ${unit.period}`, units: [] };
      periods.push(bucket);
    }
    bucket.units.push(unit);
  }
  return periods.sort((a, b) => a.period - b.period);
}

/**
 * Contenido de slides por unidad (solo periodo 1 en esta fase).
 * Tipos: content | vocabulary | activity | song.
 */
export const unitSlides = {
  'jardin-hello': [
    {
      type: 'content',
      emoji: '👋',
      title: 'Hello!',
      description: 'Saluda con la profe: Hello! / Hi! / Bye-bye!',
      items: ['Hello! (Hola)', 'Hi! (¡Hola! informal)', 'Bye-bye! (Adiós)', 'Good morning! (Buenos días)'],
      examples: ['Teacher: Hello! — Student: Hello!'],
    },
    {
      type: 'vocabulary',
      title: 'My name is...',
      description: 'Cada niño dice su nombre con la profe.',
      words: [
        { word: 'My name is…', emoji: '🙋', es: 'Mi nombre es…' },
        { word: 'What is your name?', emoji: '❓', es: '¿Cuál es tu nombre?' },
        { word: 'Nice to meet you!', emoji: '🤝', es: '¡Mucho gusto!' },
      ],
    },
    {
      type: 'song',
      emoji: '🎵',
      title: 'Hello Song',
      description: 'Canten juntos y saluden con las manos.',
      videoUrl: 'https://www.youtube.com/embed/tVlcKp3bWH8',
    },
    {
      type: 'content',
      emoji: '🕘',
      title: 'Rutinas del salón',
      description: 'Rutinas diarias con gestos.',
      items: ['Clean up! (A recoger!)', 'Line up! (Formen fila!)', 'Sit down, please (Siéntense, por favor)', 'Quiet, please (Silencio, por favor)'],
    },
    {
      type: 'activity',
      activityType: 'choice',
      question: 'La profe dice "Hello!" ¿Qué respondes?',
      options: ['Hello!', 'Bye-bye!', 'Colors'],
      correct: 'Hello!',
    },
    {
      type: 'activity',
      activityType: 'choice',
      question: 'Al terminar la clase, la profe dice…',
      options: ['Bye-bye!', 'Good morning!', 'My name is…'],
      correct: 'Bye-bye!',
    },
  ],
  'jardin-colores': [
    {
      type: 'content',
      emoji: '🌈',
      title: 'Colors',
      description: 'Los colores del salón.',
      items: ['Red (rojo)', 'Blue (azul)', 'Yellow (amarillo)', 'Green (verde)'],
    },
    {
      type: 'vocabulary',
      title: 'More colors',
      description: 'Señala objetos de cada color en el salón.',
      words: [
        { word: 'Orange', emoji: '🟠', es: 'Naranja' },
        { word: 'Purple', emoji: '🟣', es: 'Morado' },
        { word: 'Black', emoji: '⚫', es: 'Negro' },
        { word: 'White', emoji: '⚪', es: 'Blanco' },
      ],
    },
    {
      type: 'vocabulary',
      title: 'School objects',
      description: 'Objetos del salón con colores.',
      words: [
        { word: 'Book', emoji: '📚', es: 'Libro' },
        { word: 'Pencil', emoji: '✏️', es: 'Lápiz' },
        { word: 'Crayon', emoji: '🖍️', es: 'Crayón' },
        { word: 'Chair', emoji: '🪑', es: 'Silla' },
      ],
    },
    {
      type: 'song',
      emoji: '🎵',
      title: 'I See Something Blue',
      description: 'Encuentra objetos azules mientras cantan.',
      videoUrl: 'https://www.youtube.com/embed/jYAWf8Y91hA',
    },
    {
      type: 'activity',
      activityType: 'choice',
      question: '¿De qué color es el sol?',
      options: ['Yellow', 'Blue', 'Green'],
      correct: 'Yellow',
    },
    {
      type: 'activity',
      activityType: 'choice',
      question: '"Pencil" es…',
      options: ['Un lápiz', 'Un libro', 'Una silla'],
      correct: 'Un lápiz',
    },
  ],
  'transicion-familia': [
    {
      type: 'content',
      emoji: '👨‍👩‍👧',
      title: 'My family',
      description: 'La familia de cada niño.',
      items: ['Mommy (mamá)', 'Daddy (papá)', 'Brother (hermano)', 'Sister (hermana)'],
      examples: ['This is my mommy. (Esta es mi mamá.)'],
    },
    {
      type: 'vocabulary',
      title: 'Family words',
      description: 'Señala y repite.',
      words: [
        { word: 'Family', emoji: '🏡', es: 'Familia' },
        { word: 'Baby', emoji: '👶', es: 'Bebé' },
        { word: 'Grandma', emoji: '👵', es: 'Abuela' },
        { word: 'Grandpa', emoji: '👴', es: 'Abuelo' },
      ],
    },
    {
      type: 'song',
      emoji: '🎵',
      title: 'Finger Family Song',
      description: 'Canten con los dedos: daddy finger, mommy finger…',
      videoUrl: 'https://www.youtube.com/embed/YJyNoFk8tnA',
    },
    {
      type: 'content',
      emoji: '🖼️',
      title: 'Dibuja tu familia',
      description: 'Cada niño dibuja su familia y nombra a cada uno en inglés.',
      items: ['This is my daddy.', 'This is my mommy.', 'This is my brother.', 'This is my sister.'],
      examples: ['Teacher: Who is this? — Student: My mommy!'],
    },
    {
      type: 'activity',
      activityType: 'choice',
      question: '"This is my mommy" significa…',
      options: ['Esta es mi mamá', 'Este es mi perro', 'Adiós mamá'],
      correct: 'Esta es mi mamá',
    },
    {
      type: 'activity',
      activityType: 'choice',
      question: 'El papá es…',
      options: ['Daddy', 'Mommy', 'Baby'],
      correct: 'Daddy',
    },
  ],
  'transicion-cuerpo': [
    {
      type: 'content',
      emoji: '🧒',
      title: 'My body',
      description: 'Partes del cuerpo con gestos.',
      items: ['Head (cabeza)', 'Hands (manos)', 'Feet (pies)', 'Eyes (ojos)'],
    },
    {
      type: 'vocabulary',
      title: 'More body parts',
      description: 'Toca cada parte mientras la dices.',
      words: [
        { word: 'Nose', emoji: '👃', es: 'Nariz' },
        { word: 'Mouth', emoji: '👄', es: 'Boca' },
        { word: 'Ears', emoji: '👂', es: 'Orejas' },
        { word: 'Arms', emoji: '💪', es: 'Brazos' },
      ],
    },
    {
      type: 'vocabulary',
      title: 'Touch your…',
      description: 'La profe dice y todos señalan.',
      words: [
        { word: 'Touch your head', emoji: '🙋', es: 'Toca tu cabeza' },
        { word: 'Touch your nose', emoji: '👃', es: 'Toca tu nariz' },
        { word: 'Clap your hands', emoji: '👏', es: 'Aplaude' },
      ],
    },
    {
      type: 'song',
      emoji: '🎵',
      title: 'Head, Shoulders, Knees and Toes',
      description: 'Tocar cada parte mientras cantan.',
      videoUrl: 'https://www.youtube.com/embed/ZiNfns1jlBs',
    },
    {
      type: 'activity',
      activityType: 'choice',
      question: 'La profe dice "Clap your hands". ¿Qué haces?',
      options: ['Aplaudir', 'Dormir', 'Saltar'],
      correct: 'Aplaudir',
    },
    {
      type: 'activity',
      activityType: 'choice',
      question: '"Eyes" son…',
      options: ['Los ojos', 'Las orejas', 'Los pies'],
      correct: 'Los ojos',
    },
  ],
  'primero-instrucciones': [
    {
      type: 'content',
      emoji: '🧑‍🏫',
      title: 'Classroom instructions',
      description: 'Instrucciones de clase: escucha y haz.',
      items: ['Stand up (pararse)', 'Sit down (sentarse)', 'Open your book (abrir el libro)', 'Listen (escuchar)'],
    },
    {
      type: 'vocabulary',
      title: 'More commands',
      description: 'Practica con gestos.',
      words: [
        { word: 'Close your book', emoji: '📕', es: 'Cierra el libro' },
        { word: 'Point to…', emoji: '👉', es: 'Señala…' },
        { word: 'Raise your hand', emoji: '✋', es: 'Levanta la mano' },
        { word: 'Line up', emoji: '🚶', es: 'Formen fila' },
      ],
    },
    {
      type: 'song',
      emoji: '🎵',
      title: 'Follow Me — Commands Song',
      description: 'Sigan las instrucciones de la canción.',
      videoUrl: 'https://www.youtube.com/embed/6RfTKqUUZr4',
    },
    {
      type: 'content',
      emoji: '🎮',
      title: 'Simon Says',
      description: 'Solo obedezcan si la profe dice "Simon says".',
      items: ['Simon says: stand up!', 'Simon says: touch your head!', 'Sit down! (¡Trampa! No se paren)'],
      examples: ['Teacher: Simon says clap! — Everyone claps.'],
    },
    {
      type: 'activity',
      activityType: 'choice',
      question: 'Teacher: "Stand up, please!" Los estudiantes…',
      options: ['Se paran', 'Se sientan', 'Abren el libro'],
      correct: 'Se paran',
    },
    {
      type: 'activity',
      activityType: 'fill',
      prompt: 'Completa: Teacher: "___ your book, please." (abrir)',
      answer: 'Open',
      placeholder: 'Escribe el verbo…',
    },
  ],
  'primero-this-is-me': [
    {
      type: 'content',
      emoji: '🙋',
      title: 'This is me!',
      description: 'Información personal básica.',
      items: ['My name is Ana (Mi nombre es Ana)', 'I am 7 years old (Tengo 7 años)', 'I am from Colombia (Soy de Colombia)'],
    },
    {
      type: 'vocabulary',
      title: 'Questions & answers',
      description: 'Modela con un estudiante y luego todos practican.',
      words: [
        { word: 'What is your name?', emoji: '❓', es: '¿Cuál es tu nombre?' },
        { word: 'How old are you?', emoji: '🎂', es: '¿Cuántos años tienes?' },
        { word: 'I am seven years old', emoji: '7️⃣', es: 'Tengo siete años' },
      ],
    },
    {
      type: 'vocabulary',
      title: 'Numbers 1-10',
      description: 'Cuenta con los dedos.',
      words: [
        { word: 'One, two, three', emoji: '1️⃣', es: 'Uno, dos, tres' },
        { word: 'Four, five, six', emoji: '4️⃣', es: 'Cuatro, cinco, seis' },
        { word: 'Seven, eight', emoji: '7️⃣', es: 'Siete, ocho' },
        { word: 'Nine, ten', emoji: '🔟', es: 'Nueve, diez' },
      ],
    },
    {
      type: 'song',
      emoji: '🎵',
      title: 'What\'s Your Name?',
      description: 'Practiquen la pregunta y la respuesta cantando.',
      videoUrl: 'https://www.youtube.com/embed/ba5uqYvZ4Bk',
    },
    {
      type: 'activity',
      activityType: 'fill',
      prompt: 'Completa: "My ___ is Camila." (nombre)',
      answer: 'name',
      placeholder: 'Escribe la palabra…',
    },
    {
      type: 'activity',
      activityType: 'choice',
      question: '"How old are you?" se responde con…',
      options: ['I am 7 years old', 'My name is Juan', 'Goodbye'],
      correct: 'I am 7 years old',
    },
  ],
  'segundo-cuerpo-familia': [
    {
      type: 'content',
      emoji: '🧑‍🤝‍🧑',
      title: 'My body & my family',
      description: 'Repaso con acciones.',
      items: ['I run (yo corro)', 'I jump (yo salto)', 'My brother runs (mi hermano corre)', 'My sister sings (mi hermana canta)'],
    },
    {
      type: 'vocabulary',
      title: 'Family actions',
      description: 'Une la acción con la persona.',
      words: [
        { word: 'Mommy cooks', emoji: '🍲', es: 'Mamá cocina' },
        { word: 'Daddy works', emoji: '💼', es: 'Papá trabaja' },
        { word: 'I play', emoji: '⚽', es: 'Yo juego' },
      ],
    },
    {
      type: 'vocabulary',
      title: 'Body parts review',
      description: 'Señala y di la palabra.',
      words: [
        { word: 'Shoulders', emoji: '🤷', es: 'Hombros' },
        { word: 'Knees', emoji: '🦵', es: 'Rodillas' },
        { word: 'Toes', emoji: '🦶', es: 'Dedos del pie' },
        { word: 'Fingers', emoji: '🖐️', es: 'Dedos' },
      ],
    },
    {
      type: 'song',
      emoji: '🎵',
      title: 'Walking in the Jungle — Actions',
      description: 'Activen los movimientos de la canción.',
      videoUrl: 'https://www.youtube.com/embed/GoSq-yZcJ-4',
    },
    {
      type: 'content',
      emoji: '🗣️',
      title: 'Di una frase',
      description: 'Cada estudiante dice una frase sobre su familia.',
      examples: ['My mommy cooks.', 'My daddy works.', 'I play with my sister.', 'I run with my brother.'],
    },
    {
      type: 'activity',
      activityType: 'choice',
      question: '"I jump" significa…',
      options: ['Yo salto', 'Yo como', 'Yo duermo'],
      correct: 'Yo salto',
    },
  ],
  'segundo-historias': [
    {
      type: 'content',
      emoji: '📖',
      title: 'Story sequence',
      description: 'Ordena la historia con First, Then, Finally.',
      items: ['First… (Primero…)', 'Then… (Entonces…)', 'Finally… (Finalmente…)'],
    },
    {
      type: 'vocabulary',
      title: 'Story words',
      description: 'Palabras para contar historias.',
      words: [
        { word: 'Beginning', emoji: '🌅', es: 'Comienzo' },
        { word: 'Middle', emoji: '⏱️', es: 'Mitad' },
        { word: 'End', emoji: '🌇', es: 'Final' },
        { word: 'Character', emoji: '🧒', es: 'Personaje' },
      ],
    },
    {
      type: 'content',
      emoji: '🐱',
      title: 'La historia del gatito',
      description: 'La profe cuenta con dibujos y los niños la re-cuentan.',
      items: [
        'First, the kitten is hungry. (Primero, el gatito tiene hambre.)',
        'Then, he looks for milk. (Entonces, busca leche.)',
        'Finally, he drinks the milk. (Finalmente, toma la leche.)',
      ],
    },
    {
      type: 'song',
      emoji: '🎵',
      title: 'The Cat and the Moon (story song)',
      description: 'Escuchen la historia y mencionen First, Then, Finally.',
      videoUrl: 'https://www.youtube.com/embed/1JyCB5VuXr0',
    },
    {
      type: 'activity',
      activityType: 'choice',
      question: '¿Cómo empiezas a contar una historia?',
      options: ['First…', 'Finally…', 'Goodbye'],
      correct: 'First…',
    },
    {
      type: 'activity',
      activityType: 'choice',
      question: '¿Cómo terminas una historia?',
      options: ['Finally…', 'First…', 'Then…'],
      correct: 'Finally…',
    },
  ],
};
