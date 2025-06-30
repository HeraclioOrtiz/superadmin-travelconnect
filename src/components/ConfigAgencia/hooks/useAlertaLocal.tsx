'use client';

import { useState, useEffect } from 'react';
import { Alert, Collapse } from '@mui/material';
import type { AlertColor } from '@mui/material';
import type { JSX } from 'react';

type AlertaEstado = {
  open: boolean;
  mensaje: string;
  severidad: AlertColor; // 'success' | 'error' | 'info' | 'warning'
};

export const useAlertaLocal = () => {
  const [alerta, setAlerta] = useState<AlertaEstado>({
    open: false,
    mensaje: '',
    severidad: 'info',
  });

  useEffect(() => {
    if (alerta.open) {
      const timer = setTimeout(() => {
        setAlerta((prev) => ({ ...prev, open: false }));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [alerta.open]);

  const mostrarAlerta = (mensaje: string, severidad: AlertColor = 'info') => {
    setAlerta({ open: true, mensaje, severidad });
  };

  const alertaJSX: JSX.Element = (
    <Collapse in={alerta.open} sx={{ width: '100%' }}>
      <Alert
        severity={alerta.severidad}
        onClose={() => setAlerta((prev) => ({ ...prev, open: false }))}
        sx={{ mb: 2 }}
        variant="filled"
      >
        {alerta.mensaje}
      </Alert>
    </Collapse>
  );

  return {
    mostrarAlerta,
    alertaJSX,
  };
};
