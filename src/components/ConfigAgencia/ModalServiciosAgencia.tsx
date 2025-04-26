'use client';
import { useState } from 'react';
import {
  Box,
  Modal,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ServiciosNavbar } from './ServiciosNavbar';
import { VistaServicioSeleccionado } from './VistaServicioSeleccionado';

interface ModalServiciosAgenciaProps {
  open: boolean;
  onClose: () => void;
}

// ✅ Secciones oficiales del modal de servicios
const SECCIONES = [
  'APIs de terceros',
  'Paquetes propios',
  'CRM Atlas',
  'Hotelería',
  'Circuitos',
  'Vuelos',
  'MercadoPago',
];

export const ModalServiciosAgencia = ({
  open,
  onClose,
}: ModalServiciosAgenciaProps) => {
  const [seccionSeleccionada, setSeccionSeleccionada] = useState(SECCIONES[0]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleImplementarCambios = () => {
    console.log('[🔧 Implementar cambios] → datos aún no implementados');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '90%' : '80%',
          height: isMobile ? '90%' : 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
        }}
      >
        {/* 🧭 Navbar */}
        <ServiciosNavbar
          secciones={SECCIONES}
          seccionSeleccionada={seccionSeleccionada}
          onSeleccionarSeccion={setSeccionSeleccionada}
          onImplementarCambios={handleImplementarCambios}
        />

        {/* 📄 Contenido dinámico */}
        <VistaServicioSeleccionado seccion={seccionSeleccionada} />
      </Box>
    </Modal>
  );
};
