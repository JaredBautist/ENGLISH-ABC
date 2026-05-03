# Instrucciones de Prueba - Teacher Dashboard

## 🧪 Guía de Pruebas Completa

### Requisitos Previos
- ✅ Backend corriendo: `python manage.py runserver`
- ✅ Frontend corriendo: `npm run dev`
- ✅ Usuario con rol `teacher` creado
- ✅ Al menos un estudiante creado

---

## 📋 Pruebas a Realizar

### 1. Cargar Dashboard
**Objetivo**: Verificar que el dashboard carga correctamente

**Pasos**:
1. Abrir navegador
2. Ir a `http://localhost:5173/teacher`
3. Iniciar sesión con usuario teacher

**Resultado Esperado**:
- ✅ Dashboard carga sin errores
- ✅ Se muestra el sidebar
- ✅ Se muestran los tabs (Statistics, Alerts, Students)
- ✅ Estadísticas muestran números correctos

---

### 2. Ver Lista de Estudiantes
**Objetivo**: Verificar que los estudiantes se cargan

**Pasos**:
1. Hacer clic en tab "Students"
2. Observar la lista de estudiantes

**Resultado Esperado**:
- ✅ Se muestra la lista de estudiantes
- ✅ Cada estudiante muestra: username, email, nivel
- ✅ Cada estudiante tiene un botón de edición (✏️)

---

### 3. Crear Nuevo Estudiante
**Objetivo**: Verificar que se puede crear un estudiante

**Pasos**:
1. En tab "Students", ir al formulario "Create Student"
2. Llenar los campos:
   - Username: `test_student_1`
   - Email: `test1@example.com`
   - Password: `TestPass123!`
   - Level: `A1.1`
3. Hacer clic en "Create Student"

**Resultado Esperado**:
- ✅ Botón muestra "Creating..."
- ✅ Estudiante aparece en la lista
- ✅ Formulario se limpia
- ✅ No hay errores

---

### 4. Editar Username
**Objetivo**: Verificar que se puede cambiar el username

**Pasos**:
1. Hacer clic en ✏️ del estudiante creado
2. Cambiar username a `test_student_modified`
3. Hacer clic en "Save"

**Resultado Esperado**:
- ✅ Botón muestra "Saving..."
- ✅ Username se actualiza en la lista
- ✅ Vuelve a modo de visualización
- ✅ No hay errores

---

### 5. Editar Email
**Objetivo**: Verificar que se puede cambiar el email

**Pasos**:
1. Hacer clic en ✏️ del estudiante
2. Cambiar email a `modified@example.com`
3. Hacer clic en "Save"

**Resultado Esperado**:
- ✅ Email se actualiza en la lista
- ✅ No hay errores

---

### 6. Cambiar Nivel
**Objetivo**: Verificar que se puede cambiar el nivel

**Pasos**:
1. Hacer clic en ✏️ del estudiante
2. Cambiar nivel de A1.1 a A1.2
3. Hacer clic en "Save"

**Resultado Esperado**:
- ✅ Badge del nivel cambia a A1.2
- ✅ No hay errores

---

### 7. Cambiar Contraseña
**Objetivo**: Verificar que se puede cambiar la contraseña

**Pasos**:
1. Hacer clic en ✏️ del estudiante
2. Escribir nueva contraseña: `NewPass456!`
3. Hacer clic en "Save"
4. Cerrar sesión
5. Intentar iniciar sesión con el estudiante usando la nueva contraseña

**Resultado Esperado**:
- ✅ Contraseña se actualiza
- ✅ Puede iniciar sesión con nueva contraseña
- ✅ No puede iniciar sesión con contraseña antigua

---

### 8. Mantener Contraseña Actual
**Objetivo**: Verificar que dejar el campo vacío mantiene la contraseña

**Pasos**:
1. Hacer clic en ✏️ del estudiante
2. Cambiar username o email
3. **Dejar campo de contraseña vacío**
4. Hacer clic en "Save"
5. Intentar iniciar sesión con el estudiante usando la contraseña anterior

**Resultado Esperado**:
- ✅ Otros campos se actualizan
- ✅ Contraseña NO cambia
- ✅ Puede iniciar sesión con contraseña anterior

---

### 9. Cancelar Edición
**Objetivo**: Verificar que Cancel descarta cambios

**Pasos**:
1. Hacer clic en ✏️ del estudiante
2. Cambiar varios campos
3. Hacer clic en "Cancel"

**Resultado Esperado**:
- ✅ Vuelve a modo de visualización
- ✅ Ningún cambio se guarda
- ✅ Datos originales se mantienen

---

### 10. Validación de Username Duplicado
**Objetivo**: Verificar que no se puede usar username existente

**Pasos**:
1. Crear un estudiante: `student_a`
2. Crear otro estudiante: `student_b`
3. Editar `student_b`
4. Cambiar username a `student_a`
5. Hacer clic en "Save"

**Resultado Esperado**:
- ✅ Muestra error "Error updating student"
- ✅ Cambios no se guardan
- ✅ Mensaje de error visible

---

### 11. Validación de Email Duplicado
**Objetivo**: Verificar que no se puede usar email existente

**Pasos**:
1. Crear un estudiante con email: `test1@example.com`
2. Crear otro estudiante con email: `test2@example.com`
3. Editar el segundo estudiante
4. Cambiar email a `test1@example.com`
5. Hacer clic en "Save"

**Resultado Esperado**:
- ✅ Muestra error "Error updating student"
- ✅ Cambios no se guardan
- ✅ Mensaje de error visible

---

### 12. Validación de Contraseña Débil
**Objetivo**: Verificar que contraseña débil es rechazada

**Pasos**:
1. Hacer clic en ✏️ del estudiante
2. Escribir contraseña débil: `123`
3. Hacer clic en "Save"

**Resultado Esperado**:
- ✅ Muestra error "Error updating student"
- ✅ Contraseña no se actualiza
- ✅ Mensaje de error visible

---

### 13. Editar Múltiples Campos
**Objetivo**: Verificar que se pueden cambiar varios campos a la vez

**Pasos**:
1. Hacer clic en ✏️ del estudiante
2. Cambiar username
3. Cambiar email
4. Cambiar contraseña
5. Cambiar nivel
6. Hacer clic en "Save"

**Resultado Esperado**:
- ✅ Todos los campos se actualizan
- ✅ No hay errores
- ✅ Lista se actualiza correctamente

---

### 14. Tema Oscuro/Claro
**Objetivo**: Verificar que el tema funciona en modo de edición

**Pasos**:
1. Hacer clic en ✏️ del estudiante
2. Hacer clic en el botón de tema (Sol/Luna)
3. Observar el formulario de edición

**Resultado Esperado**:
- ✅ Formulario cambia de color
- ✅ Texto es legible en ambos modos
- ✅ Botones se ven correctamente

---

### 15. Estadísticas
**Objetivo**: Verificar que las estadísticas se actualizan

**Pasos**:
1. Ir al tab "Statistics"
2. Observar "Total Students"
3. Crear un nuevo estudiante
4. Volver al tab "Statistics"

**Resultado Esperado**:
- ✅ "Total Students" aumenta en 1
- ✅ Estadísticas son correctas

---

## 📊 Checklist de Pruebas

### Funcionalidad Básica
- [ ] Dashboard carga correctamente
- [ ] Lista de estudiantes se muestra
- [ ] Crear estudiante funciona
- [ ] Editar estudiante funciona
- [ ] Cancelar edición funciona

### Edición de Campos
- [ ] Editar username funciona
- [ ] Editar email funciona
- [ ] Cambiar contraseña funciona
- [ ] Mantener contraseña actual funciona
- [ ] Cambiar nivel funciona
- [ ] Editar múltiples campos funciona

### Validaciones
- [ ] Username duplicado es rechazado
- [ ] Email duplicado es rechazado
- [ ] Contraseña débil es rechazada
- [ ] Campos requeridos son validados

### UI/UX
- [ ] Tema oscuro funciona
- [ ] Tema claro funciona
- [ ] Botones de carga funcionan
- [ ] Mensajes de error se muestran
- [ ] Transiciones son suaves

### Estadísticas
- [ ] Total students es correcto
- [ ] Active today funciona
- [ ] Avg progress funciona

---

## 🐛 Problemas Comunes

### "Error loading students"
**Solución**:
1. Verificar que el backend está corriendo
2. Verificar que el usuario es teacher
3. Revisar la consola del navegador

### "Error updating student"
**Solución**:
1. Verificar que los datos son válidos
2. Verificar que no hay duplicados
3. Revisar la consola del navegador

### Contraseña no cambia
**Solución**:
1. Verificar que escribiste algo en el campo
2. Verificar que la contraseña es fuerte
3. Revisar la consola del navegador

---

## 📝 Reporte de Pruebas

### Formato de Reporte
```
Prueba: [Nombre de la prueba]
Fecha: [Fecha]
Resultado: [✅ Pasó / ❌ Falló]
Notas: [Observaciones]
```

### Ejemplo
```
Prueba: Editar Username
Fecha: 3 de Mayo de 2026
Resultado: ✅ Pasó
Notas: Username se actualizó correctamente sin errores
```

---

## 📞 Soporte

Si encuentras problemas durante las pruebas:
1. Revisar la consola del navegador (F12)
2. Revisar los logs del backend
3. Consultar la documentación en `markdowns/`

---

**Última actualización**: 3 de Mayo de 2026
