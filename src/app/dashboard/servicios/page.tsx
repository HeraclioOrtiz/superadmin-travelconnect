'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { ServiciosNavbar } from './ServiciosNavbar';
import { VistaServicioSeleccionado } from './VistaServicioSeleccionado';
import { useServiciosUI } from './useServiciosUI';

import { useAgenciaActiva } from '@/contexts/features/Agencias/AgenciaActivaProvider';

export default function ServiciosPage() {
  const {
    secciones,
    seccionActiva,
    setSeccionActiva,
    seccionHabilitada,
  } = useServiciosUI();

  const { agencia, cargando, error } = useAgenciaActiva(); // ✅ Desestructuración correcta

  if (cargando || !agencia) {
    return null; // o un loading spinner si querés
  }

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Configuración de Servicios de Agencia
        </Typography>

        <Divider sx={{ my: 3 }} />

        <ServiciosNavbar
          secciones={secciones}
          seccionSeleccionada={seccionActiva}
          onSeleccionarSeccion={setSeccionActiva}
          seccionHabilitada={seccionHabilitada}
          onImplementarCambios={() => {
            console.log('Implementar cambios clickeado');
          }}
        />

        <Box sx={{ mt: 4 }}>
          <VistaServicioSeleccionado
            seccion={seccionActiva}
            agencia={agencia}
          />
        </Box>
      </Container>
    </Box>
  );
}

