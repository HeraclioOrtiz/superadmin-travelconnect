'use client';

import * as React from 'react';
import type { User } from '@/types/user';
import { authClient } from '@/lib/auth/client';
import { logger } from '@/lib/default-logger';
import { useFetchAgencia } from '@/hooks/useFetchAgencia'; // ✅ Importación del hook

export interface UserContextValue {
  user: User | null;
  error: string | null;
  isLoading: boolean;
  checkSession?: () => Promise<void>;
}

export const UserContext = React.createContext<UserContextValue | undefined>(undefined);

export interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps): React.JSX.Element {
  const [state, setState] = React.useState<{
    user: User | null;
    error: string | null;
    isLoading: boolean;
  }>({
    user: null,
    error: null,
    isLoading: true,
  });

  const checkSession = React.useCallback(async (): Promise<void> => {
    try {
      const { data, error } = await authClient.getUser();

      if (error === 'Token no encontrado' || error === 'No token found') {
        logger.warn('[UserContext] No hay token, usuario no logueado');
        setState({ user: null, error: null, isLoading: false });
        return;
      }

      if (error) {
        logger.error('[UserContext] Error grave en sesión:', error);
        setState({ user: null, error: 'Something went wrong', isLoading: false });
        return;
      }

      setState({ user: data || null, error: null, isLoading: false });
    } catch (err) {
      logger.error(err);
      setState({ user: null, error: 'Something went wrong', isLoading: false });
    }
  }, []);

  React.useEffect(() => {
    checkSession().catch((err: unknown) => {
      logger.error(err);
    });
  }, []);

  // ✅ Disparo automático del fetch si es admin con agencia
  useFetchAgencia(state.user?.rol === 'admin' ? state.user?.id_agencia : undefined);

  return (
    <UserContext.Provider value={{ ...state, checkSession }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext(): UserContextValue {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}
