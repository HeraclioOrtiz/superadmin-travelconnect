'use client';

import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { useAgenciaEdicionContext } from '@/contexts/features/Agencias/AgenciaEdicionProvider';
import type { AgenciaFormValues } from '@/contexts/features/Agencias/forms';

export function TarjetasSection() {
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
      <Typography variant="h6">Tarjetas</Typography>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel>Título</InputLabel>
            <OutlinedInput
              label="Título"
              name="tarjetas_titulo"
              value={values.tarjetas_titulo || ''}
              onChange={handleInput}
            />
          </FormControl>
        </Grid>

        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel>Tipografía</InputLabel>
            <OutlinedInput
              label="Tipografía"
              name="tarjetas_tipografia"
              value={values.tarjetas_tipografia || ''}
              onChange={handleInput}
            />
          </FormControl>
        </Grid>

        {(['tarjetas_tipografia_color', 'tarjetas_tipografia_color_titulo', 'tarjetas_tipografia_color_contenido'] as const).map((campo) => (
          <Grid item md={4} xs={12} key={campo}>
            <Typography variant="body2">
              {campo.replace('tarjetas_', '').replace(/_/g, ' ')}
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

        {(['tarjetas_color_primario', 'tarjetas_color_secundario', 'tarjetas_color_terciario'] as const).map((campo) => (
          <Grid item md={4} xs={12} key={campo}>
            <Typography variant="body2">
              {campo.replace('tarjetas_', 'Color ').replace(/_/g, ' ')}
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
