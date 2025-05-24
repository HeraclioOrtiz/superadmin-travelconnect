// src/mirage/init-mock.ts
import { makeServer } from '../mirage/handler';

let server: any;

export function initMock() {
  if (server) {
    console.log('⚠️ Mirage ya fue inicializado. Se evita doble creación.');
    return server;
  }

  const useMock = process.env.NEXT_PUBLIC_MOCK === 'true';

  if (useMock) {
    console.log('🚀 Iniciando Mirage JS...');
    server = makeServer({ environment: 'development' });
  } else {
    console.log('⛔ Mirage está desactivado por configuración.');
  }

  return server;
}

