import { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import WeekProgressBar from '../components/WeekProgressBar';
import LessonCard from '../components/LessonCard';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { BookOpen, Award, TrendingUp, Clock } from 'lucide-react';

/**
 * Student Dashboard Example - Muestra cómo integrar WeekProgressBar
 * Este es un ejemplo de cómo debería verse el dashboard del estudiante
 */
export default function StudentDashboardExample() {
  const [progressData, setProgressData] = useState(null);

  // Datos de ejemplo de las semanas
  const weeks = [
    {
      number: 1,
      title: 'Week 1: Greetings & Introductions',
      subtitle: 'Present Simple • Personal Information',
      duration: '5 days',
      lessons: 12,
      href: '/a1-2/week-1',
      unlocked: true,
      completed: true,
      progress: 100
    },
    {
      number: 2,
      title: 'Week 2: Daily Routines',
      subtitle: 'Present Simple • Time Expressions',
      duration: '5 days',
      lessons: 14,
      href: '/a1-2/week-2',
      unlocked: true,
      completed: false,
      progress: 65
    },
    {
      number: 3,
      title: 'Week 3: Places & Directions',
      subtitle: 'There is/are • Prepositions of Place',
      duration: '5 days',
      lessons: 13,
      href: '/a1-2/week-3',
      unlocked: true,
      completed: false,
      progress: 20
    },
    {
      number: 4,
      title: 'Week 4: Past Simple',
      subtitle: 'Regular & Irregular Verbs',
      duration: '5 days',
      lessons: 15,
      href: '/a1-2/week-4',
      unlocked: false,
      completed: false,
      progress: 0
    },
    {
      number: 5,
      title: 'Week 5: Shopping & Food',
      subtitle: 'Some/Any • How much/many',
      duration: '5 days',
      lessons: 14,
      href: '/a1-2/week-5',
      unlocked: false,
      completed: false,
      progress: 0
    },
    {
      number: 6,
      title: 'Week 6: Abilities & Rules',
      subtitle: 'Can/Can\'t • Imperatives',
      duration: '5 days',
      lessons: 13,
      href: '/a1-2/week-6',
      unlocked: false,
      completed: false,
      progress: 0
    },
    {
      number: 7,
      title: 'Week 7: Hobbies & Plans',
      subtitle: 'Like + -ing • Going to',
      duration: '5 days',
      lessons: 14,
      href: '/a1-2/week-7',
      unlocked: false,
      completed: false,
      progress: 0
    },
    {
      number: 8,
      title: 'Week 8: Final Review',
      subtitle: 'Complete Review • Final Project',
      duration: '5 days',
      lessons: 16,
      href: '/a1-2/week-8',
      unlocked: false,
      completed: false,
      progress: 0
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <NavigationBar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
            Welcome back, Student! 👋
          </h1>
          <p className="text-lg text-gray-600">
            Continue your English learning journey. You're doing great!
          </p>
        </div>

        {/* Progress Bar - COMPONENTE PRINCIPAL */}
        <div className="mb-8">
          <WeekProgressBar 
            levelCode="a1-2" 
            onProgressUpdate={setProgressData}
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3"
                   style={{ 
                     background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(129, 140, 248, 0.2))',
                     boxShadow: '0 4px 0 rgba(79, 70, 229, 0.1)'
                   }}>
                <BookOpen size={28} style={{ color: 'var(--color-primary)' }} />
              </div>
              <p className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                {progressData?.current_week || 3}/8
              </p>
              <p className="text-sm text-gray-600 font-medium">Weeks Completed</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3"
                   style={{ 
                     background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.2))',
                     boxShadow: '0 4px 0 rgba(34, 197, 94, 0.1)'
                   }}>
                <Award size={28} style={{ color: 'var(--color-cta)' }} />
              </div>
              <p className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                {progressData?.overall_percent || 45}%
              </p>
              <p className="text-sm text-gray-600 font-medium">Overall Progress</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3"
                   style={{ 
                     background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.1), rgba(250, 204, 21, 0.2))',
                     boxShadow: '0 4px 0 rgba(234, 179, 8, 0.1)'
                   }}>
                <TrendingUp size={28} style={{ color: '#EAB308' }} />
              </div>
              <p className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                7
              </p>
              <p className="text-sm text-gray-600 font-medium">Day Streak</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3"
                   style={{ 
                     background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(251, 146, 60, 0.2))',
                     boxShadow: '0 4px 0 rgba(249, 115, 22, 0.1)'
                   }}>
                <Clock size={28} style={{ color: '#F97316' }} />
              </div>
              <p className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                2.5h
              </p>
              <p className="text-sm text-gray-600 font-medium">This Week</p>
            </CardContent>
          </Card>
        </div>

        {/* Weeks Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>
              📚 Your Learning Path
            </h2>
            <Badge variant="info">A1.2 Level</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {weeks.map((week) => (
              <LessonCard
                key={week.number}
                title={week.title}
                description={week.subtitle}
                duration={week.lessons * 5} // 5 min por lección
                difficulty="beginner"
                progress={week.progress}
                isLocked={!week.unlocked}
                isCompleted={week.completed}
                onStart={() => {
                  if (week.unlocked) {
                    window.location.href = week.href;
                  } else {
                    window.showToast('Complete the previous week to unlock this one', 'warning', 3000);
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <Card>
          <CardHeader>
            <CardTitle>💡 Learning Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl" style={{ background: 'rgba(79, 70, 229, 0.05)' }}>
                <p className="font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>
                  🎯 Stay Consistent
                </p>
                <p className="text-sm text-gray-600">
                  Practice every day for at least 15 minutes to maintain your streak!
                </p>
              </div>
              <div className="p-4 rounded-xl" style={{ background: 'rgba(34, 197, 94, 0.05)' }}>
                <p className="font-semibold mb-2" style={{ color: 'var(--color-cta)' }}>
                  ✅ Complete Activities
                </p>
                <p className="text-sm text-gray-600">
                  Finish all exercises to unlock the next week and maximize learning!
                </p>
              </div>
              <div className="p-4 rounded-xl" style={{ background: 'rgba(234, 179, 8, 0.05)' }}>
                <p className="font-semibold mb-2" style={{ color: '#EAB308' }}>
                  🔊 Practice Speaking
                </p>
                <p className="text-sm text-gray-600">
                  Read examples out loud to improve your pronunciation and confidence!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
