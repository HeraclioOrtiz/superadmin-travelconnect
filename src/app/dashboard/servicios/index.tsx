'use client';
import { Typography } from '@mui/material';

// ✅ Importación por default corregida del componente real
import PaquetesPropios from './PaquetesPropios';

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

// ✅ Diccionario para renderizar vistas dinámicamente
export const VistasServicios: Record<string, React.FC> = {
  'APIs de terceros': VistaApisTerceros,
  'Paquetes propios': PaquetesPropios,
  'CRM Atlas': VistaCrmAtlas,
  'Hotelería': VistaHoteleria,
  'Circuitos': VistaCircuitos,
  'Vuelos': VistaVuelos,
  'MercadoPago': VistaMercadoPago,
};
