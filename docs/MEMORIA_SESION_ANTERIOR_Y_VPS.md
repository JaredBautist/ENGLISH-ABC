# 🧠 Memoria Completa de la Sesión Anterior y Despliegue en VPS

Este documento recopila de forma íntegra, exhaustiva y permanente toda la información, decisiones arquitectónicas, tareas realizadas, credenciales y configuraciones ejecutadas durante la sesión de trabajo previa (`ec246f07-6639-4acb-bb90-5576f7a15b0d`) del **1 de octubre de 2026**.

---

## 📌 1. Resumen Ejecutivo de la Sesión

Durante la sesión se realizaron importantes mejoras de calidad, pedagogía, rendimiento y despliegue del proyecto **English From Scratch (Colombia 🇨🇴)**:

1. **Lectura de Voces Naturales Infantil (TTS):** Reemplazo de la voz robótica por Google TTS con streaming de audio en backend (`/api/tts/`), caché local en disco por hash MD5 y reproducción fluida en frontend.
2. **Generación del Grafo de Arquitectura (Graphify):** Creación e indexación del grafo con 2,741 nodos, 3,003 conexiones y 219 comunidades.
3. **Saneamiento de Videos de YouTube:** Sustitución de enlaces caídos por canales infantiles educativos oficiales alineados por grado y tema.
4. **Laboratorio de Listening & Writing:** Adición de ejercicios de escucha con pronunciación nativa y talleres de escritura guiada y libre con validación interactiva.
5. **Optimización Extrema de Rendimiento:** Enrutamiento SPA con `React.lazy`, code splitting por ruta, precarga paralela de fuentes (`display=swap`) y eliminación del filtro SVG `feTurbulence` para lograr scroll a 60 FPS y carga inicial instantánea.
6. **Funcionalidad "Recordarme":** Persistencia inteligente del correo en `localStorage` en la pantalla de Login.
7. **Ilustraciones Pedagógicas Offline (OpenMoji):** Descarga e integración de 162 archivos SVG vectoriales locales en `frontend/public/openmoji/` para visualización offline en colegios.
8. **README.md Comercial:** Rediseño completo con insignias, tablas y formato visual de alto impacto.
9. **Despliegue en Servidor VPS (InterServer):** Puesta en producción en un servidor KVM accesible públicamente con Docker Compose en el puerto web estándar 80.

---

## 🛠️ 2. Módulos Técnicos Implementados en la Sesión

### A. Módulo de Audio TTS Natural
* **Backend:** Vista `TTSView` en [`backend/apps/learning/views.py`](file:///home/balckyshadown/Escritorio/English%20Platform/backend/apps/learning/views.py) mapeada en `/api/tts/`.
  * Parámetros: `text` (máx. 300 caracteres) y `lang` (por defecto `en`).
  * Caché de audio: Los archivos `.mp3` generados se guardan en `.tts_cache/` calculados con hash MD5 del texto normalizado, evitando llamadas redundantes a la API externa.
* **Frontend:** Refactorización de [`frontend/src/shared/utils/friendlySpeech.js`](file:///home/balckyshadown/Escritorio/English%20Platform/frontend/src/shared/utils/friendlySpeech.js) para reproducir el audio vía `new Audio('/api/tts/?text=...')`.
  * Soporte de parada inmediata `stopFriendlySpeech()`.
  * Fallback automático a `window.speechSynthesis` si no hay conexión de red.

### B. Módulo de Videos Educativos (YouTube)
* **Problema:** Múltiples videos incrustados arrojaban error de "Video no disponible" o restricciones de inserción.
* **Solución:** Script [`scripts/fix_youtube_videos.js`](file:///home/balckyshadown/Escritorio/English%20Platform/scripts/fix_youtube_videos.js) que validó e insertó IDs oficiales de canales educativos reconocidos (Super Simple Songs, Cocomelon, The Singing Walrus, British Council Kids, Pinkfong, etc.) clasificados temáticamente por grado.

### C. Módulo de Materiales Didácticos (Listening y Writing)
* **Rutas independientes:**
  * `/docente/videos`: Videoteca organizada por grado.
  * `/docente/listening`: Ejercicios con audio TTS, opción múltiple y ordenamiento de secuencias temporales.
  * `/docente/writing`: Escritura guiada con banco de fichas de palabras y área de escritura libre con contador de palabras y retroalimentación interactiva.
* **Banco de datos:** Centralizado en [`frontend/src/data/material.js`](file:///home/balckyshadown/Escritorio/English%20Platform/frontend/src/data/material.js).

### D. Optimización de Carga y Navegación SPA
* **Especificación:** [`.kiro/specs/performance-loading-navigation/`](file:///home/balckyshadown/Escritorio/English%20Platform/.kiro/specs/performance-loading-navigation/).
* **Rehidratación Optimista:** En [`AuthContext.jsx`](file:///home/balckyshadown/Escritorio/English%20Platform/frontend/src/context/AuthContext.jsx) se recupera inmediatamente la sesión desde `localStorage` sin bloquear la renderización con spinners innecesarios.
* **Code Splitting:** Rutas pesadas cargadas dinámicamente con `React.lazy` (`AdminPanel`, `TeacherWorkspace`, `MaterialPages`, `DBADeck`, `LoginPage`).
* **Optimización Gráfica:** Se eliminó el filtro `<filter id="roughpaper"><feTurbulence...></filter>` de `index.css` que forzaba re-rasterización continua en el render tree. El fondo ahora usa capas aisladas de composición (`will-change: transform`).
* **Fuentes:** Se reemplazó el `@import` bloqueante de Google Fonts por `<link rel="preload">` y `<link rel="stylesheet">` con `display=swap` en [`index.html`](file:///home/balckyshadown/Escritorio/English%20Platform/frontend/index.html).

### E. Sistema "Recordar Correo"
* En [`frontend/src/features/auth/components/LoginForm.jsx`](file:///home/balckyshadown/Escritorio/English%20Platform/frontend/src/features/auth/components/LoginForm.jsx):
  * Checkbox "Recordarme".
  * Al marcarlo y hacer login, guarda la clave `remembered_email` en `localStorage`.
  * Si se desmarca, se elimina automáticamente.
  * Al cargar la pantalla de login, rellena el campo automáticamente si existe.

### F. Ilustraciones Vectoriales Offline (OpenMoji)
* Se integraron **162 ilustraciones OpenMoji en formato SVG** en `frontend/public/openmoji/`.
* Se ejecutó el script [`scripts/update_unit_slides.js`](file:///home/balckyshadown/Escritorio/English%20Platform/scripts/update_unit_slides.js) para enlazar cada palabra del vocabulario de las 32 unidades DBA con su respectivo emoji vectorial de alta resolución, garantizando funcionamiento 100% offline.

---

## 🌐 3. Configuración y Despliegue del VPS en Producción

### Datos de Conexión del Servidor
* **Proveedor:** InterServer (KVM VPS).
* **Dirección IP Pública:** `162.35.28.193`
* **Hostname:** `vps3674010.trouble-free.net`
* **Usuario de acceso:** `root`
* **Contraseña original:** `$UuSg!7E`
* **Acceso SSH configurado:** Llave pública local `~/.ssh/id_ed25519.pub` añadida en `/root/.ssh/authorized_keys` del VPS.
  * Comando directo:
    ```bash
    ssh root@162.35.28.193
    ```

### Estructura en el Servidor
* **Ruta de la aplicación:** `/root/ENGLISH-ABC`
* **Origen de código:** Repositorio GitHub `https://github.com/JaredBautist/ENGLISH-ABC.git` (rama `main`).
* **Archivo de orquestación:** `docker-compose.prod.yml` (enlace en el VPS: `docker-compose.yml`).

### Puertos y Red en el VPS
* **Frontend (React/Vite):** Expuesto en el puerto web estándar **`80`** (`0.0.0.0:80->5173`) y puerto auxiliar `5173`.
* **Backend (Django):** Puerto interno `8000`. Configurado con:
  ```env
  ALLOWED_HOSTS: localhost,127.0.0.1,backend,162.35.28.193,vps3674010.trouble-free.net,*
  ```
* **Base de Datos (MySQL 8.0):** Puerto interno `3306` con volumen persistente `db_data`.

### Cuentas Activas Configuradas en el VPS

| Rol | Correo Electrónico | Contraseña | Panel / Grados Asignados |
| :--- | :--- | :--- | :--- |
| **Super Administrador** | `admin@colegio.edu.co` | `Admin#2026` | `http://162.35.28.193/admin` (Métricas institucionales y gestión docente) |
| **Docente (1° Primaria)** | `dylanjared@gmail.com` | `teacher123` | `http://162.35.28.193/docente` (1° de Primaria) |
| **Docente (Preescolar)** | `docente1@colegio.edu.co` | `Docente1234*` | `http://162.35.28.193/docente` (Jardín y Transición) |
| **Docente (2° Primaria)** | `docente2@colegio.edu.co` | `Docente1234*` | `http://162.35.28.193/docente` (2° de Primaria) |

### Enlaces Públicos de Demostración
* **Web App Principal:** [http://162.35.28.193](http://162.35.28.193)
* **Login Directo:** [http://162.35.28.193/login](http://162.35.28.193/login)
* **Panel de Administración:** [http://162.35.28.193/admin](http://162.35.28.193/admin)
* **Panel Docente:** [http://162.35.28.193/docente](http://162.35.28.193/docente)

---

## 📋 4. Comandos de Actualización y Mantenimiento del VPS

Cuando realices cambios locales y hagas `git push origin main`, aplica la actualización en el servidor con estos pasos:

```bash
# 1. Ingresar al servidor
ssh root@162.35.28.193

# 2. Ir a la carpeta del proyecto
cd /root/ENGLISH-ABC

# 3. Descargar los últimos cambios
git pull origin main

# 4. Reconstruir los contenedores con los nuevos cambios
docker compose up -d --build

# 5. Ejecutar migraciones si se cambiaron modelos
docker compose exec -T backend python manage.py migrate

# 6. Verificar el estado de los contenedores
docker compose ps
```
