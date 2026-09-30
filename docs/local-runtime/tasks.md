# Local runtime tasks

Status: Implemented and running locally; approved by owner follow-up on 2026-09-09.

## Completed diagnosis

- [x] Inspect architecture, Docker scaffolding, current working-tree changes, and database files.
- [x] Verify host Docker inventory and missing Compose/build plugins.
- [x] Run frontend production build, frontend tests, Django checks, migration drift check, and backend API tests against disposable SQLite.
- [x] Reproduce static collection failure without writing static files.
- [x] Record findings and draft requirements, design, and ordered tasks.

## Ordered implementation

1. [x] Owner authorized immediate container startup; official Compose and Buildx packages installed.
2. [x] Added failing regressions before static/import implementation. Verified startup timeout and account preservation through runtime checks.
3. [x] Add protected local configuration and build-context exclusions. Validate that secrets and database backups cannot enter images. (R8, R9)
4. [x] Correct MySQL account/environment settings, configure static collection and bounded startup, and review model-drift migrations and reverse SQL. (R7, R8)
5. [x] Add frontend image and environment-selectable Vite proxy; complete Compose dependency health and loopback bindings. (R1, R2)
6. [x] Install the approved official repository Docker plugins; build and boot the stack. Confirm actual MySQL authentication and migrations. (R1, R7)
7. [x] Back up SQLite, import into the empty MySQL database, and verify identities, hashes, relationships, modules, and progress. Do not automatically run the existing seed command. (R3–R5)
8. [x] Created the missing A1.1 demo student through the existing validated teacher API. Existing users retained; no automatic seeding added. (R6)
9. [x] Reconcile frontend test fixtures with current UI contracts. Isolate error mocks per test. Investigate the two progression test discrepancies without changing business rules merely to make tests green. (R10)
10. [x] Run build and regression checks, real MySQL integration tests, browser smoke flows, and restart/recreation persistence checks. Record failures or unverified flows precisely. (R1–R10)
11. [x] Write root README with purpose, stack, setup, structure, test commands, local startup, import, backups, stop/restart, and deployment limitations. Record the final URLs and service status.

## Baseline evidence

| Check | Result |
| --- | --- |
| `npm run build` in frontend | Passed; Vite and browser-data warnings. |
| `npm test -- --run` in frontend | 6 failed / 6; hoisted error mock and stale UI expectations. |
| Django `check` with existing virtualenv and SQLite engine | Passed. |
| Django `makemigrations --check --dry-run` | Failed; proposes accounts 0002 and learning 0003. No migration files generated. |
| Django `collectstatic --noinput --dry-run` | Failed; missing STATIC_ROOT. |
| Django `test apps.learning.tests` with disposable SQLite | 4 passed, 2 failed; 403 vs 200 for week progression, 8 vs 2 summary weeks. |
| `docker compose version` | Failed; Docker CLI does not have Compose installed. |
| Docker inventory | No English Platform containers or MySQL image present. |
| SQLite read-only inventory | 2 users, 3 levels, 24 modules, 1 progress record. |

## Final validation

- All three Compose services are healthy; frontend responds HTTP 200 at localhost:5173.
- Fresh npm installation inside the frontend image passes after aligning @vitest/ui and vitest to 4.1.5.
- Frontend build and all 6 integration tests pass inside the container.
- All 11 Django API/runtime tests pass against a disposable real MySQL database, which was removed by the test runner.
- Migration drift check passes. Generated manager/validator migrations have no-op SQL; forward and reverse validator SQL were reviewed.
- collectstatic passes. A simulated unavailable database produces a bounded startup failure before the server runs.
- Chromium successfully submitted the login form for all 3 accounts and rendered the teacher/student dashboards and both first-week lessons without unhandled exceptions.
- Imported user IDs, password hashes, roles, levels, modules, and teacher/student relationships matched the source fixture.
- All 36 application records remain after all three containers were recreated using the existing volume. The original SQLite checksum is unchanged. Live application activity can update timestamps after the snapshot.
- The three credentials also pass real HTTP login after recreation. CREDENCIALES_LOCAL.md, .env and .local-runtime are ignored by Git.
- Diff whitespace check passes for task-edited files. A whole-tree check still reports pre-existing trailing spaces in WeekProgressBar.jsx and TeacherDashboard.jsx; those unrelated edits were preserved.

Curriculum gaps listed in readiness.md remain outside the runtime scope. Production deployment and a complete accessibility/security audit remain unverified.
