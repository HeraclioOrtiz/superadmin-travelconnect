'use client';

import { Box, Container, Stack, Typography } from '@mui/material';
import { TablaAgenciasResumen } from '../../../components/paquetesPropios/TablaAgenciasResumen';
import ModalPaquetePropio from '../../../components/paquetesPropios/modal/ModalPaquetePropio';
import ModalSalidas from '../../../components/paquetesPropios/modal/ModalSalida'; // ✅ importar el modal de salidas

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

        <TablaAgenciasResumen />

        {/* ✅ Montar ambos modales */}
        <ModalPaquetePropio />
        <ModalSalidas />
      </Stack>
    </Container>
  );
}
