import { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle, Edit2, GraduationCap, Layers, LogOut, Moon, Plus, Save, Search, Sun, X,
} from 'lucide-react';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useTheme } from '../features/theme/ThemeProvider';
import { apiFetch } from '../utils/api';
import { gradeOrder, grades } from '../data/grados';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2';

const inputClass =
  'input-clay w-full placeholder:text-slate-400';

const labelClass = 'mb-1.5 block text-sm font-extrabold text-slate-700 dark:text-slate-200';

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

  const toggleGrade = (setForm, code) => {
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
          const tone = {
            jardin: 'from-amber-400 to-orange-500 border-amber-300 bg-amber-50 text-amber-900',
            transicion: 'from-violet-500 to-fuchsia-500 border-violet-300 bg-violet-50 text-violet-900',
            primero: 'from-sky-500 to-cyan-500 border-sky-300 bg-sky-50 text-sky-900',
            segundo: 'from-emerald-500 to-teal-500 border-emerald-300 bg-emerald-50 text-emerald-900',
          }[code];
          return (
            <button
              key={code}
              id={`${idPrefix}-${code}`}
              type="button"
              aria-pressed={selected}
              onClick={() => toggleGrade(setForm, code)}
              className={`inline-flex items-center gap-2 rounded-2xl border-[3px] px-3 py-2.5 text-xs font-extrabold transition-all sm:text-sm ${
                selected
                  ? `${tone} shadow-[0_4px_0_rgba(15,23,42,0.12)] -translate-y-0.5`
                  : 'border-blue-100 bg-white text-slate-500 hover:-translate-y-0.5 hover:border-blue-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
              } ${focusRing}`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-lg border-2 text-[10px] font-black ${
                  selected ? 'border-transparent bg-blue-600 text-white' : 'border-slate-300 dark:border-slate-600'
                }`}
                aria-hidden="true"
              >
                {selected ? '✓' : ''}
              </span>
              {grades[code].name}
            </button>
          );
        })}
      </div>
    </fieldset>
  );

  return (
    <div className="bg-blobs min-h-screen bg-[#eff6ff] text-slate-900 transition-colors duration-300 dark:bg-[#0b1224] dark:text-slate-100">
      <a
        href="#admin-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-blue-600 focus:px-4 focus:py-2 focus:font-bold focus:text-white"
      >
        Saltar al contenido
      </a>

      <header className="sticky top-0 z-40 border-b-2 border-blue-100 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex max-w-6xl items-center gap-2.5 px-3 py-2.5 sm:gap-3 sm:px-6 sm:py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-700 text-white shadow-[0_4px_0_rgba(76,29,149,0.35)]">
            <Layers size={21} aria-hidden="true" />
          </div>
          <div className="mr-auto min-w-0">
            <p className="truncate text-sm font-black leading-tight sm:text-base">Administración General</p>
            <p className="truncate text-[11px] font-semibold text-slate-500 dark:text-slate-400 sm:text-xs">
              Institución · {user?.username}
            </p>
          </div>
          <a
            href="/docente"
            aria-label="Panel docente"
            title="Panel docente"
            className={`rounded-2xl bg-teal-600 p-2.5 text-white shadow-[0_4px_0_rgba(15,118,110,0.35)] transition-all hover:-translate-y-0.5 ${focusRing}`}
          >
            <GraduationCap size={18} aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Modo claro' : 'Modo oscuro'}
            className={`rounded-2xl border-2 border-blue-100 bg-white p-2.5 text-slate-600 transition-all hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-900 dark:text-amber-300 ${focusRing}`}
          >
            {isDark ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={logout}
            aria-label="Cerrar sesión"
            className={`rounded-2xl border-2 border-rose-100 bg-white p-2.5 text-rose-600 transition-all hover:-translate-y-0.5 dark:border-rose-500/20 dark:bg-slate-900 dark:text-rose-400 ${focusRing}`}
          >
            <LogOut size={19} aria-hidden="true" />
          </button>
        </div>
      </header>

      <main id="admin-main" className="relative z-10 mx-auto max-w-6xl px-3 py-5 sm:px-6 sm:py-8">
        {error && (
          <div
            role="alert"
            className="card-clay mb-6 flex items-center justify-between gap-4 border-rose-200 bg-rose-50 p-4 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300"
          >
            <span className="font-bold">{error}</span>
            <button
              type="button"
              onClick={() => setError('')}
              aria-label="Descartar error"
              className={`shrink-0 rounded-lg p-1 hover:bg-rose-100 dark:hover:bg-rose-500/20 ${focusRing}`}
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
          {/* Crear docente */}
          <div className="card-clay h-fit p-4 sm:p-6 lg:p-8">
            <h2 className="mb-5 flex items-center gap-2 text-xl font-black sm:mb-6 sm:text-2xl">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-[0_3px_0_rgba(29,78,216,0.35)]">
                <Plus size={19} aria-hidden="true" />
              </span>
              Crear docente
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
                className={`btn-primary-clay w-full py-3 text-base disabled:opacity-60 ${focusRing}`}
              >
                {creating ? 'Creando…' : 'Crear docente'}
              </button>
            </form>
          </div>

          {/* Lista de docentes */}
          <div className="card-clay p-4 sm:p-6 lg:col-span-2 lg:p-8">
            <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <h2 className="flex items-center gap-2 text-xl font-black sm:text-2xl">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-[0_3px_0_rgba(4,120,87,0.35)]">
                  <GraduationCap size={19} aria-hidden="true" />
                </span>
                Docentes ({teachers.length})
              </h2>
              <div className="relative">
                <label htmlFor="teacher-search" className="sr-only">Buscar docentes</label>
                <Search size={16} aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="teacher-search"
                  type="search"
                  placeholder="Buscar por nombre, correo o grado…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={`${inputClass} !pl-11`}
                />
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-10" role="status" aria-label="Cargando docentes">
                <div className="h-9 w-9 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
              </div>
            ) : filteredTeachers.length === 0 ? (
              <p className="py-4 text-slate-600 dark:text-slate-300" aria-live="polite">
                {search
                  ? `Sin resultados para "${search}".`
                  : 'Aún no hay docentes. Crea el primero con el formulario.'}
              </p>
            ) : (
              <ul className="max-h-[34rem] space-y-3 overflow-y-auto pr-1" aria-busy={loading}>
                {filteredTeachers.map((teacher) => (
                  <li key={teacher.id}>
                    {editingId === teacher.id ? (
                      <div className="animate-pop rounded-2xl border-[3px] border-blue-300 bg-gradient-to-br from-blue-50/80 to-white p-4 shadow-lg sm:p-5 dark:border-blue-500/40 dark:from-slate-800 dark:to-slate-900">
                        <div className="mb-4 flex items-center justify-between gap-2">
                          <p className="text-xs font-black uppercase tracking-widest text-blue-700 dark:text-blue-300">Editando docente</p>
                          <div className="flex flex-wrap justify-end gap-1.5">
                            {(teacher.grades || []).map((code) => (
                              <span key={code} className="badge-clay badge-clay-blue">{formatGrade(code)}</span>
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
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                              <span className="font-bold text-slate-500 dark:text-slate-400">(déjala vacía para conservarla)</span>
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
                          <div className="flex flex-col gap-3 sm:flex-row">
                            <button
                              type="submit"
                              disabled={updating}
                              className={`btn-primary-clay flex-1 py-2.5 text-sm disabled:opacity-60 ${focusRing}`}
                            >
                              <Save size={16} aria-hidden="true" className="mr-2 inline" /> {updating ? 'Guardando…' : 'Guardar'}
                            </button>
                            <button
                              type="button"
                              onClick={cancelEdit}
                              disabled={updating}
                              className={`btn-ghost-clay flex-1 py-2.5 text-sm disabled:opacity-60 ${focusRing}`}
                            >
                              <X size={16} aria-hidden="true" className="mr-2 inline" /> Cancelar
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <div className="rounded-2xl border-[3px] border-blue-50 bg-white p-3.5 transition-all hover:-translate-y-0.5 hover:border-blue-300 sm:p-4 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-indigo-500">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate font-black text-slate-900 dark:text-white">{teacher.username}</p>
                            <p className="truncate text-sm font-semibold text-slate-600 dark:text-slate-300">{teacher.email}</p>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {(teacher.grades || []).length === 0 ? (
                                <span className="badge-clay badge-clay-amber">
                                  <AlertCircle size={12} aria-hidden="true" /> Sin grado asignado
                                </span>
                              ) : (
                                teacher.grades.map((code) => (
                                  <span key={code} className="badge-clay badge-clay-green">{formatGrade(code)}</span>
                                ))
                              )}
                              {!teacher.is_active && (
                                <span className="badge-clay badge-clay-slate">Inactivo</span>
                              )}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => startEdit(teacher)}
                            aria-label={`Editar docente ${teacher.username}`}
                            className={`shrink-0 rounded-xl border-2 border-blue-100 bg-white p-2.5 text-slate-600 transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 ${focusRing}`}
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
