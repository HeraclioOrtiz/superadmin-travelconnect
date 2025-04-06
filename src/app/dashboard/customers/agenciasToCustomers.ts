import dayjs from 'dayjs';
import { Agencia } from '@/contexts/features/Agencias/types';
import type { Customer } from '@/components/dashboard/customer/Customer';

export const agenciasToCustomers = (agencias: Agencia[]): Customer[] => {
  return agencias
    .slice() // evitamos mutar el array original
    .reverse() // para que el último creado sea el primero en la vista
    .map((agencia) => {
      const fallbackLogo = `https://api.dicebear.com/8.x/shapes/svg?seed=${encodeURIComponent(agencia.nombre)}`;
      const logoFinal = agencia.logo && agencia.logo.trim() !== '' ? agencia.logo : fallbackLogo;

      return {
        id: agencia.id, // mantenemos el id original como número
        logo: logoFinal,
        nombre: agencia.nombre,
        email: `contacto@${agencia.dominio}`,
        fechaAlta: dayjs(agencia.fecha_alta).format('YYYY-MM-DD'),
        estado: agencia.estado ? 'activo' : 'inactivo',
      };
    });
};
