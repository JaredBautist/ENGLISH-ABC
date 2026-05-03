import A12WeekDeck from '../components/A12WeekDeck';

const slides = [
  {
    emoji: '🏠',
    title: 'Welcome Week 4: My Home!',
    description: 'Esta semana describimos nuestro hogar y vecindario usando There is/There are y las preposiciones de lugar.',
    paragraphs: [
      'Meta de la semana: describir tu casa o apartamento con habitaciones, muebles y su ubicación.',
      'Aprenderemos preposiciones de lugar, furniture vocabulary y cómo hacer preguntas sobre espacios.',
    ],
    items: ['Objetivo 1: usar There is/There are correctamente', 'Objetivo 2: preposiciones de lugar (in, on, under, next to...)', 'Objetivo 3: describir habitaciones y vecindario'],
  },
  {
    emoji: '🏡',
    title: 'Types of Houses',
    description: 'Vocabulario para describir dónde vives.',
    items: [
      'house — casa independiente',
      'apartment / flat — apartamento',
      'studio — estudio pequeño',
      'building — edificio',
      'neighborhood — vecindario / barrio',
    ],
    examples: [
      'I live in an apartment in the city center.',
      'My parents live in a house with a garden.',
      'There are five rooms in our apartment.',
    ],
  },
  {
    emoji: '🛋️',
    title: 'Rooms & Furniture',
    description: 'Vocabulario de habitaciones y muebles para describir tu hogar.',
    items: [
      'Rooms: living room, bedroom, kitchen, bathroom, dining room, hallway',
      'Furniture: sofa, armchair, table, chair, bed, wardrobe, shelf, lamp, mirror',
      'Kitchen: fridge, oven, microwave, sink, cupboard',
    ],
    examples: [
      'In my living room, there is a big sofa and a TV.',
      'My bedroom has a double bed and a wardrobe.',
      'The kitchen has a modern oven and a large fridge.',
    ],
  },
  {
    emoji: '📍',
    title: 'There is / There are',
    description: 'Usamos there is/there are para hablar de la existencia y ubicación de cosas.',
    items: [
      'There is + singular: There is a table in the kitchen.',
      'There are + plural: There are two chairs next to the table.',
      'Negative: There isn\'t / There aren\'t',
      'Question: Is there a...? / Are there any...?',
    ],
    examples: [
      'There is a big window in my bedroom.',
      'There are three plants on the balcony.',
      'Is there a garage? — No, there isn\'t.',
      'Are there any shops nearby? — Yes, there are.',
    ],
  },
  {
    emoji: '🗺️',
    title: 'Prepositions of Place',
    description: 'Las preposiciones de lugar nos dicen dónde está algo en relación a otra cosa.',
    items: [
      'in — dentro: The cat is in the box.',
      'on — sobre/encima: The book is on the table.',
      'under — debajo: The shoes are under the bed.',
      'next to / beside — al lado: The lamp is next to the sofa.',
      'between — entre: The bathroom is between the two bedrooms.',
      'in front of / behind — delante/detrás: The mirror is in front of the wardrobe.',
      'opposite — enfrente: The school is opposite the park.',
    ],
    examples: [
      'The remote control is on the sofa.',
      'My room is next to the bathroom.',
      'The supermarket is opposite the bank.',
    ],
  },
  {
    emoji: '🏙️',
    title: 'Places in the Neighborhood',
    description: 'Vocabulario para describir tu vecindario y los lugares cercanos.',
    items: [
      'supermarket, pharmacy, hospital, school, bank',
      'park, gym, library, restaurant, café',
      'bus stop, post office, police station',
    ],
    examples: [
      'There is a park near my house.',
      'There are two supermarkets in my neighborhood.',
      'There isn\'t a gym close to where I live.',
      'Is there a pharmacy nearby? — Yes, there is one on the corner.',
    ],
  },
  {
    emoji: '🏗️',
    title: 'Describing Your Home — Full Description',
    description: 'Modelo completo para describir tu hogar en inglés.',
    items: [
      'Start: I live in a [house/apartment] in [location].',
      'Rooms: There are ___ rooms: a kitchen, ___ bedrooms...',
      'Main room: In the living room, there is/are...',
      'Location details: The ___ is next to / opposite the ___.',
      'Neighborhood: In my neighborhood, there is/are...',
    ],
    examples: [
      'I live in an apartment in Bogotá. There are four rooms: two bedrooms, a kitchen, and a living room. In the living room, there is a large sofa and a TV. My apartment is opposite a park and next to a supermarket.',
    ],
  },
  {
    emoji: '🎯',
    type: 'exercise-choice',
    title: 'Practice 1: There is / There are',
    question: 'Choose the correct option: "___ two chairs in the kitchen."',
    options: ['There is two chairs in the kitchen.', 'There are two chairs in the kitchen.', 'There has two chairs in the kitchen.'],
    correct: 'There are two chairs in the kitchen.',
  },
  {
    emoji: '🎯',
    type: 'exercise-choice',
    title: 'Practice 2: Prepositions',
    question: 'The keys are ___ the table. (encima)',
    options: ['The keys are under the table.', 'The keys are on the table.', 'The keys are in the table.'],
    correct: 'The keys are on the table.',
  },
  {
    emoji: '✍️',
    type: 'exercise-fill',
    title: 'Practice 3: Fill the Gap',
    prompt: 'Complete: "___ a gym in your neighborhood?" — "No, there ___."',
    answer: "Is there / isn't",
    placeholder: "Is there / isn't",
  },
  {
    emoji: '🎭',
    title: 'Role-play: House Tour',
    description: 'Haz un tour virtual de tu casa o apartamento para un visitante.',
    items: [
      'Welcome your guest and introduce the home.',
      'Show them each room using prepositions.',
      'Describe what is in each room.',
      'Talk about the neighborhood.',
    ],
    examples: [
      'Welcome! This is my apartment. Come in!',
      'This is the living room. There is a sofa and two armchairs. The TV is on the wall, opposite the sofa.',
      'The kitchen is next to the living room. There is a big fridge and a small table.',
      'The neighborhood is great — there is a park and a supermarket nearby.',
    ],
  },
  {
    emoji: '✅',
    title: 'Week 4 Summary',
    description: 'Homework: escribe un texto de 60-80 palabras describiendo tu casa y vecindario. Usa There is/are y preposiciones de lugar.',
    items: ['Types of homes vocabulary', 'Rooms and furniture', 'There is / There are (+ negatives + questions)', 'Prepositions of place', 'Places in the neighborhood'],
  },
];

export default function A12WeekFour() {
  return (
    <A12WeekDeck
      weekNumber={4}
      title="My Home"
      subtitle="There is/are • Prepositions • House & Neighborhood"
      theme={{ from: 'from-amber-500', via: 'via-orange-500', to: 'to-red-400' }}
      slides={slides}
    />
  );
}
