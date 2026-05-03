# Guía Rápida - Teacher Dashboard

## 🎯 Acceso

**URL**: `http://localhost:5173/teacher`

**Requisitos**:
- Usuario con rol `teacher`
- Autenticado en la aplicación

---

## 📊 Tabs Disponibles

### 1. Statistics (Estadísticas)
Muestra métricas generales del docente:
- **Total Students**: Cantidad total de estudiantes asignados
- **Active Today**: Estudiantes que han sido activos en las últimas 24 horas
- **Avg Progress**: Promedio de progreso de todos los estudiantes (%)

**Datos en tiempo real**: Se actualizan al cargar la página

---

### 2. Alerts (Alertas)
Muestra estudiantes con bajo progreso (< 50%)

**Funcionalidad futura**:
- Listar estudiantes con bajo progreso
- Acciones rápidas (contactar, reasignar nivel, etc.)

**Estado actual**: Placeholder - "No students with low progress at the moment"

---

### 3. Students (Estudiantes)
Gestión completa de estudiantes

#### Crear Estudiante
Formulario con los siguientes campos:
- **Username**: Nombre de usuario único
- **Email**: Correo electrónico único
- **Password**: Contraseña (validada por backend)
- **Level**: Nivel inicial (A1.1 o A1.2)

**Validación**:
- Todos los campos son requeridos
- Email debe ser válido
- Username debe ser único
- Password debe cumplir requisitos de seguridad

**Resultado**: Nuevo estudiante aparece inmediatamente en la lista

#### Lista de Estudiantes
Muestra todos los estudiantes asignados al docente:
- **Username**: Nombre del estudiante
- **Email**: Correo electrónico
- **Level**: Nivel actual (A1.1, A1.2, etc.)

**Características**:
- Lista scrolleable (máx 396px de altura)
- Hover effect para mejor UX
- Muestra "No students yet" si no hay estudiantes

---

## 🎨 Características de Diseño

### Tema Oscuro/Claro
- **Toggle**: Botón en la esquina inferior izquierda del sidebar
- **Persistencia**: Preferencia guardada en localStorage
- **Transiciones**: Suaves (300ms)

### Sidebar
- **Colapsable**: Botón "Collapse" en el footer
- **Navegación**: Acceso rápido a todos los tabs
- **Información**: Muestra nombre del usuario logueado

### Responsive
- Diseño adaptable a diferentes tamaños de pantalla
- Sidebar se colapsa en pantallas pequeñas
- Grid layout se ajusta automáticamente

---

## 🔄 Flujo de Trabajo Típico

### 1. Acceder al Dashboard
```
1. Ir a http://localhost:5173/teacher
2. Verificar que los estudiantes cargan
3. Revisar estadísticas en el tab "Statistics"
```

### 2. Crear Nuevo Estudiante
```
1. Ir al tab "Students"
2. Llenar el formulario "Create Student"
3. Hacer clic en "Create Student"
4. Verificar que aparece en la lista
```

### 3. Monitorear Progreso
```
1. Ver "Avg Progress" en Statistics
2. Revisar "Active Today" para actividad reciente
3. Usar "Alerts" para identificar estudiantes con bajo progreso
```

---

## 🐛 Solución de Problemas

### "Error loading students"
**Causa**: Endpoint incorrecto o servidor no responde

**Solución**:
1. Verificar que el backend está corriendo: `python manage.py runserver`
2. Verificar que el usuario tiene rol `teacher`
3. Revisar la consola del navegador (F12) para más detalles

### Formulario no envía
**Causa**: Campos vacíos o validación fallida

**Solución**:
1. Llenar todos los campos (Username, Email, Password, Level)
2. Verificar que el email es válido
3. Verificar que el username no existe
4. Revisar la consola para mensajes de error

### Tema no se guarda
**Causa**: localStorage deshabilitado

**Solución**:
1. Habilitar localStorage en el navegador
2. Limpiar cookies/cache
3. Intentar nuevamente

---

## 📱 Endpoints Utilizados

| Endpoint | Método | Propósito |
|----------|--------|----------|
| `/api/teacher/students/` | GET | Obtener lista de estudiantes |
| `/api/teacher/students/` | POST | Crear nuevo estudiante |
| `/api/teacher/dashboard/stats/` | GET | Obtener estadísticas |

---

## 🔐 Permisos Requeridos

- **IsTeacherOrAdmin**: Solo docentes y administradores pueden acceder
- **Estudiantes propios**: Solo ve estudiantes asignados a este docente
- **Superadmin**: Puede ver todos los estudiantes

---

## 💾 Datos Guardados

### En el Servidor
- Información del estudiante (username, email, nivel)
- Estadísticas de progreso
- Historial de actividad

### En el Cliente (localStorage)
- Preferencia de tema (dark/light)
- Posición del sidebar (colapsado/expandido)

---

## 🚀 Próximas Mejoras

1. **Alertas de Bajo Progreso**
   - Listar estudiantes con progreso < 50%
   - Acciones rápidas

2. **Vista de Detalle**
   - Hacer clic en estudiante para ver progreso detallado
   - Gráficos de progreso por semana

3. **Operaciones en Lote**
   - Seleccionar múltiples estudiantes
   - Reasignar nivel en lote
   - Exportar reportes

4. **Métricas Avanzadas**
   - Gráficos de actividad
   - Tendencias de progreso
   - Comparativas entre estudiantes

---

## 📞 Contacto

Para reportar problemas o sugerencias, consultar la documentación completa en:
`C:\Users\dylam\Desktop\English Platform\markdowns\`

**Última actualización**: 3 de Mayo de 2026
