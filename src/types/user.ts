export interface User {
  id: string;
  name?: string;
  avatar?: string;
  email?: string;
  rol: 'superadmin' | 'admin';
  id_agencia?: number; // ✅ Agregado para soporte de agencias

  [key: string]: unknown;
}
