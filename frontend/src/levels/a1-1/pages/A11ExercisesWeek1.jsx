import { useState } from 'react';
import A12WeekDeck from '../components/A12WeekDeck';

// Exercises Week 1 uses A12WeekDeck with interactive exercises format
const slides = [
  {
    emoji: '📝',
    title: 'Exercises Week 1 — Alphabet & Greetings',
    description: 'Práctica interactiva para reforzar todo lo aprendido en la Semana 1. ¡Vamos a practicar!',
    paragraphs: [
      'Estos ejercicios refuerzan: el alfabeto, las vocales, deletrear nombres y los saludos básicos.',
      'Intenta responder sin mirar tus apuntes primero. Luego verifica.',
    ],
    items: ['Ejercicio 1: Vocales y consonantes', 'Ejercicio 2: A vs An', 'Ejercicio 3: Deletrear', 'Ejercicio 4: Saludos', 'Ejercicio 5: Producción libre'],
  },
  {
    emoji: '🅰️',
    type: 'exercise-choice',
    title: 'Exercise 1: Vowels',
    question: 'Which group contains ONLY vowels?',
    options: ['A, B, C, D', 'A, E, I, O, U', 'E, N, I, T'],
    correct: 'A, E, I, O, U',
  },
  {
    emoji: '🍎',
    type: 'exercise-choice',
    title: 'Exercise 2: A or An?',
    question: 'Choose the correct article: "___ umbrella"',
    options: ['a umbrella', 'an umbrella', 'the umbrella'],
    correct: 'an umbrella',
  },
  {
    emoji: '🍊',
    type: 'exercise-choice',
    title: 'Exercise 3: A or An?',
    question: 'Choose the correct article: "___ book"',
    options: ['an book', 'a book', 'the books'],
    correct: 'a book',
  },
  {
    emoji: '✍️',
    type: 'exercise-fill',
    title: 'Exercise 4: Spell It!',
    prompt: 'How do you spell "DOG"? Write: D-?-?',
    answer: 'D-O-G',
    placeholder: 'D-?-?',
  },
  {
    emoji: '✍️',
    type: 'exercise-fill',
    title: 'Exercise 5: Spell Your Name',
    prompt: 'Spell the word "ENGLISH" letter by letter with dashes:',
    answer: 'E-N-G-L-I-S-H',
    placeholder: 'E-?-?-?-?-?-?',
  },
  {
    emoji: '👋',
    type: 'exercise-choice',
    title: 'Exercise 6: Formal Greeting',
    question: 'You are meeting your teacher in the morning. What do you say?',
    options: ['Hey! What\'s up?', 'Good morning, teacher!', 'Yo! How\'s it going?'],
    correct: 'Good morning, teacher!',
  },
  {
    emoji: '🕐',
    type: 'exercise-choice',
    title: 'Exercise 7: Time of Day',
    question: 'It\'s 3:00 PM. What greeting do you use?',
    options: ['Good morning!', 'Good night!', 'Good afternoon!'],
    correct: 'Good afternoon!',
  },
  {
    emoji: '✍️',
    type: 'exercise-fill',
    title: 'Exercise 8: Numbers',
    prompt: 'Write in English: 7 → ?',
    answer: 'seven',
    placeholder: 'seven / eight / nine',
  },
  {
    emoji: '🎭',
    title: 'Production Task: Introduce Yourself',
    description: 'Ahora usa todo lo que sabes. Escribe tu presentación completa en inglés.',
    items: [
      '1. Hello! My name is ___.',
      '2. How do you spell it? ___ (spell it out)',
      '3. I am ___ years old.',
      '4. I am from ___.',
      '5. Nice to meet you!',
    ],
    examples: [
      'Hello! My name is Ana. A-N-A.',
      'I am fifteen years old.',
      'I am from Colombia.',
      'Nice to meet you!',
    ],
  },
  {
    emoji: '🏆',
    title: 'Great Work! Week 1 Complete.',
    description: 'Has completado los ejercicios de la Semana 1. ¡Excelente trabajo!',
    items: [
      '✅ Vocales y consonantes',
      '✅ A vs An',
      '✅ Deletrear palabras',
      '✅ Saludos formales e informales',
      '✅ Presentación personal',
    ],
    paragraphs: ['Continúa practicando el alfabeto y los saludos con compañeros y familiares. ¡La práctica hace al maestro!'],
  },
];

export default function A11ExercisesWeek1() {
  return (
    <A12WeekDeck
      weekNumber={1}
      levelCode="a1-1"
      dashboardHref="/a1-1"
      title="Week 1 Exercises"
      subtitle="Alphabet Practice • Greetings • Spelling • A vs An"
      theme={{ from: 'from-yellow-400', via: 'via-orange-400', to: 'to-red-400' }}
      slides={slides}
    />
  );
}
