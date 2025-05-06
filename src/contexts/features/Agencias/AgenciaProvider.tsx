'use client';
import React, { createContext, useContext, useMemo } from 'react';
import useAgenciasState from './state/useAgenciasState';
import useAgenciasActions from './actions/useAgenciasActions';
import useAgenciasQueries from './queries/useAgenciasQueries';
import { Agencia, AgenciasContextState } from './types';
import { AgenciaFormValues } from './forms';

interface AgenciasContextType {
  state: AgenciasContextState;
  actions: {
    fetchAgencias: () => Promise<boolean>;
    createAgencia: (formData: AgenciaFormValues) => Promise<{ success: boolean; error?: string }>;
    editAgencia: (formData: AgenciaFormValues & { id: number }) => Promise<{ success: boolean; error?: string }>;
    deleteAgencia: (id: number) => Promise<{ success: boolean; error?: string }>;
    startAutoRefresh: () => void;
    stopAutoRefresh: () => void;
  };
  queries: {
    getAgenciaById: (id: string) => Agencia | undefined;
    filterAgencias: (criterios: Partial<Agencia>) => Agencia[];
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
      // 🔄 Eliminar del estado local
      const agenciasActualizadas = state.agencias.filter(a => a.id !== id);
      setAgencias(agenciasActualizadas);
    }
    return result;
  };

  const contextValue = useMemo(() => ({
    state,
    actions: {
      fetchAgencias: actions.fetchAgencias,
      createAgencia: actions.createAgencia,
      editAgencia: actions.editAgencia,
      deleteAgencia, // ✅ función personalizada que actualiza el estado local
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
