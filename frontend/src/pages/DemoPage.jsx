import { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import StudentProgressCard from '../components/StudentProgressCard';
import LessonCard from '../components/LessonCard';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import ProgressBar, { CircularProgress } from '../components/ui/ProgressBar';
import Badge from '../components/ui/Badge';
import { BookOpen, Award, TrendingUp, Star } from 'lucide-react';

/**
 * Demo Page - Showcase of UI/UX Improvements
 * Demonstrates all new Claymorphism components
 */
export default function DemoPage() {
  const [inputValue, setInputValue] = useState('');

  const lessons = [
    {
      title: 'Greetings & Introductions',
      description: 'Learn how to greet people and introduce yourself in English',
      duration: 15,
      difficulty: 'beginner',
      progress: 100,
      isCompleted: true
    },
    {
      title: 'Present Simple Tense',
      description: 'Master the basics of present simple tense with practical examples',
      duration: 20,
      difficulty: 'beginner',
      progress: 65,
      isCompleted: false
    },
    {
      title: 'Daily Routines',
      description: 'Vocabulary and phrases for talking about your daily activities',
      duration: 18,
      difficulty: 'intermediate',
      progress: 0,
      isCompleted: false
    },
    {
      title: 'Advanced Conversation',
      description: 'Complex conversation patterns and idiomatic expressions',
      duration: 30,
      difficulty: 'advanced',
      progress: 0,
      isLocked: true
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <NavigationBar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
            🎨 UI/UX Improvements Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explora los nuevos componentes con diseño Claymorphism aplicados a la plataforma de aprendizaje de inglés
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                   style={{ 
                     background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(129, 140, 248, 0.2))',
                     boxShadow: '0 4px 0 rgba(79, 70, 229, 0.1)'
                   }}>
                <BookOpen size={32} style={{ color: 'var(--color-primary)' }} />
              </div>
              <h3 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>24</h3>
              <p className="text-sm text-gray-600 font-medium">Lecciones Totales</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                   style={{ 
                     background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.2))',
                     boxShadow: '0 4px 0 rgba(34, 197, 94, 0.1)'
                   }}>
                <Award size={32} style={{ color: 'var(--color-cta)' }} />
              </div>
              <h3 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>12</h3>
              <p className="text-sm text-gray-600 font-medium">Logros Desbloqueados</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                   style={{ 
                     background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.1), rgba(250, 204, 21, 0.2))',
                     boxShadow: '0 4px 0 rgba(234, 179, 8, 0.1)'
                   }}>
                <TrendingUp size={32} style={{ color: '#EAB308' }} />
              </div>
              <h3 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>7</h3>
              <p className="text-sm text-gray-600 font-medium">Días de Racha</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                   style={{ 
                     background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(251, 146, 60, 0.2))',
                     boxShadow: '0 4px 0 rgba(249, 115, 22, 0.1)'
                   }}>
                <Star size={32} style={{ color: '#F97316' }} />
              </div>
              <h3 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>4.8</h3>
              <p className="text-sm text-gray-600 font-medium">Calificación Promedio</p>
            </CardContent>
          </Card>
        </div>

        {/* Student Progress */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
            📈 Tu Progreso
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StudentProgressCard
              studentName="María González"
              level="A1.2"
              completedLessons={15}
              totalLessons={24}
              streak={7}
              lastActivity="Hace 2 horas"
              achievements={['Primera lección', 'Racha de 7 días', 'Quiz perfecto']}
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Progreso por Habilidad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ProgressBar value={85} max={100} label="Vocabulario" />
                <ProgressBar value={70} max={100} label="Gramática" />
                <ProgressBar value={60} max={100} label="Pronunciación" />
                <ProgressBar value={90} max={100} label="Comprensión" />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
            📚 Lecciones Disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lessons.map((lesson, index) => (
              <LessonCard
                key={index}
                {...lesson}
                onStart={() => alert(`Iniciando: ${lesson.title}`)}
              />
            ))}
          </div>
        </div>

        {/* Components Showcase */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
            🎨 Componentes UI
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Botones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" size="sm">Primary Small</Button>
                  <Button variant="primary" size="md">Primary Medium</Button>
                  <Button variant="primary" size="lg">Primary Large</Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" disabled>Disabled</Button>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle>Badges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="info">Info</Badge>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Badge size="sm">Small</Badge>
                  <Badge size="md">Medium</Badge>
                  <Badge size="lg">Large</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Inputs */}
            <Card>
              <CardHeader>
                <CardTitle>Inputs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Nombre"
                  placeholder="Ingresa tu nombre"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="tu@email.com"
                  helperText="Usaremos tu email para notificaciones"
                />
                <Input
                  label="Contraseña"
                  type="password"
                  error="La contraseña debe tener al menos 8 caracteres"
                />
              </CardContent>
            </Card>

            {/* Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Progreso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center">
                  <CircularProgress value={75} max={100} size={100} />
                </div>
                <ProgressBar value={45} max={100} label="Lección actual" size="sm" />
                <ProgressBar value={80} max={100} label="Curso completo" size="md" />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <Card className="text-center">
          <CardContent className="py-8">
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
              ¿Listo para continuar aprendiendo?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Estos componentes están diseñados con Claymorphism para crear una experiencia de aprendizaje divertida y motivadora.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="primary" size="lg">
                Comenzar Lección
              </Button>
              <Button variant="outline" size="lg">
                Ver Más Ejemplos
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
