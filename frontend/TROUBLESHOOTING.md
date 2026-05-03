# 🔧 Troubleshooting - Frontend No Se Ve

## ✅ Solución Rápida

### Paso 1: Verificar que el Build Funciona

```bash
cd frontend
npm run build
```

**Resultado esperado:**
```
✓ built in 1.45s
```

Si ves errores, cópialos y compártelos.

### Paso 2: Iniciar el Servidor

```bash
npm run dev
```

**Resultado esperado:**
```
VITE v8.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Paso 3: Abrir en el Navegador

```
http://localhost:5173
```

---

## 🐛 Si Aún No Se Ve Nada

### Opción 1: Usar el Dashboard Antiguo

Si el nuevo dashboard tiene problemas, puedes volver al antiguo:

1. Abre `frontend/src/components/UnifiedDashboard.jsx`
2. Busca la línea:
   ```javascript
   const [useNewDashboard, setUseNewDashboard] = useState(true);
   ```
3. Cámbiala a:
   ```javascript
   const [useNewDashboard, setUseNewDashboard] = useState(false);
   ```
4. Guarda y recarga el navegador

### Opción 2: Ver Errores en la Consola

1. Abre el navegador
2. Presiona `F12` para abrir DevTools
3. Ve a la pestaña **Console**
4. Busca errores en rojo
5. Copia y pega los errores

**Errores comunes:**

#### Error: "Cannot read property 'map' of undefined"
```javascript
TypeError: Cannot read property 'map' of undefined
  at WeekDashboard (WeekDashboard.jsx:95)
```

**Causa:** El API no está respondiendo o no hay datos

**Solución:**
```bash
# Verificar que el backend esté corriendo
cd backend
python manage.py runserver
```

#### Error: "Failed to fetch"
```javascript
TypeError: Failed to fetch
  at apiFetch (api.js:10)
```

**Causa:** El backend no está corriendo o hay un problema de CORS

**Solución:**
1. Verificar que el backend esté en `http://localhost:8000`
2. Verificar que el token de autenticación sea válido
3. Verificar CORS en `backend/english_platform/settings.py`

#### Error: "Module not found"
```javascript
Error: Cannot find module './WeekDashboard'
```

**Causa:** Archivo no existe o ruta incorrecta

**Solución:**
```bash
# Verificar que el archivo existe
ls frontend/src/components/WeekDashboard.jsx
```

### Opción 3: Limpiar y Reinstalar

```bash
cd frontend

# Limpiar caché
rm -rf node_modules
rm -rf dist
rm package-lock.json

# Reinstalar
npm install

# Intentar de nuevo
npm run dev
```

### Opción 4: Verificar Dependencias

```bash
cd frontend
npm list lucide-react
npm list clsx
```

Si falta alguna:
```bash
npm install lucide-react clsx
```

---

## 📋 Checklist de Verificación

- [ ] Backend está corriendo (`python manage.py runserver`)
- [ ] Frontend está corriendo (`npm run dev`)
- [ ] No hay errores en la consola del navegador (F12)
- [ ] El token de autenticación es válido
- [ ] Los módulos están creados en el backend
- [ ] El estudiante tiene asignado un nivel

---

## 🔍 Comandos de Diagnóstico

### Verificar Backend:
```bash
cd backend
python check_progress_setup.py
```

### Verificar Frontend:
```bash
cd frontend
npm run build
```

### Verificar Importaciones:
```bash
cd frontend
node check_imports.js
```

---

## 📸 Qué Deberías Ver

### Dashboard Nuevo (useNewDashboard = true):
```
┌─────────────────────────────────────────────────────────┐
│  🏆 Your Progress              [0% Complete]            │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  🔵 🔒 🔒 🔒 🔒 🔒 🔒 🔒                                │
│  W1  W2  W3  W4  W5  W6  W7  W8                         │
└─────────────────────────────────────────────────────────┘

📚 Your Weeks

┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ Week 1   │ │ Week 2   │ │ Week 3   │ │ Week 4   │
│   0%     │ │ Locked 🔒│ │ Locked 🔒│ │ Locked 🔒│
│ [Start]  │ │          │ │          │ │          │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
```

### Dashboard Antiguo (useNewDashboard = false):
```
HTML legacy con lista de semanas
```

---

## 🆘 Si Nada Funciona

Comparte esta información:

1. **Errores de la consola del navegador** (F12 → Console)
2. **Errores del build** (`npm run build`)
3. **Estado del backend** (`python check_progress_setup.py`)
4. **Versión de Node**: `node --version`
5. **Sistema operativo**: Windows/Mac/Linux

---

**Última actualización:** 2026-04-30
