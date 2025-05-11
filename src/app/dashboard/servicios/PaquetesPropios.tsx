'use client';

import { Box, Button, Stack, Typography } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

import { BotonImportarCSV } from '@/components/ConfigAgencia/BotonImportarCSV';
import { useAgenciaActiva } from '@/contexts/features/Agencias/AgenciaActivaProvider';

const PaquetesPropios = (): React.JSX.Element => {
  const { agencia } = useAgenciaActiva();

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" align="center">
          Gestión de Paquetes Propios
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          sx={{ maxWidth: 500, mt: 1 }}
        >
          Aquí podrás exportar un archivo con los paquetes actuales o importar uno nuevo con
          modificaciones. El archivo será enviado junto con los cambios al confirmar.
        </Typography>
      </Box>

      <Stack direction="row" spacing={4} sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<CloudDownloadIcon />}
          sx={{ px: 4, py: 1.5, borderRadius: 2, textTransform: 'none' }}
        >
          Exportar archivo
        </Button>

        {agencia?.id && <BotonImportarCSV agenciaId={agencia.id} />}
      </Stack>
    </Box>
  );
};

export default PaquetesPropios;
