import { clsx } from 'clsx';

/**
 * Card component with Claymorphism design
 * Follows UI/UX Pro Max design system
 */
export default function Card({ 
  children, 
  className,
  hoverable = true,
  onClick,
  ...props 
}) {
  return (
    <div
      className={clsx(
        'card-clay',
        hoverable && 'cursor-pointer',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(e);
        }
      } : undefined}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div className={clsx('mb-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...props }) {
  return (
    <h3 className={clsx('text-2xl font-bold text-[var(--color-text)] mb-2', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className, ...props }) {
  return (
    <p className={clsx('text-sm text-gray-600', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, className, ...props }) {
  return (
    <div className={clsx('', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }) {
  return (
    <div className={clsx('mt-4 flex items-center gap-2', className)} {...props}>
      {children}
    </div>
  );
}
