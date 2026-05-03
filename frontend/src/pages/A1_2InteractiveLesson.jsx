import React, { useState, useEffect } from 'react';
import { StudentPageWrapper } from '../components/StudentPageWrapper';
import { A1_2WeekSlideshow } from '../components/InteractiveSlides';

/**
 * A1_2InteractiveLesson - Página de lección interactiva para A1.2
 * Props:
 *   - weekNumber: número de semana (1-8)
 */
const A1_2InteractiveLesson = ({ weekNumber = 1 }) => {
  const [weekData, setWeekData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Datos de ejemplo para semana 1 (en producción, esto vendría del backend)
  const weekDataMap = {
    1: {
      id: 'week-1',
      title: 'Hello! - Introductions',
      subtitle: 'Learn to introduce yourself, describe nationalities, and talk about professions',
      grammarFocus: 'Present Simple of "To Be"',
      vocabularyCount: 40,
      duration: '15 slides | 48 minutes',
      culturalTheme: 'Greetings Around the World',
      slides: [
        {
          id: 's1-1',
          type: 'title',
          title: 'Welcome to A1.2!',
          subtitle: 'Week 1: Hello! 👋',
          emoji: '🌍',
        },
        {
          id: 's1-2',
          type: 'presentation',
          title: 'Global Greetings',
          content: 'People around the world greet each other differently. Let\'s explore how to say "Hello" in English!',
          image: '🌐 Visual: 6 people from different countries waving',
          examples: [
            { text: 'Hello!', meaning: 'Formal greeting' },
            { text: 'Hi!', meaning: 'Casual greeting' },
            { text: 'Good morning!', meaning: 'Morning greeting' },
            { text: 'Good afternoon!', meaning: 'Afternoon greeting' },
            { text: 'Good evening!', meaning: 'Evening greeting' },
          ],
        },
        {
          id: 's1-3',
          type: 'presentation',
          title: 'Say Your Name',
          content: 'The most basic introduction is to tell someone your name using "I am" or "I\'m".',
          image: '👤 Visual: Person with name tag introducing themselves',
          examples: [
            { text: 'I am Maria.', meaning: 'My name is Maria' },
            { text: 'I\'m Paulo.', meaning: 'My name is Paulo (informal)' },
            { text: 'My name is Ahmed.', meaning: 'My full name is Ahmed' },
          ],
        },
        {
          id: 's1-4',
          type: 'vocabulary',
          title: 'Countries',
          words: [
            {
              word: 'Brazil',
              pronunciation: '/brəˈzɪl/',
              partOfSpeech: 'Noun',
              example: 'I am from Brazil.',
              image: 'Brazilian flag, Christ the Redeemer',
            },
            {
              word: 'Spain',
              pronunciation: '/speɪn/',
              partOfSpeech: 'Noun',
              example: 'She is from Spain.',
              image: 'Spanish flag, Flamenco dancer',
            },
            {
              word: 'Japan',
              pronunciation: '/dʒəˈpæn/',
              partOfSpeech: 'Noun',
              example: 'He is from Japan.',
              image: 'Japanese flag, Mount Fuji',
            },
            {
              word: 'France',
              pronunciation: '/fræns/',
              partOfSpeech: 'Noun',
              example: 'We are from France.',
              image: 'French flag, Eiffel Tower',
            },
          ],
        },
        {
          id: 's1-5',
          type: 'activity',
          activityType: 'drag-drop',
          title: 'Match Countries to Flags',
          instructions: 'Drag each country to its correct flag.',
          pairs: [
            { id: 'country-1', label: 'Brazil', correctId: 'brazil', image: '🇧🇷' },
            { id: 'country-2', label: 'Spain', correctId: 'spain', image: '🇪🇸' },
            { id: 'country-3', label: 'Japan', correctId: 'japan', image: '🇯🇵' },
            { id: 'country-4', label: 'France', correctId: 'france', image: '🇫🇷' },
          ],
        },
        {
          id: 's1-6',
          type: 'grammar',
          title: 'The Verb "To Be"',
          rule: 'The verb "to be" (am/is/are) tells us WHO someone is and WHAT they are. Each pronoun uses a different form.',
          table: {
            headers: ['Pronoun', 'Verb Form', 'Example'],
            rows: [
              ['I', 'am', 'I am Maria'],
              ['You', 'are', 'You are a student'],
              ['He', 'is', 'He is a teacher'],
              ['She', 'is', 'She is a doctor'],
              ['We', 'are', 'We are friends'],
              ['They', 'are', 'They are engineers'],
            ],
          },
          errors: [
            {
              incorrect: '❌ He are a teacher',
              correct: '✓ He is a teacher',
            },
            {
              incorrect: '❌ I are from Brazil',
              correct: '✓ I am from Brazil',
            },
          ],
        },
        {
          id: 's1-7',
          type: 'activity',
          activityType: 'fill-blank',
          title: 'Fill in the Correct Form of "To Be"',
          instructions: 'Complete the sentences with the correct form of "to be" (am, is, or are).',
          sentences: [
            { id: 'sentence-1', before: 'I', answer: 'am', after: 'from Mexico.' },
            { id: 'sentence-2', before: 'She', answer: 'is', after: 'a teacher.' },
            { id: 'sentence-3', before: 'We', answer: 'are', after: 'friends.' },
            { id: 'sentence-4', before: 'They', answer: 'are', after: 'from Japan.' },
          ],
        },
        {
          id: 's1-8',
          type: 'vocabulary',
          title: 'Professions',
          words: [
            {
              word: 'Teacher',
              pronunciation: '/ˈtiːtʃər/',
              partOfSpeech: 'Noun',
              example: 'Maria is a teacher.',
              image: 'Person at whiteboard teaching students',
            },
            {
              word: 'Doctor',
              pronunciation: '/ˈdɑktər/',
              partOfSpeech: 'Noun',
              example: 'Ahmed is a doctor.',
              image: 'Person in white coat with stethoscope',
            },
            {
              word: 'Engineer',
              pronunciation: '/ˌɛndʒɪˈnɪr/',
              partOfSpeech: 'Noun',
              example: 'Raj is an engineer.',
              image: 'Person with blueprints',
            },
            {
              word: 'Chef',
              pronunciation: '/ʃɛf/',
              partOfSpeech: 'Noun',
              example: 'Giovanni is a chef.',
              image: 'Person cooking in kitchen',
            },
          ],
        },
        {
          id: 's1-9',
          type: 'dialogue',
          title: 'Meet Someone New',
          scenario: 'At a party, you meet a new person for the first time.',
          dialogue: [
            {
              speaker: 'A',
              text: 'Hello! My name is Maria. I am from Brazil.',
              pronunciation: '/həˈloʊ | maɪ neɪm ɪz məˈriːə | aɪ æm frʌm brəˈzɪl/',
            },
            {
              speaker: 'B',
              text: 'Nice to meet you! I am Paolo. I am from Italy.',
              pronunciation: '/naɪs tu miːt juː | aɪ æm ˈpɑːloʊ | aɪ æm frʌm ˈɪtəli/',
            },
            {
              speaker: 'A',
              text: 'What do you do, Paolo?',
              pronunciation: '/wɑt du juː duː | ˈpɑːloʊ/',
            },
            {
              speaker: 'B',
              text: 'I am a chef. What about you?',
              pronunciation: '/aɪ æm ə ʃɛf | wɑt əˈbaʊt juː/',
            },
            {
              speaker: 'A',
              text: 'I am a teacher!',
              pronunciation: '/aɪ æm ə ˈtiːtʃər/',
            },
          ],
          comprehensionQuestions: [
            '¿Cuál es el nombre de la primera persona y de dónde es?',
            '¿Cuál es la profesión de Paolo?',
            '¿Cuál es la profesión de María?',
          ],
        },
        {
          id: 's1-10',
          type: 'activity',
          activityType: 'multiple-choice',
          title: 'Listening Comprehension',
          question: 'Listen to the dialogue. What is Paolo\'s profession?',
          options: ['Teacher', 'Chef', 'Doctor', 'Engineer'],
          correctAnswer: 'Chef',
          explanation: 'In the dialogue, Paolo says "I am a chef." The word "chef" (pronounced /ʃɛf/) means the person who cooks in a restaurant or kitchen.',
        },
        {
          id: 's1-11',
          type: 'assessment',
          title: 'Week 1 Checkpoint',
          instruction: 'Please answer the following questions about what you learned this week.',
          criteria: [
            {
              skill: 'Grammar (40%)',
              descriptor: 'Can use "to be" correctly with different pronouns (I am, you are, he/she is, etc.)',
            },
            {
              skill: 'Vocabulary (30%)',
              descriptor: 'Can identify at least 20 countries and 8 professions, and use them in simple sentences',
            },
            {
              skill: 'Speaking (20%)',
              descriptor: 'Can introduce yourself with your name, nationality, and profession in simple phrases',
            },
            {
              skill: 'Listening (10%)',
              descriptor: 'Can understand simple introductions at normal speed',
            },
          ],
        },
        {
          id: 's1-12',
          type: 'reflection',
          title: 'What Did You Learn?',
          items: [
            '✓ I can introduce myself using "I am"',
            '✓ I can identify countries and nationalities',
            '✓ I can name different professions in English',
            '✓ I understand the verb "to be" (am/is/are)',
            '✓ I can participate in simple greetings and introductions',
          ],
        },
      ],
    },
    2: {
      id: 'week-2',
      title: 'Daily Routine',
      subtitle: 'Describe your typical day with Present Simple',
      grammarFocus: 'Present Simple Affirmative/Negative',
      vocabularyCount: 35,
      duration: '15 slides | 48 minutes',
      slides: [
        {
          id: 's2-1',
          type: 'title',
          title: 'Week 2: Daily Routine',
          subtitle: 'Learn to describe what you do every day! ⏰',
          emoji: '🌅',
        },
        // ... más slides
      ],
    },
    3: {
      id: 'week-3',
      title: 'Family',
      subtitle: 'Talk about your family members',
      grammarFocus: 'Possessive Adjectives',
      vocabularyCount: 40,
      duration: '15 slides | 48 minutes',
      slides: [
        {
          id: 's3-1',
          type: 'title',
          title: 'Week 3: Family',
          subtitle: 'Meet my family! 👨‍👩‍👧‍👦',
          emoji: '💕',
        },
        // ... más slides
      ],
    },
    4: {
      id: 'week-4',
      title: 'Home',
      subtitle: 'Describe your home and furniture',
      grammarFocus: 'There is/There are + Prepositions',
      vocabularyCount: 40,
      duration: '15 slides | 48 minutes',
      slides: [
        {
          id: 's4-1',
          type: 'title',
          title: 'Week 4: Home',
          subtitle: 'Welcome to my home! 🏠',
          emoji: '🏡',
        },
        // ... más slides
      ],
    },
  };

  useEffect(() => {
    // Simular carga de datos
    setLoading(true);
    try {
      setWeekData(weekDataMap[weekNumber] || null);
      if (!weekDataMap[weekNumber]) {
        setError(`No hay contenido disponible para la semana ${weekNumber}`);
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [weekNumber]);

  const handleWeekComplete = () => {
    const nextWeek = weekNumber + 1;
    if (nextWeek <= 8) {
      window.location.href = `/a1-2/week-${nextWeek}`;
    } else {
      window.location.href = '/a1-2';
    }
  };

  if (loading) {
    return (
      <StudentPageWrapper weekNumber={weekNumber} levelLabel="A1.2">
        <div className="flex items-center justify-center min-h-96 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl text-gray-700">Cargando semana {weekNumber}...</p>
          </div>
        </div>
      </StudentPageWrapper>
    );
  }

  if (error) {
    return (
      <StudentPageWrapper weekNumber={weekNumber} levelLabel="A1.2">
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-8 text-center">
          <p className="text-red-700 font-bold text-lg">⚠️ Error</p>
          <p className="text-red-600 mt-2">{error}</p>
          <a
            href="/a1-2"
            className="mt-4 inline-block px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Volver al nivel
          </a>
        </div>
      </StudentPageWrapper>
    );
  }

  return (
    <StudentPageWrapper weekNumber={weekNumber} levelLabel="A1.2" totalWeeks={8}>
      <A1_2WeekSlideshow
        weekData={weekData}
        weekNumber={weekNumber}
        onComplete={handleWeekComplete}
      />
    </StudentPageWrapper>
  );
};

export default A1_2InteractiveLesson;
