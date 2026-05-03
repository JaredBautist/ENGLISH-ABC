import A12WeekDeck from '../components/A12WeekDeck';

const slides = [
  {
    emoji: '💪',
    title: 'Welcome Week 6: I Can Do It!',
    description: 'Aprenderas a hablar de habilidades, permisos y reglas usando can/can\'t e imperatives con enfoque comunicativo.',
    paragraphs: [
      'Meta comunicativa: describir lo que puedes hacer, pedir permiso con cortesia y comprender instrucciones de clase.',
      'Secuencia de trabajo: explicacion guiada, ejemplos claros, practica controlada y mini performance final.',
    ],
    items: ['Express abilities with can/can\'t', 'Give and follow instructions', 'Use permission language in class'],
  },
  {
    emoji: '🗣️',
    title: 'Structure: Can / Can\'t',
    description: 'Con can no usamos to ni tercera persona con s. El verbo siempre va en forma base.',
    items: ['Affirmative: Subject + can + base verb', 'Negative: Subject + can\'t + base verb', 'Question: Can + subject + base verb...?'],
    examples: ['I can swim.', 'She can\'t drive.', 'Can you play the guitar?'],
  },
  {
    emoji: '📢',
    title: 'Imperatives for Instructions',
    description: 'Los imperativos se usan para dar ordenes, instrucciones o consejos. Se construyen con verbo base.',
    items: ['Open your book.', 'Listen carefully.', 'Work in pairs.', 'Don\'t run in the classroom.'],
    paragraphs: ['Para forma negativa agregamos Don\'t + verbo base. Mantener tono amable con please cuando sea necesario.'],
  },
  {
    emoji: '🚫',
    title: 'Common Mistakes to Avoid',
    items: ['She can to dance. ❌ -> She can dance. ✅', 'He can plays football. ❌ -> He can play football. ✅', 'Don\'t to shout. ❌ -> Don\'t shout. ✅'],
    description: 'Detectar errores frecuentes reduce bloqueos al hablar y mejora precision.',
  },
  {
    emoji: '🏫',
    title: 'Classroom Language and Permission',
    description: 'Expresiones utiles para interacciones reales en clase.',
    examples: ['Can I go to the bathroom?', 'Can I open the window?', 'Please repeat.', 'May I ask a question?'],
  },
  {
    emoji: '🎧',
    title: 'Pronunciation and Intonation',
    items: ['CAN I go to the BATH-room?', 'DON\'T run in the CLASS-room.', 'Please re-PEAT.'],
    paragraphs: ['Marca la palabra clave con una leve subida de voz. En negativas, enfatiza DON\'T para claridad.'],
  },
  {
    emoji: '🎯',
    type: 'exercise-choice',
    title: 'Practice 1: Grammar Choice',
    question: 'Choose the correct option:',
    options: ['She can to cook.', 'She can cook.', 'She can cooks.'],
    correct: 'She can cook.',
  },
  {
    emoji: '🎯',
    type: 'exercise-choice',
    title: 'Practice 2: Imperatives',
    question: 'Choose the correct classroom instruction:',
    options: ['Do not to speak loudly.', 'Don\'t speak loudly.', 'You don\'t speaking loudly.'],
    correct: 'Don\'t speak loudly.',
  },
  {
    emoji: '✍️',
    type: 'exercise-fill',
    title: 'Practice 3: Fill the Gap',
    prompt: 'Complete: "You ___ speak loudly in the library." (negative)',
    answer: "can't",
    placeholder: "can / can't",
  },
  {
    emoji: '🎭',
    title: 'Guided Speaking Task',
    description: 'Role play completo: Student asks for permission, teacher gives instructions and rules.',
    items: ['Use at least 3 can questions', 'Use 3 imperatives', 'Use 2 negative rules'],
    examples: ['Student: Can I work with Ana?', 'Teacher: Yes, you can. Open your notebook and start activity 2.', 'Teacher: Don\'t use your phone during class.'],
  },
  {
    emoji: '✅',
    title: 'Week 6 Summary',
    items: ['can/can\'t with base verb', 'imperatives and negative imperatives', 'permission language and classroom interaction'],
    description: 'Homework completo: escribe 12 reglas de aula (6 positivas y 6 negativas) y graba un audio corto usando 5 frases con can/can\'t.',
  },
];

export default function A12WeekSix() {
  return (
    <A12WeekDeck
      weekNumber={6}
      title="I Can Do It"
      subtitle="Can/Can\'t • Imperatives • Abilities"
      theme={{ from: 'from-cyan-500', via: 'via-blue-500', to: 'to-indigo-600' }}
      slides={slides}
    />
  );
}
