# Local readiness review

Date: 2026-09-09

Final verdict: Ready for local demonstration. Frontend, Django and MySQL run in healthy Docker containers at http://localhost:5173/login. Existing data was copied from SQLite into persistent MySQL; the original file is preserved. Three application accounts were verified, including a newly created A1.1 demo student.

The findings below describe the initial inspection. Runtime blockers, dependency alignment, migration drift and the failing tests were resolved in this task. See tasks.md for final validation. Curriculum gaps, pre-existing security/architecture observations and historical documentation limits are not all resolved by the runtime work.

## 1. Correctness

| Finding | Evidence | Effect |
| --- | --- | --- |
| Compose plugin missing | `docker compose version` fails; `pacman -Q docker-compose docker-buildx` reports both absent. | Documented Compose startup cannot execute. |
| Missing environment file | `docker-compose.yml:25–26` requires nonexistent `backend/.env`. | Compose configuration is incomplete. |
| Invalid MySQL initialization user | `docker-compose.yml:7` sets MYSQL_USER=root. | The official image rejects this regular-user setting on fresh initialization. |
| Wrong container DB address if the example is copied | `backend/.env.example` uses DB_HOST=127.0.0.1. | Django would connect to its own container rather than the db service. |
| Static setup crashes | `backend/entrypoint.sh:13`; reproduced collectstatic dry run. | Entrypoint exits before serving requests. |
| Frontend missing from Compose | Only db/backend services; Vite proxy points at host loopback. | No single-command full stack; container proxy would target itself. |
| Migration drift | Dry-run check proposes user-manager and field-validator migrations. | Checked-in schema state does not fully describe current models. |
| Progress tests disagree with behavior | `backend/apps/learning/tests/test_api.py:93,149`. | Summary size and locked-week behavior need contract reconciliation. |
| Curriculum routes incomplete | `frontend/src/App.jsx`; `create_a11_modules.py`; A2.1 data. | Seeded A1.1 weeks 3–8 and A2.1 weeks 1–8 have no corresponding lesson routes in App. |

The MYSQL_USER restriction is documented in the [official image entrypoint](https://github.com/docker-library/mysql/blob/master/docker-entrypoint.sh). Static collection uses [Django STATIC_ROOT](https://docs.djangoproject.com/en/5.2/ref/contrib/staticfiles/).

## 2. Architecture fit

- Actual stack: React/Vite JavaScript frontend and Django/DRF backend. Preserve it for this task.
- Domain concepts: users and roles, teacher/student assignment, levels/modules, student level assignment, and per-module progression.
- Runtime corrections should be infrastructure-scoped. Frontend/API behavior changes require the existing contract to be reconciled first.
- Older instructions in `markdowns/README.md` describe legacy iframes and `/api/courses` routes that do not match the current implementation. A new root startup README is needed.

## 3. Security

- Database credentials are hardcoded in Compose and Django defaults; the current seed command also hardcodes demo passwords. Replace the local setup mechanism with ignored environment settings and explicit demo provisioning.
- `.env.vercel` is tracked and has nonempty SECRET_KEY/DB_PASSWORD settings. Values were not reproduced in this review; validity as remote credentials was not tested.
- Compose publishes database/backend ports on all host interfaces. Limit local app ports to loopback and leave MySQL internal.
- No Docker ignore file exists. `COPY backend /app` can include the SQLite database, its backup, and the virtual environment. The root context also includes unrelated frontend dependencies and repository metadata.
- This was a readiness inspection, not a complete authorization/security audit.

## 4. Performance

- Current frontend build succeeds: approximately 386 kB JavaScript / 117 kB gzip and 94 kB CSS / 15 kB gzip.
- The unfiltered backend build context includes a 79 MB virtual environment and potentially the 285 MB host frontend dependency tree. Add context exclusions before image builds.
- Entrypoint uses an unbounded TCP wait. Add a timeout and meaningful diagnostics.

## 5. Maintainability and verification

- All six frontend tests fail. `TeacherDashboard.integration.test.jsx:115` declares a nested vi.mock that is hoisted, forcing the error behavior across the suite. Several assertions still expect Spanish labels while the current UI uses English.
- Backend tests: four pass, two fail against disposable SQLite. This result does not establish MySQL compatibility.
- Existing working-tree modifications and untracked curriculum/migration files predate this review. They must be preserved.
- Tracked Python bytecode and the untracked SQLite backup make source hygiene noisy; broad cleanup is outside this runtime repair.
- Browser login, first-week lesson rendering and container recreation persistence were subsequently verified. Full exercise completion and all external learning media were not exhaustively tested.
