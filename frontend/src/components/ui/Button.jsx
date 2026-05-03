import { forwardRef } from 'react';
import { clsx } from 'clsx';

/**
 * Button component with Claymorphism design
 * Follows UI/UX Pro Max design system
 */
const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  className,
  ...props 
}, ref) => {
  const baseClasses = 'btn-clay font-semibold transition-all duration-200 inline-flex items-center justify-center gap-2';
  
  const variantClasses = {
    primary: 'btn-primary-clay',
    secondary: 'btn-secondary-clay',
    outline: 'bg-transparent border-3 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white',
    ghost: 'bg-transparent text-[var(--color-primary)] hover:bg-[rgba(79,70,229,0.1)]'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-xl',
    md: 'px-6 py-3 text-base rounded-2xl',
    lg: 'px-8 py-4 text-lg rounded-2xl'
  };
  
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
