export interface User {
  id: string;
  nombre: string;
  dominio: string | null;
  rol: 'superadmin' | 'admin';
}
