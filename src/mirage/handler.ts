// src/mirage/handler.ts
import { createServer, Response } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    routes() {
      // 1) Sólo mockeamos POST /api/login
      this.namespace = 'api';
      this.post('/login', (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);
        if (email === 'admin@example.com' && password === '123456') {
          return {
            user: { id: '1', name: 'Admin', email: 'admin@example.com' },
            token: 'fake-token',
          };
        }
        return new Response(401, {}, { error: 'Credenciales inválidas' });
      });

      // 2) Dejar pasar TODO lo demás:
      //   – tu backend real de agencias
      this.passthrough('https://triptest.com.ar/**');
      //   – cualquier otra ruta no mockeada bajo /api
      this.passthrough();
    },
  });
}
