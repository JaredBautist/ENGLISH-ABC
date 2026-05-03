import { forwardRef } from 'react';
import { clsx } from 'clsx';

/**
 * Input component with Claymorphism design
 * Follows UI/UX Pro Max design system
 */
const Input = forwardRef(({ 
  label,
  error,
  helperText,
  className,
  containerClassName,
  ...props 
}, ref) => {
  return (
    <div className={clsx('flex flex-col gap-2', containerClassName)}>
      {label && (
        <label 
          htmlFor={props.id} 
          className="text-sm font-semibold text-[var(--color-text)]"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={clsx(
          'input-clay',
          error && 'border-red-500 focus:border-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-sm text-red-600 font-medium" role="alert">
          {error}
        </span>
      )}
      {helperText && !error && (
        <span className="text-sm text-gray-500">
          {helperText}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
