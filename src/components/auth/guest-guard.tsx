'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress'; // 👈 Agregamos spinner visual

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { useUserContext } from '@/contexts/user-context'; // 👈 Usamos el contexto correcto

export interface GuestGuardProps {
  children: React.ReactNode;
}

export function GuestGuard({ children }: GuestGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const { user, error, isLoading } = useUserContext(); // 👈 corregido
  const [isChecking, setIsChecking] = React.useState<boolean>(true);

  const checkPermissions = async (): Promise<void> => {
    if (isLoading) {
      return;
    }

    if (error && error !== 'No token found') { // 👈 Solo consideramos error grave si no es "No token found"
      setIsChecking(false);
      return;
    }

    if (user) {
      logger.debug('[GuestGuard]: User is logged in, redirecting to dashboard');
      router.replace(paths.dashboard.overview);
      return;
    }

    setIsChecking(false);
  };

  React.useEffect(() => {
    checkPermissions().catch(() => {
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, error, isLoading]);

  if (isChecking || isLoading) {
    // 🧠 Mientras carga o chequea, mostramos spinner
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error && error !== 'No token found') {
    return <Alert color="error">Something went wrong</Alert>;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
