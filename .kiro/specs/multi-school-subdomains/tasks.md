# Tasks: Multi-School Subdomain Architecture

- [x] **Task 1: Database Creation on VPS**
  - Connected to MySQL container on VPS and created `english_mfnovoa` database and granted privileges to `englishnow_app`.
  - Evidence: `SHOW DATABASES;` verified `english_mfnovoa` present.

- [x] **Task 2: Compose & Backend Provisioning for Manuel Fernández de Novoa**
  - Updated `docker-compose.prod.yml` to define `backend-mfnovoa` (`DB_NAME: english_mfnovoa`).
  - Configured Nginx reverse proxy gateway routing `manuel-fernandez-de-novoa.162.35.28.193.nip.io` to MF-Novoa backend and default requests to the demo.
  - Evidence: Compose started healthy with `english-platform-gateway-1` and `english-platform-backend-mfnovoa-1`.

- [x] **Task 3: Migrations & Curriculum Seeding for MF-Novoa**
  - Ran `python manage.py migrate` on `backend-mfnovoa`.
  - Ran `python manage.py seed_dba_curriculum` on `backend-mfnovoa`.
  - Evidence: 4 grades and 32 DBA units created in `english_mfnovoa`.

- [x] **Task 4: Provision Accounts for Manuel Fernández de Novoa**
  - Created Rector account: `rectoria@mfnovoa.edu.co` / `Novoa#2026`.
  - Created Docente 1 (Transición + 1°): `docente1@mfnovoa.edu.co` / `DocenteNovoa1*`.
  - Created Docente 2 (Jardín + 2°): `docente2@mfnovoa.edu.co` / `DocenteNovoa2*`.
  - Evidence: Token login tested successfully with `curl` for rector and teachers.

- [x] **Task 5: Verification & End-to-End Validation**
  - Verified `http://manuel-fernandez-de-novoa.162.35.28.193.nip.io` returns HTTP 200 OK.
  - Verified isolation: Default demo credentials rejected on MF-Novoa (401 Unauthorized).
  - Verified default demo at `http://162.35.28.193` remains operational.
  - Memory footprint: ~1.0 GB total used out of 1.9 GB (696 MB available).
