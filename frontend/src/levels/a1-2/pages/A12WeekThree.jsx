import A12WeekDeck from '../components/A12WeekDeck';

const slides = [
  {
    emoji: '👨‍👩‍👧‍👦',
    title: 'Welcome Week 3: My Family!',
    description: 'Esta semana describimos a nuestra familia usando Have/Has Got, adjetivos de personalidad y la estructura This is / These are.',
    paragraphs: [
      'Meta de la semana: describir a los miembros de tu familia con características físicas y de personalidad.',
      'Aprenderemos posesivos, adjetivos y cómo hacer preguntas sobre la familia.',
    ],
    items: ['Objetivo 1: usar have/has got para descripción', 'Objetivo 2: adjetivos de personalidad y apariencia', 'Objetivo 3: This is / These are con familia'],
  },
  {
    emoji: '👨‍👩‍👦',
    title: 'Family Members Vocabulary',
    description: 'Vocabulario esencial para hablar de tu familia en inglés.',
    items: [
      'parents: mother/mom, father/dad',
      'siblings: brother, sister',
      'grandparents: grandmother/grandma, grandfather/grandpa',
      'extended: uncle, aunt, cousin, nephew, niece',
      'in-laws: husband, wife, son, daughter',
    ],
    examples: [
      'This is my mother. Her name is Maria.',
      'I have one brother and two sisters.',
      'My grandparents live in the countryside.',
    ],
  },
  {
    emoji: '✋',
    title: 'Have/Has Got — Structure',
    description: 'Usamos Have/Has Got para describir características físicas y posesiones.',
    items: [
      'I/You/We/They have got... (I\'ve got)',
      'He/She/It has got... (She\'s got)',
      'Negative: haven\'t got / hasn\'t got',
      'Question: Have you got...? / Has she got...?',
    ],
    examples: [
      'My sister has got brown eyes and long hair.',
      'My brother hasn\'t got a beard.',
      'Have you got any brothers? — Yes, I\'ve got one.',
      'Has she got glasses? — No, she hasn\'t.',
    ],
  },
  {
    emoji: '👀',
    title: 'Physical Description',
    description: 'Vocabulario para describir la apariencia física de las personas.',
    items: [
      'Hair: long / short / curly / straight / wavy | blonde / brown / black / red / grey',
      'Eyes: blue / green / brown / dark',
      'Height: tall / short / medium height',
      'Build: thin / slim / athletic / heavy',
    ],
    examples: [
      'My father is tall with short grey hair and brown eyes.',
      'She has got long, curly red hair.',
      'My brother is medium height and has an athletic build.',
    ],
  },
  {
    emoji: '😊',
    title: 'Personality Adjectives',
    description: 'Adjetivos para describir cómo es una persona por dentro.',
    items: [
      'Positive: kind, funny, intelligent, creative, patient, generous, hard-working',
      'Negative: shy, stubborn, lazy, impatient, messy',
      'Structure: He/She is + adjective | He/She is very/quite + adjective',
    ],
    examples: [
      'My mother is very kind and patient.',
      'My brother is funny but sometimes a bit stubborn.',
      'My best friend is really creative and hard-working.',
    ],
  },
  {
    emoji: '👆',
    title: 'Demonstratives: This/That/These/Those',
    description: 'Los demostrativos señalan personas u objetos en función de la distancia.',
    items: [
      'This (singular/cerca): This is my sister, Ana.',
      'That (singular/lejos): That is my uncle over there.',
      'These (plural/cerca): These are my parents.',
      'Those (plural/lejos): Those are my cousins.',
    ],
    examples: [
      'This is my grandmother. She\'s 70 years old.',
      'These are my two brothers, Carlos and Pedro.',
      'That man over there is my uncle.',
    ],
  },
  {
    emoji: '📝',
    title: 'Possessive Adjectives & Pronouns',
    description: 'Para expresar pertenencia y relaciones familiares.',
    items: [
      'my, your, his, her, its, our, their',
      'mine, yours, his, hers, ours, theirs',
    ],
    examples: [
      'My mother is a teacher. Her name is Lucia.',
      'Is this your brother? — Yes, he\'s mine.',
      'Their grandparents live in the city.',
      'This is her book, not yours.',
    ],
  },
  {
    emoji: '🎯',
    type: 'exercise-choice',
    title: 'Practice 1: Have/Has Got',
    question: 'Choose the correct option: "My father ___ black hair."',
    options: ['My father have got black hair.', 'My father has got black hair.', 'My father is got black hair.'],
    correct: 'My father has got black hair.',
  },
  {
    emoji: '🎯',
    type: 'exercise-choice',
    title: 'Practice 2: Demonstratives',
    question: 'You are showing a photo of two people far from you. Which do you use?',
    options: ['These are my cousins.', 'Those are my cousins.', 'This is my cousins.'],
    correct: 'Those are my cousins.',
  },
  {
    emoji: '✍️',
    type: 'exercise-fill',
    title: 'Practice 3: Fill the Gap',
    prompt: 'Complete: "My sister ___ (not/have) blue eyes. She has brown eyes."',
    answer: "hasn't got",
    placeholder: "hasn't got / don't have",
  },
  {
    emoji: '🎭',
    title: 'Role-play: Showing Family Photos',
    description: 'Imagina que estás mostrando fotos de tu familia. Describe cada persona.',
    items: [
      'Introduce: This is my [relation]. His/Her name is ___.',
      'Describe appearance: He/She has got ___ hair and ___ eyes.',
      'Describe personality: He/She is very ___.',
      'Add a detail: He/She works as a ___ / studies at ___.',
    ],
    examples: [
      'This is my mother, Sandra. She\'s got short, dark hair and green eyes. She\'s very kind and patient. She works as a nurse.',
      'These are my two brothers. The tall one is Marco — he\'s funny and creative. The short one is Luis — he\'s very hard-working.',
    ],
  },
  {
    emoji: '✅',
    title: 'Week 3 Summary',
    description: 'Homework: escribe 6-8 oraciones describiendo a un miembro de tu familia (apariencia y personalidad). Incluye have/has got.',
    items: ['Family vocabulary', 'Have/Has Got (affirmative, negative, questions)', 'Physical description adjectives', 'Personality adjectives', 'Demonstratives (this/that/these/those)', 'Possessive adjectives'],
  },
];

export default function A12WeekThree() {
  return (
    <A12WeekDeck
      weekNumber={3}
      title="My Family"
      subtitle="Have/Has Got • Physical Description • Personality"
      theme={{ from: 'from-green-500', via: 'via-teal-500', to: 'to-cyan-400' }}
      slides={slides}
    />
  );
}
