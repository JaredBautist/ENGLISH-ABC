import { forwardRef } from 'react';

const Alert = forwardRef(({ className, variant = 'default', ...props }, ref) => {
  const variants = {
    default: 'bg-white text-slate-950 border-slate-200 dark:bg-slate-950 dark:text-slate-50 dark:border-slate-800',
    destructive:
      'border-red-500/50 text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border',
  };

  return (
    <div
      ref={ref}
      role="alert"
      className={`relative w-full rounded-lg border p-4 ${variants[variant] || variants.default} ${className || ''}`}
      {...props}
    />
  );
});
Alert.displayName = 'Alert';

const AlertTitle = forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={`mb-1 font-medium leading-tight tracking-tight ${className || ''}`}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`text-sm [&_p]:leading-relaxed ${className || ''}`} {...props} />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
