'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { ServiciosNavbar } from './ServiciosNavbar';
import {VistaServicioSeleccionado  } from './VistaServicioSeleccionado';

import { useServiciosUI } from './useServiciosUI';

export default function ServiciosPage() {
  const {
    secciones,
    seccionActiva,
    setSeccionActiva,
    seccionHabilitada,
  } = useServiciosUI();

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Configuración de Servicios de Agencia
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Barra lateral de servicios */}
        <ServiciosNavbar
          secciones={secciones}
          seccionSeleccionada={seccionActiva}
          onSeleccionarSeccion={setSeccionActiva}
          seccionHabilitada={seccionHabilitada}
          onImplementarCambios={() => {
            console.log('Implementar cambios clickeado');
          }}
        />

        {/* Contenido de la sección seleccionada */}
        <Box sx={{ mt: 4 }}>
          <VistaServicioSeleccionado seccion={seccionActiva} />
        </Box>
      </Container>
    </Box>
  );
}
