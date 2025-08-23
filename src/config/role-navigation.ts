import type { ReactNode } from 'react';

export type RolUsuario = 'admin' | 'superadmin';

export interface NavItem {
  label: string;
  href: string;
  icon?: ReactNode | string;
  matcher?: { type: 'startsWith' | 'equals'; href: string };
  roles: RolUsuario[];
}

export const navItems: NavItem[] = [
  {
    label: 'Inicio',
    href: '/dashboard',
    matcher: { type: 'equals', href: '/dashboard' },
    icon: 'chart-pie',
    roles: ['admin', 'superadmin'],
  },
  {
    label: 'Agencias',
    href: '/dashboard/customers',
    matcher: { type: 'startsWith', href: '/dashboard/customers' },
    icon: 'users',
    roles: ['superadmin'],
  },
  {
    label: 'Servicios',
    href: '/dashboard/servicios',
    matcher: { type: 'startsWith', href: '/dashboard/servicios' },
    icon: 'servicios',
    roles: ['superadmin'], // ⬅️ restringido a superadmin
  },
  {
    label: 'Estilos',
    href: '/dashboard/integrations',
    matcher: { type: 'startsWith', href: '/dashboard/integrations' },
    icon: 'palette',
    roles: ['admin'],
  },
  {
    label: 'Paquetes Propios',
    href: '/dashboard/paquetesPropios',
    matcher: { type: 'startsWith', href: '/dashboard/paquetesPropios' },
    icon: 'package',
    roles: ['admin', 'superadmin'],
  },
  {
    label: 'Mensajes',
    href: '/dashboard/mensajes',
    matcher: { type: 'startsWith', href: '/dashboard/mensajes' },
    icon: 'messages',
    roles: ['admin'],
  },
  {
    // Se oculta en SideNav/MobileNav con hiddenHrefs, pero se mantiene para guard.
    label: 'Perfil',
    href: '/dashboard/account',
    matcher: { type: 'startsWith', href: '/dashboard/account' },
    icon: 'users',
    roles: ['admin', 'superadmin'],
  },
  {
    label: 'Configuración',
    href: '/dashboard/settings',
    matcher: { type: 'startsWith', href: '/dashboard/settings' },
    icon: 'gear-six',
    roles: ['admin', 'superadmin'],
  },
];
