// components/dashboard/Estilos/sections/FooterSection.tsx
'use client';

import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Typography
} from '@mui/material';
import { useAgenciaEdicionContext } from '@/contexts/features/Agencias/AgenciaEdicionProvider';
import type { AgenciaFormValues } from '@/contexts/features/Agencias/forms';

export function FooterSection(): JSX.Element {
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
      <Typography variant="h6">Footer</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Texto del Footer</InputLabel>
            <OutlinedInput
              name="footer_texto"
              value={values.footer_texto || ''}
              onChange={handleInput}
              label="Texto del Footer"
            />
          </FormControl>
        </Grid>

        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel>Tipografía</InputLabel>
            <OutlinedInput
              name="footer_tipografia"
              value={values.footer_tipografia || ''}
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
              value={values.footer_tipografia_color || '#000000'}
              onChange={(e) => handleColor('footer_tipografia_color', e.target.value)}
              style={{ width: 40, height: 40, borderRadius: '50%', border: 'none' }}
            />
            <OutlinedInput
              name="footer_tipografia_color"
              value={values.footer_tipografia_color || ''}
              onChange={handleInput}
            />
          </Box>
        </Grid>

        {(['footer_color_primario', 'footer_color_secundario', 'footer_color_terciario'] as const).map((campo) => (
          <Grid item md={4} xs={12} key={campo}>
            <Typography variant="body2">
              {campo.replace('footer_color_', 'Color ')}
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
