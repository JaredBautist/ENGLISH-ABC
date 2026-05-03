import { clsx } from 'clsx';

/**
 * Progress Bar component with Claymorphism design
 * Follows UI/UX Pro Max design system
 */
export default function ProgressBar({ 
  value = 0, 
  max = 100,
  label,
  showPercentage = true,
  size = 'md',
  className,
  ...props 
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6'
  };
  
  return (
    <div className={clsx('w-full', className)} {...props}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className="text-sm font-semibold text-[var(--color-text)]">
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-sm font-bold text-[var(--color-cta)]">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div 
        className={clsx('progress-clay', sizeClasses[size])}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || 'Progress'}
      >
        <div 
          className="progress-clay-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

/**
 * Circular Progress component
 */
export function CircularProgress({ 
  value = 0, 
  max = 100,
  size = 120,
  strokeWidth = 8,
  label,
  className,
  ...props 
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className={clsx('inline-flex flex-col items-center gap-2', className)} {...props}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || 'Progress'}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(79, 70, 229, 0.1)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-cta)" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
        {/* Percentage text */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="0.3em"
          className="text-2xl font-bold fill-[var(--color-text)] transform rotate-90"
          style={{ transformOrigin: 'center' }}
        >
          {Math.round(percentage)}%
        </text>
      </svg>
      {label && (
        <span className="text-sm font-semibold text-[var(--color-text)]">
          {label}
        </span>
      )}
    </div>
  );
}
