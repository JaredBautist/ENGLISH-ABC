# Design: Multi-School Subdomain Architecture

## Architecture Overview

```
                                      Internet
                                         │
                                         ▼
                     [ 162.35.28.193 / *.162.35.28.193.nip.io ]
                                         │
                                         ▼
                            Nginx Gateway Proxy (Port 80)
                                         │
        ┌────────────────────────────────┴────────────────────────────────┐
        ▼ (Host: manuel-fernandez-de-novoa...)                            ▼ (Host: 162.35.28.193 / default)
   Frontend MF-Novoa                                              Frontend Default Demo
   (Port 5174 or static dist)                                     (Port 5173)
        │                                                                 │
        ▼ (/api/*)                                                        ▼ (/api/*)
   Backend MF-Novoa                                               Backend Default Demo
   (Django on :8001)                                              (Django on :8000)
        │                                                                 │
        └────────────────────────────────┬────────────────────────────────┘
                                         ▼
                        Shared MySQL 8.0 Server (:3306)
                        ├── Database: englishnow (Demo)
                        └── Database: english_mfnovoa (Manuel Fernández de Novoa)
```

## ADR: Database-per-Tenant vs Shared Schema

* **Context:** We need to provide pilot instances for schools (such as Manuel Fernández de Novoa) without risk of data cross-contamination or admin visibility of other schools.
* **Decision:** We use **Database-per-Tenant** hosted on a **Single Shared MySQL Instance**.
* **Rationale:**
  1. *Security & Privacy:* Zero risk of query leaks between institutions without having to alter existing Django ORM queries or models.
  2. *Low Resource Consumption:* MySQL supports hundreds of distinct databases within one engine without overhead. Memory usage is bounded to the existing ~420MB.
  3. *Ease of Lifecycle:* When a 30-day pilot concludes, the school's database can be dumped, backed up, or purged with a single SQL command (`DROP DATABASE english_mfnovoa`).

## Routing & Nginx Configuration

Nginx will inspect the `$host` variable:
* `manuel-fernandez-de-novoa.162.35.28.193.nip.io`:
  - Static frontend assets -> served from built dist or frontend proxy.
  - `/api/` -> proxy pass to `http://backend-mfnovoa:8000`.
* Default server (`162.35.28.193`):
  - Retains existing configuration pointing to `frontend:5173` and `backend:8000`.
