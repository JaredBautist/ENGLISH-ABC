import A12WeekDeck from '../components/A12WeekDeck';

const slides = [
  {
    emoji: '🔤',
    title: 'Welcome Week 1: The Alphabet!',
    description: 'Esta semana aprendemos el abecedario en inglés, cómo deletrear nombres y las vocales. ¡El punto de partida de todo!',
    paragraphs: [
      'Meta de la semana: deletrear tu nombre y palabras básicas usando el alfabeto en inglés.',
      'Practicaremos cada letra con su sonido, las vocales y el deletreo de nombres comunes.',
    ],
    items: ['Objetivo 1: reconocer y pronunciar las 26 letras', 'Objetivo 2: identificar vocales y consonantes', 'Objetivo 3: deletrear tu nombre en inglés'],
  },
  {
    emoji: '🅰️',
    title: 'The Alphabet — A to Z',
    description: 'El alfabeto inglés tiene 26 letras. Escucha y repite cada una.',
    items: [
      'A B C D E F G',
      'H I J K L M N',
      'O P Q R S T U',
      'V W X Y Z',
    ],
    examples: [
      'A — /eɪ/ like in Apple 🍎',
      'B — /biː/ like in Book 📖',
      'C — /siː/ like in Cat 🐱',
      'D — /diː/ like in Dog 🐶',
    ],
  },
  {
    emoji: '🗣️',
    title: 'Vowels vs Consonants',
    description: 'Las vocales son la base del sonido en inglés. Es importante conocerlas bien.',
    items: [
      'Vowels (vocales): A, E, I, O, U',
      'All other letters are consonants.',
      'Rule: use "an" before vowel sounds: an apple, an egg, an ice cream',
      'Use "a" before consonant sounds: a book, a dog, a car',
    ],
    examples: [
      'an apple 🍎 / a banana 🍌',
      'an egg 🥚 / a tomato 🍅',
      'an umbrella ☂️ / a phone 📱',
    ],
  },
  {
    emoji: '✍️',
    title: 'Spelling Your Name',
    description: 'Una de las habilidades más importantes: deletrear tu propio nombre en inglés.',
    items: [
      'Q: How do you spell your name?',
      'A: My name is Maria — M-A-R-I-A.',
      'Practice with first name AND last name.',
      'Tip: speak slowly and clearly, letter by letter.',
    ],
    examples: [
      'A: How do you spell your name?',
      'B: My name is Carlos — C-A-R-L-O-S.',
      'A: And your last name?',
      'B: Martinez — M-A-R-T-I-N-E-Z.',
    ],
  },
  {
    emoji: '🔢',
    title: 'Numbers 1–10',
    description: 'Los primeros números son fundamentales. Los usaremos todo el tiempo.',
    items: [
      '1 — one', '2 — two', '3 — three',
      '4 — four', '5 — five', '6 — six',
      '7 — seven', '8 — eight', '9 — nine', '10 — ten',
    ],
    examples: [
      'I have two brothers.',
      'She is five years old.',
      'There are ten students in the class.',
    ],
  },
  {
    emoji: '👋',
    title: 'Basic Greetings',
    description: 'Las primeras palabras que necesitas para comunicarte en inglés.',
    items: [
      'Hello! / Hi! — Hola',
      'Good morning! — Buenos días',
      'Good afternoon! — Buenas tardes',
      'Good evening! — Buenas noches',
      'Goodbye! / Bye! — Adiós',
      'See you later! — Hasta luego',
    ],
    examples: [
      'A: Hello! How are you?',
      'B: I\'m fine, thank you! And you?',
      'A: Very well, thanks. Goodbye!',
      'B: Bye! See you tomorrow!',
    ],
  },
  {
    emoji: '🎵',
    title: 'The ABC Song',
    description: 'La canción del abecedario es la forma más efectiva de memorizar el orden de las letras.',
    items: [
      'A-B-C-D-E-F-G (sing slowly)',
      'H-I-J-K-L-M-N-O-P',
      'Q-R-S — T-U-V',
      'W-X — Y and Z',
      'Now I know my ABCs, next time won\'t you sing with me?',
    ],
    examples: ['Sing the song 3 times: first slowly, then at normal speed, then fast!'],
  },
  {
    emoji: '🎯',
    type: 'exercise-choice',
    title: 'Practice 1: Vowels',
    question: 'Which of these is a VOWEL?',
    options: ['B', 'T', 'E'],
    correct: 'E',
  },
  {
    emoji: '🎯',
    type: 'exercise-choice',
    title: 'Practice 2: A or An?',
    question: 'Choose the correct option:',
    options: ['a apple', 'an apple', 'an orange apple'],
    correct: 'an apple',
  },
  {
    emoji: '✍️',
    type: 'exercise-fill',
    title: 'Practice 3: Spell It!',
    prompt: 'How do you spell "CAT"? Write the letters with dashes (C-A-T):',
    answer: 'C-A-T',
    placeholder: 'C-?-?',
  },
  {
    emoji: '🎭',
    title: 'Role-play: What\'s Your Name?',
    description: 'Practica deletrear tu nombre con un compañero.',
    items: [
      'A: Hello! What\'s your name?',
      'B: My name is [your name]. And yours?',
      'A: My name is [your name]. How do you spell it?',
      'B: [Spell it letter by letter]',
      'A: Nice to meet you!',
      'B: Nice to meet you too!',
    ],
    examples: [
      'A: Hello! What\'s your name?',
      'B: Hi! My name is Sofia. S-O-F-I-A.',
      'A: Nice to meet you, Sofia! I\'m Tomás. T-O-M-Á-S.',
      'B: Nice to meet you, Tomás!',
    ],
  },
  {
    emoji: '✅',
    title: 'Week 1 Summary',
    description: 'Homework: graba un audio deletreando tu nombre completo (nombre y apellido) y di los números del 1 al 10.',
    items: ['The alphabet (A-Z)', 'Vowels: A, E, I, O, U', 'a vs an', 'Spelling names', 'Numbers 1-10', 'Basic greetings'],
  },
];

export default function A11WeekOneAlphabet() {
  return (
    <A12WeekDeck
      weekNumber={1}
      levelCode="a1-1"
      dashboardHref="/a1-1"
      title="The Alphabet"
      subtitle="A-Z • Vowels & Consonants • Spelling • Numbers 1-10"
      theme={{ from: 'from-violet-500', via: 'via-purple-500', to: 'to-fuchsia-500' }}
      slides={slides}
    />
  );
}
