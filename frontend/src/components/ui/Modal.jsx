import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Accessible modal dialog:
 * - traps Tab focus inside while open
 * - closes on Escape
 * - locks body scroll
 * - restores focus to the trigger element on close
 */
export default function Modal({ title, subtitle, onClose, children, labelledById = 'modal-title' }) {
  const containerRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    previouslyFocused.current = document.activeElement;
    const container = containerRef.current;
    const firstFocusable = container?.querySelector(FOCUSABLE_SELECTOR);
    (firstFocusable || container)?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !container) return;

      const focusable = Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[80] bg-slate-950/80 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledById}
        tabIndex={-1}
        className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-slate-900 text-slate-100 shadow-2xl overflow-hidden focus:outline-none"
      >
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-widest font-black text-indigo-300">{subtitle}</p>
            <h3 id={labelledById} className="text-lg sm:text-xl font-black truncate">
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 shrink-0"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
