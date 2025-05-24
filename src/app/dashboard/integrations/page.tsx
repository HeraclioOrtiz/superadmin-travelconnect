'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { StyledForm } from '@/components/dashboard/Estilos/StyledForm';
import { AgenciaEdicionProvider } from '@/contexts/features/Agencias/AgenciaEdicionProvider'; // ✅ Importación correcta

export default function Page(): React.JSX.Element {
  return (
    <AgenciaEdicionProvider> {/* ✅ Envoltura necesaria para edición */}
      <Stack spacing={3}>
        {/* Título y acciones */}
        <Stack direction="row" spacing={3}>
          <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">Configuración de Estilos</Typography>
            <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
              <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
                Importar
              </Button>
              <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
                Exportar
              </Button>
            </Stack>
          </Stack>
        </Stack>

        {/* Formulario visual */}
        <StyledForm />
      </Stack>
    </AgenciaEdicionProvider>
  );
}

