'use client';
import { Typography } from '@mui/material';

// Vistas individuales
import { VistaPaquetesPropios } from './PaquetesPropios'; // ✅ Importamos componente real

export const VistaApisTerceros = () => (
  <Typography variant="body2">
    Aquí irá la configuración de <strong>APIs de terceros</strong>.
  </Typography>
);

export const VistaCrmAtlas = () => (
  <Typography variant="body2">
    Aquí irá la configuración de <strong>CRM Atlas</strong>.
  </Typography>
);

export const VistaHoteleria = () => (
  <Typography variant="body2">
    Aquí irá la configuración de <strong>Hotelería</strong>.
  </Typography>
);

export const VistaCircuitos = () => (
  <Typography variant="body2">
    Aquí irá la configuración de <strong>Circuitos</strong>.
  </Typography>
);

export const VistaVuelos = () => (
  <Typography variant="body2">
    Aquí irá la configuración de <strong>Vuelos</strong>.
  </Typography>
);

export const VistaMercadoPago = () => (
  <Typography variant="body2">
    Aquí irá la configuración de <strong>MercadoPago</strong>.
  </Typography>
);

// Diccionario de vistas para el switch dinámico
export const VistasServicios: Record<string, React.FC> = {
  'APIs de terceros': VistaApisTerceros,
  'Paquetes propios': VistaPaquetesPropios, // ✅ Vinculado correctamente
  'CRM Atlas': VistaCrmAtlas,
  'Hotelería': VistaHoteleria,
  'Circuitos': VistaCircuitos,
  'Vuelos': VistaVuelos,
  'MercadoPago': VistaMercadoPago,
};
