import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';

const ThemeContext = createContext(null);

function getInitialDark() {
  if (typeof window === 'undefined') return false;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'light') return false;
    if (saved === 'dark') return true;
  } catch {
    // Storage unavailable (private mode, etc.) - fall through to media query.
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false;
}

function applyTheme(isDark) {
  const root = document.documentElement;
  root.classList.toggle('dark', isDark);
  root.style.colorScheme = isDark ? 'dark' : 'light';
  document.body?.classList.toggle('dark', isDark);
}

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(getInitialDark);

  useEffect(() => {
    applyTheme(isDark);
  }, [isDark]);

  // Follow OS changes only while the user has not chosen explicitly.
  useEffect(() => {
    const media = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!media) return undefined;
    const onChange = (event) => {
      let hasExplicitChoice = false;
      try {
        hasExplicitChoice = window.localStorage.getItem(STORAGE_KEY) != null;
      } catch {
        hasExplicitChoice = false;
      }
      if (!hasExplicitChoice) setIsDark(event.matches);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
      } catch {
        // Ignore storage failures; the toggle still works for this session.
      }
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
