import { Calendar, Filter, X } from 'lucide-react';
import { useState } from 'react';

/**
 * Componente de filtros para el dashboard
 */
export function FilterBar({ levels, onFilterChange, initialFilters = {}, darkMode = false }) {
  const [filters, setFilters] = useState({
    startDate: initialFilters.startDate || '',
    endDate: initialFilters.endDate || '',
    level: initialFilters.level || '',
    showLowProgress: initialFilters.showLowProgress || false
  });

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newFilters = {
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      startDate: '',
      endDate: '',
      level: '',
      showLowProgress: false
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const hasActiveFilters = 
    filters.startDate || 
    filters.endDate || 
    filters.level || 
    filters.showLowProgress;

  return (
    <div className={`mb-6 rounded-2xl border p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur transition-colors ${darkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200/80 bg-white/95'}`}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
            <Filter size={18} />
          </div>
          <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Filtros</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className={`inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm font-semibold transition-colors ${
              darkMode
                ? 'border-red-900/50 bg-red-900/20 text-red-400 hover:bg-red-900/40 hover:text-red-300'
                : 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700'
            }`}
          >
            <X size={16} />
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* Fecha de inicio */}
        <div>
          <label htmlFor="startDate" className={`mb-1 block text-sm font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-700'}`}>
            Fecha de inicio
          </label>
          <div className="relative">
            <Calendar size={16} className={`pointer-events-none absolute left-3 top-3 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className={`w-full rounded-xl border py-2.5 pl-10 pr-3 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'border-slate-600 bg-slate-700 text-white' : 'border-slate-300 bg-white text-slate-900'}`}
            />
          </div>
        </div>

        {/* Fecha de fin */}
        <div>
          <label htmlFor="endDate" className={`mb-1 block text-sm font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-700'}`}>
            Fecha de fin
          </label>
          <div className="relative">
            <Calendar size={16} className={`pointer-events-none absolute left-3 top-3 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className={`w-full rounded-xl border py-2.5 pl-10 pr-3 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'border-slate-600 bg-slate-700 text-white' : 'border-slate-300 bg-white text-slate-900'}`}
            />
          </div>
        </div>

        {/* Nivel */}
        <div>
          <label htmlFor="level" className={`mb-1 block text-sm font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            Nivel
          </label>
          <select
            id="level"
            name="level"
            value={filters.level}
            onChange={handleFilterChange}
            className={`w-full rounded-xl border px-3 py-2.5 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'border-slate-600 bg-slate-700 text-white' : 'border-slate-300 bg-white text-slate-900'}`}
          >
            <option value="">Todos los niveles</option>
            {levels.map(level => (
              <option key={level.code} value={level.code}>
                {level.name}
              </option>
            ))}
          </select>
        </div>

        {/* Mostrar solo bajo progreso */}
        <div className="flex items-end">
          <label className={`inline-flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2.5 transition-colors cursor-pointer ${darkMode ? 'border-slate-600 bg-slate-700 hover:bg-slate-600' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}>
            <input
              type="checkbox"
              id="showLowProgress"
              name="showLowProgress"
              checked={filters.showLowProgress}
              onChange={handleFilterChange}
              className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span className={`text-sm font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
              Solo bajo progreso
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
