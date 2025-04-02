import React, { createContext, useContext } from 'react';
import useAgenciasState from './state/useAgenciasState';
import useAgenciasActions from './actions/useAgenciasActions';
import useAgenciasQueries from './queries/useAgenciasQueries';
import { Agencia, AgenciasContextState } from './types';
import { AgenciaFormValues, CreateAgenciaResponse } from './forms';

interface AgenciasContextType {
  state: AgenciasContextState;
  actions: {
    fetchAgencias: () => Promise<void>;
    createAgencia: (formData: AgenciaFormValues) => Promise<CreateAgenciaResponse>;
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

  const actions = useAgenciasActions(state, { 
    setAgencias, 
    setLoading, 
    setError, 
    setLastUpdated,
    addTempAgencia,
    confirmAgencia,
    revertTempAgencia 
  });

  const queries = useAgenciasQueries(state.agencias);

  const contextValue: AgenciasContextType = {
    state,
    actions: {
      fetchAgencias: actions.fetchAgencias,
      createAgencia: actions.createAgencia,
      startAutoRefresh: actions.startAutoRefresh,
      stopAutoRefresh: actions.stopAutoRefresh
    },
    queries // Ahora incluye filterAgencias
  };

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