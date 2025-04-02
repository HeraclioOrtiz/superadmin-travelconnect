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

type FetchError = {
  type: 'network' | 'validation' | 'server';
  message: string;
};

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
  // Generador de mensajes de error
  const getErrorMessage = useCallback((error: unknown): string => {
    if (error instanceof Error) {
      return error.message.includes('aborted') 
        ? 'La solicitud tardó demasiado'
        : error.message;
    }
    return 'Error desconocido al cargar agencias';
  }, []);

  // Validación de tipo Agencia
  const isValidAgencia = useCallback((item: any): item is Agencia => {
    const requiredFields = [
      'estado', 'nombre', 'dominio', 
      'color_principal', 'color_barra_superior',
      'filtro_imagen_1', 'filtro_imagen_2'
    ];
    return (
      typeof item === 'object' &&
      item !== null &&
      requiredFields.every(field => field in item) &&
      typeof item.estado === 'boolean' &&
      typeof item.nombre === 'string' &&
      typeof item.dominio === 'string'
    );
  }, []);

  // Fetch principal
  const fetchAgencias = useCallback(async (retryCount = 0): Promise<void> => {
    stateMethods.setLoading(true);
    stateMethods.setError(null);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
      const response = await fetch('/api/agencias', {
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (!Array.isArray(data) || !data.every(isValidAgencia)) {
        throw new Error('Datos no válidos');
      }

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
  }, [stateMethods, isValidAgencia, getErrorMessage]);

  // Auto-refresh
  const { startAutoRefresh, stopAutoRefresh } = useAutoRefresh(
    fetchAgencias,
    DEFAULT_REFRESH_INTERVAL,
    true
  );

  /**
   * Crea una agencia (endpoint público)
   * @param formData Campos requeridos para creación
   * @returns Promesa con resultado de la operación
   */
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