'use client';

import React, { createContext, useContext } from 'react';
import { useUserContext } from '@/contexts/user-context';
import { AgenciaBackCorregido } from './AgenciaBackCorregido';
import { useFetchAgencia } from '@/hooks/useFetchAgencia';

interface AgenciaActivaContextValue {
  agencia: AgenciaBackCorregido | null;
  cargando: boolean;
  error: string | null;
}

const AgenciaActivaContext = createContext<AgenciaActivaContextValue | undefined>(undefined);

export const AgenciaActivaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUserContext();
  const idAgencia = user?.id_agencia; // ✅ compatible con admin y superadmin

  const { agencia, cargando, error } = useFetchAgencia(idAgencia);

  return (
    <AgenciaActivaContext.Provider value={{ agencia, cargando, error }}>
      {children}
    </AgenciaActivaContext.Provider>
  );
};

export const useAgenciaActiva = (): AgenciaActivaContextValue => {
  const context = useContext(AgenciaActivaContext);
  if (!context) {
    throw new Error('useAgenciaActiva debe usarse dentro de un AgenciaActivaProvider');
  }
  return context;
};
