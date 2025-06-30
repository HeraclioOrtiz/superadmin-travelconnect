'use client';

import { Box, Container, Stack, Typography } from '@mui/material';
import { TablaAgenciasResumen } from '../../../components/paquetesPropios/TablaAgenciasResumen';

export default function PaquetesPropiosPage() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Typography variant="h4" fontWeight={600}>
          Paquetes Propios por Agencia
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Visualizá y gestioná los paquetes propios asociados a cada agencia.
        </Typography>

        {/* Tabla de agencias con opción de expandir paquetes */}
        <TablaAgenciasResumen />
      </Stack>
    </Container>
  );
}
