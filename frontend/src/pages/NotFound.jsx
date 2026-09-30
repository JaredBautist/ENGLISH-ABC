import { gradeOrder, grades } from '../data/grados';

export default function NotFound() {
  return (
    <div className="bg-blobs flex min-h-screen items-center justify-center bg-[#eff6ff] p-4 text-slate-900 sm:p-6 dark:bg-[#0b1224] dark:text-slate-100">
      <main className="card-clay relative z-10 max-w-md p-8 text-center sm:p-10">
        <p className="mb-2 text-7xl font-black text-blue-600" aria-hidden="true">404</p>
        <h1 className="mb-3 text-2xl font-black">Ruta no encontrada</h1>
        <p className="mb-8 font-semibold text-slate-500 dark:text-slate-400">
          La página que buscas no existe. Prueba con una de estas opciones:
        </p>
        <ul className="space-y-3">
          {[
            { href: '/docente', label: '🎓 Panel docente', clay: 'btn-primary-clay w-full' },
            { href: '/admin', label: '🛠 Administración general', clay: 'btn-secondary-clay w-full' },
            ...gradeOrder.map((code) => ({
              href: `/${code}/unidad-1`,
              label: `▶ Unidad 1 — ${grades[code].name}`,
              clay: 'btn-ghost-clay w-full',
            })),
          ].map((link) => (
            <li key={link.href}>
              <a href={link.href} className={`inline-flex items-center justify-center ${link.clay}`}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
