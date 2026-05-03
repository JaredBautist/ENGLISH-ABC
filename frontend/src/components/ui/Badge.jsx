import { clsx } from 'clsx';

/**
 * Badge component with Claymorphism design
 * Follows UI/UX Pro Max design system
 */
export default function Badge({ 
  children, 
  variant = 'default',
  size = 'md',
  className,
  ...props 
}) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-[var(--color-primary)] text-white',
    success: 'bg-[var(--color-cta)] text-white',
    warning: 'bg-yellow-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-[var(--color-secondary)] text-white',
    outline: 'bg-transparent border-2 border-[var(--color-primary)] text-[var(--color-primary)]'
  };
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };
  
  const shadowClasses = 'shadow-[0_2px_0_rgba(0,0,0,0.1),0_4px_8px_rgba(0,0,0,0.1)]';
  
  return (
    <span
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        shadowClasses,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
