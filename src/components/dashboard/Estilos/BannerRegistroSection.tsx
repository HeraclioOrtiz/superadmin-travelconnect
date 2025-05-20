// components/dashboard/Estilos/sections/BannerRegistroSection.tsx
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

export function BannerRegistroSection(): JSX.Element {
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
      <Typography variant="h6">Banner de Registro</Typography>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel>Título del Banner</InputLabel>
            <OutlinedInput
              name="banner_registro_titulo"
              value={values.banner_registro_titulo || ''}
              onChange={handleInput}
              label="Título del Banner"
            />
          </FormControl>
        </Grid>

        <Grid item md={6} xs={12}>
          <Typography variant="body2">Color de Tipografía</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <input
              type="color"
              value={values.banner_registro_tipografia_color || '#000000'}
              onChange={(e) =>
                handleColor('banner_registro_tipografia_color', e.target.value)
              }
              style={{ width: 40, height: 40, borderRadius: '50%', border: 'none' }}
            />
            <OutlinedInput
              name="banner_registro_tipografia_color"
              value={values.banner_registro_tipografia_color || ''}
              onChange={handleInput}
            />
          </Box>
        </Grid>

        {(['banner_registro_color_primario', 'banner_registro_color_secundario', 'banner_registro_color_terciario'] as const).map((campo) => (
          <Grid item md={4} xs={12} key={campo}>
            <Typography variant="body2">
              {campo.replace('banner_registro_color_', 'Color ')}
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
