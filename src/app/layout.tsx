'use client';

import { useMockServer } from '@/lib/init-mock'; // 👈 Importás el hook

import * as React from 'react';
import type { Viewport } from 'next';

import '@/styles/global.css';

import { UserProvider } from '@/contexts/user-context';
import { LocalizationProvider } from '@/components/core/localization-provider';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';
import { AgenciasProvider } from '@/contexts/features/Agencias/AgenciaProvider';
import { ModalAgenciaProvider } from '@/contexts/ModalAgenciaProvider';

export const viewport = { width: 'device-width', initialScale: 1 } satisfies Viewport;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  useMockServer(); // 👈 Llamás al hook dentro del componente

  return (
    <html lang="en">
      <body>
        <LocalizationProvider>
          <UserProvider>
            <AgenciasProvider>
              <ModalAgenciaProvider>
                <ThemeProvider>{children}</ThemeProvider>
              </ModalAgenciaProvider>
            </AgenciasProvider>
          </UserProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
