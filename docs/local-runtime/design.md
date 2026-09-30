# Local runtime design

Status: Approved for local startup by owner follow-up on 2026-09-09.

## Implementation notes

The approved runtime is now implemented. Local host packages were installed from the official repository. Existing data was imported through a guarded command; the missing A1.1 demonstration account was provisioned through the existing teacher API. No reusable automatic demo seed command was introduced. The original SQLite file remains unchanged. @vitest/ui and vitest were aligned at 4.1.5 after npm ci exposed their incompatible versions.

## Existing architecture

The browser runs React 18 and Vite with JavaScript/JSX. Django REST Framework provides JWT authentication, role permissions, teacher/student management, levels, modules, and progression. Django models persist `User`, `Level`, `Module`, `TeacherStudent`, `StudentProfile`, and `StudentProgress`. Views, serializers, selectors, and services already divide responsibilities, although UI data orchestration remains in components.

Runtime work belongs in infrastructure. No new repository abstraction or CQRS bus is needed to configure containers; those patterns would add unrelated refactoring. Existing API response shapes and domain behavior remain the compatibility boundary.

## Proposed file organization

Keep runtime entry points at the repository root so startup is discoverable. Keep image definitions beside each application. Keep the specification trail in this directory rather than adding deployment instructions to the older curriculum markdowns.

```text
docker-compose.yml              # Three services, network, health checks, volume
.env.example                    # Documented local configuration without real secrets
.dockerignore                   # Protect root backend build context
README.md                       # Setup, URLs, data import, tests, stop/restart
frontend/Dockerfile              # Node runtime with lockfile-based installation
frontend/.dockerignore          # Protect frontend build context
frontend/vite.config.js          # Environment-selectable API proxy destination
backend/Dockerfile               # Django runtime and declared dependencies
backend/entrypoint.sh            # Bounded startup, migrations, static setup
backend/english_platform/settings.py # Static root and explicit runtime settings
backend/apps/*/migrations/       # Only reviewed current model drift
scripts/                        # Local configuration and guarded data-copy tools
docs/local-runtime/              # Requirements, design, tasks, readiness findings
```

## Runtime contract and sequence

1. Generate ignored local configuration with distinct random local secrets. Do not print passwords into logs. Use one authoritative environment source for matching MySQL and Django credentials.
2. Start MySQL with a named volume, dedicated application user, and health check. Preserve the existing MySQL 8.0 major version for this repair; upgrades require a separate compatibility review.
3. Django connects to `db:3306`, waits within a fixed timeout, applies migrations, collects static files into a configured `STATIC_ROOT`, and starts its development server.
4. Vite listens on `0.0.0.0:5173` inside its container; Compose publishes it at `127.0.0.1:5173`. Its `/api` proxy targets `http://backend:8000`. Host development retains `http://127.0.0.1:8000` as the default proxy target.
5. Publish Django at `127.0.0.1:8000` for API/admin inspection. Use an existing inexpensive HTTP endpoint for readiness, verifying the expected status rather than exposing private data.
6. Perform the SQLite import explicitly after schema setup and before interactive use. Never seed or import unconditionally during service startup.
7. Validate login, role-specific screens, an implemented A1.1 lesson, progress persistence, and restart behavior.

### Configuration interface

Required local secrets: `SECRET_KEY`, `MYSQL_ROOT_PASSWORD`, and the application database password. Database name and application user must match on both services. In Compose, `DB_ENGINE=django.db.backends.mysql`, `DB_HOST=db`, and `DB_PORT=3306`. `DEBUG=1` is restricted to local development. Add a server-side Vite proxy setting such as `API_PROXY_TARGET`; it contains no secret and is not embedded as client credentials.

### Data copy and migrations

Create a consistent SQLite backup through its backup API, then export application records to a private, ignored artifact. Import through Django serializers into a newly migrated, empty MySQL target. Include user group/permission associations if present, mapping built-in permission references by natural keys. Preserve password hashes rather than resetting users. Check target emptiness, import atomically, and compare relationships and values as well as row counts. Remove no source data. The recovery path for a failed attempt is the original SQLite database and retained backup; never use `down -v` as a routine stop command.

Generate only the observed user-manager and validator migration changes after approval. Review their generated SQL and reverse operations against MySQL before applying them. Do not assume that SQLite migration success proves MySQL compatibility. A live MySQL run must also verify the PyMySQL authentication dependency path.

### Security boundaries

This is a single local installation with existing user/teacher permissions, not a new multi-tenant design. Keep JWT and existing throttling contracts. Database access stays inside the Docker network; HTTP ports are loopback-only. Existing hardcoded demo credentials must not become the new setup mechanism. `.env.vercel` is currently tracked and contains nonempty secret-related settings; do not copy it into images or reproduce its values in documentation. Assess whether its credentials are real before separately deciding on rotation/history cleanup.

## ADR-001: Complete the existing Compose stack

**Context:** Docker scaffolding already chooses MySQL, but only backend and database are declared. SQLite currently holds local data.

| Rank | Option | Trade-off |
| --- | --- | --- |
| 1 | React/Vite + Django + MySQL in Compose | Consistent local startup; requires images and the missing Compose/build plugins. |
| 2 | Host Vite/Django with existing SQLite | Fastest temporary launch, but leaves the requested Docker setup unfinished. |
| 3 | Switch to PostgreSQL | Viable long-term database, but introduces an unnecessary engine migration beyond the existing scaffold. |

**Decision proposed:** Complete option 1 and copy current data safely. Preserve host SQLite as the rollback source.

**Consequences:** More initial downloads; predictable service addressing and persistent database storage. No host Python/Node dependency installation is needed for normal Docker use.

## ADR-002: Development servers for local use

**Context:** The owner requests local operation and continued development, not internet hosting.

**Considered:** Vite + Django development servers; alternatively a built frontend behind Nginx plus Gunicorn.

**Decision proposed:** Use the development servers in Compose with explicit internal binding and loopback host publishing. Keep source mounts deliberate and isolate container dependencies from host directories.

**Rejected for this scope:** Nginx and production asset serving add configuration that does not solve the immediate local development requirement.

**Consequences:** Fast feedback during development. This Compose configuration is not a production deployment contract.
