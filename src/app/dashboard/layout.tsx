// app/dashboard/layout.tsx
'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import GlobalStyles from '@mui/material/GlobalStyles';
import { usePathname, useRouter } from 'next/navigation';

import { AuthGuard } from '@/components/auth/auth-guard';
import { MainNav } from '@/components/dashboard/layout/main-nav';
import { SideNav } from '@/components/dashboard/layout/side-nav';

import { navItems } from '@/config/role-navigation';
import { useUserContext } from '@/contexts/user-context';
import { paths } from '@/paths';
import type { RolUsuario } from '@/config/role-navigation';

interface LayoutProps {
  children: React.ReactNode;
}

function isAllowed(pathname: string, role: RolUsuario): boolean {
  // Permitir siempre el overview
  if (pathname === paths.dashboard.overview) return true;

  return navItems.some((item) => {
    if (!item.roles.includes(role)) return false;

    const matchHref = item.matcher?.href ?? item.href;
    const type = item.matcher?.type ?? 'equals';

    if (type === 'startsWith') return pathname.startsWith(matchHref);
    return pathname === matchHref;
  });
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useUserContext();

  React.useEffect(() => {
    if (isLoading || !user) return;
    if (!isAllowed(pathname, user.rol)) {
      router.replace(paths.dashboard.overview);
    }
  }, [isLoading, user, pathname, router]);

  return (
    <AuthGuard>
      <GlobalStyles
        styles={{
          body: {
            '--MainNav-height': '56px',
            '--MainNav-zIndex': 1000,
            '--SideNav-width': '280px',
            '--SideNav-zIndex': 1100,
            '--MobileNav-width': '320px',
            '--MobileNav-zIndex': 1100,
          },
        }}
      />
      <Box
        sx={{
          bgcolor: 'var(--mui-palette-background-default)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minHeight: '100%',
        }}
      >
        <SideNav />
        <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', pl: { lg: 'var(--SideNav-width)' } }}>
          <MainNav />
          <main>
            <Container maxWidth="xl" sx={{ py: '64px' }}>
              {children}
            </Container>
          </main>
        </Box>
      </Box>
    </AuthGuard>
  );
}
