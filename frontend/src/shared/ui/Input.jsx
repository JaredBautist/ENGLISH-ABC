import { forwardRef } from 'react';

/**
 * Campo de texto con estilo clay de la plataforma: borde 3px azul claro,
 * esquinas muy redondeadas, sombra interna suave y foco azul.
 */
const Input = forwardRef(({ className, type = 'text', ...props }, ref) => (
  <input
    type={type}
    className={`flex h-12 w-full rounded-2xl border-[3px] border-blue-100 bg-white px-4 py-2.5 text-base font-semibold text-slate-950 shadow-[inset_0_2px_4px_rgba(15,23,42,0.05)] transition-all placeholder:font-normal placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500/15 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700/80 dark:bg-[#0f172a]/80 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-400 ${className || ''}`}
    ref={ref}
    {...props}
  />
));
Input.displayName = 'Input';

export default Input;
