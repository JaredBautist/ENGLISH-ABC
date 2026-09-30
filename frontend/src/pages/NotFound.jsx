import { gradeOrder, grades } from '../data/grados';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-6">
      <main className="max-w-md text-center">
        <p className="text-6xl font-black text-indigo-600 dark:text-indigo-400 mb-4" aria-hidden="true">404</p>
        <h1 className="text-2xl font-black mb-3">Ruta no encontrada</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          La página que buscas no existe. Prueba con una de estas opciones:
        </p>
        <ul className="space-y-3">
          {[
            { href: '/docente', label: 'Panel docente' },
            { href: '/admin', label: 'Administración general' },
            ...gradeOrder.map((code) => ({
              href: `/${code}/unidad-1`,
              label: `Unidad 1 — ${grades[code].name}`,
            })),
          ].map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-block px-6 py-3 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
