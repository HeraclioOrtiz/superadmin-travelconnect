import dayjs from 'dayjs';
import { Agencia } from '@/contexts/features/Agencias/types';
import type { Customer } from '@/components/dashboard/customer/Customer'




export const agenciasToCustomers = (agencias: Agencia[]): Customer[] => {
  return agencias
    .slice()                  // evitamos mutar el array original
    .reverse()                // para que el último sea CLI-001
    .map((agencia, index, array) => ({
      id: `CLI-${String(array.length - index).padStart(3, '0')}`,
      logo: agencia.logo ?? `https://api.dicebear.com/8.x/shapes/svg?seed=${encodeURIComponent(agencia.nombre)}`,
      nombre: agencia.nombre,
      email: `contacto@${agencia.dominio}`,
      fechaAlta: dayjs(agencia.fecha_creacion).format('YYYY-MM-DD'),
      estado: agencia.estado ? 'activo' : 'inactivo', // si querés simular 'pendiente', se puede
    }));
};
