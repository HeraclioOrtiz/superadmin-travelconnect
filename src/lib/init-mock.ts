// src/lib/init-mock.ts
import { makeServer } from '@/mirage';

if (
  typeof window !== 'undefined' &&
  process.env.NODE_ENV === 'development' &&
  process.env.NEXT_PUBLIC_VITE_MOCK === 'true'
) {
  console.log('🔥 Mirage arrancando desde módulo...');

  const mirage = makeServer();

  if ((import.meta as any).hot) {
    (import.meta as any).hot.dispose(() => {
      console.log('🧹 Mirage apagado por HMR');
      mirage?.shutdown?.();
    });
  }
}
