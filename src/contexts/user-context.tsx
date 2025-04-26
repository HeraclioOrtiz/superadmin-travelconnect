'use client';

import * as React from 'react';
import type { User } from '@/types/user';
import { authClient } from '@/lib/auth/client';
import { logger } from '@/lib/default-logger';

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
  const [state, setState] = React.useState<{ user: User | null; error: string | null; isLoading: boolean }>({
    user: null,
    error: null,
    isLoading: true,
  });

  const checkSession = React.useCallback(async (): Promise<void> => {
    try {
      const { data, error } = await authClient.getUser();

      if (error && error !== 'No token found') {
        // Solo tratamos como error grave si el error no es "No token found"
        logger.error(error);
        setState({ user: null, error: 'Something went wrong', isLoading: false });
        return;
      }

      const cleanUserData = data ? {
        ...data,
        password: undefined,
        token: undefined,
      } : null;

      setState({ user: cleanUserData, error: null, isLoading: false });
    } catch (err) {
      logger.error(err);
      setState({ user: null, error: 'Something went wrong', isLoading: false });
    }
  }, []);

  React.useEffect(() => {
    checkSession().catch((err: unknown) => {
      logger.error(err);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <UserContext.Provider value={{ ...state, checkSession }}>{children}</UserContext.Provider>;
}

// Hook de consumo seguro
export function useUserContext(): UserContextValue {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}
