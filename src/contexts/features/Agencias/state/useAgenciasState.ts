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
  const addTempAgencia = useCallback((tempAgencia: Omit<Agencia, 'id'>) => {
    const tempId = Date.now(); // Usamos timestamp numérico directamente
    setState(prev => ({
      ...prev,
      agencias: [...prev.agencias, { 
        ...tempAgencia,
        id: tempId, // Ahora es number
        // Campos requeridos con valores por defecto
        fecha_creacion: tempAgencia.fecha_alta || new Date().toISOString(),
        estado: tempAgencia.estado || true
      }],
      loading: true
    }));
    return tempId;
  }, []);

  const confirmAgencia = useCallback((tempId: number, realAgencia: Agencia) => {
    setState(prev => ({
      ...prev,
      agencias: prev.agencias.map(a => 
        a.id === tempId ? realAgencia : a
      ),
      loading: false,
      lastUpdated: new Date()
    }));
  }, []);

  const revertTempAgencia = useCallback((tempId: number, error?: string) => {
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