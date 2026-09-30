/**
 * Grados institucionales y currículo por DBA (MEN, Colombia).
 *
 * Los DBA de Transición, 1° y 2° son los textos oficiales de la cartilla
 * "Derechos Básicos de Aprendizaje de Inglés — grados Transición a 5º de
 * primaria" del Ministerio de Educación Nacional. Jardín no tiene DBA
 * oficiales de inglés, por lo que usa referentes de preescolar.
 *
 * Estructura: 4 periodos escolares por grado, 2 unidades por periodo.
 * Las 32 unidades tienen slides completas (contenido en unitSlides.js).
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
        dba: 2, route: '/jardin/unidad-3', slides: 'jardin-numeros', ready: true,
      },
      {
        week: 4, period: 2, title: 'Mis juguetes',
        subtitle: 'Toys • Ball, doll, car • I like…',
        dba: 2, route: '/jardin/unidad-4', slides: 'jardin-juguetes', ready: true,
      },
      {
        week: 5, period: 3, title: 'Animales de la granja',
        subtitle: 'Farm animals • Cow, dog, cat • Animal sounds',
        dba: 2, route: '/jardin/unidad-5', slides: 'jardin-animales', ready: true,
      },
      {
        week: 6, period: 3, title: 'Mi cuerpo se mueve',
        subtitle: 'Body parts • Jump, run, clap',
        dba: 3, route: '/jardin/unidad-6', slides: 'jardin-cuerpo-mueve', ready: true,
      },
      {
        week: 7, period: 4, title: 'La familia en casa',
        subtitle: 'Family • Mommy, daddy, baby',
        dba: 1, route: '/jardin/unidad-7', slides: 'jardin-familia', ready: true,
      },
      {
        week: 8, period: 4, title: 'Celebramos y repaso',
        subtitle: 'Review • Hello, colors, numbers • Party words',
        dba: 3, route: '/jardin/unidad-8', slides: 'jardin-repaso', ready: true,
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
        dba: 3, route: '/transicion/unidad-3', slides: 'transicion-casa', ready: true,
      },
      {
        week: 4, period: 2, title: 'Mi salón de clases',
        subtitle: 'Classroom objects • School words',
        dba: 3, route: '/transicion/unidad-4', slides: 'transicion-salon', ready: true,
      },
      {
        week: 5, period: 3, title: 'Ropa y clima',
        subtitle: 'Clothes • Hot, cold • Put on your…',
        dba: 2, route: '/transicion/unidad-5', slides: 'transicion-ropa-clima', ready: true,
      },
      {
        week: 6, period: 3, title: 'Comidas que me gustan',
        subtitle: 'Food • Fruits • I like / I don\'t like',
        dba: 2, route: '/transicion/unidad-6', slides: 'transicion-comidas', ready: true,
      },
      {
        week: 7, period: 4, title: 'Animales de mi entorno',
        subtitle: 'Pets and wild animals • Big, small',
        dba: 2, route: '/transicion/unidad-7', slides: 'transicion-animales', ready: true,
      },
      {
        week: 8, period: 4, title: 'Mi comunidad y repaso',
        subtitle: 'Community • Review family, body, house',
        dba: 1, route: '/transicion/unidad-8', slides: 'transicion-comunidad-repaso', ready: true,
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
        dba: 2, route: '/primero/unidad-3', slides: 'primero-describo-familia', ready: true,
      },
      {
        week: 4, period: 2, title: 'Colores, números y edad',
        subtitle: 'Colors • Numbers 1-30 • How old are you?',
        dba: 4, route: '/primero/unidad-4', slides: 'primero-colores-numeros', ready: true,
      },
      {
        week: 5, period: 3, title: 'Cuido mi escuela',
        subtitle: 'School care • Clean up • Reduce, reuse, recycle',
        dba: 3, route: '/primero/unidad-5', slides: 'primero-cuido-escuela', ready: true,
      },
      {
        week: 6, period: 3, title: 'Mi salón y mis objetos',
        subtitle: 'Classroom objects • There is / There are',
        dba: 3, route: '/primero/unidad-6', slides: 'primero-salon-objetos', ready: true,
      },
      {
        week: 7, period: 4, title: 'Mis compañeros y yo',
        subtitle: 'My classmates • He is… / She is… • Qualities',
        dba: 2, route: '/primero/unidad-7', slides: 'primero-compañeros', ready: true,
      },
      {
        week: 8, period: 4, title: 'Repaso del año',
        subtitle: 'Review • Instructions, personal info, descriptions',
        dba: 1, route: '/primero/unidad-8', slides: 'primero-repaso', ready: true,
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
        dba: 1, route: '/segundo/unidad-3', slides: 'segundo-casa-cosas', ready: true,
      },
      {
        week: 4, period: 2, title: 'Cuéntame quién eres',
        subtitle: 'Personal information • Where are you from?',
        dba: 3, route: '/segundo/unidad-4', slides: 'segundo-quien-eres', ready: true,
      },
      {
        week: 5, period: 3, title: 'Animales y hábitats',
        subtitle: 'Wild animals • Can/Can\'t • Habitats',
        dba: 1, route: '/segundo/unidad-5', slides: 'segundo-animales-habitats', ready: true,
      },
      {
        week: 6, period: 3, title: 'La ropa y el clima',
        subtitle: 'Clothes • Weather • I wear…',
        dba: 1, route: '/segundo/unidad-6', slides: 'segundo-ropa-clima', ready: true,
      },
      {
        week: 7, period: 4, title: 'Festividades de Colombia',
        subtitle: 'Cultural celebrations • Carnival, Christmas',
        dba: 4, route: '/segundo/unidad-7', slides: 'segundo-festividades', ready: true,
      },
      {
        week: 8, period: 4, title: 'Cuento mi historia',
        subtitle: 'Review • Tell a short story with pictures',
        dba: 2, route: '/segundo/unidad-8', slides: 'segundo-cuento-historia', ready: true,
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
