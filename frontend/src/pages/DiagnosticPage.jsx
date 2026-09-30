import { useEffect, useState } from 'react';
import { tokenStorage } from '../features/auth/utils/tokenStorage';
import { apiFetch } from '../utils/api';

export default function DiagnosticPage() {
  const [diagnostics, setDiagnostics] = useState({
    storage: null,
    apiTest: null,
    errors: []
  });

  useEffect(() => {
    const runDiagnostics = async () => {
      const errors = [];

      // 1. Check storage
      const tokens = tokenStorage.getStoredTokens();
      const accessToken = tokenStorage.getAccessToken();

      if (!accessToken) {
        errors.push('❌ No hay access token en storage');
      }

      // 2. Test API endpoints
      const apiResults = {};

      try {
        const gradesResponse = await apiFetch('/grades/');
        apiResults.grades = {
          success: true,
          count: Array.isArray(gradesResponse) ? gradesResponse.length : gradesResponse.results?.length || 0,
          data: gradesResponse
        };
      } catch (err) {
        errors.push(`❌ /grades/ error: ${err.message}`);
        apiResults.grades = { success: false, error: err.message };
      }

      try {
        const summaryResponse = await apiFetch('/teachers/me/summary/');
        apiResults.summary = {
          success: true,
          count: summaryResponse.grades?.length || 0,
          data: summaryResponse
        };
      } catch (err) {
        errors.push(`❌ /teachers/me/summary/ error: ${err.message}`);
        apiResults.summary = { success: false, error: err.message };
      }

      setDiagnostics({
        storage: { tokens, accessToken: accessToken ? '✓ Existe' : '❌ No existe' },
        apiTest: apiResults,
        errors
      });
    };

    runDiagnostics();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🔍 Diagnóstico de la plataforma</h1>

        {/* Storage Status */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">📦 Storage Status</h2>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(diagnostics.storage, null, 2)}
          </pre>
        </div>

        {/* API Test Results */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">📡 API Test Results</h2>
          <div className="space-y-4">
            {Object.entries(diagnostics.apiTest || {}).map(([endpoint, result]) => (
              <div key={endpoint} className={`p-3 rounded ${result.success ? 'bg-green-50' : 'bg-red-50'}`}>
                <h3 className={`font-semibold ${result.success ? 'text-green-700' : 'text-red-700'}`}>
                  {result.success ? '✓' : '✗'} {endpoint}
                </h3>
                {result.success ? (
                  <p className="text-sm text-green-600">
                    Cargó {result.count} items correctamente
                  </p>
                ) : (
                  <p className="text-sm text-red-600">{result.error}</p>
                )}
                <details className="mt-2">
                  <summary className="cursor-pointer text-xs text-gray-600">Ver respuesta</summary>
                  <pre className="mt-2 bg-white p-2 text-xs overflow-auto max-h-40">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </details>
              </div>
            ))}
          </div>
        </div>

        {/* Errors */}
        {diagnostics.errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-700 mb-4">⚠️ Errores Detectados</h2>
            <ul className="space-y-2">
              {diagnostics.errors.map((error, idx) => (
                <li key={idx} className="text-red-600">{error}</li>
              ))}
            </ul>
          </div>
        )}

        {diagnostics.errors.length === 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-green-700">✅ Todo funciona correctamente</h2>
            <p className="text-green-600 mt-2">
              Los tokens se guardaron correctamente y los endpoints institucionales responden.
            </p>
          </div>
        )}

        <div className="mt-6">
          <a href="/docente" className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            ← Volver al panel docente
          </a>
        </div>
      </div>
    </div>
  );
}
