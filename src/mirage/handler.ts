import { createServer, Response } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    routes() {
      this.namespace = 'api';

      this.post('/login', (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);

        // ✅ Superadmin simulado
        if (email === 'superadmin@example.com' && password === 'super123') {
          return {
            token: 'fake-token-superadmin',
            user: {
              id: 0,
              nombre: 'Superadmin',
              dominio: null,
              rol: 'superadmin',
            },
          };
        }

        // ✅ Admin simulado (para fallback si entra por /login en vez de /agencia/login)
        if (email === 'admin@example.com' && password === 'admin123') {
          return {
            token: 'fake-token-admin',
            user: {
              id: '6',
              nombre: 'Admin Agencia Real',
              dominio: 'agenciareal',
              rol: 'admin',
              agencia_id: '6',
            },
          };
        }

        return new Response(
          401,
          { 'Content-Type': 'application/json' },
          { error: 'Credenciales inválidas' }
        );
      });

      // ✅ Admin simulado interceptando el endpoint real del back
      this.post('https://travelconnect.com.ar/agencia/login', (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);

        if (email === 'admin@example.com' && password === 'admin123') {
          return {
            access_token: 'fake-token-admin',
            agencia: {
              id: '6',
              nombre: 'Admin Agencia Real',
              dominio: 'agenciareal',
            },
          };
        }

        return new Response(
          401,
          { 'Content-Type': 'application/json' },
          { error: 'Credenciales inválidas (admin)' }
        );
      });

      // ✅ Agencia simulada para ID 999
      this.get('/agencias/999', () => {
        return {
          id: 999,
          tenant_id: 1,
          estado: 1,
          nombre: 'Superadmin Agency',
          dominio: 'superadminagency',
          // ... resto del objeto
        };
      });

      // 🔁 Reenviar todas las demás requests reales
      this.passthrough('https://travelconnect.com.ar/**');
      this.passthrough('https://triptest.com.ar/store_agencia');
      this.passthrough('https://triptest.com.ar/update_agencia');
      this.passthrough();
    },
  });
}
