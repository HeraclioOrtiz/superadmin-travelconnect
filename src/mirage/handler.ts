import { Server, Response } from 'miragejs';

export function handler(server: Server) {
  console.log('🛠️ [Mirage Handler] Registrando endpoints simulados...');

  // 🔐 Simulación de login
  server.post('/api/login', (schema, request) => {
    const { email, password } = JSON.parse(request.requestBody);

    console.log('📥 [Mirage] POST /api/login:', { email, password });

    if (email === 'admin@test.com' && password === '123456') {
      return { token: 'fake-jwt-token-123' };
    }

    return new Response(401, {}, { error: 'Credenciales inválidas' });
  });

  // 👤 Simulación de sesión
  server.get('/api/me', (schema, request) => {
    console.log('📥 [Mirage] GET /api/me recibido');
    const authHeader = request.requestHeaders.Authorization;

    if (authHeader !== 'Bearer fake-jwt-token-123') {
      return new Response(401, {}, { error: 'Token inválido' });
    }

    return {
      id: 1,
      nombre: 'Administrador',
      email: 'admin@test.com',
      role: 'superadmin',
    };
  });

  // 🚪 Simulación de logout
  server.post('/api/logout', () => {
    console.log('👋 [Mirage] POST /api/logout');
    return new Response(200, {}, { success: true });
  });

  // ✅ Permitir otros endpoints reales
  server.passthrough((request) => {
    try {
      const url = new URL(request.url, window.location.origin); // fix para URLs relativas
      const isIntercepted = ['/api/login', '/api/me', '/api/logout'].includes(url.pathname);
      if (!isIntercepted) {
        console.log('➡️ [Mirage] Passthrough:', url.pathname);
      }
      return !isIntercepted;
    } catch (err) {
      console.warn('❌ [Mirage] URL inválida en passthrough:', request.url);
      return true; // permitir la request si hay error
    }
  });

  console.log('✅ [Mirage Handler] Endpoints listos.');
}
