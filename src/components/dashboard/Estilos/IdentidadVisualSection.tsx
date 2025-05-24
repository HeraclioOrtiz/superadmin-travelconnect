// components/dashboard/Estilos/sections/IdentidadVisualSection.tsx
'use client';

import React from 'react';
import { Box, FormControl, Grid, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { useAgenciaEdicionContext } from '@/contexts/features/Agencias/AgenciaEdicionProvider';
import type { AgenciaFormValues } from '@/contexts/features/Agencias/forms';

export function IdentidadVisualSection() {
  const { values, setValue } = useAgenciaEdicionContext();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue(name as keyof AgenciaFormValues, value);
  };

  const handleColor = (name: keyof AgenciaFormValues, value: string) => {
    setValue(name, value);
  };

  return (
    <>
      <Typography variant="h6">Identidad Visual</Typography>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel>Tipografía de la Agencia</InputLabel>
            <OutlinedInput
              label="Tipografía"
              name="tipografia_agencia"
              value={values.tipografia_agencia || ''}
              onChange={handleInput}
            />
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <Typography variant="body2">Color de Tipografía</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <input
                type="color"
                value={values.color_tipografia_agencia || '#000000'}
                onChange={(e) => handleColor('color_tipografia_agencia', e.target.value)}
                style={{ width: 40, height: 40, borderRadius: '50%', border: 'none' }}
              />
              <OutlinedInput
                name="color_tipografia_agencia"
                value={values.color_tipografia_agencia || ''}
                onChange={handleInput}
              />
            </Box>
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <Typography variant="body2">Color de Fondo</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <input
                type="color"
                value={values.color_fondo_app || '#ffffff'}
                onChange={(e) => handleColor('color_fondo_app', e.target.value)}
                style={{ width: 40, height: 40, borderRadius: '50%', border: 'none' }}
              />
              <OutlinedInput
                name="color_fondo_app"
                value={values.color_fondo_app || ''}
                onChange={handleInput}
              />
            </Box>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}

