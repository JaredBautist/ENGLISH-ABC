import A12WeekDeck from '../components/A12WeekDeck';

const slides = [
  {
    emoji: '🎯',
    title: 'Welcome Week 7: Weekend Plans',
    description: 'Planifica tu fin de semana con like + -ing, going to y vocabulario de hobbies en situaciones reales.',
    paragraphs: [
      'Objetivo comunicativo: hablar de gustos y planes futuros en conversaciones cortas y naturales.',
      'Trabajaremos estructura, errores frecuentes, pronunciacion y produccion guiada como en week-one.',
    ],
    items: ['Express likes and dislikes correctly', 'Talk about future plans with going to', 'Describe free-time activities in detail'],
  },
  {
    emoji: '❤️',
    title: 'Grammar Focus: Like + -ing',
    description: 'Despues de like usamos verbo con -ing cuando hablamos de actividades.',
    items: ['I like reading.', 'She likes dancing.', 'They do not like cooking.'],
    examples: ['I like playing football.', 'She likes watching movies.', 'They don\'t like cooking.'],
  },
  {
    emoji: '🧩',
    title: 'Like + -ing: Common Errors',
    items: ['I like play basketball. ❌', 'I like playing basketball. ✅', 'She like watching TV. ❌', 'She likes watching TV. ✅'],
    description: 'Recuerda agregar s en tercera persona singular del verbo like: he likes, she likes.',
  },
  {
    emoji: '📅',
    title: 'Future Plans: Going to',
    description: 'Usamos going to para planes o intenciones que ya decidimos.',
    items: ['Affirmative: subject + be + going to + verb', 'Negative: subject + be + not + going to + verb', 'Question: be + subject + going to + verb?'],
    examples: ['I am going to visit my grandma.', 'We are going to study English.', 'Are you going to travel?'],
  },
  {
    emoji: '🎨',
    title: 'Hobbies Vocabulary Expansion',
    description: 'Amplia tu repertorio para hablar con variedad.',
    items: ['reading', 'dancing', 'playing video games', 'cycling', 'drawing', 'hiking', 'taking photos', 'baking', 'listening to podcasts', 'playing chess'],
  },
  {
    emoji: '💬',
    title: 'Useful Conversation Patterns',
    examples: ['What do you like doing in your free time?', 'I like playing volleyball and reading comics.', 'What are you going to do on Saturday?', 'I am going to visit my cousin and then study.'],
    paragraphs: ['Combina gustos y planes en una misma respuesta para sonar mas natural y completo.'],
  },
  {
    emoji: '🎧',
    title: 'Pronunciation Focus',
    items: ['I LIKE PLAY-ing FOOT-ball.', 'I\'m GO-ing to STU-dy EN-glish.', 'What are you GO-ing to DO this WEEK-end?'],
    description: 'Divide frases largas en bloques de ritmo para mejorar fluidez.',
  },
  {
    emoji: '🎯',
    type: 'exercise-choice',
    title: 'Practice 1: Grammar Choice',
    question: 'Choose the correct sentence:',
    options: ['I like play basketball.', 'I like playing basketball.', 'I am like playing basketball.'],
    correct: 'I like playing basketball.',
  },
  {
    emoji: '🎯',
    type: 'exercise-choice',
    title: 'Practice 2: Going to',
    question: 'Choose the correct future sentence:',
    options: ['She going to visit her aunt.', 'She is going to visit her aunt.', 'She is go to visit her aunt.'],
    correct: 'She is going to visit her aunt.',
  },
  {
    emoji: '✍️',
    type: 'exercise-fill',
    title: 'Practice 3: Fill the Gap',
    prompt: 'Complete: "We are ___ to watch a movie tonight."',
    answer: 'going',
    placeholder: 'going / go / goes',
  },
  {
    emoji: '🗣️',
    title: 'Extended Mini Dialogue',
    description: 'Practica en parejas. Primero leen, luego personalizan con informacion real.',
    examples: ['A: What do you like doing on weekends?', 'B: I like riding my bike and watching movies.', 'A: Nice! What are you going to do this weekend?', 'B: I\'m going to visit my grandparents and cook dinner with them.'],
  },
  {
    emoji: '✅',
    title: 'Week 7 Summary',
    items: ['like + -ing with correct form', 'going to for future plans', 'hobbies vocabulary and real conversation'],
    description: 'Homework completo: escribe 12 oraciones (6 sobre gustos y 6 sobre planes) y prepara un mini speech de 1 minuto sobre tu weekend ideal.',
  },
];

export default function A12WeekSeven() {
  return (
    <A12WeekDeck
      weekNumber={7}
      title="Weekend Plans"
      subtitle="Like + -ing • Going to • Hobbies"
      theme={{ from: 'from-violet-600', via: 'via-fuchsia-500', to: 'to-pink-500' }}
      slides={slides}
    />
  );
}
