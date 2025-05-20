// components/dashboard/Estilos/sections/BuscadorSection.tsx
'use client';

import { Box, FormControl, Grid, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { useAgenciaEdicionContext } from '@/contexts/features/Agencias/AgenciaEdicionProvider';
import type { AgenciaFormValues } from '@/contexts/features/Agencias/forms';

export function BuscadorSection(): JSX.Element {
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
      <Typography variant="h6">Buscador</Typography>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel>Tipografía</InputLabel>
            <OutlinedInput
              name="buscador_tipografia"
              value={values.buscador_tipografia || ''}
              onChange={handleInput}
              label="Tipografía"
            />
          </FormControl>
        </Grid>

        <Grid item md={6} xs={12}>
          <Typography variant="body2">Color de Tipografía</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <input
              type="color"
              value={values.buscador_tipografia_color || '#000000'}
              onChange={(e) => handleColor('buscador_tipografia_color', e.target.value)}
              style={{ width: 40, height: 40, borderRadius: '50%', border: 'none' }}
            />
            <OutlinedInput
              name="buscador_tipografia_color"
              value={values.buscador_tipografia_color || ''}
              onChange={handleInput}
            />
          </Box>
        </Grid>

        <Grid item md={6} xs={12}>
          <Typography variant="body2">Color del Label</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <input
              type="color"
              value={values.buscador_tipografia_color_label || '#000000'}
              onChange={(e) => handleColor('buscador_tipografia_color_label', e.target.value)}
              style={{ width: 40, height: 40, borderRadius: '50%', border: 'none' }}
            />
            <OutlinedInput
              name="buscador_tipografia_color_label"
              value={values.buscador_tipografia_color_label || ''}
              onChange={handleInput}
            />
          </Box>
        </Grid>

        <Grid item md={6} xs={12}>
          <Typography variant="body2">Color de Fondo del Input</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <input
              type="color"
              value={values.buscador_inputFondoColor || '#ffffff'}
              onChange={(e) => handleColor('buscador_inputFondoColor', e.target.value)}
              style={{ width: 40, height: 40, borderRadius: '50%', border: 'none' }}
            />
            <OutlinedInput
              name="buscador_inputFondoColor"
              value={values.buscador_inputFondoColor || ''}
              onChange={handleInput}
            />
          </Box>
        </Grid>

        <Grid item md={6} xs={12}>
          <Typography variant="body2">Color del Input</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <input
              type="color"
              value={values.buscador_inputColor || '#000000'}
              onChange={(e) => handleColor('buscador_inputColor', e.target.value)}
              style={{ width: 40, height: 40, borderRadius: '50%', border: 'none' }}
            />
            <OutlinedInput
              name="buscador_inputColor"
              value={values.buscador_inputColor || ''}
              onChange={handleInput}
            />
          </Box>
        </Grid>

        {(['buscador_color_primario', 'buscador_color_secundario', 'buscador_color_terciario'] as const).map((campo) => (
          <Grid item md={4} xs={12} key={campo}>
            <Typography variant="body2">
              {campo.replace('buscador_color_', 'Color ')}
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
