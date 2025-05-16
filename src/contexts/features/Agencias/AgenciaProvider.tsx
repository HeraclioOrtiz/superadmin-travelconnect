'use client';
import React, { createContext, useContext, useMemo } from 'react';
import useAgenciasState from './state/useAgenciasState';
import useAgenciasActions from './actions/useAgenciasActions';
import useAgenciasQueries from './queries/useAgenciasQueries';
import { AgenciasContextState } from '../../../types/types';
import { AgenciaBackData } from '@/types/AgenciaBackData';

interface AgenciasContextType {
  state: AgenciasContextState;
  actions: {
    fetchAgencias: () => Promise<boolean>;
    createAgencia: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
    editAgencia: (formData: FormData) => Promise<{ success: boolean; error?: string }>; // ✅ corregido
    deleteAgencia: (id: number) => Promise<{ success: boolean; error?: string }>;
    startAutoRefresh: () => void;
    stopAutoRefresh: () => void;
  };
  queries: {
    getAgenciaById: (id: string) => AgenciaBackData | undefined;
    filterAgencias: (criterios: Partial<AgenciaBackData>) => AgenciaBackData[];
  };
}

const AgenciasContext = createContext<AgenciasContextType | undefined>(undefined);

export const AgenciasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    state,
    setAgencias,
    setLoading,
    setError,
    setLastUpdated,
    addTempAgencia,
    confirmAgencia,
    revertTempAgencia
  } = useAgenciasState();

  const stableStateMethods = useMemo(() => ({
    setAgencias,
    setLoading,
    setError,
    setLastUpdated,
    addTempAgencia,
    confirmAgencia,
    revertTempAgencia
  }), []);

  const actions = useAgenciasActions(state, stableStateMethods);
  const queries = useAgenciasQueries(state.agencias);

  const deleteAgencia = async (id: number): Promise<{ success: boolean; error?: string }> => {
    const result = await actions.deleteAgencia(id);
    if (result.success) {
      const agenciasActualizadas = state.agencias.filter(a => Number(a.idAgencia) !== id);
      setAgencias(agenciasActualizadas);
    }
    return result;
  };

  const contextValue = useMemo(() => ({
    state,
    actions: {
      fetchAgencias: actions.fetchAgencias,
      createAgencia: actions.createAgencia,
      editAgencia: actions.editAgencia, // ✅ ya no requiere id explícitamente
      deleteAgencia,
      startAutoRefresh: () => {},
      stopAutoRefresh: () => {}
    },
    queries
  }), [state, actions, queries]);

  return (
    <AgenciasContext.Provider value={contextValue}>
      {children}
    </AgenciasContext.Provider>
  );
};

export const useAgenciasContext = () => {
  const context = useContext(AgenciasContext);
  if (!context) {
    throw new Error('useAgenciasContext must be used within an AgenciasProvider');
  }
  return context;
};
