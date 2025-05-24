'use client';

import React, { createContext, useContext } from 'react';
import { useAgenciaActiva } from './AgenciaActivaProvider';
import useAgenciasState from './state/useAgenciasState';
import useAgenciasActions from './actions/useAgenciasActions';
import { useAgenciaEdicion } from './useAgenciaEdicion';

const AgenciaEdicionContext = createContext<ReturnType<typeof useAgenciaEdicion> | null>(null);

export const AgenciaEdicionProvider = ({ children }: { children: React.ReactNode }) => {
  const { agencia } = useAgenciaActiva();

  const stateHooks = useAgenciasState();
  const actions = useAgenciasActions(stateHooks.state, {
    setAgencias: stateHooks.setAgencias,
    setError: stateHooks.setError,
  });

  const edicion = useAgenciaEdicion(stateHooks.state, {
    setError: stateHooks.setError,
  });

  if (!agencia) return null;

  return (
    <AgenciaEdicionContext.Provider value={edicion}>
      {children}
    </AgenciaEdicionContext.Provider>
  );
};

export const useAgenciaEdicionContext = () => {
  const context = useContext(AgenciaEdicionContext);
  if (!context) {
    throw new Error('useAgenciaEdicionContext debe usarse dentro de AgenciaEdicionProvider');
  }
  return context;
};

