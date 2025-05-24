'use client';
import { Typography } from '@mui/material';
import type { AgenciaBackData } from '@/types/AgenciaBackData';

// ✅ Importación del componente real
import PaquetesPropios from './PaquetesPropios';

interface VistaServicioProps {
  agencia: AgenciaBackData;
}

export const VistaApisTerceros: React.FC<VistaServicioProps> = () => (
  <Typography variant="body2">
    Aquí irá la configuración de <strong>APIs de terceros</strong>.
  </Typography>
);

export const VistaCrmAtlas: React.FC<VistaServicioProps> = () => (
  <Typography variant="body2">
    Aquí irá la configuración de <strong>CRM Atlas</strong>.
  </Typography>
);

export const VistaHoteleria: React.FC<VistaServicioProps> = () => (
  <Typography variant="body2">
    Aquí irá la configuración de <strong>Hotelería</strong>.
  </Typography>
);

export const VistaCircuitos: React.FC<VistaServicioProps> = () => (
  <Typography variant="body2">
    Aquí irá la configuración de <strong>Circuitos</strong>.
  </Typography>
);

export const VistaVuelos: React.FC<VistaServicioProps> = () => (
  <Typography variant="body2">
    Aquí irá la configuración de <strong>Vuelos</strong>.
  </Typography>
);

export const VistaMercadoPago: React.FC<VistaServicioProps> = () => (
  <Typography variant="body2">
    Aquí irá la configuración de <strong>MercadoPago</strong>.
  </Typography>
);

export const VistasServicios: Record<string, React.FC<VistaServicioProps>> = {
  'APIs de terceros': VistaApisTerceros,
  'Paquetes propios': PaquetesPropios,
  'CRM Atlas': VistaCrmAtlas,
  'Hotelería': VistaHoteleria,
  'Circuitos': VistaCircuitos,
  'Vuelos': VistaVuelos,
  'MercadoPago': VistaMercadoPago,
};

