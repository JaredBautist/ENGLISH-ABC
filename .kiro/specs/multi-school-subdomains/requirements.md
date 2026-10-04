# Requirements: Multi-School Subdomain Architecture

## Purpose
Provide isolated, multi-tenant instances per school on the VPS using dedicated subdomains (starting with `manuel-fernandez-de-novoa.162.35.28.193.nip.io`) and separate databases, ensuring complete data privacy between institutions while preserving server stability on a 2GB RAM KVM VPS.

## Scope
- Configuration of dedicated MySQL database (`english_mfnovoa`) on the existing MySQL 8.0 container.
- Deployment of a dedicated backend container (`backend-mfnovoa`) configured with isolated database credentials and school settings.
- Integration of an Nginx reverse proxy gateway on port 80 routing incoming requests based on the `Host` header:
  - `manuel-fernandez-de-novoa.162.35.28.193.nip.io` -> Routes to Manuel Fernández de Novoa instance.
  - `162.35.28.193` (and default/fallback) -> Routes to the original default demo instance.
- Automatic curriculum seeding (32 DBA units) and initial account provisioning for Manuel Fernández de Novoa (Rector / Superadmin & Teachers).

## Acceptance Criteria

1. **AC-1 (Zero-Cost DNS Resolution):**
   - WHEN any client requests `http://manuel-fernandez-de-novoa.162.35.28.193.nip.io`,
   - THEN the DNS query SHALL resolve to `162.35.28.193` without requiring custom domain registration or third-party DNS management.

2. **AC-2 (Data & Tenant Isolation):**
   - WHEN an administrator or teacher logs into `manuel-fernandez-de-novoa.162.35.28.193.nip.io`,
   - THEN all authentication tokens, progress, and teacher assignments SHALL be queried strictly from `english_mfnovoa` with zero access or leakage to/from other schools.

3. **AC-3 (Single Database Engine Re-use):**
   - WHILE provisioning new school tenants,
   - THEN the platform SHALL reuse the existing running MySQL container instance, avoiding spawning additional database processes that risk Out-Of-Memory (OOM) kills on the 2GB VPS.

4. **AC-4 (Seamless Coexistence with Root Demo):**
   - WHEN accessing the root IP `http://162.35.28.193`,
   - THEN the original demo platform SHALL remain fully operational with its existing demo accounts and progress intact.

5. **AC-5 (Curriculum Readiness):**
   - WHEN the Manuel Fernández de Novoa tenant is created,
   - THEN all 32 DBA units (Jardín to 2° Primaria) SHALL be pre-seeded and accessible immediately to teachers upon initial login.
