# Design and ADR: independent school stack

## Decision

Clone the deployed baseline to `/root/ENGLISH-AQUILINO-PEDRO-FORTOUL` without hardlinks. Use Compose project `aquilino-pedro-fortoul` and three dedicated services: database, API, static frontend. Only the frontend joins the existing gateway network; the database uses a private internal network. The API reaches its database and its frontend on separate networks and retains outbound access for TTS.

Keep existing API contracts and curriculum. Generate a unique Django/JWT signing key, MySQL root/application passwords and administrator password. Create only an administrator (`admin@aquilino-pedro-fortoul.local`, login identifier, not a delivery mailbox). Do not import any school data.

The shared gateway receives one additional exact-host virtual server, validated before graceful reload. Existing routes and containers remain in place. School frontend assets are independently built and served with Nginx, avoiding another Vite development process.

## Alternatives and consequences

- Shared MySQL with a dedicated schema saves memory but does not fulfill the requested independent database lifecycle; rejected for this installation.
- Dedicated MySQL provides separate volume, credentials, upgrades and backups. Bound its memory and connections because the VPS has 2 GB RAM.
- A separate VPS provides host-level isolation but requires new infrastructure outside the request. This deployment isolates application resources, not the physical host or root administrator.

Resource caps: MySQL 384 MB, API 192 MB, frontend 64 MB. Use existing local base images to avoid changing application dependencies during provisioning. Frontend dependencies are installed from its lockfile.

## Operations

Build and validate before publication. Seed only a fresh database. Check the new instance and existing routes, token isolation, persistent volumes and memory. Rollback removes the new virtual host and stops only this Compose project, preserving its volumes. Future deployments must target this checkout and Compose file explicitly. Never use `down -v` for a routine restart.
