import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { CircularProgress } from './ui/ProgressBar';
import Badge from './ui/Badge';
import { BookOpen, Award, TrendingUp, Clock } from 'lucide-react';

/**
 * Student Progress Card - Claymorphism Design
 * Displays student learning progress with visual indicators
 */
export default function StudentProgressCard({ 
  studentName,
  level,
  completedLessons = 0,
  totalLessons = 0,
  streak = 0,
  lastActivity,
  achievements = []
}) {
  const completionPercentage = totalLessons > 0 
    ? Math.round((completedLessons / totalLessons) * 100) 
    : 0;

  return (
    <Card className="bg-gradient-to-br from-white to-[var(--color-background)]">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{studentName}</CardTitle>
            <Badge variant="info" size="sm" className="mt-2">
              {level}
            </Badge>
          </div>
          <CircularProgress 
            value={completedLessons} 
            max={totalLessons}
            size={80}
            strokeWidth={6}
          />
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Lessons Completed */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white"
               style={{ 
                 boxShadow: '0 4px 0 rgba(79, 70, 229, 0.1), inset 0 -2px 0 rgba(0, 0, 0, 0.05)'
               }}>
            <div className="p-2 rounded-xl" 
                 style={{ backgroundColor: 'rgba(79, 70, 229, 0.1)' }}>
              <BookOpen size={20} style={{ color: 'var(--color-primary)' }} />
            </div>
            <div>
              <p className="text-xs text-gray-600 font-medium">Lecciones</p>
              <p className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                {completedLessons}/{totalLessons}
              </p>
            </div>
          </div>

          {/* Streak */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white"
               style={{ 
                 boxShadow: '0 4px 0 rgba(34, 197, 94, 0.1), inset 0 -2px 0 rgba(0, 0, 0, 0.05)'
               }}>
            <div className="p-2 rounded-xl" 
                 style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
              <TrendingUp size={20} style={{ color: 'var(--color-cta)' }} />
            </div>
            <div>
              <p className="text-xs text-gray-600 font-medium">Racha</p>
              <p className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                {streak} días
              </p>
            </div>
          </div>
        </div>

        {/* Last Activity */}
        {lastActivity && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Clock size={16} />
            <span>Última actividad: {lastActivity}</span>
          </div>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award size={18} style={{ color: 'var(--color-cta)' }} />
              <h4 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                Logros Recientes
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {achievements.slice(0, 3).map((achievement, index) => (
                <Badge key={index} variant="success" size="sm">
                  {achievement}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
