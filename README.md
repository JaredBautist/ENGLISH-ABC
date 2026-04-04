# English Platform (React + NestJS)

Migracion de la plataforma HTML original a arquitectura fullstack:

- Frontend: React + Vite
- Backend: NestJS
- Contenido: HTML legacy embebido para preservar estilo, colores, animaciones e interactividad original

## Estructura

- `frontend/`: plataforma React, rutas y visor de modulos
- `backend/`: API de cursos y modulos
- `frontend/public/legacy/`: copia de los HTML originales (A1.1 y A1.2)
- `inglesA1/` y `inglesA1.2/`: fuente original del contenido

## Endpoints backend

- `GET /api/courses`
- `GET /api/courses/:courseId`
- `GET /api/courses/:courseId/modules/:moduleId`

## Ejecutar local

### 1) Backend

```bash
cd backend
npm install
npm run start:dev
```

### 2) Frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

La plataforma quedara en `http://localhost:5173`.

## Como se conserva la esencia original

- Cada modulo usa el HTML original en un `iframe` desde `public/legacy`.
- No se alteran CSS ni scripts internos de esas paginas.
- El shell React agrega navegacion, catalogo de cursos y estado de progreso sin tocar la experiencia original de cada slide.
