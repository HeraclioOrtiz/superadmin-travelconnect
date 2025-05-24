// src/app/dashboard/servicios/VistaServicioSeleccionado.tsx
'use client';

import { Box, Typography } from '@mui/material';
import { VistasServicios } from '@/app/dashboard/servicios/index'; // ✅ Importación corregida
import type { AgenciaBackData } from '@/types/AgenciaBackData';

interface VistaServicioSeleccionadoProps {
  seccion: string;
  agencia: AgenciaBackData;
}

export const VistaServicioSeleccionado = ({
  seccion,
  agencia,
}: VistaServicioSeleccionadoProps) => {
  const Componente = VistasServicios[seccion];

  return (
    <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        {seccion}
      </Typography>

      {Componente ? (
        <Componente agencia={agencia} />
      ) : (
        <Typography variant="body2" color="text.secondary">
          Sección no implementada.
        </Typography>
      )}
    </Box>
  );
};

