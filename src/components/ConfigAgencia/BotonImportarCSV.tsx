'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Button, Box, Snackbar, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { subirArchivoPaquetes } from './paquetespropiosService';

interface BotonImportarCSVProps {
  agenciaId: number;
  onSuccess?: (stats: {
    created: number;
    updated: number;
    deactivated: number;
    total_records: number;
    errors: number;
  }) => void;
  onError?: (mensaje: string) => void;
}

export const BotonImportarCSV: React.FC<BotonImportarCSVProps> = ({
  agenciaId,
  onSuccess,
  onError,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const [tipo, setTipo] = useState<'success' | 'error'>('success');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    console.log('🟢 BotonImportarCSV montado');
    console.log('🔍 agenciaId:', agenciaId);
  }, [agenciaId]);

  const handleClick = () => {
    console.log('✅ Click botón importar');
    if (!fileInputRef.current) {
      console.warn('⚠️ Input file no montado');
      return;
    }

    console.log('📎 Input file existe, disparando click');
    fileInputRef.current.click();
  };

  const handleArchivoSeleccionado = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('📥 Se ejecutó handleArchivoSeleccionado');
    const archivo = event.target.files?.[0];
    console.log('📂 Archivo recibido:', archivo);

    if (!archivo || !agenciaId) {
      console.warn('❌ Archivo no válido o agenciaId faltante');
      return;
    }

    try {
      console.log('📤 Enviando archivo al backend...');
      const response = await subirArchivoPaquetes(agenciaId, archivo);
      console.log('📨 Respuesta del backend:', response);

      if (response.status === 'success') {
        setTipo('success');
        setMensaje(response.message ?? 'CSV procesado correctamente.');
        onSuccess?.(response.stats);
      } else {
        setTipo('error');
        setMensaje(`Error: ${response.message}`);
        onError?.(response.message);
      }
    } catch (error) {
      console.error('💥 Error inesperado en subida:', error);
      setTipo('error');
      setMensaje('Error inesperado en la importación.');
    }

    setOpen(true);
    event.target.value = '';
  };

  return (
    <Box>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<CloudUploadIcon />}
        onClick={handleClick}
        sx={{ px: 4, py: 1.5, borderRadius: 2, textTransform: 'none' }}
      >
        Importar archivo
      </Button>

      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleArchivoSeleccionado}
        style={{ display: 'none' }}
      />

      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert
          onClose={() => setOpen(false)}
          severity={tipo}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {mensaje}
        </Alert>
      </Snackbar>
    </Box>
  );
};
