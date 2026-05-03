# 🧪 Instrucciones para Probar el Sistema de Progreso

## ✅ Cambios Realizados

### 1. **Logs de Debug Agregados**
- El componente `A12WeekDeck` ahora muestra logs en la consola del navegador
- Puedes ver exactamente qué está pasando con el progreso

### 2. **Nuevo Dashboard con Botones**
- Creado `WeekDashboard.jsx` con:
  - Barra de progreso visual
  - Tarjetas para cada semana
  - Botón "Start/Continue" para entrar a la semana
  - Botón "Mark as Complete" (solo aparece al 80%+)
  - Los botones están FUERA de las diapositivas

### 3. **Backend Verificado**
- Los módulos están creados ✅
- El API funciona correctamente ✅
- La lógica de desbloqueo funciona ✅

---

## 🔍 Cómo Probar

### Paso 1: Abrir la Consola del Navegador

1. Abre tu navegador (Chrome/Edge/Firefox)
2. Presiona `F12` para abrir DevTools
3. Ve a la pestaña **Console**
4. Deja la consola abierta mientras pruebas

### Paso 2: Iniciar Sesión

```
http://localhost:5173/login
```

Usa las credenciales de un estudiante (ej: `monica`)

### Paso 3: Ver el Nuevo Dashboard

```
http://localhost:5173/a1-2
```

Deberías ver:
- Barra de progreso en la parte superior
- 8 tarjetas (una por semana)
- Week 1 desbloqueada (botón azul "Start")
- Week 2-8 bloqueadas (botón gris "Locked")

### Paso 4: Entrar a Week 1

1. Click en el botón **"Start"** de Week 1
2. Navega por las diapositivas
3. **Observa la consola del navegador**:

```
[Progress] Week 1 - Slide 1/20 - 5%
[Progress] Exercises: 0/5
[Progress] Saving: Week 1 - 5%
[Progress] Saved successfully: {...}
```

### Paso 5: Completar Diapositivas

1. Avanza por las diapositivas usando "Siguiente →"
2. Completa los ejercicios (choice/fill)
3. Observa cómo el progreso aumenta en la consola
4. Verás notificaciones toast:
   - "📊 Progress saved: 25%"
   - "📊 Progress saved: 50%"
   - "📊 Progress saved: 75%"

### Paso 6: Llegar al 80%

Cuando llegues al 80%:
1. Verás: "🔓 Week 2 unlocked! Keep going!"
2. Vuelve al dashboard: Click en "🏠 Volver al dashboard"
3. **Week 2 ahora debería estar desbloqueada** (botón azul)

### Paso 7: Completar Week 1

Opción A: **Desde las diapositivas**
- Completa todas las diapositivas hasta el final
- El progreso llegará a 95-100%

Opción B: **Desde el dashboard** (NUEVO)
- Vuelve al dashboard
- Si Week 1 está al 80%+, verás el botón **"Mark as Complete"**
- Click en ese botón
- Week 1 se marcará como 100% completada
- Verás: "🎉 Week 1 completed! 100%"

---

## 🐛 Qué Verificar en la Consola

### Logs Normales (Todo Funciona):

```
[Progress] Week 1 - Slide 5/20 - 25%
[Progress] Exercises: 2/5
[Progress] Saving: Week 1 - 25%
[Progress] Saved successfully: {id: 1, module: {...}, completion_percent: "25.00", ...}
```

### Errores Comunes:

#### Error 1: "Failed to save progress"
```
[Progress] Saving: Week 1 - 50%
Error saving week progress: {...}
Failed to save progress. Please try again.
```

**Causa:** El backend no está corriendo o hay un error de autenticación

**Solución:**
```bash
# Verificar que el backend esté corriendo
cd backend
python manage.py runserver

# Verificar en otra terminal
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:8000/api/students/me/progress-summary/
```

#### Error 2: "Module not available for this student"
```
Error saving week progress: {detail: "Module not available for this student"}
```

**Causa:** El estudiante no tiene asignado el nivel A1.2

**Solución:**
```bash
cd backend
python test_progress_api.py
# Esto asignará automáticamente el nivel
```

#### Error 3: No aparecen logs
```
(Consola vacía, sin logs)
```

**Causa:** El componente no se está usando o hay un error de JavaScript

**Solución:**
1. Verifica que estés en `/a1-2/week-1`
2. Recarga la página (Ctrl+R)
3. Busca errores en rojo en la consola

---

## 📊 Verificar en el Backend

### Ver el progreso guardado:

```bash
cd backend
python -c "
import os, django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'english_platform.settings')
django.setup()
from django.contrib.auth import get_user_model
from apps.learning.selectors import get_student_progress_summary
User = get_user_model()
student = User.objects.filter(role=User.Role.STUDENT).first()
summary = get_student_progress_summary(student)
print(f'Overall: {summary[\"overall_percent\"]}%')
for w in summary['weeks']:
    status = '🔓' if w['unlocked'] else '🔒'
    print(f'Week {w[\"week_number\"]}: {w[\"completion_percent\"]}% {status}')
"
```

---

## 🎯 Checklist de Prueba

- [ ] Abrir consola del navegador (F12)
- [ ] Iniciar sesión como estudiante
- [ ] Ver el dashboard con 8 tarjetas
- [ ] Week 1 está desbloqueada
- [ ] Click en "Start" de Week 1
- [ ] Ver logs en la consola al navegar
- [ ] Ver notificaciones toast al avanzar
- [ ] Llegar al 80% y ver "Week 2 unlocked"
- [ ] Volver al dashboard
- [ ] Week 2 ahora está desbloqueada
- [ ] Ver botón "Mark as Complete" en Week 1
- [ ] Click en "Mark as Complete"
- [ ] Week 1 muestra 100% y checkmark verde
- [ ] Week 2 se puede iniciar

---

## 🔧 Si Algo No Funciona

### 1. Verificar Backend
```bash
cd backend
python test_progress_api.py
```

Debe mostrar:
```
✓ Progress saved: Week 1 - 75%
✓ Summary retrieved
```

### 2. Verificar Frontend
```bash
cd frontend
npm run dev
```

Debe iniciar en `http://localhost:5173`

### 3. Limpiar Caché
```bash
# En el navegador
Ctrl + Shift + Delete
# Limpiar caché y cookies
# Recargar la página
```

### 4. Verificar Autenticación
```javascript
// En la consola del navegador
localStorage.getItem('access_token')
// Debe mostrar un token JWT
```

---

## 📸 Capturas Esperadas

### Dashboard:
```
┌─────────────────────────────────────────────────────────┐
│  🏆 Your Progress              [12% Complete]           │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  ✅ 🔵 🔒 🔒 🔒 🔒 🔒 🔒                                │
│  W1  W2  W3  W4  W5  W6  W7  W8                         │
└─────────────────────────────────────────────────────────┘

┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ Week 1   │ │ Week 2   │ │ Week 3   │ │ Week 4   │
│  Done ✓  │ │ Current  │ │ Locked 🔒│ │ Locked 🔒│
│   100%   │ │   45%    │ │    0%    │ │    0%    │
│ [Review] │ │[Continue]│ │[Locked]  │ │[Locked]  │
│          │ │[Complete]│ │          │ │          │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
```

### Consola del Navegador:
```
[Progress] Week 1 - Slide 1/20 - 5%
[Progress] Exercises: 0/5
[Progress] Saving: Week 1 - 5%
[Progress] Saved successfully: {id: 1, ...}
📊 Progress saved: 25%
[Progress] Week 1 - Slide 10/20 - 50%
[Progress] Exercises: 3/5
[Progress] Saving: Week 1 - 50%
[Progress] Saved successfully: {id: 1, ...}
📊 Progress saved: 50%
...
🔓 Week 2 unlocked! Keep going!
```

---

## ✅ Resultado Esperado

Después de seguir estos pasos:

1. ✅ La barra de progreso avanza según las diapositivas
2. ✅ Los logs muestran el progreso en tiempo real
3. ✅ Las notificaciones toast aparecen
4. ✅ Week 2 se desbloquea al llegar a 80%
5. ✅ El botón "Mark as Complete" aparece al 80%
6. ✅ Week 1 se marca como completada al 100%
7. ✅ El dashboard se actualiza automáticamente

---

**Si sigues viendo problemas, comparte los logs de la consola y te ayudo a debuggear!** 🔍
