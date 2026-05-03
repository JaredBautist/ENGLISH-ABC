# 🚀 Inicio Rápido - Sistema de Progreso

**¿Quieres probar el sistema rápidamente?** Sigue estos pasos.

---

## ⚡ 3 Pasos para Probar

### 1️⃣ Verificar Sistema (30 segundos)

**Windows:**
```bash
VERIFICAR_SISTEMA.bat
```

**Linux/Mac:**
```bash
chmod +x VERIFICAR_SISTEMA.sh
./VERIFICAR_SISTEMA.sh
```

Deberías ver:
```
✓ WeekProgressBar.jsx existe
✓ Toast.jsx existe
✓ UnifiedDashboard.jsx existe
✓ A12WeekDeck.jsx existe
✓ ToastContainer importado en App.jsx
✓ Módulos verificados correctamente
```

---

### 2️⃣ Iniciar Servicios (1 minuto)

**Terminal 1 - Backend:**
```bash
cd backend
python manage.py runserver
```

Espera a ver:
```
Starting development server at http://127.0.0.1:8000/
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Espera a ver:
```
VITE ready in XXX ms
Local: http://localhost:5173/
```

---

### 3️⃣ Probar en el Navegador (2 minutos)

1. **Abrir navegador:**
   - Chrome, Edge, o Firefox
   - Presiona **F12** (abrir DevTools)
   - Ve a la pestaña **Console**

2. **Iniciar sesión:**
   ```
   http://localhost:5173/login
   ```
   - Usuario: `monica` (o cualquier estudiante)
   - Contraseña: (tu contraseña)

3. **Ver dashboard:**
   ```
   http://localhost:5173/a1-2
   ```
   
   **Deberías ver:**
   - ✅ Barra de progreso arriba
   - ✅ Dashboard original abajo
   - ✅ Week 1 desbloqueada (círculo azul)

4. **Entrar a Week 1:**
   - Click en el link de Week 1
   - URL cambia a: `/a1-2/week-1`
   
   **En la consola (F12) deberías ver:**
   ```javascript
   [Progress] Week 1 - Slide 1/20 - 5%
   [Progress] Saving: Week 1 - 5%
   [Progress] Saved successfully: {...}
   ```

5. **Navegar diapositivas:**
   - Click en "Siguiente →"
   - Completa ejercicios
   - Observa notificaciones toast
   - Observa logs en consola

6. **Verificar desbloqueo:**
   - Navega hasta llegar al 80%
   - Verás: "🔓 Week 2 unlocked!"
   - Vuelve al dashboard
   - Week 2 ahora está desbloqueada

---

## ✅ ¿Qué Deberías Ver?

### Dashboard:
```
┌─────────────────────────────────────────┐
│  🏆 Your Progress      [0% Complete]    │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  🔵 🔒 🔒 🔒 🔒 🔒 🔒 🔒              │
│  W1  W2  W3  W4  W5  W6  W7  W8         │
└─────────────────────────────────────────┘

[Dashboard Original - Actividades, etc.]
```

### Consola (F12):
```javascript
[Progress] Week 1 - Slide 1/20 - 5%
[Progress] Exercises: 0/5
[Progress] Saving: Week 1 - 5%
[Progress] Saved successfully: {...}
```

### Notificaciones:
```
┌─────────────────────────────────┐
│  ✓  📊 Progress saved: 25%  [X] │
└─────────────────────────────────┘
```

---

## ❌ ¿Algo No Funciona?

### "No veo la barra de progreso"

**Verifica:**
- ¿Estás en `/a1-2`? (no en `/a1-2/week-1`)
- ¿El backend está corriendo?
- ¿Hay errores en la consola (F12)?

**Solución rápida:**
```bash
# Recarga la página
Ctrl + R

# O limpia caché
Ctrl + Shift + R
```

---

### "No aparecen logs en la consola"

**Verifica:**
- ¿Estás en `/a1-2/week-1`? (no en el dashboard)
- ¿La consola está en la pestaña "Console"?
- ¿Hay errores en rojo?

**Solución rápida:**
```bash
# Recarga la página
Ctrl + R

# Limpia la consola
Click en el icono 🚫
```

---

### "La barra no avanza"

**Verifica en la consola (F12):**
```javascript
// Deberías ver:
[Progress] Week 1 - Slide 5/20 - 25%
[Progress] Saving: Week 1 - 25%
[Progress] Saved successfully: {...}

// Si ves errores:
Error saving week progress: {...}
```

**Solución rápida:**
```bash
# Verifica que el backend esté corriendo
cd backend
python manage.py runserver

# Verifica que los módulos existan
python check_progress_setup.py
```

---

### "Week 2 no se desbloquea"

**Verifica:**
- Week 1 debe estar al **80% o más**
- Vuelve al dashboard
- Espera 5 segundos (la barra se actualiza automáticamente)

**Solución rápida:**
```bash
# Verifica el progreso en el backend
cd backend
python -c "
import os, django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'english_platform.settings')
django.setup()
from django.contrib.auth import get_user_model
from apps.learning.selectors import get_student_progress_summary
User = get_user_model()
student = User.objects.filter(username='monica').first()
summary = get_student_progress_summary(student)
for w in summary['weeks']:
    print(f'Week {w[\"week_number\"]}: {w[\"completion_percent\"]}% - Unlocked: {w[\"unlocked\"]}')
"
```

---

## 📚 Más Información

Si necesitas más detalles, lee:

- **RESUMEN_PARA_USUARIO.md** - Resumen completo
- **ESTADO_ACTUAL_SISTEMA.md** - Estado detallado
- **GUIA_VISUAL.md** - Capturas visuales
- **INSTRUCCIONES_PRUEBA_PROGRESO.md** - Instrucciones detalladas

---

## 🎯 Checklist Rápido

- [ ] Script de verificación ejecutado ✓
- [ ] Backend corriendo en puerto 8000
- [ ] Frontend corriendo en puerto 5173
- [ ] Navegador abierto con DevTools (F12)
- [ ] Iniciado sesión como estudiante
- [ ] Dashboard muestra barra de progreso
- [ ] Logs aparecen en consola al navegar
- [ ] Notificaciones toast aparecen
- [ ] Week 2 se desbloquea al 80%

---

## 🎉 ¡Listo!

Si todos los pasos funcionan:
- ✅ El sistema está funcionando correctamente
- ✅ Puedes empezar a usar la plataforma
- ✅ El progreso se guarda automáticamente

Si algo no funciona:
- 📖 Lee la documentación detallada
- 🐛 Comparte los logs de la consola
- 📸 Toma capturas de pantalla

---

**¡Disfruta tu plataforma de aprendizaje de inglés con gamificación!** 🚀
