// components/dashboard/Estilos/sections/PublicidadClienteSection.tsx
'use client';

import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Switch,
  Typography,
} from '@mui/material';
import { useAgenciaEdicionContext } from '@/contexts/features/Agencias/AgenciaEdicionProvider';
import type { AgenciaFormValues } from '@/contexts/features/Agencias/forms';

export function PublicidadClienteSection(): JSX.Element {
  const { values, setValue } = useAgenciaEdicionContext();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const parsed = type === 'checkbox' ? checked : value;
    setValue(name as keyof AgenciaFormValues, parsed);
  };

  const handleColor = (name: keyof AgenciaFormValues, value: string) => {
    setValue(name, value);
  };

  return (
    <>
      <Typography variant="h6">Publicidad Cliente</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="body2">¿Mostrar publicidad?</Typography>
          <Switch
            checked={values.publicidad_existe ?? false}
            onChange={(e) => handleInput({
              ...e,
              target: { ...e.target, name: 'publicidad_existe', type: 'checkbox' }
            } as React.ChangeEvent<HTMLInputElement>)}
            color="primary"
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel>Título de la Publicidad</InputLabel>
            <OutlinedInput
              name="publicidad_titulo"
              value={values.publicidad_titulo || ''}
              onChange={handleInput}
              label="Título"
            />
          </FormControl>
        </Grid>

        <Grid item md={6} xs={12}>
          <Typography variant="body2">Color de Tipografía</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <input
              type="color"
              value={values.publicidad_tipografia_color || '#000000'}
              onChange={(e) => handleColor('publicidad_tipografia_color', e.target.value)}
              style={{ width: 40, height: 40, borderRadius: '50%', border: 'none' }}
            />
            <OutlinedInput
              name="publicidad_tipografia_color"
              value={values.publicidad_tipografia_color || ''}
              onChange={handleInput}
            />
          </Box>
        </Grid>

        {(['publicidad_color_primario', 'publicidad_color_secundario', 'publicidad_color_terciario'] as const).map((campo) => (
          <Grid item md={4} xs={12} key={campo}>
            <Typography variant="body2">
              {campo.replace('publicidad_color_', 'Color ')}
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
