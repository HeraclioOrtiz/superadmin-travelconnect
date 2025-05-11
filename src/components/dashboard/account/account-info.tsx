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

import { useAgenciaActiva } from '@/contexts/features/Agencias/AgenciaActivaProvider';

export function AccountInfo(): React.JSX.Element {
  const { agencia } = useAgenciaActiva();

  const logoUrl = agencia?.logo
    ? `https://travelconnect.com.ar/storage/${agencia.logo}`
    : '/assets/avatar.png';

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <Avatar src={logoUrl} sx={{ height: '80px', width: '80px' }} />
          <Stack spacing={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h5">
              {agencia?.nombre ?? 'Agencia desconocida'}
            </Typography>
            {(agencia?.footer_ciudad || agencia?.footer_pais) && (
              <Typography color="text.secondary" variant="body2">
                {agencia.footer_ciudad ?? ''} {agencia.footer_pais ?? ''}
              </Typography>
            )}
            {agencia?.footer_email && (
              <Typography color="text.secondary" variant="body2">
                {agencia.footer_email}
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
