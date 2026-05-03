import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/Card';
import Button from './ui/Button';
import Badge from './ui/Badge';
import ProgressBar from './ui/ProgressBar';
import { Play, CheckCircle, Lock, Clock } from 'lucide-react';

/**
 * Lesson Card - Claymorphism Design
 * Interactive card for displaying lesson information
 */
export default function LessonCard({ 
  title,
  description,
  duration,
  difficulty,
  progress = 0,
  isLocked = false,
  isCompleted = false,
  onStart,
  thumbnail
}) {
  const difficultyColors = {
    beginner: 'success',
    intermediate: 'warning',
    advanced: 'error'
  };

  const difficultyLabels = {
    beginner: 'Principiante',
    intermediate: 'Intermedio',
    advanced: 'Avanzado'
  };

  return (
    <Card 
      className={`relative overflow-hidden ${isLocked ? 'opacity-60' : ''}`}
      hoverable={!isLocked}
    >
      {/* Thumbnail or Icon */}
      <div className="relative h-40 rounded-2xl overflow-hidden mb-4"
           style={{ 
             background: thumbnail 
               ? `url(${thumbnail}) center/cover` 
               : 'linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(129, 140, 248, 0.2))',
             boxShadow: 'inset 0 -4px 0 rgba(0, 0, 0, 0.05)'
           }}>
        {!thumbnail && (
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen size={48} style={{ color: 'var(--color-primary)', opacity: 0.5 }} />
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          {isCompleted && (
            <Badge variant="success" className="flex items-center gap-1">
              <CheckCircle size={14} />
              Completado
            </Badge>
          )}
          {isLocked && (
            <Badge variant="default" className="flex items-center gap-1">
              <Lock size={14} />
              Bloqueado
            </Badge>
          )}
        </div>
      </div>

      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant={difficultyColors[difficulty]} size="sm">
            {difficultyLabels[difficulty]}
          </Badge>
        </div>
        <CardDescription className="mt-2">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Duration */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Clock size={16} />
          <span>{duration} minutos</span>
        </div>

        {/* Progress Bar */}
        {progress > 0 && !isCompleted && (
          <ProgressBar 
            value={progress} 
            max={100}
            label="Progreso"
            size="sm"
          />
        )}
      </CardContent>

      <CardFooter>
        <Button
          variant={isCompleted ? 'outline' : 'primary'}
          size="md"
          disabled={isLocked}
          onClick={onStart}
          className="w-full flex items-center justify-center gap-2"
        >
          {isLocked ? (
            <>
              <Lock size={18} />
              Bloqueado
            </>
          ) : isCompleted ? (
            <>
              <CheckCircle size={18} />
              Revisar
            </>
          ) : progress > 0 ? (
            <>
              <Play size={18} />
              Continuar
            </>
          ) : (
            <>
              <Play size={18} />
              Comenzar
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

// Missing import
import { BookOpen } from 'lucide-react';
