#!/usr/bin/env node

/**
 * Manual test script - Run from Node
 * node test-teacher-api.js
 */

const API_BASE = 'http://127.0.0.1:8000/api';

async function testFetch(endpoint, token) {
  console.log(`\n📡 Testing: ${API_BASE}${endpoint}`);
  
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`✓ Status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const text = await response.text();
      console.error(`✗ Error response: ${text}`);
      return null;
    }

    const data = await response.json();
    console.log(`✓ Response: ${JSON.stringify(data).substring(0, 200)}...`);
    return data;
  } catch (error) {
    console.error(`✗ Error: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('🔍 Testing TeacherDashboard API Endpoints\n');
  
  // Get token from test user
  console.log('1️⃣  Getting auth token...');
  let token = null;
  
  try {
    const authResponse = await fetch(`${API_BASE}/auth/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'dylanjared@gmail.com',
        password: 'teacher123'
      })
    });

    if (!authResponse.ok) {
      const error = await authResponse.text();
      console.error(`✗ Auth failed: ${error}`);
      process.exit(1);
    }

    const authData = await authResponse.json();
    token = authData.access;
    console.log(`✓ Token obtained: ${token.substring(0, 20)}...\n`);
  } catch (error) {
    console.error(`✗ Auth error: ${error.message}`);
    process.exit(1);
  }

  // Test endpoints
  console.log('2️⃣  Testing API endpoints...');
  
  await testFetch('/levels/', token);
  await testFetch('/teacher/students/', token);
  
  console.log('\n✅ Test completed.');
}

main().catch(console.error);
