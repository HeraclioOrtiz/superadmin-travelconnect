'use client';

import { Container, Stack, Typography } from '@mui/material';
import { useUserContext } from '@/contexts/user-context';

import { TablaAgenciasResumen } from '@/components/paquetesPropios/TablaAgenciasResumen';
import ModalPaquetePropio from '@/components/paquetesPropios/modal/ModalPaquetePropio';
import ModalSalidas from '@/components/paquetesPropios/modal/ModalSalida';
import VistaPaquetesAdmin from '@/components/paquetesPropios/VistaPaquetesAdmin'; // ✅ nuevo componente admin

export default function PaquetesPropiosPage() {
  const { user, isLoading } = useUserContext();

  if (isLoading) return null;

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h6" color="error">
          Usuario no autenticado o sin permisos.
        </Typography>
      </Container>
    );
  }

  const esSuperadmin = user.rol === 'superadmin';
  const esAdminConAgencia = user.rol === 'admin' && !!user.agencia_id;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Typography variant="h4" fontWeight={600}>
          Paquetes Propios {esSuperadmin ? 'por Agencia' : 'de la Agencia'}
        </Typography>

        <Typography variant="body1" color="text.secondary">
          {esSuperadmin
            ? 'Visualizá y gestioná los paquetes propios asociados a cada agencia.'
            : 'Visualizá y gestioná los paquetes propios de tu agencia.'}
        </Typography>

        {esSuperadmin && <TablaAgenciasResumen />}

        {esAdminConAgencia && (
          <VistaPaquetesAdmin agenciaId={user.agencia_id!} />
        )}

        <ModalPaquetePropio />
        <ModalSalidas />
      </Stack>
    </Container>
  );
}
