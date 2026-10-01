import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

function applyTheme(isDark) {
  const root = document.documentElement;
  root.classList.toggle('dark', isDark);
  root.style.colorScheme = isDark ? 'dark' : 'light';
  document.body?.classList.toggle('dark', isDark);
}

export function ThemeProvider({ children }) {
  // El modo claro es el predeterminado SIEMPRE en toda la app (login, paneles,
  // material y slides): cada carga arranca en claro sin seguir la preferencia
  // del sistema operativo. El botón de tema cambia el modo solo durante la sesión.
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    applyTheme(isDark);
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
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
