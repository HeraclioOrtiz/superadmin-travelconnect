import { useState, useCallback } from 'react';
import { Agencia, AgenciasContextState } from '../types';

const useAgenciasState = (initialState?: Partial<AgenciasContextState>) => {
  const [state, setState] = useState<AgenciasContextState>({
    agencias: [],
    loading: false,
    error: null,
    lastUpdated: null,
    ...initialState
  });

  // --- Optimistic Update Functions --- //
  /**
   * Añade una agencia temporal al estado
   * @param tempAgencia Datos de la agencia (sin ID)
   * @returns ID temporal generado
   */
  const addTempAgencia = useCallback((tempAgencia: Omit<Agencia, 'id'>) => {
    const tempId = `temp-${Date.now()}`;
    setState(prev => ({
      ...prev,
      agencias: [...prev.agencias, { 
        ...tempAgencia,
        id: tempId,
        // Garantiza valores por defecto para campos requeridos
        fecha_creacion: tempAgencia.fecha_creacion || new Date().toISOString()
      }],
      loading: true
    }));
    return tempId;
  }, []);

  /**
   * Confirma una agencia temporal con datos reales del backend
   * @param tempId ID temporal
   * @param realAgencia Datos confirmados
   */
  const confirmAgencia = useCallback((tempId: string, realAgencia: Agencia) => {
    setState(prev => ({
      ...prev,
      agencias: prev.agencias.map(a => 
        a.id === tempId ? { 
          ...realAgencia, 
          // Mantiene campos no devueltos por el backend
          ...(a.id === tempId ? { 
            // Aquí puedes preservar campos específicos si es necesario
          } : {})
        } : a
      ),
      loading: false,
      lastUpdated: new Date()
    }));
  }, []);

  /**
   * Revierte una agencia temporal
   * @param tempId ID a eliminar
   * @param error Mensaje opcional de error
   */
  const revertTempAgencia = useCallback((tempId: string, error?: string) => {
    setState(prev => ({
      ...prev,
      agencias: prev.agencias.filter(a => a.id !== tempId),
      loading: false,
      error: error || prev.error
    }));
  }, []);

  // --- Basic State Management --- //
  const setAgencias = useCallback((agencias: Agencia[]) => {
    setState(prev => ({ 
      ...prev, 
      agencias,
      lastUpdated: new Date() 
    }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  const setLastUpdated = useCallback(() => {
    setState(prev => ({ ...prev, lastUpdated: new Date() }));
  }, []);

  return {
    state,
    // Optimistic Update API
    addTempAgencia,
    confirmAgencia,
    revertTempAgencia,
    // Basic Setters
    setAgencias,
    setLoading,
    setError,
    setLastUpdated
  };
};

export default useAgenciasState;