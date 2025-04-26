'use client';

import { useEffect } from 'react';
import { makeServer } from '@/mirage';

export function useMockServer() {
  console.log('🔎 Estado de NEXT_PUBLIC_VITE_MOCK:', process.env.NEXT_PUBLIC_VITE_MOCK); // 👈 Agregar esto para depurar

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_VITE_MOCK === "true") {
      console.log('🔥 Mirage activo');
      makeServer();
    }
  }, []);
}
