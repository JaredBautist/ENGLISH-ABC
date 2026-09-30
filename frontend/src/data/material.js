/**
 * Material didáctico por grado: videos, listening y writing.
 * Los videos son de canales oficiales verificados
 * (Super Simple Songs, Noodle & Pals, The Kiboomers, Dream English Kids).
 * Tipos de listening: quiz (opción múltiple) | order (ordenar instrucciones) | words (escuchar y elegir).
 * Tipos de writing: guided (guiado con modelo) | free (libre con sugerencias).
 */

export const videos = {
  jardin: [
    {
      id: 'j-hello',
      title: 'Hello Song for Kids',
      description: 'Saluda con gestos: hello, hello, cómo estás hoy.',
      unit: 'Unidad 1 · Saludos',
      videoId: 'tVlcKp3bWH8',
    },
    {
      id: 'j-colors',
      title: 'I See Something Blue',
      description: 'Encuentra los objetos azules del salón mientras cantas.',
      unit: 'Unidad 2 · Colores',
      videoId: 'jYAWf8Y91hA',
    },
    {
      id: 'j-counting',
      title: 'Counting Bananas',
      description: 'Cuenta hasta 10 con los monitos y los plátanos.',
      unit: 'Unidad 3 · Números',
      videoId: 'N-6bxyzyHZs',
    },
    {
      id: 'j-family',
      title: 'The Finger Family',
      description: 'Daddy finger, daddy finger, where are you?',
      unit: 'Unidad 7 · Familia',
      videoId: 'YJyNoFk8tnA',
    },
    {
      id: 'j-farm',
      title: 'Old MacDonald Had a Farm',
      description: 'Los animales de la granja y sus sonidos.',
      unit: 'Unidad 5 · Animales',
      videoId: 'lihWz8eqKm0',
    },
  ],
  transicion: [
    {
      id: 't-family',
      title: 'The Finger Family',
      description: 'Nombra a cada miembro de la familia con los dedos.',
      unit: 'Unidad 1 · Familia',
      videoId: 'YJyNoFk8tnA',
    },
    {
      id: 't-body',
      title: 'Head, Shoulders, Knees and Toes',
      description: 'Toca cada parte del cuerpo al ritmo de la canción.',
      unit: 'Unidad 2 · Cuerpo',
      videoId: 'ZiNfns1jlBs',
    },
    {
      id: 't-shoes',
      title: 'Put On Your Shoes',
      description: 'Zapatos, pantalones, chaqueta y sombrero antes de salir.',
      unit: 'Unidad 5 · Ropa',
      videoId: 'wDTjKnwJz4c',
    },
    {
      id: 't-broccoli',
      title: 'Do You Like Broccoli Ice Cream?',
      description: '¿Te gusta? Yes, I do! / No, I don\'t!',
      unit: 'Unidad 6 · Comidas',
      videoId: 'frN3T84bl28',
    },
    {
      id: 't-hear',
      title: 'What Do You Hear?',
      description: 'Escucha el sonido y adivina el animal.',
      unit: 'Unidad 7 · Animales',
      videoId: 'TCt8WN_2v3M',
    },
  ],
  primero: [
    {
      id: 'p-instructions',
      title: 'Follow Me — Classroom Commands',
      description: 'Sigue las instrucciones de clase: stand up, sit down…',
      unit: 'Unidad 1 · Instrucciones',
      videoId: '6RfTKqUUZr4',
    },
    {
      id: 'p-name',
      title: 'What\'s Your Name?',
      description: 'Practica preguntar y responder tu nombre.',
      unit: 'Unidad 2 · This is me',
      videoId: 'ba5uqYvZ4Bk',
    },
    {
      id: 'p-recycle',
      title: 'The Three R\'s (Reduce, Reuse, Recycle)',
      description: 'Cuida tu escuela y el planeta con las 3 R.',
      unit: 'Unidad 5 · Cuido mi escuela',
      videoId: 'OCAXRJgZBbU',
    },
  ],
  segundo: [
    {
      id: 's-jungle',
      title: 'Walking in the Jungle',
      description: 'Acciones y animales de la selva: run, jump, stomp…',
      unit: 'Unidad 1 · Cuerpo y familia',
      videoId: 'GoSq-yZcJ-4',
    },
    {
      id: 's-yesican',
      title: 'Yes, I Can! (Animals)',
      description: '¿Puedes nadar? Yes, I can! / No, I can\'t!',
      unit: 'Unidad 5 · Animales y hábitats',
      videoId: '_Ir0Mc6f-Lo',
    },
    {
      id: 's-days',
      title: 'Days of the Week',
      description: 'Los días de la semana cantando.',
      unit: 'Repaso · Fechas',
      videoId: 'loINl3Ln6Ck',
    },
  ],
};

export const listening = {
  jardin: [
    {
      id: 'j-l1',
      type: 'quiz',
      title: '¿Quién soy? Sonidos de animales',
      description: 'La profe hace el sonido y los niños eligen el animal.',
      prompt: 'Escucha: "Moooo" ¿Quién es?',
      speakText: 'The cow says moo!',
      options: ['Cow', 'Cat', 'Duck'],
      correct: 'Cow',
    },
    {
      id: 'j-l2',
      type: 'quiz',
      title: 'Escucha y saluda',
      description: '¿Qué escuchaste? Elige la palabra.',
      prompt: 'Escucha con atención…',
      speakText: 'Hello! Bye-bye! Hello!',
      options: ['Hello y Bye-bye', 'Colors', 'Numbers'],
      correct: 'Hello y Bye-bye',
    },
    {
      id: 'j-l3',
      type: 'quiz',
      title: 'El color que escucho',
      description: 'Escucha y señala el color.',
      prompt: 'Escucha: "Blue!"',
      speakText: 'Blue! The sky is blue!',
      options: ['Azul', 'Rojo', 'Verde'],
      correct: 'Azul',
    },
  ],
  transicion: [
    {
      id: 't-l1',
      type: 'quiz',
      title: 'Partes del cuerpo',
      description: 'Escucha la instrucción y toca la parte correcta.',
      prompt: 'Escucha: "Touch your nose!"',
      speakText: 'Touch your nose!',
      options: ['La nariz 👃', 'La cabeza 🙋', 'Las manos 👏'],
      correct: 'La nariz 👃',
    },
    {
      id: 't-l2',
      type: 'quiz',
      title: 'La familia',
      description: '¿Quién habla? Escucha y elige.',
      prompt: 'Escucha: "This is my mommy!"',
      speakText: 'This is my mommy!',
      options: ['Mamá', 'Papá', 'Abuela'],
      correct: 'Mamá',
    },
    {
      id: 't-l3',
      type: 'words',
      title: 'Comidas que me gustan',
      description: 'Escucha y elige la comida mencionada.',
      prompt: 'Escucha: "I like bananas and apples!"',
      speakText: 'I like bananas and apples!',
      options: ['Bananas y apples', 'Rice y soup', 'Milk y bread'],
      correct: 'Bananas y apples',
    },
  ],
  primero: [
    {
      id: 'p-l1',
      type: 'order',
      title: 'Instrucciones de clase',
      description: 'Escucha la secuencia y ordénala.',
      speakText: 'Stand up! Open your book! Listen!',
      steps: ['Stand up', 'Open your book', 'Listen'],
    },
    {
      id: 'p-l2',
      type: 'quiz',
      title: 'Información personal',
      description: 'Escucha la respuesta y elige la pregunta correcta.',
      prompt: 'Escucha: "My name is Camila!"',
      speakText: 'My name is Camila!',
      options: ['What is your name?', 'How old are you?', 'Where are you from?'],
      correct: 'What is your name?',
    },
    {
      id: 'p-l3',
      type: 'quiz',
      title: 'Cuido mi escuela',
      description: '¿Qué acción escuchaste?',
      prompt: 'Escucha: "Close the tap, please!"',
      speakText: 'Close the tap, please!',
      options: ['Cerrar la llave', 'Reciclar', 'Apagar la luz'],
      correct: 'Cerrar la llave',
    },
  ],
  segundo: [
    {
      id: 's-l1',
      type: 'order',
      title: 'La secuencia de la historia',
      description: 'Escucha y ordena los eventos.',
      speakText: 'First, the kitten is hungry. Then, he looks for milk. Finally, he drinks the milk.',
      steps: ['First: hungry', 'Then: looks for milk', 'Finally: drinks milk'],
    },
    {
      id: 's-l2',
      type: 'quiz',
      title: 'Animales y acciones',
      description: '¿Qué animal puede hacer eso?',
      prompt: 'Escucha: "The bird can fly!"',
      speakText: 'The bird can fly!',
      options: ['Bird', 'Fish', 'Snake'],
      correct: 'Bird',
    },
    {
      id: 's-l3',
      type: 'quiz',
      title: 'De dónde eres',
      description: 'Escucha la presentación personal.',
      prompt: 'Escucha: "I am from Colombia and I live in Bogotá."',
      speakText: 'I am from Colombia and I live in Bogotá.',
      options: ['Colombia, Bogotá', 'México, Cali', 'Colombia, Medellín'],
      correct: 'Colombia, Bogotá',
    },
  ],
};

export const writing = {
  jardin: [
    {
      id: 'j-w1',
      type: 'guided',
      title: 'Mi nombre en inglés',
      description: 'Traza y completa tu presentación con la profe.',
      model: 'My name is ___.',
      hints: ['Ana', 'Juan', 'Sofía', 'tu nombre'],
    },
    {
      id: 'j-w2',
      type: 'guided',
      title: 'Coloreo y escribo',
      description: 'Escribe el color de cada objeto.',
      model: 'The ___ is ___.',
      hints: ['ball → red', 'book → blue', 'pencil → yellow'],
    },
  ],
  transicion: [
    {
      id: 't-w1',
      type: 'guided',
      title: 'Mi familia',
      description: 'Completa la frase sobre tu familia.',
      model: 'This is my ___.',
      hints: ['mommy', 'daddy', 'sister', 'brother'],
    },
    {
      id: 't-w2',
      type: 'guided',
      title: 'Mis comidas favoritas',
      description: 'Escribe lo que te gusta.',
      model: 'I like ___.',
      hints: ['bananas', 'apples', 'milk', 'juice'],
    },
  ],
  primero: [
    {
      id: 'p-w1',
      type: 'guided',
      title: 'Mi presentación',
      description: 'Escribe tu información personal siguiendo el modelo.',
      model: 'My name is ___. I am ___ years old. I am from Colombia.',
      hints: ['nombre', 'edad (7, 8…)'],
    },
    {
      id: 'p-w2',
      type: 'free',
      title: 'Describo a mi compañero',
      description: 'Escribe 2 frases sobre tu compañero(a).',
      suggestions: ['He/She is tall.', 'He/She has long hair.', 'He/She has brown eyes.'],
    },
  ],
  segundo: [
    {
      id: 's-w1',
      type: 'guided',
      title: 'Cuéntame de ti',
      description: 'Presentación personal completa.',
      model: 'My name is ___. I am ___ years old. I am from ___. I live in ___.',
      hints: ['nombre', 'edad', 'país', 'ciudad'],
    },
    {
      id: 's-w2',
      type: 'free',
      title: 'Mi mini historia',
      description: 'Escribe una historia corta con 3 eventos.',
      suggestions: ['First…', 'Then…', 'Finally…'],
    },
  ],
};

export const materialGrades = ['jardin', 'transicion', 'primero', 'segundo'];

export function getVideos(gradeId) {
  return videos[gradeId] || [];
}
export function getListening(gradeId) {
  return listening[gradeId] || [];
}
export function getWriting(gradeId) {
  return writing[gradeId] || [];
}
