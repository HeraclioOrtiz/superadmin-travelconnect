'use client';

import { makeServer } from '@/mirage';

declare global {
  var __mirage__: any;
}

// 🚦 Controlamos si activamos Mirage
const shouldEnableMirage = 
  typeof window !== 'undefined' &&
  process.env.NODE_ENV === 'development' &&
  process.env.NEXT_PUBLIC_VITE_MOCK === 'true';

if (shouldEnableMirage) {
  if (window.__mirage__) {
    console.log('🛑 Apagando Mirage anterior...');
    window.__mirage__.shutdown();
    window.__mirage__ = undefined;
  }

  console.log('🔥 Iniciando Mirage (modo desarrollo)...');
  window.__mirage__ = makeServer();
} else {
  console.log('⚡ Mirage no iniciado (modo producción o VITE_MOCK desactivado)');
}
