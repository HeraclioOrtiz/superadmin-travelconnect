import type { Agencia } from '@/contexts/features/Agencias/types';

export const fetchAgencias = async (): Promise<Agencia[]> => {
  const response = await fetch('https://triptest.com.ar/agencias', {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }

  const data = await response.json();
  return data;
};
