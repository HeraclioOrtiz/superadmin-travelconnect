import { getSiteURL } from '@/lib/get-site-url';
import { LogLevel } from '@/lib/logger';

export const config = {
  site: {
    name: 'Devias Kit',
    description: '',
    themeColor: '#090a0b',
    url: getSiteURL(), // o directamente un string si querés: 'http://localhost:3000'
  },
  logLevel: (process.env.NEXT_PUBLIC_LOG_LEVEL as keyof typeof LogLevel) ?? LogLevel.ALL,
};

export const API_BASE_URL = (() => {
  const isMockEnabled = process.env.NEXT_PUBLIC_VITE_MOCK === 'true';

  if (isMockEnabled) {
    console.log('[config] ⚙️ Usando Mirage: API_BASE_URL = /api');
    return '/api';
  }

  const realUrl = process.env.NEXT_PUBLIC_API_URL;

  if (realUrl?.startsWith('http')) {
    console.log('[config] ⚙️ Usando API real:', realUrl);
    return realUrl;
  }

  console.warn('[config] ⚠️ NEXT_PUBLIC_API_URL no definido o inválido. Usando fallback.');
  return 'http://localhost:3000/api';
})();
