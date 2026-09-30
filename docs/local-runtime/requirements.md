# Local runtime requirements

Status: Approved for local startup by owner follow-up on 2026-09-09.

## Scope

Make the existing React/Vite + Django application runnable locally with Docker Compose and persistent MySQL, preserving the current UI, API contracts, working-tree edits, and existing SQLite data. This work does not complete the English curriculum or deploy to Vercel.

## Acceptance criteria

| ID | Requirement | Verification |
| --- | --- | --- |
| R1 | WHEN local configuration is initialized and `docker compose up --build -d` runs, the system SHALL start MySQL, Django, and the frontend with dependency health checks. | Fresh-stack startup; all services healthy. |
| R2 | WHEN a browser opens `http://localhost:5173`, the system SHALL serve the existing UI and forward `/api` to Django on the Compose network. | Browser login, teacher dashboard, student dashboard, available A1.1 lesson. |
| R3 | WHEN services restart or are recreated without volume deletion, the system SHALL preserve users, assignments, modules, and progress. | Compare records before and after restart/recreation. |
| R4 | WHEN importing the current SQLite database, the system SHALL preserve user password hashes, IDs, roles, assignments, module definitions, and progress in a new MySQL database, and SHALL leave the source file and backup unchanged. | Consistent backup, protected export, row counts and field comparison; source checksum. |
| R5 | WHEN the import target already contains application data, the import SHALL refuse to overwrite it. | Integration test against a populated disposable target. |
| R6 | WHEN a fresh demo setup is explicitly requested, the system SHALL create separate local demo identities with a beginner student assigned to A1.1; repeated setup SHALL preserve existing credentials, assignments, and progress. | Idempotency test; no automatic call to the current seed command. |
| R7 | WHEN the backend starts, the system SHALL apply reviewed migrations and complete static-file setup; database unavailability SHALL produce an actionable failure within a bounded wait. | Migration drift check, static collection, startup failure test. |
| R8 | WHEN the local stack runs, published application ports SHALL bind only to loopback, MySQL SHALL remain internal, and Django SHALL use a dedicated non-root database account. | Effective Compose configuration and authenticated connection check. |
| R9 | WHEN images build, secrets, SQLite files/backups, Git metadata, bytecode, virtual environments, and host node_modules SHALL be excluded from the build context. | Docker ignore review and image inspection. |
| R10 | WHEN readiness is reported, frontend build, relevant regression tests, real MySQL integration checks, browser smoke checks, and persistence checks SHALL have recorded outcomes. Unresolved failures SHALL be identified explicitly. | Evidence recorded in tasks and README. |

## Existing behavior to preserve

- Authentication uses email/password and JWT through `/api/auth/token/`, `/api/auth/token/refresh/`, and `/api/auth/me/`.
- Teacher workflows use `/api/teacher/*`; student progress uses `/api/students/me/*`.
- Existing users keep their assigned level. Starting from zero applies to new beginner demo users, not reassignment of existing learners.
- The beginner course currently exposes weeks 1–2; A1.2 exposes weeks 1–8; A2.1 has an overview with unfinished lesson routes.
- Existing progression failures require contract reconciliation before changing thresholds, summary semantics, or permission rules.

## Dependencies and approval scope

Proposed host packages: `docker-compose` and `docker-buildx` from the official Arch `extra` repository. No AUR packages. Python and Node dependency installation occurs inside project images, not in the host environment. Image downloads and their disk use are part of the proposed runtime setup.

Implementation approval covers the runtime configuration, safe data-copy tooling, startup regressions, and documentation described here. It does not cover deleting databases, rewriting unrelated UI, completing lessons, rotating remote credentials, or publishing changes.
