'use client';

import * as React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  OutlinedInput,
  Grid,
} from '@mui/material';

import { useAgenciaActiva } from '@/contexts/features/Agencias/AgenciaActivaProvider';

export function AccountDetailsForm(): React.JSX.Element {
  const { agencia } = useAgenciaActiva();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader
          subheader="Los siguientes datos son los actuales de tu agencia"
          title="Detalles de la Agencia"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel shrink sx={{ mt: -1 }}>Nombre de la agencia</InputLabel>
                <OutlinedInput
                  defaultValue={agencia?.nombre ?? ''}
                  label="Nombre de la agencia"
                  name="nombre"
                />
              </FormControl>
            </Grid>

            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel shrink sx={{ mt: -1 }}>Email de contacto</InputLabel>
                <OutlinedInput
                  defaultValue={agencia?.contacto.email ?? ''}
                  label="Email de contacto"
                  name="email"
                />
              </FormControl>
            </Grid>

            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel shrink sx={{ mt: -1 }}>Teléfono</InputLabel>
                <OutlinedInput
                  defaultValue={agencia?.contacto.telefono ?? ''}
                  label="Teléfono"
                  name="telefono"
                />
              </FormControl>
            </Grid>

            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel shrink sx={{ mt: -1 }}>Dirección</InputLabel>
                <OutlinedInput
                  defaultValue={agencia?.ubicacion.direccion ?? ''}
                  label="Dirección"
                  name="direccion"
                />
              </FormControl>
            </Grid>

            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel shrink sx={{ mt: -1 }}>Ciudad</InputLabel>
                <OutlinedInput
                  defaultValue={agencia?.ubicacion.ciudad ?? ''}
                  label="Ciudad"
                  name="ciudad"
                />
              </FormControl>
            </Grid>

            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel shrink sx={{ mt: -1 }}>País</InputLabel>
                <OutlinedInput
                  defaultValue={agencia?.ubicacion.pais ?? ''}
                  label="País"
                  name="pais"
                />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button type="submit" variant="contained" disabled fullWidth>
            Guardar cambios (próximamente)
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
