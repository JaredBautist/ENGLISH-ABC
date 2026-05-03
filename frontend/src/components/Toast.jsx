import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, AlertCircle, X } from 'lucide-react';

/**
 * Toast Notification Component
 * Shows temporary notifications with auto-dismiss
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
      bg: 'rgba(34, 197, 94, 0.1)',
      border: 'var(--color-cta)',
      text: '#166534',
      icon: 'var(--color-cta)'
    },
    error: {
      bg: 'rgba(239, 68, 68, 0.1)',
      border: '#EF4444',
      text: '#991B1B',
      icon: '#EF4444'
    },
    info: {
      bg: 'rgba(79, 70, 229, 0.1)',
      border: 'var(--color-primary)',
      text: 'var(--color-text)',
      icon: 'var(--color-primary)'
    },
    warning: {
      bg: 'rgba(234, 179, 8, 0.1)',
      border: '#EAB308',
      text: '#854D0E',
      icon: '#EAB308'
    }
  };

  const Icon = icons[type];
  const colorScheme = colors[type];

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
      style={{
        maxWidth: '400px',
        minWidth: '300px'
      }}
    >
      <div
        className="rounded-2xl p-4 shadow-lg flex items-start gap-3"
        style={{
          background: colorScheme.bg,
          border: `3px solid ${colorScheme.border}`,
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Icon size={24} style={{ color: colorScheme.icon, flexShrink: 0 }} />
        <p className="flex-1 font-semibold text-sm" style={{ color: colorScheme.text }}>
          {message}
        </p>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onClose && onClose(), 300);
          }}
          className="flex-shrink-0 hover:opacity-70 transition-opacity"
          style={{ color: colorScheme.text }}
        >
          <X size={18} />
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
    // Global function to show toasts
    window.showToast = (message, type = 'success', duration = 3000) => {
      const id = Date.now();
      setToasts(prev => [...prev, { id, message, type, duration }]);
    };

    return () => {
      delete window.showToast;
    };
  }, []);

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
      {toasts.map(toast => (
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
