'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useAgenciaEdicion } from '@/contexts/features/Agencias/useAgenciaEdicion';

export function AccountInfo(): React.JSX.Element {
  const { values } = useAgenciaEdicion();

  const logoUrl = '/assets/avatar.png'; // ⚠️ Placeholder (aún no editable dinámicamente)

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <Avatar src={logoUrl} sx={{ height: '80px', width: '80px' }} />
          <Stack spacing={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h5">
              {values.nombre || 'Agencia desconocida'}
            </Typography>
            {(values.ubicacion_ciudad || values.ubicacion_pais) && (
              <Typography color="text.secondary" variant="body2">
                {values.ubicacion_ciudad || ''} {values.ubicacion_pais || ''}
              </Typography>
            )}
            {values.contacto_email && (
              <Typography color="text.secondary" variant="body2">
                {values.contacto_email}
              </Typography>
            )}
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text" disabled>
          Subir logo (próximamente)
        </Button>
      </CardActions>
    </Card>
  );
}

