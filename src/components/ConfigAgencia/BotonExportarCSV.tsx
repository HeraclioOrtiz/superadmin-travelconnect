'use client';

import React from 'react';
import { Button } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

import { exportarArchivoPaquetes } from './paquetespropiosService';

interface BotonExportarCSVProps {
  agenciaId: number;
  onError?: (mensaje: string) => void;
}

export const BotonExportarCSV: React.FC<BotonExportarCSVProps> = ({ agenciaId, onError }) => {
  const handleExportar = async () => {
    console.log('📤 Click exportar archivo → solicitando CSV para agencia:', agenciaId);

    const downloadUrl = await exportarArchivoPaquetes(agenciaId);

    if (downloadUrl) {
      console.log('✅ URL recibida:', downloadUrl);
      window.open(downloadUrl, '_blank'); // abre nueva pestaña o descarga directa
    } else {
      console.warn('❌ No se pudo exportar el archivo');
      onError?.('No se pudo exportar el archivo');
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<CloudDownloadIcon />}
      onClick={handleExportar}
      sx={{ px: 4, py: 1.5, borderRadius: 2, textTransform: 'none' }}
    >
      Exportar archivo
    </Button>
  );
};

