# 🔧 Configuración del Sistema de Progreso - Backend

## 📋 Problema

El frontend está enviando datos de progreso pero el backend necesita tener los **módulos (semanas)** creados en la base de datos para poder guardar el progreso correctamente.

---

## ✅ Solución: Crear Módulos en la Base de Datos

### Paso 1: Ejecutar Comandos de Management

He creado dos comandos de Django para inicializar los módulos:

```bash
# Desde la carpeta backend/

# 1. Crear módulos de A1.1 (8 semanas)
python manage.py create_a11_modules

# 2. Crear módulos de A1.2 (8 semanas)
python manage.py create_a12_modules
```

### Salida Esperada:

```
Level already exists: A1.2 - Elementary English
✓ Created: Week 1: Greetings & Introductions
✓ Created: Week 2: Daily Routines
✓ Created: Week 3: Places & Directions
✓ Created: Week 4: Past Simple
✓ Created: Week 5: Shopping & Food
✓ Created: Week 6: Abilities & Rules
✓ Created: Week 7: Hobbies & Plans
✓ Created: Week 8: Final Review

============================================================
Summary:
  - Created: 8 modules
  - Updated: 0 modules
  - Total: 8 modules
============================================================

✓ A1.2 modules are ready!
```

---

## 🔍 Verificar que Funciona

### 1. Verificar en Django Admin

```bash
# Acceder al admin
http://localhost:8000/admin/

# Ir a: Learning > Modules
# Deberías ver 16 módulos (8 de A1.1 + 8 de A1.2)
```

### 2. Probar los Endpoints

#### A. Obtener Resumen de Progreso

```bash
# GET /api/students/me/progress-summary/
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:8000/api/students/me/progress-summary/
```

**Respuesta esperada:**
```json
{
  "level_code": "a1-2",
  "total_weeks": 8,
  "current_week": 1,
  "overall_percent": 0,
  "weeks": [
    {
      "week_number": 1,
      "module_id": 1,
      "completion_percent": 0,
      "status": "not_started",
      "unlocked": true,
      "slide_route": "/a1-2/week-1"
    },
    {
      "week_number": 2,
      "module_id": 2,
      "completion_percent": 0,
      "status": "not_started",
      "unlocked": false,
      "slide_route": "/a1-2/week-2"
    },
    ...
  ]
}
```

#### B. Guardar Progreso

```bash
# POST /api/students/me/progress/
curl -X POST \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "level_code": "a1-2",
       "week_number": 1,
       "completion_percent": 75.5
     }' \
     http://localhost:8000/api/students/me/progress/
```

**Respuesta esperada:**
```json
{
  "id": 1,
  "module": {
    "id": 1,
    "level": {
      "id": 2,
      "code": "a1-2",
      "name": "A1.2 - Elementary English",
      ...
    },
    "week_number": 1,
    "title": "Week 1: Greetings & Introductions",
    "subtitle": "Present Simple • Personal Information",
    "slide_route": "/a1-2/week-1",
    ...
  },
  "completion_percent": "75.50",
  "status": "in_progress",
  "last_activity": "2026-04-30T21:30:00Z",
  "score": null
}
```

---

## 🔄 Cómo Funciona el Sistema

### Flujo de Datos:

```
1. Frontend envía progreso:
   POST /api/students/me/progress/
   {
     "level_code": "a1-2",
     "week_number": 1,
     "completion_percent": 75
   }

2. Backend (services.py):
   - Busca el Module con level_code="a1-2" y week_number=1
   - Si no existe, lo crea automáticamente
   - Crea o actualiza StudentProgress
   - Actualiza last_activity
   - Calcula status automáticamente:
     * 0%: not_started
     * 1-99%: in_progress
     * 100%: completed

3. Backend (selectors.py):
   - Calcula overall_percent (promedio de todas las semanas)
   - Determina current_week (primera semana < 80%)
   - Calcula unlocked para cada semana:
     * Week 1: siempre unlocked
     * Week 2-8: unlocked si la anterior >= 80%

4. Frontend consulta:
   GET /api/students/me/progress-summary/
   - Recibe el resumen actualizado
   - Actualiza la UI
```

---

## 📊 Estructura de la Base de Datos

### Tablas Principales:

```sql
-- Niveles (A1.1, A1.2, etc.)
learning_level
├── id
├── code (a1-1, a1-2)
├── name
├── description
├── order
└── is_active

-- Módulos (Semanas)
learning_module
├── id
├── level_id (FK → learning_level)
├── week_number (1-8)
├── title
├── subtitle
├── slide_route
├── order
└── is_active

-- Progreso del Estudiante
learning_studentprogress
├── id
├── student_id (FK → accounts_user)
├── module_id (FK → learning_module)
├── completion_percent (0-100)
├── status (not_started, in_progress, completed)
├── last_activity
└── score

-- Perfil del Estudiante
learning_studentprofile
├── id
├── user_id (FK → accounts_user)
├── current_level_id (FK → learning_level)
├── assigned_by_id (FK → accounts_user)
├── assigned_at
└── is_active
```

---

## 🐛 Troubleshooting

### Problema 1: "Module not found"

**Causa:** Los módulos no están creados en la base de datos

**Solución:**
```bash
python manage.py create_a12_modules
python manage.py create_a11_modules
```

### Problema 2: "Module not available for this student"

**Causa:** El estudiante no tiene asignado el nivel correcto

**Solución:**
```python
# En Django shell
python manage.py shell

from django.contrib.auth import get_user_model
from apps.learning.models import Level, StudentProfile

User = get_user_model()
student = User.objects.get(username='student_username')
level = Level.objects.get(code='a1-2')

# Crear o actualizar perfil
profile, created = StudentProfile.objects.update_or_create(
    user=student,
    defaults={
        'current_level': level,
        'is_active': True
    }
)
print(f"Profile updated: {profile}")
```

### Problema 3: El progreso no se guarda

**Causa:** El estudiante no está autenticado o no tiene permisos

**Solución:**
1. Verificar que el token JWT sea válido
2. Verificar que el usuario tenga role='student'
3. Verificar que el StudentProfile esté activo

```python
# Verificar en Django shell
from django.contrib.auth import get_user_model
User = get_user_model()

student = User.objects.get(username='student_username')
print(f"Role: {student.role}")
print(f"Is active: {student.is_active}")
print(f"Has profile: {hasattr(student, 'student_profile')}")

if hasattr(student, 'student_profile'):
    profile = student.student_profile
    print(f"Profile active: {profile.is_active}")
    print(f"Current level: {profile.current_level}")
```

### Problema 4: Las semanas no se desbloquean

**Causa:** La lógica de desbloqueo está en `selectors.py`

**Verificar:**
```python
# En selectors.py, línea ~60
unlocked_previous = completion_percent >= 80

# Week 1: siempre unlocked
# Week 2: unlocked si Week 1 >= 80%
# Week 3: unlocked si Week 2 >= 80%
# etc.
```

**Probar manualmente:**
```python
# Django shell
from apps.learning.selectors import get_student_progress_summary
from django.contrib.auth import get_user_model

User = get_user_model()
student = User.objects.get(username='student_username')

summary = get_student_progress_summary(student)
print(summary)

# Verificar que weeks[1]['unlocked'] sea True si weeks[0]['completion_percent'] >= 80
```

---

## 🧪 Script de Prueba Completo

Crea un archivo `test_progress_system.py`:

```python
"""
Script para probar el sistema de progreso
Ejecutar con: python manage.py shell < test_progress_system.py
"""
from django.contrib.auth import get_user_model
from apps.learning.models import Level, Module, StudentProfile, StudentProgress
from apps.learning.services import upsert_student_progress
from apps.learning.selectors import get_student_progress_summary

User = get_user_model()

# 1. Obtener o crear estudiante de prueba
student, created = User.objects.get_or_create(
    username='test_student',
    defaults={
        'email': 'test@example.com',
        'role': User.Role.STUDENT
    }
)
if created:
    student.set_password('testpass123')
    student.save()
    print(f"✓ Created test student: {student.username}")
else:
    print(f"✓ Using existing student: {student.username}")

# 2. Asignar nivel A1.2
level = Level.objects.get(code='a1-2')
profile, _ = StudentProfile.objects.update_or_create(
    user=student,
    defaults={
        'current_level': level,
        'is_active': True
    }
)
print(f"✓ Student assigned to level: {level.code}")

# 3. Simular progreso en Week 1
print("\n--- Testing Week 1 Progress ---")
for percent in [25, 50, 75, 85, 100]:
    progress = upsert_student_progress(
        student=student,
        level_code='a1-2',
        week_number=1,
        completion_percent=percent
    )
    print(f"  {percent}%: status={progress.status}")

# 4. Verificar resumen
print("\n--- Progress Summary ---")
summary = get_student_progress_summary(student)
print(f"Overall: {summary['overall_percent']}%")
print(f"Current week: {summary['current_week']}")
print("\nWeeks:")
for week in summary['weeks']:
    status = "🔓" if week['unlocked'] else "🔒"
    print(f"  Week {week['week_number']}: {week['completion_percent']}% {status}")

# 5. Verificar que Week 2 se desbloqueó
week2 = summary['weeks'][1]
if week2['unlocked']:
    print("\n✓ SUCCESS: Week 2 is unlocked!")
else:
    print("\n✗ FAIL: Week 2 should be unlocked")

print("\n--- Test Complete ---")
```

Ejecutar:
```bash
python manage.py shell < test_progress_system.py
```

---

## 📝 Checklist de Configuración

- [ ] Ejecutar `python manage.py create_a11_modules`
- [ ] Ejecutar `python manage.py create_a12_modules`
- [ ] Verificar en Django Admin que los módulos existen
- [ ] Crear un estudiante de prueba
- [ ] Asignar nivel A1.2 al estudiante
- [ ] Probar POST /api/students/me/progress/
- [ ] Probar GET /api/students/me/progress-summary/
- [ ] Verificar que Week 1 esté desbloqueada
- [ ] Completar Week 1 al 80%
- [ ] Verificar que Week 2 se desbloquee
- [ ] Probar en el frontend

---

## 🚀 Siguiente Paso

Una vez que hayas ejecutado los comandos y verificado que funciona:

1. **Reinicia el servidor Django**
2. **Reinicia el servidor frontend**
3. **Inicia sesión como estudiante**
4. **Ve a Week 1 y completa diapositivas**
5. **Verifica que la barra de progreso avance**
6. **Completa al 80% y verifica que Week 2 se desbloquee**

---

**¡El backend ya está listo para el sistema de progreso!** 🎉
