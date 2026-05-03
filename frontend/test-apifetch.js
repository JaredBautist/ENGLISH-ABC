#!/usr/bin/env node

/**
 * Test apiFetch - Verifica que los tokens se incluyan correctamente
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Testing apiFetch implementation\n');

// Read the apiFetch implementation
const apiJsPath = path.join(__dirname, 'src/utils/api.js');
const apiCode = fs.readFileSync(apiJsPath, 'utf-8');

console.log('📄 Contenido de api.js:\n');
console.log(apiCode);

console.log('\n\n✅ Verificaciones:\n');

// Check 1: tokenStorage import
if (apiCode.includes("import { tokenStorage }")) {
  console.log('✓ tokenStorage está importado');
} else {
  console.error('✗ tokenStorage NO está importado');
}

// Check 2: getAccessToken usage
if (apiCode.includes("tokenStorage.getAccessToken()")) {
  console.log('✓ apiFetch llama a getAccessToken()');
} else {
  console.error('✗ apiFetch NO llama a getAccessToken()');
}

// Check 3: Authorization header
if (apiCode.includes("Authorization") && apiCode.includes("Bearer")) {
  console.log('✓ Se añade header Authorization Bearer');
} else {
  console.error('✗ Authorization header NO se añade');
}

// Check 4: API_BASE URL
if (apiCode.includes("'/api'")) {
  console.log('✓ API_BASE es /api (usa proxy de Vite)');
} else {
  console.error('✗ API_BASE tiene URL incorrecta');
}

// Check 5: tokenStorage implementation
const tokenStoragePath = path.join(__dirname, 'src/features/auth/utils/tokenStorage.js');
const tokenCode = fs.readFileSync(tokenStoragePath, 'utf-8');

console.log('\n\n📄 Contenido de tokenStorage.js:\n');
console.log(tokenCode.substring(0, 500) + '...\n');

if (tokenCode.includes("getAccessToken")) {
  console.log('✓ tokenStorage tiene getAccessToken()');
} else {
  console.error('✗ tokenStorage NO tiene getAccessToken()');
}

if (tokenCode.includes("localStorage") || tokenCode.includes("sessionStorage")) {
  console.log('✓ tokenStorage usa localStorage/sessionStorage');
} else {
  console.error('✗ tokenStorage NO usa storage APIs');
}
