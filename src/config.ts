import { getSiteURL } from '@/lib/get-site-url';
import { LogLevel } from '@/lib/logger';

export interface Config {
  site: { name: string; description: string; themeColor: string; url: string };
  logLevel: keyof typeof LogLevel;
}

export const config: Config = {
  site: {
    name: 'Devias Kit',
    description: '',
    themeColor: '#090a0b',
    url: getSiteURL(),
  },
  logLevel: (process.env.NEXT_PUBLIC_LOG_LEVEL as keyof typeof LogLevel) ?? LogLevel.ALL,
};

// 🔥 Agregado para authClient:
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_VITE_MOCK === "true"
    ? "/api" // Si estamos usando Mirage, apuntamos al mock local
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
