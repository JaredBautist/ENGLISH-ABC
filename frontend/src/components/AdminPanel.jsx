import { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle, Edit2, GraduationCap, Layers, LogOut, Moon, Plus, Save, Search, Sun, X,
} from 'lucide-react';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useTheme } from '../features/theme/ThemeProvider';
import { apiFetch } from '../utils/api';
import { gradeOrder, grades } from '../data/grados';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2';

const inputClass =
  'w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 ' +
  'text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 ' +
  'transition-colors focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 focus:outline-none';

const labelClass = 'block text-sm font-bold mb-1.5 text-slate-700 dark:text-slate-200';

const formatGrade = (code) => grades[code]?.name || code || '—';

export default function AdminPanel() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [createForm, setCreateForm] = useState({ username: '', email: '', password: '', grade_codes: ['primero'] });
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ username: '', email: '', grade_codes: [], password: '' });
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/admin/teachers/');
      setTeachers(Array.isArray(data) ? data : data?.results || []);
      setError('');
    } catch (err) {
      setError('Error cargando docentes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTeacher = async (event) => {
    event.preventDefault();
    if (!createForm.username || !createForm.email || !createForm.password || createForm.grade_codes.length === 0) {
      setError('Completa todos los campos y selecciona al menos un grado.');
      return;
    }
    setCreating(true);
    try {
      const created = await apiFetch('/admin/teachers/', {
        method: 'POST',
        body: JSON.stringify(createForm),
      });
      setTeachers((prev) => [...prev, created]);
      setCreateForm({ username: '', email: '', password: '', grade_codes: ['primero'] });
      setError('');
      if (typeof window.showToast === 'function') {
        window.showToast(`Docente "${created.username}" creado.`, 'success');
      }
    } catch (err) {
      const detail =
        err?.data?.grade_codes?.[0] ||
        err?.data?.email?.[0] ||
        err?.data?.username?.[0] ||
        err?.data?.detail ||
        err?.message;
      setError(detail ? `Error creando docente: ${detail}` : 'Error creando docente');
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  const startEdit = (teacher) => {
    setEditingId(teacher.id);
    setEditForm({
      username: teacher.username,
      email: teacher.email,
      grade_codes: teacher.grades || [],
      password: '',
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ username: '', email: '', grade_codes: [], password: '' });
  };

  const toggleGrade = (form, setForm, code) => {
    setForm((prev) => {
      const has = prev.grade_codes.includes(code);
      return {
        ...prev,
        grade_codes: has
          ? prev.grade_codes.filter((c) => c !== code)
          : [...prev.grade_codes, code],
      };
    });
  };

  const handleUpdateTeacher = async (teacherId) => {
    if (!editForm.username || !editForm.email || editForm.grade_codes.length === 0) {
      setError('Completa los datos y al menos un grado.');
      return;
    }
    setUpdating(true);
    try {
      const updateData = {
        username: editForm.username,
        email: editForm.email,
        grade_codes: editForm.grade_codes,
      };
      if (editForm.password && editForm.password.trim() !== '') {
        updateData.password = editForm.password;
      }
      const updated = await apiFetch(`/admin/teachers/${teacherId}/`, {
        method: 'PATCH',
        body: JSON.stringify(updateData),
      });
      setTeachers((prev) => prev.map((t) => (t.id === teacherId ? updated : t)));
      cancelEdit();
      setError('');
      if (typeof window.showToast === 'function') {
        window.showToast('Docente actualizado.', 'success');
      }
    } catch (err) {
      const detail =
        err?.data?.grade_codes?.[0] ||
        err?.data?.email?.[0] ||
        err?.data?.username?.[0] ||
        err?.data?.detail ||
        err?.message;
      setError(detail ? `Error actualizando: ${detail}` : 'Error actualizando docente');
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const filteredTeachers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return teachers;
    return teachers.filter(
      (t) =>
        t.username?.toLowerCase().includes(query) ||
        t.email?.toLowerCase().includes(query) ||
        (t.grades || []).some((code) => formatGrade(code).toLowerCase().includes(query))
    );
  }, [teachers, search]);

  const GradePicker = ({ form, setForm, idPrefix }) => (
    <fieldset>
      <legend className={labelClass}>Grado(s) que dicta</legend>
      <div className="grid grid-cols-2 gap-2">
        {gradeOrder.map((code) => {
          const selected = form.grade_codes.includes(code);
          return (
            <label
              key={code}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 cursor-pointer text-sm font-bold transition-all ${
                selected
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-200'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-300'
              }`}
            >
              <input
                id={`${idPrefix}-${code}`}
                type="checkbox"
                checked={selected}
                onChange={() => toggleGrade(form, setForm, code)}
                className="h-4 w-4 accent-indigo-600"
              />
              {grades[code].name}
            </label>
          );
        })}
      </div>
    </fieldset>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      <a
        href="#admin-main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-xl focus:bg-indigo-600 focus:text-white focus:font-bold"
      >
        Saltar al contenido
      </a>

      <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white" aria-hidden="true">
            <Layers size={22} />
          </div>
          <div className="mr-auto">
            <p className="font-black leading-tight">Administración General</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Institución · {user?.username}</p>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Modo claro' : 'Modo oscuro'}
            className={`p-2.5 rounded-xl text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 ${focusRing}`}
          >
            {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
          </button>
          <a
            href="/docente"
            className={`hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-teal-600 text-white hover:bg-teal-700 transition-colors ${focusRing}`}
          >
            <GraduationCap size={16} aria-hidden="true" /> Panel docente
          </a>
          <button
            type="button"
            onClick={logout}
            aria-label="Cerrar sesión"
            className={`p-2.5 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 ${focusRing}`}
          >
            <LogOut size={20} aria-hidden="true" />
          </button>
        </div>
      </header>

      <main id="admin-main" className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {error && (
          <div
            role="alert"
            className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-500/30 text-rose-800 dark:text-rose-300 flex justify-between items-center gap-4"
          >
            <span className="font-semibold">{error}</span>
            <button
              type="button"
              onClick={() => setError('')}
              aria-label="Descartar error"
              className={`p-1 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-500/20 ${focusRing}`}
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Crear docente */}
          <div className="rounded-[2rem] p-6 sm:p-8 border shadow-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
              <Plus size={24} aria-hidden="true" /> Crear docente
            </h2>
            <form onSubmit={handleCreateTeacher} className="space-y-4" aria-busy={creating}>
              <div>
                <label htmlFor="create-username" className={labelClass}>Usuario</label>
                <input
                  id="create-username"
                  type="text"
                  autoComplete="off"
                  required
                  placeholder="nombre.docente"
                  value={createForm.username}
                  onChange={(e) => setCreateForm({ ...createForm, username: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="create-email" className={labelClass}>Correo</label>
                <input
                  id="create-email"
                  type="email"
                  autoComplete="off"
                  required
                  placeholder="docente@colegio.edu.co"
                  value={createForm.email}
                  onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="create-password" className={labelClass}>Contraseña</label>
                <input
                  id="create-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  placeholder="••••••••"
                  value={createForm.password}
                  onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                  className={inputClass}
                />
              </div>
              <GradePicker form={createForm} setForm={setCreateForm} idPrefix="create" />
              <button
                type="submit"
                disabled={creating}
                aria-busy={creating}
                className={`w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:from-indigo-400 disabled:to-violet-400 text-white font-black py-3 rounded-xl transition-all shadow-lg ${focusRing}`}
              >
                {creating ? 'Creando…' : 'Crear docente'}
              </button>
            </form>
          </div>

          {/* Lista de docentes */}
          <div className="lg:col-span-2 rounded-[2rem] p-6 sm:p-8 border shadow-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-2xl font-black flex items-center gap-2">
                <GraduationCap size={24} aria-hidden="true" /> Docentes ({teachers.length})
              </h2>
              <div className="relative sm:w-72">
                <label htmlFor="teacher-search" className="sr-only">Buscar docentes</label>
                <Search size={16} aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="teacher-search"
                  type="search"
                  placeholder="Buscar por nombre, correo o grado…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={`${inputClass} !pl-10`}
                />
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-8" role="status" aria-label="Cargando docentes">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-600" />
              </div>
            ) : filteredTeachers.length === 0 ? (
              <p className="text-slate-600 dark:text-slate-300 py-4" aria-live="polite">
                {search
                  ? `Sin resultados para "${search}".`
                  : 'Aún no hay docentes. Crea el primero con el formulario.'}
              </p>
            ) : (
              <ul className="space-y-3 max-h-[32rem] overflow-y-auto pr-2" aria-busy={loading}>
                {filteredTeachers.map((teacher) => (
                  <li key={teacher.id}>
                    {editingId === teacher.id ? (
                      <div className="rounded-2xl border-2 border-indigo-300/70 dark:border-indigo-500/40 bg-gradient-to-br from-indigo-50/70 to-white dark:from-slate-800/80 dark:to-slate-900 p-5 shadow-lg">
                        <div className="mb-4 flex items-center justify-between">
                          <p className="text-sm font-black tracking-wide text-indigo-700 dark:text-indigo-300">Editando docente</p>
                          <div className="flex flex-wrap gap-1.5 justify-end">
                            {(teacher.grades || []).map((code) => (
                              <span key={code} className="px-2 py-0.5 rounded-full text-[10px] font-black bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200">
                                {formatGrade(code)}
                              </span>
                            ))}
                          </div>
                        </div>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdateTeacher(teacher.id);
                          }}
                          className="space-y-4"
                          aria-busy={updating}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor={`edit-username-${teacher.id}`} className={labelClass}>Usuario</label>
                              <input
                                id={`edit-username-${teacher.id}`}
                                type="text"
                                required
                                value={editForm.username}
                                onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                                className={inputClass}
                              />
                            </div>
                            <div>
                              <label htmlFor={`edit-email-${teacher.id}`} className={labelClass}>Correo</label>
                              <input
                                id={`edit-email-${teacher.id}`}
                                type="email"
                                required
                                value={editForm.email}
                                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                className={inputClass}
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor={`edit-password-${teacher.id}`} className={labelClass}>
                              Contraseña{' '}
                              <span className="font-semibold text-slate-500 dark:text-slate-400">(déjala vacía para conservarla)</span>
                            </label>
                            <input
                              id={`edit-password-${teacher.id}`}
                              type="password"
                              autoComplete="new-password"
                              placeholder="••••••••"
                              value={editForm.password}
                              onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                              className={inputClass}
                            />
                          </div>
                          <GradePicker form={editForm} setForm={setEditForm} idPrefix={`edit-${teacher.id}`} />
                          <div className="flex flex-col sm:flex-row gap-3">
                            <button
                              type="submit"
                              disabled={updating}
                              className={`flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 disabled:opacity-60 text-white font-black py-2.5 rounded-xl transition-all text-sm shadow-lg ${focusRing}`}
                            >
                              <Save size={16} aria-hidden="true" /> {updating ? 'Guardando…' : 'Guardar'}
                            </button>
                            <button
                              type="button"
                              onClick={cancelEdit}
                              disabled={updating}
                              className={`flex-1 inline-flex items-center justify-center gap-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 disabled:opacity-60 text-slate-700 dark:text-slate-100 font-black py-2.5 rounded-xl transition-all text-sm border border-slate-300/80 dark:border-slate-500/80 ${focusRing}`}
                            >
                              <X size={16} aria-hidden="true" /> Cancelar
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all">
                        <div className="flex justify-between items-start gap-3">
                          <div className="min-w-0">
                            <p className="font-black text-slate-900 dark:text-white truncate">{teacher.username}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-300 truncate">{teacher.email}</p>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {(teacher.grades || []).length === 0 ? (
                                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 inline-flex items-center gap-1">
                                  <AlertCircle size={13} aria-hidden="true" /> Sin grado asignado
                                </span>
                              ) : (
                                teacher.grades.map((code) => (
                                  <span key={code} className="px-2.5 py-1 text-xs font-black rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-700">
                                    {formatGrade(code)}
                                  </span>
                                ))
                              )}
                              {!teacher.is_active && (
                                <span className="px-2.5 py-1 text-xs font-black rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300">
                                  Inactivo
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => startEdit(teacher)}
                            aria-label={`Editar docente ${teacher.username}`}
                            className={`shrink-0 p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all ${focusRing}`}
                          >
                            <Edit2 size={16} aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
