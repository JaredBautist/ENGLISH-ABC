import A12WeekDeck from '../components/A12WeekDeck';

const slides = [
  {
    emoji: '🎉',
    title: 'Welcome Week 8: Final Review',
    description: 'Semana final de integracion: repaso profundo, proyecto oral completo y autoevaluacion con criterios claros.',
    paragraphs: [
      'Objetivo final A1.2: comunicar informacion personal, rutinas, lugares y planes simples con seguridad.',
      'Hoy cerramos con una presentacion guiada similar a week-one en estructura, pero con mayor autonomia.',
    ],
    items: ['Review key grammar points', 'Integrate vocabulary from all units', 'Present a final speaking task with confidence'],
  },
  {
    emoji: '🧠',
    title: 'Grammar Checkpoint 1',
    description: 'Recordatorio de estructuras clave y cuando usarlas.',
    items: ['to be for identity and description', 'present simple for routines', 'there is / there are for places and objects', 'can / can\'t for abilities and rules', 'going to for future plans'],
  },
  {
    emoji: '📚',
    title: 'Vocabulary Review by Themes',
    description: 'Organiza vocabulario por bloques para recordar y usar mas rapido al hablar.',
    items: ['countries and professions', 'daily routine verbs', 'family and home objects', 'shopping and food', 'hobbies and free-time activities'],
  },
  {
    emoji: '🧩',
    title: 'Grammar Checkpoint 2: Error Correction',
    items: ['He are a student. ❌ -> He is a student. ✅', 'There is three chairs. ❌ -> There are three chairs. ✅', 'I can to swim. ❌ -> I can swim. ✅', 'She going to study. ❌ -> She is going to study. ✅'],
    description: 'Corregir errores tipicos antes del proyecto final mejora claridad y precision.',
  },
  {
    emoji: '🗺️',
    title: 'Project Blueprint',
    description: 'Estructura recomendada para tu presentacion final de 60-90 segundos.',
    items: ['Part 1: Introduce yourself (name, age, country, profession/student)', 'Part 2: Describe your routine and your home/neighborhood', 'Part 3: Talk about your skills and weekend plans'],
  },
  {
    emoji: '🗣️',
    title: 'Final Speaking Project',
    description: 'Present yourself + your home + your weekend plan in one complete talk (60-90 sec).',
    items: ['Name, country, profession/student role', 'Describe your home or neighborhood with there is/there are', 'Say what you can do and what you are going to do this weekend'],
    examples: ['Hello, my name is Ana. I am from Peru and I am a student.', 'There is a park near my house and there are two stores on my street.', 'I can play volleyball, and this weekend I am going to visit my cousins.'],
  },
  {
    emoji: '🎧',
    title: 'Delivery and Pronunciation Tips',
    description: 'No memorices palabra por palabra: memoriza ideas clave y conectores.',
    items: ['Use connectors: and, but, because, then', 'Speak in short chunks with pauses', 'Keep eye contact and smile for confidence'],
  },
  {
    emoji: '🎯',
    type: 'exercise-choice',
    title: 'Final Quiz 1',
    question: 'Choose the best sentence:',
    options: ['There are a big park near my house.', 'There is a big park near my house.', 'There is big park near my house.'],
    correct: 'There is a big park near my house.',
  },
  {
    emoji: '🎯',
    type: 'exercise-choice',
    title: 'Final Quiz 2',
    question: 'Choose the most natural final-project sentence:',
    options: ['I am going visit my grandma this weekend.', 'I am going to visit my grandma this weekend.', 'I going to visit my grandma this weekend.'],
    correct: 'I am going to visit my grandma this weekend.',
  },
  {
    emoji: '✍️',
    type: 'exercise-fill',
    title: 'Final Quiz 3',
    prompt: 'Complete: "I ___ going to study tonight."',
    answer: 'am',
    placeholder: 'am / is / are',
  },
  {
    emoji: '🏁',
    title: 'Self-Evaluation',
    items: ['I can introduce myself.', 'I can describe routines and places.', 'I can ask and answer simple questions.', 'I can talk about future plans.'],
  },
  {
    emoji: '🌟',
    title: 'Congratulations!',
    description: 'You finished A1.2. Great job! Keep practicing every day with a simple and consistent routine.',
    items: ['Listening practice: 10 minutes daily', 'Speaking practice with a partner or voice notes', 'Weekly vocabulary review by themes', 'Monthly mini-presentation to track progress'],
  },
];

export default function A12WeekEight() {
  return (
    <A12WeekDeck
      weekNumber={8}
      title="Final Project & Review"
      subtitle="Complete Review • Assessment • Celebration"
      theme={{ from: 'from-emerald-500', via: 'via-teal-500', to: 'to-cyan-500' }}
      slides={slides}
    />
  );
}
