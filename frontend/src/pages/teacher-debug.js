/**
 * Debug script para verificar TeacherDashboard
 * Ejecutar en el navegador: copy-paste en consola F12
 */

console.log('🔍 [TeacherDashboard Debug] Iniciando diagnóstico...\n');

// 1. Verificar localStorage/token
const tokens = JSON.parse(localStorage.getItem('auth_tokens') || sessionStorage.getItem('auth_tokens') || '{}');
console.log('✓ Tokens en storage:', tokens ? '⭐ Sí' : '❌ No');
if (tokens?.access) {
  console.log(`  - Access token: ${tokens.access.substring(0, 20)}...`);
}

// 2. Verificar API endpoint base
const API_BASE = '/api';
console.log(`\n✓ API Base URL: ${API_BASE}`);
console.log(`✓ Vite Proxy debería redirigir a: http://127.0.0.1:8000`);

// 3. Probar endpoints
async function testEndpoints() {
  console.log('\n📡 Probando endpoints...\n');

  const endpoints = [
    { path: '/levels/', name: 'Niveles' },
    { path: '/teacher/students/', name: 'Estudiantes' },
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${API_BASE}${endpoint.path}`, {
        headers: {
          'Authorization': `Bearer ${tokens?.access}`,
          'Content-Type': 'application/json'
        }
      });

      console.log(`${endpoint.name} (${endpoint.path})`);
      console.log(`  Status: ${response.status} ${response.statusText}`);

      const data = await response.json();
      console.log(`  Data: ${Array.isArray(data) ? `✓ Array con ${data.length} items` : '✓ Object'}`);
      console.log(`  Contenido:`, data);
      console.log('');
    } catch (error) {
      console.error(`❌ ${endpoint.name}: ${error.message}`);
    }
  }
}

// 4. Verificar estado del AuthContext
console.log('\n⚙️ Estado esperado de AuthContext:');
console.log('  - const { isAuthenticated, user, isLoading } = useAuth();');
console.log('  - user.role debería ser: "teacher"');
console.log('  - isAuthenticated debería ser: true');

// 5. Ejecutar pruebas
await testEndpoints();

console.log('\n✅ Diagnóstico completado. Revisa la información arriba para identificar el problema.');
console.log('\n💡 Problemas comunes:');
console.log('1. Token no está en storage: Asegúrate de que el login guardó el token');
console.log('2. Status 401: Token inválido o expirado, vuelve a hacer login');
console.log('3. Status 403: Usuario no tiene permiso, verifica que sea teacher');
console.log('4. Status 500: Error en el servidor Django');
console.log('5. Network error: Backend no está corriendo en http://127.0.0.1:8000');
