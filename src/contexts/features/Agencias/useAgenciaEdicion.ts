'use client';

import { useState, useCallback, useEffect } from 'react';
import { AgenciaFormValues } from './forms';
import { useAgenciaActiva } from './AgenciaActivaProvider';
import { transformarAgenciaParaEnvio } from './transformarAgenciaParaEnvio';
import { editAgencia } from './actions/editAgencia';
import { adaptarAgenciaParaEdicion } from '@/components/form/hooks/adaptarAgenciaParaEdicio';
import type { AgenciasContextState } from '@/types/types';

export function useAgenciaEdicion(state?: AgenciasContextState, stateMethods?: any) {
  const { agencia } = useAgenciaActiva();

  const [values, setValues] = useState<AgenciaFormValues>({} as AgenciaFormValues);

  useEffect(() => {
    if (agencia) {
      const adaptada = adaptarAgenciaParaEdicion(agencia).valores;
      setValues(adaptada);
      console.log('✅ Valores precargados en edición:', adaptada);
    }
  }, [agencia]);

  const setValue = useCallback(
    <K extends keyof AgenciaFormValues>(campo: K, valor: AgenciaFormValues[K]) => {
      setValues((prev) => ({
        ...prev,
        [campo]: valor,
      }));
    },
    []
  );

  const guardarCambios = useCallback(async (): Promise<{ success: boolean }> => {
    if (!agencia || !state || !stateMethods) {
      return { success: false };
    }

    try {
      const formData = transformarAgenciaParaEnvio(values);
      formData.append('id', agencia.idAgencia);

      const resultado = await editAgencia(formData, state, stateMethods);

      if (resultado.success) {
        console.log('✅ Cambios guardados con éxito');
        return { success: true };
      } else {
        console.error('❌ Error al guardar:', resultado.error);
        return { success: false };
      }
    } catch (error) {
      console.error('❌ Excepción al guardar la agencia:', error);
      return { success: false };
    }
  }, [values, agencia, state, stateMethods]);

  return {
    values,
    setValue,
    guardarCambios,
  };
}
