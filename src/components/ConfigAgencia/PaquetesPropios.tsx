'use client';
import { Box, Button, Stack, Typography } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export const VistaPaquetesPropios = () => {
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

        <Button
          variant="outlined"
          color="primary"
          startIcon={<CloudUploadIcon />}
          sx={{ px: 4, py: 1.5, borderRadius: 2, textTransform: 'none' }}
        >
          Importar archivo
        </Button>
      </Stack>
    </Box>
  );
};
