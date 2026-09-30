import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, AlertCircle, X } from 'lucide-react';

/**
 * Toast Notification Component
 * Shows temporary notifications with auto-dismiss.
 * Announced politely via aria-live; errors use role="alert".
 */
export default function Toast({ message, type = 'success', duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose && onClose(), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
    warning: AlertCircle
  };

  const colors = {
    success: {
      bg: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500 text-emerald-800 dark:text-emerald-200',
      icon: 'text-emerald-600 dark:text-emerald-400'
    },
    error: {
      bg: 'bg-rose-50 dark:bg-rose-500/10 border-rose-500 text-rose-800 dark:text-rose-200',
      icon: 'text-rose-600 dark:text-rose-400'
    },
    info: {
      bg: 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-500 text-indigo-900 dark:text-indigo-100',
      icon: 'text-indigo-600 dark:text-indigo-400'
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-500/10 border-amber-500 text-amber-900 dark:text-amber-100',
      icon: 'text-amber-600 dark:text-amber-400'
    }
  };

  const Icon = icons[type] || Info;
  const scheme = colors[type] || colors.info;

  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      aria-live="polite"
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
      style={{ maxWidth: '400px', minWidth: 'min(300px, calc(100vw - 2rem))' }}
    >
      <div className={`rounded-2xl p-4 shadow-lg border-2 flex items-start gap-3 ${scheme.bg}`}>
        <Icon size={24} className={`${scheme.icon} shrink-0`} aria-hidden="true" />
        <p className="flex-1 font-semibold text-sm">{message}</p>
        <button
          type="button"
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onClose && onClose(), 300);
          }}
          aria-label="Dismiss notification"
          className="shrink-0 p-1 rounded-lg hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

/**
 * Toast Container - Manages multiple toasts
 */
export function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    window.showToast = (message, type = 'success', duration = 3000) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, message, type, duration }]);
    };

    return () => {
      delete window.showToast;
    };
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div aria-live="polite" className="fixed top-4 right-4 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}
