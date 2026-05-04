# Deploy en Vercel (Frontend + Django API)

Esta configuración mantiene las versiones actuales del proyecto:
- Django: según `backend/requirements.txt` (`Django>=5.0,<6.0`)
- Python: `3.13` (archivo `.python-version`)

## 1) Archivos de despliegue ya preparados

- `vercel.json`
- `api/index.py` (entrypoint WSGI de Django para Serverless Function)
- `requirements.txt` (raíz, referencia a `backend/requirements.txt`)
- `.python-version`

## 2) Variables de entorno en Vercel

Configura estas variables en el proyecto de Vercel:

- `SECRET_KEY`
- `DEBUG=0`
- `ALLOWED_HOSTS` (opcional; por defecto incluye `.vercel.app`)
- `CORS_ALLOWED_ORIGINS` (ejemplo: `https://tu-frontend.vercel.app`)
- `CSRF_TRUSTED_ORIGINS` (ejemplo: `https://tu-frontend.vercel.app`)

Base de datos (producción):
- `DB_ENGINE`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `DB_HOST`
- `DB_PORT`

Ejemplo para MySQL:
- `DB_ENGINE=django.db.backends.mysql`

## 3) Conectar repo y desplegar

1. Importa el repositorio en Vercel.
2. Framework preset: `Other`.
3. Vercel usará:
   - Build frontend: `cd frontend && npm ci && npm run build`
   - Output estático: `frontend/dist`
   - Backend API serverless: `api/index.py`

## 4) Rutas

- Frontend SPA: `/*` -> `index.html`
- Backend API Django: `/api/*` -> `api/index.py`

