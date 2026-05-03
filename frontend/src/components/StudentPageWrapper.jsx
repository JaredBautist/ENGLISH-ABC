import React, { useState } from 'react';
import { LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../features/auth/hooks/useAuth';

/**
 * StudentPageWrapper - Envuelve páginas de estudiantes con barra de navegación y logout
 */
export const StudentPageWrapper = ({ 
  children, 
  weekNumber, 
  totalWeeks = 8,
  levelLabel = 'A1.2'
}) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-50 to-purple-50'}`}>
      {/* Header with Navigation */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-indigo-200'} border-b shadow-md`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a 
              href={`/${levelLabel.toLowerCase()}`}
              className={`text-xl font-bold transition-colors ${
                darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-indigo-600 hover:text-indigo-700'
              }`}
            >
              📚 {levelLabel}
            </a>
            {weekNumber && (
              <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                darkMode 
                  ? 'bg-indigo-900 text-indigo-200' 
                  : 'bg-indigo-100 text-indigo-700'
              }`}>
                Semana {weekNumber} de {totalWeeks}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-all ${
                darkMode
                  ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title={darkMode ? 'Modo claro' : 'Modo oscuro'}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Logout Button */}
            <a
              href="/logout"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-lg transition-all shadow-md font-semibold"
            >
              <LogOut size={18} />
              Salir
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </div>
    </div>
  );
};
