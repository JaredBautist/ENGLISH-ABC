import A12WeekDeck from '../components/A12WeekDeck';

const slides = [
  {
    emoji: '👋',
    title: 'Welcome Week 1: Hello, Nice to Meet You!',
    description: 'Esta semana aprendemos las bases del inglés: presentarnos, contar hasta 100 y usar el verbo TO BE. ¡Empezamos desde cero con energía!',
    paragraphs: [
      'Meta de la semana: poder presentarte con tu nombre, edad, país y ocupación usando el verbo TO BE correctamente.',
      'Trabajaremos paso a paso: observación, explicación, ejemplos guiados, práctica oral y ejercicios interactivos.',
    ],
    items: ['Objetivo 1: usar I am / You are / He is / She is', 'Objetivo 2: presentarte con nombre y edad', 'Objetivo 3: contar números del 0 al 100'],
  },
  {
    emoji: '🌍',
    title: 'Verb TO BE — The Most Important Verb',
    description: 'El verbo TO BE significa SER o ESTAR. Es el verbo más usado en inglés. Lo usamos para identidad, origen, estado y descripción.',
    items: ['I am Ana — soy Ana', 'You are my friend — tú eres mi amigo/a', 'He is Carlos — él es Carlos', 'She is a teacher — ella es profesora', 'It is a book — es un libro'],
    examples: ['I am from Colombia.', 'She is 25 years old.', 'We are students.', 'They are from Brazil.'],
  },
  {
    emoji: '📋',
    title: 'TO BE — Full Conjugation',
    description: 'Memoriza estas formas. Son la base de casi toda la gramática en inglés básico.',
    items: ['I am (I\'m)', 'You are (You\'re)', 'He is (He\'s)', 'She is (She\'s)', 'It is (It\'s)', 'We are (We\'re)', 'They are (They\'re)'],
    examples: ['I\'m a student.', 'She\'s from Mexico.', 'They\'re my classmates.'],
  },
  {
    emoji: '❓',
    title: 'Questions and Negatives with TO BE',
    description: 'Para hacer preguntas, invertimos el sujeto y el verbo. Para negar, añadimos NOT.',
    items: ['Affirmative: I am happy.', 'Negative: I am not happy. (I\'m not happy.)', 'Question: Are you happy?', 'Short answer: Yes, I am. / No, I\'m not.'],
    examples: ['Are you from Colombia? — Yes, I am.', 'Is she a doctor? — No, she isn\'t.', 'Are they students? — Yes, they are.'],
  },
  {
    emoji: '🌎',
    title: 'Countries and Nationalities',
    description: 'Aprendamos a decir de dónde somos y describir nuestra nacionalidad.',
    items: ['Colombia — Colombian', 'Mexico — Mexican', 'Brazil — Brazilian', 'USA — American', 'Spain — Spanish'],
    examples: ['I am from Colombia. I am Colombian.', 'She is from Spain. She is Spanish.', 'He is from the USA. He is American.'],
  },
  {
    emoji: '💼',
    title: 'Professions and Occupations',
    description: 'Vocabulario clave para presentarte o describir a alguien por su trabajo.',
    items: ['teacher — profesor/a', 'student — estudiante', 'doctor — médico/a', 'engineer — ingeniero/a', 'nurse — enfermero/a', 'chef — cocinero/a'],
    examples: ['I am a student.', 'My father is an engineer.', 'She is a nurse at the hospital.'],
  },
  {
    emoji: '🔢',
    title: 'Numbers 0–100',
    description: 'Los números son esenciales para dar tu edad, teléfono y mucho más.',
    items: ['0-10: zero, one, two, three, four, five, six, seven, eight, nine, ten', '11-19: eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen', '20-100: twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety, one hundred', 'Compound: 21 = twenty-one, 35 = thirty-five, 99 = ninety-nine'],
    examples: ['I am twenty-two years old.', 'My phone number is three-one-five, seven-eight-nine.'],
  },
  {
    emoji: '🗣️',
    title: 'Self-Introduction Model',
    description: 'Aprende esta fórmula de presentación. Es la más usada en inglés internacional.',
    items: ['Step 1: Hello! My name is ___', 'Step 2: I am ___ years old.', 'Step 3: I am from ___ (country).', 'Step 4: I am a ___ (occupation/student).', 'Step 5: Nice to meet you!'],
    examples: [
      'Hello! My name is Maria. I am nineteen years old. I am from Colombia. I am a student. Nice to meet you!',
      'Hi! My name is Carlos. I am thirty years old. I am from Mexico. I am an engineer. Nice to meet you!',
    ],
  },
  {
    emoji: '📺',
    type: 'video',
    title: 'How to Introduce Yourself',
    videoUrl: 'https://www.youtube.com/embed/5whkCF7TgZ0',
    description: 'Watch this video to hear native pronunciations of basic introductions.',
  },
  {
    emoji: '📝',
    type: 'writing',
    title: 'My First Presentation',
    description: 'Write your own self-introduction following the model we learned. (Minimum 20 words)',
  },
  {
    emoji: '🎯',
    type: 'exercise-choice',
    title: 'Practice 1: Choose Correct Form',
    question: 'Choose the correct option: "She ___ a doctor."',
    options: ['She am a doctor.', 'She is a doctor.', 'She are a doctor.'],
    correct: 'She is a doctor.',
  },
  {
    emoji: '🎯',
    type: 'exercise-choice',
    title: 'Practice 2: Negatives',
    question: 'Which is the correct negative?',
    options: ['I not am a student.', 'I am not a student.', 'I is not a student.'],
    correct: 'I am not a student.',
  },
  {
    emoji: '✍️',
    type: 'exercise-fill',
    title: 'Practice 3: Fill the Gap',
    prompt: 'Complete: "They ___ from Brazil."',
    answer: 'are',
    placeholder: 'am / is / are',
  },
  {
    emoji: '🎭',
    title: 'Guided Role-play: Meeting Someone New',
    description: 'Practica con un compañero esta conversación de presentación formal.',
    items: ['Person A: saluda y di tu nombre', 'Person B: responde y pregunta de dónde eres', 'Person A: responde con país y ocupación', 'Person B: cierra con "Nice to meet you!"'],
    examples: [
      'A: Hello! My name is Ana. What is your name?',
      'B: Hi Ana! My name is Juan. Where are you from?',
      'A: I am from Colombia. I am a student. And you?',
      'B: I am from Mexico. I am a teacher. Nice to meet you, Ana!',
    ],
  },
  {
    emoji: '✅',
    title: 'Week 1 Summary',
    description: 'Homework: escribe una presentación de 5-7 oraciones sobre ti mismo usando todo lo aprendido esta semana.',
    items: ['Verb TO BE — all forms', 'Countries and nationalities', 'Professions vocabulary', 'Numbers 0–100', 'Full self-introduction formula'],
  },
];

export default function A12WeekOne() {
  return (
    <A12WeekDeck
      weekNumber={1}
      title="Hello! Nice to Meet You"
      subtitle="Verb TO BE • Countries • Professions • Numbers 0–100"
      theme={{ from: 'from-indigo-500', via: 'via-purple-500', to: 'to-pink-500' }}
      slides={slides}
    />
  );
}
