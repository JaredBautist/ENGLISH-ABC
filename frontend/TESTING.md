# 🧪 Testing TeacherDashboard - Guía de Debugging

## ¿Por qué sale en blanco?

Si ves una página en blanco después de hacer login como teacher, sigue estos pasos:

### **Opción 1: Usar página de diagnóstico**

1. Haz login con: `dylanjared@gmail.com` / `teacher123`
2. Cuando se redirija a `/teacher` (blanco), copia esta URL en la barra: `http://localhost:5173/diagnostic`
3. Verás un diagnóstico visual que muestra:
   - ✓ Si los tokens están guardados en storage
   - ✓ Si los endpoints /levels/ y /teacher/students/ funcionan
   - ✓ Qué datos devuelven exactamente

### **Opción 2: Ver consola del navegador (F12)**

1. Abre DevTools (F12)
2. Ve a **Console**
3. Después de hacer login, verás logs como:
   ```
   [TeacherDashboard Error] {
     message: "...",
     status: 401,
     data: {...}
   }
   ```

### **Opción 3: Test desde Node (Backend)**

```bash
cd frontend
node test-teacher-api.js
```

Esto prueba directamente los endpoints con un token real y muestra si el backend responde correctamente.

---

## Posibles problemas y soluciones

### **1. "No hay access token en storage"**
- El login no guardó el token
- Solución: Verifica que `tokenStorage.saveTokens()` se ejecutó en `AuthContext`

### **2. "/levels/ error: 401 Unauthorized"**
- El token expiró o es inválido
- Solución: Vuelve a hacer login

### **3. "/teacher/students/ error: 403 Forbidden"**
- El usuario no tiene rol `teacher`
- Solución: Verifica que `user.role === 'teacher'`

### **4. "Network error"**
- El backend no está corriendo
- Solución: `cd backend && python manage.py runserver 0.0.0.0:8000`

### **5. Page is blank but no errors**
- El renderizado falla silenciosamente
- Solución: Revisa que el componente `TeacherDashboard` tiene `return` statement

---

## Credenciales de prueba

```
👨‍🏫 Teacher:  dylanjared@gmail.com / teacher123
👩‍🎓 Student: monica@gmail.com / student123
```

---

## API Endpoints

```
POST   /api/auth/token/          → Login
GET    /api/levels/              → Get niveles
GET    /api/teacher/students/   → Get estudiantes (solo teacher)
GET    /api/teacher/students/{id}/progress/ → Get progreso
```

---

## Checklist de debugging

- [ ] Backend corriendo en `http://127.0.0.1:8000`?
- [ ] Frontend corriendo en `http://localhost:5173/`?
- [ ] Puedo hacer login sin errores?
- [ ] Después de login, ¿tengo un token en localStorage/sessionStorage?
- [ ] ¿La consola (F12) muestra errores?
- [ ] ¿La página `/diagnostic` muestra "✅ Todo funciona"?
- [ ] ¿Los datos de estudiantes aparecen en `/diagnostic`?

Si todo pasa ✓, pero TeacherDashboard sigue en blanco, el problema está en el JSX/renderizado del componente.

---

## Debug Info Visual (en desarrollo)

Hay un panel amarillo en la parte superior del TeacherDashboard con info de debug:

```
🐛 Debug Info (desarrollo)
{
  loading: false,
  error: null,
  levelsCount: 2,
  studentsCount: 1,
  levelOptions: 2
}
```

Si `loading` es siempre `true` → El `loadData()` nunca termina
Si `error` tiene texto → Ese es el problema exacto
