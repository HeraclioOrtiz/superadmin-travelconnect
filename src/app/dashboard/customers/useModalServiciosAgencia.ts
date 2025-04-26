import { useState } from 'react';
import type { Customer } from '@/components/dashboard/customer/Customer';

export const useModalServiciosAgencia = () => {
  const [modalServiciosOpen, setModalServiciosOpen] = useState(false);
  const [agenciaSeleccionada, setAgenciaSeleccionada] = useState<Customer | null>(null);

  const abrirModalServicios = (agencia: Customer) => {
    console.log('🟢 Modal Servicios abierto para:', agencia);
    setAgenciaSeleccionada(agencia);
    setModalServiciosOpen(true);
  };

  const cerrarModalServicios = () => {
    setAgenciaSeleccionada(null);
    setModalServiciosOpen(false);
  };

  return {
    modalServiciosOpen,
    agenciaSeleccionada,
    abrirModalServicios,
    cerrarModalServicios,
  };
};
