import { useCallback } from 'react';
import { Agencia } from '../types';
import { useAutoRefresh } from '../../../hooks/useAutoRefresh';
import { createAgencia } from './createAgencia';
import { AgenciasContextState } from '../types';
import { AgenciaFormValues } from '../forms';

// Constantes configurables
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 2000;
const FETCH_TIMEOUT_MS = 10000;
const DEFAULT_REFRESH_INTERVAL = 300000; // 5 minutos

const useAgenciasActions = (
  state: AgenciasContextState,
  stateMethods: {
    setAgencias: (agencias: Agencia[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setLastUpdated: (date: Date | null) => void;
    addTempAgencia: (tempAgencia: Omit<Agencia, 'id'>) => string;
    confirmAgencia: (tempId: string, realAgencia: Agencia) => void;
    revertTempAgencia: (tempId: string) => void;
  }
) => {
  const getErrorMessage = useCallback((error: unknown): string => {
    if (error instanceof Error) {
      return error.message.includes('aborted') 
        ? 'La solicitud tardó demasiado'
        : error.message;
    }
    return 'Error desconocido al cargar agencias';
  }, []);

  const fetchAgencias = useCallback(async (retryCount = 0): Promise<void> => {
    stateMethods.setLoading(true);
    stateMethods.setError(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
      const response = await fetch('https://triptest.com.ar/agencias', {
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      stateMethods.setAgencias(data);
      stateMethods.setLastUpdated(new Date());
    } catch (error) {
      clearTimeout(timeoutId);
      const errorMessage = getErrorMessage(error);

      if (retryCount < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
        return fetchAgencias(retryCount + 1);
      }

      stateMethods.setError(`Error al cargar agencias: ${errorMessage}`);
    } finally {
      stateMethods.setLoading(false);
    }
  }, [stateMethods, getErrorMessage]);

  const { startAutoRefresh, stopAutoRefresh } = useAutoRefresh(
    fetchAgencias,
    DEFAULT_REFRESH_INTERVAL,
    true
  );

  const handleCreateAgencia = async (formData: AgenciaFormValues) => {
    return createAgencia(formData, state, {
      addTempAgencia: stateMethods.addTempAgencia,
      confirmAgencia: stateMethods.confirmAgencia,
      revertTempAgencia: stateMethods.revertTempAgencia,
      setError: stateMethods.setError
    });
  };

  return {
    fetchAgencias,
    startAutoRefresh,
    stopAutoRefresh,
    createAgencia: handleCreateAgencia
  };
};

export default useAgenciasActions;
