'use client';

import {
  Box,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import { useAgenciaEdicionContext } from '@/contexts/features/Agencias/AgenciaEdicionProvider';

export function ArchivosMultimediaSection(): JSX.Element {
  const { values, setValue } = useAgenciaEdicionContext();

  // 🐞 DEBUG: Verificar qué datos llegan
  console.log('🧾 Archivos multimedia recibidos:', {
    logo: values.logo,
    favicon: values.favicon,
    header_imagen_background: values.header_imagen_background,
    header_video_background: values.header_video_background,
    publicidad_imagen_1: values.publicidad_imagen_1,
    publicidad_imagen_2: values.publicidad_imagen_2,
    publicidad_imagen_3: values.publicidad_imagen_3,
  });

  const handleFile = (name: keyof typeof values, file: File | null) => {
    setValue(name, file);
  };

  const renderInputArchivo = (label: string, name: keyof typeof values) => {
    const valor = values[name] as unknown;

    const mostrarNombre = () => {
      if (valor instanceof File) return valor.name;
      if (typeof valor === 'string') return 'Archivo cargado';
      return 'Ningún archivo seleccionado';
    };

    const mostrarPreview = () => {
      if (typeof valor === 'string') {
        const lowerUrl = valor.toLowerCase();

        if (/\.(jpg|jpeg|png|webp|gif|svg|ico)$/.test(lowerUrl)) {
          return <img src={valor} alt={label} style={{ maxHeight: 60, borderRadius: 4 }} />;
        }

        if (/\.(mp4|webm|ogg)$/.test(lowerUrl)) {
          return (
            <video src={valor} style={{ maxHeight: 80 }} controls muted />
          );
        }

        if (lowerUrl.endsWith('.pdf')) {
          return (
            <embed src={valor} type="application/pdf" width="100%" height="100px" />
          );
        }

        return (
          <Typography variant="caption" color="text.secondary">
            Archivo disponible: <a href={valor} target="_blank" rel="noopener noreferrer">ver</a>
          </Typography>
        );
      }

      return null;
    };

    return (
      <Grid item md={6} xs={12} key={name}>
        <Typography variant="body2">{label}</Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button
            component="label"
            variant="outlined"
            color="primary"
          >
            Seleccionar archivo
            <input
              hidden
              type="file"
              accept="image/*,video/*,.pdf"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                handleFile(name, file);
              }}
            />
          </Button>
          <Typography variant="caption">{mostrarNombre()}</Typography>
          {mostrarPreview()}
        </Box>
      </Grid>
    );
  };

  return (
    <>
      <Typography variant="h6">Archivos multimedia</Typography>
      <Grid container spacing={3}>
        {renderInputArchivo('Logo', 'logo')}
        {renderInputArchivo('Favicon', 'favicon')}
        {renderInputArchivo('Imagen de fondo del header', 'header_imagen_background')}
        {renderInputArchivo('Video de fondo del header', 'header_video_background')}
        {renderInputArchivo('Imagen de publicidad 1', 'publicidad_imagen_1')}
        {renderInputArchivo('Imagen de publicidad 2', 'publicidad_imagen_2')}
        {renderInputArchivo('Imagen de publicidad 3', 'publicidad_imagen_3')}
      </Grid>
    </>
  );
}
