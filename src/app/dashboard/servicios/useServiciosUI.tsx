'use client';

import { useState } from 'react';

const SECCIONES_SERVICIOS_ADMIN = [
  'Paquetes propios',
  'CRM Atlas',
  'Hotelería',
  'Circuitos',
  'Vuelos',
  'MercadoPago',
];

export function useServiciosUI() {
  const [seccionActiva, setSeccionActiva] = useState(SECCIONES_SERVICIOS_ADMIN[0]);

  const seccionHabilitada = (seccion: string) => {
    // Por ahora, todas están habilitadas
    return true;
  };

  return {
    secciones: SECCIONES_SERVICIOS_ADMIN,
    seccionActiva,
    setSeccionActiva,
    seccionHabilitada,
  };
}
