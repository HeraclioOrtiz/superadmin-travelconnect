'use client';

import { useFormContext } from 'react-hook-form';
import {
  Box,
  Typography,
  Grid,
  Divider,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import InputFormulario from './InputFormulario';
import BotonImportarArchivo from './ImportButton';
import { usePrevisualizacionArchivo } from './hooks/usePrevisualizacionArchivo';
import { useModalAgenciaGlobal } from '@/contexts/ModalAgenciaProvider';

const Step1Basic = () => {
  const { register, watch, setValue } = useFormContext();
  const { datosEdicion } = useModalAgenciaGlobal();

  const logoFile = watch('logo');
  const faviconFile = watch('favicon');

  const logoPreview = usePrevisualizacionArchivo({
    campo: 'logo',
    archivo: logoFile instanceof File ? logoFile : null,
    urlOriginal: typeof datosEdicion?.logo === 'string' ? datosEdicion.logo : null,
    setValue,
  });

  const faviconPreview = usePrevisualizacionArchivo({
    campo: 'favicon',
    archivo: faviconFile instanceof File ? faviconFile : null,
    urlOriginal: null,
    setValue,
  });

  return (
    <Box
      sx={{
        py: 4,
        px: { xs: 2, sm: 3, md: 4 },
        '& section': {
          mb: 6,
        },
      }}
    >
      {/* ======= Información Básica ======= */}
      <Box component="section">
        <Typography variant="h6" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Información Básica
        </Typography>

        <FormControlLabel
          control={<Checkbox {...register('estado')} color="primary" />}
          label="Activar agencia"
        />

        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <InputFormulario label="Nombre" {...register('nombre')} />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputFormulario
              label="Contraseña"
              type="password"
              {...register('password')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputFormulario label="Dominio" {...register('dominio')} />
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* ======= Quiénes Somos ======= */}
      <Box component="section">
        <Typography variant="h6" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Quiénes Somos
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <InputFormulario label="Español" {...register('quienes_somos_es')} />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputFormulario label="Inglés" {...register('quienes_somos_en')} />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputFormulario label="Portugués" {...register('quienes_somos_pt')} />
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* ======= Archivos ======= */}
      <Box component="section">
        <Typography variant="h6" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Archivos
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <BotonImportarArchivo
              label="Importar Logo"
              accept="image/*"
              multiple={false}
              onChange={logoPreview.manejarCambio}
              register={register('logo')}
            />
            {logoPreview.urlPreview && (
              <Box
                component="img"
                src={logoPreview.urlPreview}
                alt="Logo"
                sx={{
                  width: 100,
                  height: 100,
                  objectFit: 'contain',
                  border: '1px solid #ccc',
                  borderRadius: 2,
                  mb: 2,
                }}
              />
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <BotonImportarArchivo
              label="Importar Favicon"
              accept="image/*"
              multiple={false}
              onChange={faviconPreview.manejarCambio}
              register={register('favicon')}
            />
            {faviconPreview.urlPreview && (
              <Box
                component="img"
                src={faviconPreview.urlPreview}
                alt="Favicon"
                sx={{
                  width: 64,
                  height: 64,
                  objectFit: 'contain',
                  border: '1px solid #ccc',
                  borderRadius: 2,
                  mb: 2,
                }}
              />
            )}
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* ======= Documentos Legales ======= */}
      <Box component="section">
        <Typography variant="h6" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Documentos Legales
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <BotonImportarArchivo
              label="Términos y Condiciones"
              accept=".pdf,.doc,.docx"
              multiple={false}
              register={register('terminos_y_condiciones')}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Step1Basic;

