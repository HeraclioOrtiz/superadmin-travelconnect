import { useEffect, useState } from 'react';
import { AgenciaBackCorregido } from '@/contexts/features/Agencias/AgenciaBackCorregido';
import { normalizarAgenciaBackData } from '@/contexts/features/Agencias/normalizarAgenciaBackData';
import { AgenciaBackData } from '@/contexts/features/Agencias/AgenciaBackData';

export const useFetchAgencia = (
  idAgencia: number | string | undefined
): {
  agencia: AgenciaBackCorregido | null;
  cargando: boolean;
  error: string | null;
} => {
  const [agencia, setAgencia] = useState<AgenciaBackCorregido | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idAgencia) return;

    const fetchAgencia = async () => {
      setCargando(true);
      setError(null);

      try {
        const response = await fetch(`https://travelconnect.com.ar/agencias/${idAgencia}`);
        if (!response.ok) throw new Error(`Error ${response.status}`);

        const data: AgenciaBackData = await response.json();
        const normalizado = normalizarAgenciaBackData(data);
        setAgencia(normalizado);
        console.log('✅ Agencia normalizada cargada:', normalizado);
      } catch (err) {
        console.error('❌ Error al cargar agencia:', err);
        setError('Error al cargar la agencia');
        setAgencia(null);
      } finally {
        setCargando(false);
      }
    };

    fetchAgencia();
  }, [idAgencia]);

  return { agencia, cargando, error };
};
