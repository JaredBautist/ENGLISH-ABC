# Plataforma Docente DBA — English Platform

Herramienta institucional de apoyo para la enseñanza del inglés en colegios colombianos. Los **docentes** son los usuarios de la plataforma: proyectan en clase lecciones alineadas a los **DBA (Derechos Básicos de Aprendizaje)** del MEN para los grados **Jardín, Transición, 1° y 2° de primaria**. La **administración general** crea los docentes y les asigna el grado que dictan.

## Stack

- Frontend: React 18, JavaScript/JSX, Vite, Tailwind CSS.
- Backend: Python 3.12, Django 5.2, Django REST Framework, SimpleJWT.
- Base de datos local: MySQL 8.0 en Docker con volumen persistente.
- Tests: Vitest/Testing Library (frontend) y tests Django (backend).

## Start local

Prerrequisitos: Docker Engine, Docker Compose, Docker Buildx y Python 3.

```bash
python scripts/init_local.py
docker compose up --build -d --wait
# Sembrar el currículo institucional (grados, DBA y unidades iniciales):
docker compose exec -T backend python manage.py seed_dba_curriculum
docker compose ps
```

| Servicio | Dirección |
| --- | --- |
| Aplicación / login | http://localhost:5173/login |
| Documentación API | http://localhost:8000/api/docs/ |
| Django admin | http://localhost:8000/admin/ |
| MySQL | `db:3306` dentro de Docker |

## Roles y rutas

| Rol | Panel | Ruta |
| --- | --- | --- |
| Administración general (`superadmin`) | Crear/editar docentes y asignarles grados | `/admin` |
| Docente (`teacher`) | Ver sus grados asignados, los DBA oficiales y abrir slides por unidad | `/docente` |
| Slides de clase (proyección) | Unidades por grado | `/:grado/unidad-N` |

Las cuentas de estudiantes fueron retiradas: ya no existe el rol estudiante ni cuentas para niños.

## Currículo y DBA

Los textos de DBA de Transición, 1° y 2° provienen de la cartilla oficial del MEN *"Derechos Básicos de Aprendizaje de Inglés — grados Transición a 5º de primaria"*. Jardín usa referentes de preescolar (la cartilla no define DBA de inglés para ese grado).

Primera fase (periodo 1, 2 unidades por grado):

- **Jardín:** saludos y rutinas; colores y objetos del salón.
- **Transición:** mi familia y yo; mi cuerpo habla.
- **1°:** classroom instructions; this is me (información personal).
- **2°:** mi cuerpo y mi familia; historias cortas con imágenes.

El comando `seed_dba_curriculum` es idempotente y crea grados, DBA y unidades. Las unidades se sirven desde la API (`/api/grades/`, `/api/modules/`) y el contenido de slides vive en `frontend/src/data/grados.js`.

## API principal

```
GET    /api/grades/                    Grados visibles (docente: solo asignados)
GET    /api/modules/?grade=<code>      Unidades de un grado
GET    /api/teachers/me/summary/       Resumen de planificación del docente
GET|POST /api/teachers/me/progress/    Avance marcado por el docente
GET|POST /api/admin/teachers/          Administración: listar/crear docentes
PATCH  /api/admin/teachers/<id>/       Editar docente (datos, contraseña, grados, estado)
POST   /api/auth/token/                Login JWT (email + password)
```

## Tests

```bash
docker compose exec -T frontend npm run build
docker compose exec -T frontend npm test -- --run
docker compose exec -T backend python manage.py check
docker compose exec -T backend python manage.py makemigrations --check --dry-run
docker compose exec -T backend python manage.py test
python scripts/test_mysql.py
```

## Estructura

```text
frontend/src/components/   DBADeck (slides de clase), TeacherWorkspace, AdminPanel
frontend/src/data/grados.js  Grados, DBA oficiales y contenido de slides
backend/apps/learning/     Grade, Module (period/DBA), TeacherGrade, progreso docente
backend/apps/accounts/     User (roles superadmin/teacher) y login JWT
docker-compose.yml         Frontend, API, MySQL y volumen persistente
```

## Deployment

Compose usa servidores de desarrollo para uso local. No hay despliegue de internet verificado; una instalación institucional en producción requiere su propio diseño de hosting, secretos, respaldos y HTTPS.
