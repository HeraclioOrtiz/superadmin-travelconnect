'use client';
import * as React from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Checkbox,
  Divider,
  Button,
  Typography,
} from '@mui/material';

interface ServiciosNavbarProps {
  secciones: string[];
  seccionSeleccionada: string;
  onSeleccionarSeccion: (seccion: string) => void;
  onImplementarCambios: () => void;
}

export const ServiciosNavbar = ({
  secciones,
  seccionSeleccionada,
  onSeleccionarSeccion,
  onImplementarCambios,
}: ServiciosNavbarProps) => {
  // Estado interno: registro de cada servicio y si está activado o no.
  const [activados, setActivados] = React.useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    secciones.forEach((s) => {
      initial[s] = false;
    });
    return initial;
  });

  // Función para alternar (toggle) la activación del servicio.
  const handleToggle = (
    service: string,
    event: React.MouseEvent | React.ChangeEvent<HTMLInputElement>
  ) => {
    event.stopPropagation(); // Evita que se dispare el onClick del ítem.
    setActivados((prev) => ({ ...prev, [service]: !prev[service] }));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Servicios
      </Typography>
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        {secciones.map((service) => (
          <ListItemButton
            key={service}
            selected={seccionSeleccionada === service}
            onClick={() => {
              // Solo se permite la selección si el servicio está activado.
              if (activados[service]) {
                onSeleccionarSeccion(service);
              }
            }}
          >
            <Checkbox
              edge="start"
              checked={activados[service]}
              onChange={(e) => handleToggle(service, e)}
              onClick={(e) => e.stopPropagation()}
            />
            <ListItemText primary={service} />
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={onImplementarCambios}
        >
          Implementar cambios
        </Button>
      </Box>
    </Box>
  );
};
