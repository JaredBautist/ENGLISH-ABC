# Aquilino Duran — Pedro Fortoul deployment

Independent school installation of the existing React/Django application. Institutional UI changes are intentionally deferred to a later specification.

## Location and topology

- VPS checkout: `/root/ENGLISH-AQUILINO-PEDRO-FORTOUL`
- Branch: `school/aquilino-pedro-fortoul`
- Baseline: `4b8fbde9798d4e0a9b76407323966ce36517e5dc`
- URL: `http://aquilino-duran-pedro-fortoul.162.35.28.193.nip.io/login`
- Frontend: independently built React assets served by dedicated Nginx.
- Backend: dedicated Gunicorn/Django container with its own signing key.
- Database: dedicated MySQL container, internal network and persistent volume; no published database port.
- Shared infrastructure: physical VPS and public gateway only.

The source checkout was cloned locally without hardlinks. Its origin points to the original checkout for reference; do not pull or merge it as part of an unattended school deployment.

## Files

- `compose.yml`: bounded services, networks, volumes and health checks.
- `backend.Dockerfile`, `frontend.Dockerfile`: independent application images using the installed baseline base images.
- `frontend.conf`: static SPA and same-origin API proxy.
- `gateway.conf`: exact-host public route; installed as `aquilino-pedro-fortoul.conf` in the existing gateway configuration directory.
- `provision.py`: one-time secret preparation and fresh database seeding; verification prints no credentials.
- `.env`, `.bootstrap.json`: private generated configuration, never commit or publish.

The long institution hostname requires `server_names_hash_bucket_size 128`, declared once at HTTP scope in this virtual-host file. Validation passed before the gateway was gracefully reloaded.

## Operations

Run only from the school checkout:

```sh
cd /root/ENGLISH-AQUILINO-PEDRO-FORTOUL
docker compose --env-file deploy/aquilino-pedro-fortoul/.env -f deploy/aquilino-pedro-fortoul/compose.yml ps
docker compose --env-file deploy/aquilino-pedro-fortoul/.env -f deploy/aquilino-pedro-fortoul/compose.yml up -d --wait
python3 deploy/aquilino-pedro-fortoul/provision.py verify
```

After approved school changes, rebuild this project's images explicitly and restart only its services. Frontend builds run the existing Vitest suite. When the web container is recreated, validate and gracefully reload the shared gateway so its upstream DNS resolves the new container address. Recreating the API also requires reloading this school's frontend Nginx.

Never use `down -v` for routine operations. Database credentials and backups belong exclusively to this institution. Before schema changes, take a MySQL dump from `aqd-pf-db`; do not restore data from another institution.

## Rollback

Move only `/root/ENGLISH-ABC/deploy/nginx/conf.d/aquilino-pedro-fortoul.conf` outside the gateway `*.conf` directory, validate with `docker exec english-platform-gateway-1 nginx -t`, then reload it. Stop this project's services using its explicit Compose file. Preserve all volumes and private credentials for recovery.

## Credentials and transport

The school administrator login is in the local ignored `crendenciales colegios/CREDENCIALES_AQUILINO_DURAN_PEDRO_FORTOUL.md` file (0600). A private copy resides in the school VPS checkout. The generated administrator email is a login identifier, not an email inbox.

This installation follows the existing HTTP/nip.io routing. HTTPS is not configured; add TLS before using it for sensitive institutional data over public networks.
