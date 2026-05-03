import A12WeekDeck from '../components/A12WeekDeck';

const slides = [
  {
    emoji: '🤝',
    title: 'Welcome Week 2: Greetings & Introductions!',
    description: 'Esta semana aprendemos a saludarnos, presentarnos y hablar sobre nosotros mismos usando el verbo To Be.',
    paragraphs: [
      'Meta de la semana: poder saludar, presentarte con tu nombre, edad y país, y responder preguntas básicas en inglés.',
      'Usaremos el verbo TO BE (am/is/are) con sujetos personales para la presentación básica.',
    ],
    items: ['Objetivo 1: saludar y despedirse correctamente', 'Objetivo 2: presentarte con nombre, edad y país', 'Objetivo 3: usar el verbo To Be con I/You/He/She'],
  },
  {
    emoji: '🌤️',
    title: 'Formal vs Informal Greetings',
    description: 'En inglés, el saludo cambia dependiendo de si es una situación formal o informal.',
    items: [
      'FORMAL: Good morning / Good afternoon / Good evening',
      'INFORMAL: Hi! / Hey! / Hello!',
      'How are you? (formal) / How\'s it going? (informal)',
      'I\'m fine, thank you. / Great! / Not bad, thanks.',
    ],
    examples: [
      'A: Good morning, Ms. Smith! How are you?',
      'B: I\'m very well, thank you. And you?',
      'A: Fine, thanks!',
      '---',
      'A: Hey! How\'s it going?',
      'B: Pretty good! What about you?',
    ],
  },
  {
    emoji: '👤',
    title: 'Verb To Be — Personal Pronouns',
    description: 'El verbo To Be con pronombres personales es la base de la presentación.',
    items: [
      'I am → I\'m',
      'You are → You\'re',
      'He is → He\'s',
      'She is → She\'s',
      'We are → We\'re',
      'They are → They\'re',
    ],
    examples: [
      'I\'m Maria. I\'m from Colombia.',
      'She\'s my teacher. She\'s very kind.',
      'They\'re students. They\'re in Class A.',
    ],
  },
  {
    emoji: '🗺️',
    title: 'Where are you from?',
    description: 'Preguntar y responder sobre el país de origen es esencial en la presentación.',
    items: [
      'Q: Where are you from?',
      'A: I\'m from Colombia / Mexico / the USA...',
      'Q: What\'s your nationality?',
      'A: I\'m Colombian / Mexican / American...',
      'Key countries: Colombia, Mexico, Brazil, Spain, the USA, the UK',
    ],
    examples: [
      'A: Where are you from?',
      'B: I\'m from Mexico. I\'m Mexican. And you?',
      'A: I\'m from Colombia. I\'m Colombian.',
    ],
  },
  {
    emoji: '🎂',
    title: 'How old are you?',
    description: 'Aprende a preguntar y decir la edad de alguien.',
    items: [
      'Q: How old are you?',
      'A: I\'m [number] years old.',
      'Q: How old is he/she?',
      'A: He\'s/She\'s [number] years old.',
      'Numbers 11-20: eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty',
    ],
    examples: [
      'A: How old are you?',
      'B: I\'m sixteen years old. And you?',
      'A: I\'m fifteen.',
      'C: How old is your teacher?',
      'D: She\'s thirty years old.',
    ],
  },
  {
    emoji: '🏫',
    title: 'What do you do? — Occupations',
    description: 'Presentarse también incluye hablar de tu ocupación o rol.',
    items: [
      'I\'m a student. / I\'m a teacher.',
      'I\'m a doctor. / I\'m an engineer.',
      'I work at... / I study at...',
      'He\'s a nurse. / She\'s a chef.',
    ],
    examples: [
      'I\'m a student. I study at City High School.',
      'My mother is a nurse. She works at the hospital.',
      'Are you a student? — Yes, I am.',
    ],
  },
  {
    emoji: '❓',
    title: 'To Be — Questions & Short Answers',
    description: 'Las preguntas con To Be son muy simples: invierte el sujeto y el verbo.',
    items: [
      'Are you from Colombia? — Yes, I am. / No, I\'m not.',
      'Is she a teacher? — Yes, she is. / No, she isn\'t.',
      'Are they students? — Yes, they are. / No, they aren\'t.',
      'How old are you? / Where are you from? / What\'s your name?',
    ],
    examples: [
      'A: Are you from Brazil?',
      'B: No, I\'m not. I\'m from Argentina.',
      'A: Is Carlos a student?',
      'B: Yes, he is.',
    ],
  },
  {
    emoji: '🎯',
    type: 'exercise-choice',
    title: 'Practice 1: To Be',
    question: 'Choose the correct form: "He ___ a student."',
    options: ['He am a student.', 'He is a student.', 'He are a student.'],
    correct: 'He is a student.',
  },
  {
    emoji: '🎯',
    type: 'exercise-choice',
    title: 'Practice 2: Greeting',
    question: 'Which is a FORMAL greeting?',
    options: ['Hey! What\'s up?', 'Good morning!', 'Yo! How\'s it going?'],
    correct: 'Good morning!',
  },
  {
    emoji: '✍️',
    type: 'exercise-fill',
    title: 'Practice 3: Complete',
    prompt: 'Complete: "I ___ from Colombia. I ___ fifteen years old."',
    answer: "am / am",
    placeholder: "am / is / are",
  },
  {
    emoji: '🎭',
    title: 'Role-play: First Day of Class',
    description: 'Simula el primer día de clase. Preséntate a un compañero nuevo.',
    items: [
      'Greet your partner (formal or informal).',
      'Ask and say your name.',
      'Ask and say where you\'re from.',
      'Ask and say how old you are.',
      'Ask about their occupation / school.',
      'Say goodbye politely.',
    ],
    examples: [
      'A: Hi! My name is Ana. What\'s your name?',
      'B: Hello, Ana! I\'m Luis. Nice to meet you!',
      'A: Nice to meet you too! Where are you from, Luis?',
      'B: I\'m from Mexico. And you?',
      'A: I\'m from Colombia. How old are you?',
      'B: I\'m fourteen. And you?',
      'A: I\'m fifteen. Are you a student here?',
      'B: Yes, I am! See you in class!',
    ],
  },
  {
    emoji: '✅',
    title: 'Week 2 Summary',
    description: 'Homework: crea tu tarjeta de presentación en inglés con nombre, edad, país, y ocupación. Luego graba una presentación de 30 segundos.',
    items: ['Formal and informal greetings', 'Verb To Be (am/is/are)', 'Countries and nationalities', 'Age (numbers 11-20)', 'Occupations vocabulary', 'Yes/No questions with To Be'],
  },
];

export default function A11WeekTwoGreetings() {
  return (
    <A12WeekDeck
      weekNumber={2}
      levelCode="a1-1"
      dashboardHref="/a1-1"
      title="Greetings & Introductions"
      subtitle="Verb To Be • Countries • Age • Occupations"
      theme={{ from: 'from-rose-500', via: 'via-pink-500', to: 'to-orange-400' }}
      slides={slides}
    />
  );
}
