import { useCallback } from 'react';
import { createAgencia } from './createAgencia';
import { editAgencia } from './editAgencia'; // ✅ nuevo
import { fetchAgencias } from './fetchAgencias';
import type { Agencia, AgenciasContextState } from '../types';
import type { AgenciaFormValues } from '../forms';

const useAgenciasActions = (
  state: AgenciasContextState,
  stateMethods: {
    setAgencias: (agencias: Agencia[]) => void;
    setError: (error: string | null) => void;
  }
) => {
  const cargarAgencias = useCallback(async (): Promise<boolean> => {
    try {
      const data = await fetchAgencias();
      stateMethods.setAgencias(data);
      return true;
    } catch (error) {
      stateMethods.setError(error instanceof Error ? error.message : 'Error desconocido');
      return false;
    }
  }, [stateMethods]);

  const handleCreateAgencia = useCallback(async (
    formData: AgenciaFormValues
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const creationResult = await createAgencia(formData, state, {
        setError: stateMethods.setError
      });

      if (!creationResult.success) {
        return {
          success: false,
          error: creationResult.error
        };
      }

      const refreshSuccess = await cargarAgencias();
      return {
        success: refreshSuccess,
        error: refreshSuccess ? undefined : 'Error actualizando lista'
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      stateMethods.setError(message);
      return {
        success: false,
        error: message
      };
    }
  }, [state, stateMethods, cargarAgencias]);

  const handleEditAgencia = useCallback(async (
    formData: AgenciaFormValues & { id: number } // ✅ especificamos que se espera un ID
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const updateResult = await editAgencia(formData, state, {
        setError: stateMethods.setError
      });

      if (!updateResult.success) {
        return {
          success: false,
          error: updateResult.error
        };
      }

      const refreshSuccess = await cargarAgencias();
      return {
        success: refreshSuccess,
        error: refreshSuccess ? undefined : 'Error actualizando lista'
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      stateMethods.setError(message);
      return {
        success: false,
        error: message
      };
    }
  }, [state, stateMethods, cargarAgencias]);

  return {
    fetchAgencias: cargarAgencias,
    createAgencia: handleCreateAgencia,
    editAgencia: handleEditAgencia // ✅ agregado correctamente
  };
};

export default useAgenciasActions;
