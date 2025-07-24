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

  console.log('📦 Datos crudos recibidos del backend (agencias):', data); // <-- Agregado

  // 🔧 Transformar idAgencia a string
  const agencias: AgenciaBackData[] = data.map((agencia: any) => ({
    ...agencia,
    idAgencia: String(agencia.idAgencia),
  }));

  return agencias;
};
