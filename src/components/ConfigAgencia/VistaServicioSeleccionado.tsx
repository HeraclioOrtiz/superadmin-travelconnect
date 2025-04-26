'use client';
import { Box, Typography } from '@mui/material';
import { VistasServicios } from './index';

interface VistaServicioSeleccionadoProps {
  seccion: string;
}

export const VistaServicioSeleccionado = ({ seccion }: VistaServicioSeleccionadoProps) => {
  const Componente = VistasServicios[seccion];

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        overflowY: 'auto',
      }}
    >
      <Typography variant="h5" gutterBottom>
        {seccion}
      </Typography>

      {Componente ? (
        <Componente />
      ) : (
        <Typography variant="body2" color="text.secondary">
          Sección no implementada.
        </Typography>
      )}
    </Box>
  );
};
