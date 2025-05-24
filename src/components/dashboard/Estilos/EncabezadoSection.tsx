// components/dashboard/Estilos/sections/EncabezadoSection.tsx
'use client';

import {
  Grid,
  Typography,
} from '@mui/material';
import { useAgenciaEdicionContext } from '@/contexts/features/Agencias/AgenciaEdicionProvider';

export function EncabezadoSection(): JSX.Element {
  const { values, setValue } = useAgenciaEdicionContext();

  return (
    <>
      <Typography variant="h6">Encabezado (Header)</Typography>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <Typography variant="body2">Opacidad de la Imagen</Typography>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={values.header_imagen_background_opacidad ?? 0.5}
            onChange={(e) =>
              setValue(
                'header_imagen_background_opacidad',
                parseFloat(e.target.value)
              )
            }
            style={{ width: '100%' }}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <Typography variant="body2">Opacidad del Video</Typography>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={values.header_video_background_opacidad ?? 0.5}
            onChange={(e) =>
              setValue(
                'header_video_background_opacidad',
                parseFloat(e.target.value)
              )
            }
            style={{ width: '100%' }}
          />
        </Grid>
      </Grid>
    </>
  );
}

