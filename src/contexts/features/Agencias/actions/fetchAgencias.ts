import type { AgenciaBackData } from '@/types/AgenciaBackData';

export const fetchAgencias = async (): Promise<AgenciaBackData[]> => {
  const response = await fetch('https://travelconnect.com.ar/agencias', {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }

  const data = await response.json();
  
  // Log para inspeccionar los datos recibidos
  console.log('Datos recibidos en fetchAgencias:', data);

  return data;
};
