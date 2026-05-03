import A12WeekDeck from '../components/A12WeekDeck';

const slides = [
  {
    emoji: '🛒',
    title: 'Welcome Week 5: Let\'s Go Shopping!',
    description: 'Hoy practicaremos compras reales usando vocabulario de supermercado, cantidades, preguntas de precio y mini-dialogos.',
    paragraphs: [
      'Meta de la semana: que puedas mantener una conversacion corta de compra en ingles con seguridad y buena pronunciacion.',
      'Trabajaremos paso a paso como en week-one: observacion, explicacion, ejemplos guiados, practica y cierre con produccion.',
    ],
    items: ['Objetivo 1: diferenciar countable y uncountable', 'Objetivo 2: usar some y any en afirmacion, negacion y pregunta', 'Objetivo 3: usar how much y how many sin errores'],
  },
  {
    emoji: '🧠',
    title: 'Concepto Base: Countable vs Uncountable',
    description: 'Countable son palabras que podemos contar una por una. Uncountable son cantidades generales que normalmente no se cuentan con numero directo.',
    items: ['Countable: apple, tomato, egg, bottle, carrot', 'Uncountable: rice, milk, bread, water, sugar', 'Con countable usamos a/an en singular: an apple, a tomato'],
    examples: ['There is an apple in the bag.', 'There are three tomatoes on the table.', 'There is some rice in the bowl.'],
  },
  {
    emoji: '📦',
    title: 'Quantifiers: some / any',
    description: 'Regla rapida: some se usa normalmente en afirmativas; any en negativas y preguntas.',
    paragraphs: [
      'Tambien puedes usar some en preguntas cuando ofreces o pides algo de forma amable: Would you like some tea?',
      'Errores comunes: usar any en afirmativa sin contexto especial o confundir la estructura de do/does en preguntas.',
    ],
    examples: ['I need some tomatoes and some onions.', 'Do you have any bread?', 'We do not have any cheese today.'],
  },
  {
    emoji: '⚖️',
    title: 'Preguntas de Cantidad: How much / How many',
    description: 'How many + countable plural. How much + uncountable.',
    items: ['How many apples do you need?', 'How many eggs are in the fridge?', 'How much milk do you want?', 'How much rice is there in the pot?'],
    paragraphs: ['Cuando dudes, identifica primero si puedes contar el sustantivo como unidades separadas. Esa decision resuelve la pregunta correcta.'],
  },
  {
    emoji: '🗂️',
    title: 'Containers and Measures',
    description: 'Para uncountable usamos envases o medidas. Esto hace la frase mas natural y precisa.',
    items: ['a bottle of water', 'a carton of milk', 'a kilo of potatoes', 'a bag of rice', 'a loaf of bread'],
    examples: ['Can I have a bottle of water, please?', 'I need a kilo of tomatoes.', 'We bought two cartons of milk.'],
  },
  {
    emoji: '💬',
    title: 'Functional Language: At the Supermarket',
    description: 'Expresiones utiles para cliente y vendedor. Repite en voz alta para mejorar fluidez.',
    examples: ['Can I have two kilos of potatoes, please?', 'How much is this?', 'I\'d like some chicken.', 'Do you have any fresh bread today?', 'That is all, thank you.'],
  },
  {
    emoji: '🎧',
    title: 'Pronunciation Focus',
    description: 'Practica ritmo y acento en preguntas cortas de compra.',
    items: ['How MUCH is this?', 'How MA-ny apples?', 'I\'d LIKE some CHEESE, please.'],
    paragraphs: ['Haz pausas naturales despues de please y before thank you. La entonacion amigable mejora mucho la comunicacion.'],
  },
  {
    emoji: '🎯',
    type: 'exercise-choice',
    title: 'Practice 1: Grammar Choice',
    question: 'Choose the correct sentence for uncountable nouns:',
    options: ['How many milk do you need?', 'How much milk do you need?', 'How much apples do you need?'],
    correct: 'How much milk do you need?',
  },
  {
    emoji: '🎯',
    type: 'exercise-choice',
    title: 'Practice 2: Some/Any',
    question: 'Choose the best option:',
    options: ['We need any sugar for the cake.', 'Do you have some eggs?', 'We do not have any sugar.'],
    correct: 'We do not have any sugar.',
  },
  {
    emoji: '✍️',
    type: 'exercise-fill',
    title: 'Practice 3: Fill the Gap',
    prompt: 'Complete: "Do you have ___ eggs?"',
    answer: 'any',
    placeholder: 'some / any',
  },
  {
    emoji: '🎭',
    title: 'Guided Role-play',
    description: 'Parejas: uno es cliente y otro vendedor. Lean y luego improvisen.',
    items: ['Cliente: saluda y pide 3 productos', 'Vendedor: responde precios y disponibilidad', 'Ambos: cierran la compra con despedida amable'],
    examples: ['Customer: Hi! Do you have any bananas?', 'Seller: Yes, we do. How many do you need?', 'Customer: I need six bananas, please.'],
  },
  {
    emoji: '✅',
    title: 'Week 5 Summary',
    items: ['Countable vs uncountable', 'some/any', 'how much/how many', 'containers and measures', 'shopping phrases with confidence'],
    description: 'Homework completo: escribe una lista de compras de 10 productos, luego redacta un mini-dialogo de 8 lineas entre cliente y vendedor.',
  },
];

export default function A12WeekFive() {
  return (
    <A12WeekDeck
      weekNumber={5}
      title="Let\'s Go Shopping"
      subtitle="Some/Any • How much/How many • Food Vocabulary"
      theme={{ from: 'from-pink-500', via: 'via-orange-400', to: 'to-amber-300' }}
      slides={slides}
    />
  );
}
