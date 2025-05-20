// components/dashboard/Estilos/sections/PaletaColoresSection.tsx
'use client';

import { Box, Grid, OutlinedInput, Typography } from '@mui/material';
import { useAgenciaEdicionContext } from '@/contexts/features/Agencias/AgenciaEdicionProvider';
import type { AgenciaFormValues } from '@/contexts/features/Agencias/forms';

export function PaletaColoresSection(): JSX.Element {
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
      <Typography variant="h6">Paleta de Colores</Typography>
      <Grid container spacing={3}>
        {(['color_principal', 'color_secundario', 'color_terciario'] as const).map((campo) => (
          <Grid item md={4} xs={12} key={campo}>
            <Typography variant="body2">
              {campo.replace('color_', 'Color ').replace('_', ' ')}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <input
                type="color"
                value={values[campo] || '#000000'}
                onChange={(e) => handleColor(campo, e.target.value)}
                style={{ width: 40, height: 40, borderRadius: '50%', border: 'none' }}
              />
              <OutlinedInput
                name={campo}
                value={values[campo] || ''}
                onChange={handleInput}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
