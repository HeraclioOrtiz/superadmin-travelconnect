import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  
  { key: 'customers', title: 'Clientes', href: paths.dashboard.customers, icon: 'users' },
  { key: 'integrations', title: 'Estilos', href: paths.dashboard.integrations, icon: 'plugs-connected' },
  { key: 'settings', title: 'Configuracion', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: 'Agencia', href: paths.dashboard.account, icon: 'user' },
  
] satisfies NavItemConfig[];



{/* { key: 'overview', title: 'Vista', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'customers', title: 'Clientes', href: paths.dashboard.customers, icon: 'users' },
  { key: 'integrations', title: 'Estilos', href: paths.dashboard.integrations, icon: 'plugs-connected' },
  { key: 'settings', title: 'Configuracion', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: 'Agencia', href: paths.dashboard.account, icon: 'user' },
  { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },*/}