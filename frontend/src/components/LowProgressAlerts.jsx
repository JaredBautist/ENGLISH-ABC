import { AlertCircle, ChevronRight, Mail } from 'lucide-react';
import { useState } from 'react';

/**
 * Componente que muestra alertas de estudiantes con bajo progreso
 */
export function LowProgressAlerts({ students, onContactStudent = null, darkMode = false }) {
  const [expandedId, setExpandedId] = useState(null);

  if (!students || students.length === 0) {
    return (
      <div className={`rounded-xl shadow-md p-6 border-l-4 border-green-500 transition-colors ${
        darkMode ? 'bg-slate-800' : 'bg-white'
      }`}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100">
              <AlertCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">¡Buen trabajo!</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Todos tus estudiantes tienen un progreso aceptable (≥ 25%)
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getProgressColor = (progress) => {
    if (darkMode) {
      if (progress < 10) return 'bg-red-900/30 text-red-200 border-red-800';
      if (progress < 20) return 'bg-orange-900/30 text-orange-200 border-orange-800';
      return 'bg-yellow-900/30 text-yellow-200 border-yellow-800';
    }
    if (progress < 10) return 'bg-red-100 text-red-800 border-red-300';
    if (progress < 20) return 'bg-orange-100 text-orange-800 border-orange-300';
    return 'bg-yellow-100 text-yellow-800 border-yellow-300';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle size={20} className="text-red-600" />
        <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Estudiantes con Bajo Progreso ({students.length})
        </h3>
      </div>

      {students.map((student) => (
        <div
          key={student.student_id}
          className={`border rounded-xl overflow-hidden transition-all shadow-sm ${
            expandedId === student.student_id
              ? darkMode ? 'border-red-900 bg-red-900/20' : 'border-red-300 bg-red-50'
              : darkMode ? 'border-slate-700 bg-slate-800 hover:bg-slate-750' : 'border-gray-200 bg-white hover:bg-gray-50'
          }`}
        >
          {/* Header - Always visible */}
          <button
            onClick={() =>
              setExpandedId(
                expandedId === student.student_id ? null : student.student_id
              )
            }
            className={`w-full px-4 py-3 flex items-center justify-between cursor-pointer transition-colors ${
              darkMode ? 'hover:bg-slate-700/50' : 'hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-3 flex-1">
              {/* Nombre y email */}
              <div className="flex-1 text-left">
                <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {student.student_name}
                </p>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{student.student_email}</p>
              </div>

              {/* Progreso */}
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div
                    className={`font-bold text-sm px-2 py-1 rounded border ${getProgressColor(
                      student.avg_progress
                    )}`}
                  >
                    {student.avg_progress}%
                  </div>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>{student.level}</p>
                </div>

                {/* Chevron */}
                <ChevronRight
                  size={20}
                  className={`transition-transform ${darkMode ? 'text-slate-500' : 'text-gray-400'} ${
                    expandedId === student.student_id ? 'rotate-90' : ''
                  }`}
                />
              </div>
            </div>
          </button>

          {/* Expanded content */}
          {expandedId === student.student_id && (
            <div className={`px-4 py-3 border-t transition-colors ${
              darkMode ? 'border-red-900 bg-red-900/30' : 'border-red-200 bg-red-50'
            }`}>
              <div className="space-y-3">
                {/* Información detallada */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className={`text-xs font-semibold uppercase ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                      Nivel Actual
                    </p>
                    <p className={`text-sm mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {student.level}
                    </p>
                  </div>
                  <div>
                    <p className={`text-xs font-semibold uppercase ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                      Asignación
                    </p>
                    <p className={`text-sm mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {student.assigned_at
                        ? new Date(student.assigned_at).toLocaleDateString('es-ES')
                        : 'Desconocida'}
                    </p>
                  </div>
                </div>

                {/* Barra de progreso visual */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className={`text-xs font-semibold uppercase ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                      Progreso Visual
                    </p>
                    <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {student.avg_progress}%
                    </span>
                  </div>
                  <div className={`w-full rounded-full h-2 overflow-hidden ${darkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
                    <div
                      className="bg-gradient-to-r from-red-500 to-orange-400 h-full transition-all"
                      style={{ width: `${Math.min(student.avg_progress, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Recomendaciones */}
                <div className={`border rounded p-3 transition-colors ${
                  darkMode ? 'bg-red-900/40 border-red-800' : 'bg-red-100 border-red-300'
                }`}>
                  <p className={`text-xs font-semibold mb-1 ${darkMode ? 'text-red-400' : 'text-red-800'}`}>
                    ⚠️ Recomendaciones:
                  </p>
                  <ul className={`text-xs space-y-1 list-disc list-inside ${darkMode ? 'text-red-300' : 'text-red-700'}`}>
                    <li>Contacta al estudiante para revisar su progreso</li>
                    <li>Proporciona apoyo adicional si es necesario</li>
                    <li>Revisa los módulos con mayor dificultad</li>
                  </ul>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-2 pt-2">
                  {onContactStudent && (
                    <button
                      onClick={() => onContactStudent(student)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      <Mail size={16} />
                      Contactar
                    </button>
                  )}
                  <button
                    onClick={() => setExpandedId(null)}
                    className={`flex-1 px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${
                      darkMode 
                        ? 'border-slate-600 bg-slate-700 text-slate-200 hover:bg-slate-600' 
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
