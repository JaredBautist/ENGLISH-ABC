import A12WeekDeck from '../components/A12WeekDeck';

const slides = [
  {
    emoji: '⏰',
    title: 'Welcome Week 2: My Daily Routine!',
    description: 'Esta semana aprendemos a hablar de nuestra rutina diaria usando el Present Simple. ¡Describamos nuestro día en inglés!',
    paragraphs: [
      'Meta de la semana: describir tu rutina diaria con verbos en presente simple, frecuencia y horas.',
      'Trabajaremos con verbos de rutina, adverbios de frecuencia y preguntas WH en presente.',
    ],
    items: ['Objetivo 1: usar Present Simple en afirmativa, negativa y pregunta', 'Objetivo 2: usar adverbios de frecuencia (always, usually, never)', 'Objetivo 3: decir la hora y hablar de horarios'],
  },
  {
    emoji: '📋',
    title: 'Present Simple — Structure',
    description: 'El Present Simple describe acciones habituales, rutinas y hechos generales.',
    items: [
      'Affirmative: I/You/We/They + verb | He/She/It + verb+s',
      'Negative: I don\'t / He doesn\'t + verb',
      'Question: Do you...? / Does she...?',
    ],
    examples: [
      'I wake up at 6:00 every day.',
      'She drinks coffee in the morning.',
      'They don\'t watch TV at night.',
      'Does he exercise every day? — Yes, he does.',
    ],
  },
  {
    emoji: '🔤',
    title: 'He/She/It — The -s Rule',
    description: 'Con la tercera persona singular (he/she/it) añadimos -s o -es al verbo en afirmativas.',
    items: [
      'work → works: She works at a school.',
      'go → goes: He goes to the gym.',
      'study → studies: She studies English.',
      'watch → watches: He watches movies.',
      'have → has: She has breakfast at 7.',
    ],
    examples: [
      'My brother works in a hospital.',
      'She gets up at 6:30 every morning.',
      'He doesn\'t drink coffee. He drinks tea.',
    ],
  },
  {
    emoji: '📅',
    title: 'Adverbs of Frequency',
    description: 'Los adverbios de frecuencia van ANTES del verbo principal, pero DESPUÉS del verbo To Be.',
    items: [
      'always — 100%: I always brush my teeth.',
      'usually — 80%: She usually walks to work.',
      'often — 60%: They often cook at home.',
      'sometimes — 40%: He sometimes watches TV.',
      'rarely — 20%: We rarely eat fast food.',
      'never — 0%: She never misses class.',
    ],
    examples: [
      'I always wake up early.',
      'She is usually tired on Mondays.',
      'He never forgets his homework.',
    ],
  },
  {
    emoji: '🕐',
    title: 'Telling the Time',
    description: 'Aprende a decir la hora en inglés para hablar de tu horario.',
    items: [
      'It\'s 7:00 — It\'s seven o\'clock.',
      'It\'s 7:15 — It\'s quarter past seven.',
      'It\'s 7:30 — It\'s half past seven.',
      'It\'s 7:45 — It\'s quarter to eight.',
      'At + time: I have lunch at noon.',
    ],
    examples: [
      'I wake up at six thirty.',
      'She has lunch at twelve o\'clock.',
      'The class starts at quarter past eight.',
    ],
  },
  {
    emoji: '🌅',
    title: 'Daily Routine Vocabulary',
    description: 'Verbos y expresiones esenciales para describir tu rutina.',
    items: [
      'wake up / get up', 'take a shower / brush teeth',
      'have breakfast / lunch / dinner',
      'go to work / school', 'come home',
      'do homework / exercise', 'go to bed',
    ],
    examples: [
      'I wake up at 6, take a shower, and have breakfast at 7.',
      'She goes to school at 8 and comes home at 3.',
      'We do homework after dinner and go to bed at 10.',
    ],
  },
  {
    emoji: '❓',
    title: 'WH Questions in Present Simple',
    description: 'Preguntas con palabras interrogativas para obtener información específica.',
    items: [
      'What do you do? — I\'m a student.',
      'Where do you work? — I work downtown.',
      'When does she wake up? — At 6 AM.',
      'How often do you exercise? — Three times a week.',
      'What time does he have lunch? — At noon.',
    ],
    examples: [
      'What do you do in the morning?',
      'When does your class start?',
      'How often does she study English?',
    ],
  },
  {
    emoji: '🎯',
    type: 'exercise-choice',
    title: 'Practice 1: Third Person -s',
    question: 'Choose the correct option: "She ___ to work by bus."',
    options: ['She go to work by bus.', 'She goes to work by bus.', 'She going to work by bus.'],
    correct: 'She goes to work by bus.',
  },
  {
    emoji: '🎯',
    type: 'exercise-choice',
    title: 'Practice 2: Frequency Adverb',
    question: 'Where does the adverb go? "He ___ is ___ late."',
    options: ['He always is late.', 'He is always late.', 'He is late always.'],
    correct: 'He is always late.',
  },
  {
    emoji: '✍️',
    type: 'exercise-fill',
    title: 'Practice 3: Fill the Gap',
    prompt: 'Complete: "She ___ (not/drink) coffee in the morning."',
    answer: "doesn't drink",
    placeholder: "don't drink / doesn't drink",
  },
  {
    emoji: '🎭',
    title: 'Role-play: Talking About Routines',
    description: 'Practica esta conversación con un compañero. Luego improvisa con tu propia rutina.',
    items: [
      'Person A: What time do you wake up?',
      'Person B: I usually wake up at 6:30.',
      'Person A: What do you do after that?',
      'Person B: I take a shower and have breakfast.',
      'Person A: Do you exercise in the morning?',
      'Person B: No, I don\'t. I exercise in the evening.',
    ],
    examples: [
      'A: How often do you cook?',
      'B: I usually cook on weekends. What about you?',
      'A: I sometimes cook, but I often eat out.',
    ],
  },
  {
    emoji: '✅',
    title: 'Week 2 Summary',
    description: 'Homework: escribe un texto de 8-10 oraciones describiendo tu rutina diaria completa. Incluye horas y adverbios de frecuencia.',
    items: ['Present Simple — afirmativa, negativa, pregunta', 'Third person -s rule (he/she/it)', 'Adverbs of frequency', 'Telling the time', 'Daily routine vocabulary'],
  },
];

export default function A12WeekTwo() {
  return (
    <A12WeekDeck
      weekNumber={2}
      title="My Daily Routine"
      subtitle="Present Simple • Adverbs of Frequency • Telling Time"
      theme={{ from: 'from-cyan-500', via: 'via-blue-500', to: 'to-indigo-500' }}
      slides={slides}
    />
  );
}
