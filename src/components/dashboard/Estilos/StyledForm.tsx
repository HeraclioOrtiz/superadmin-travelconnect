'use client';

import * as React from 'react';
import {
  Button, Card, CardActions, CardContent, CardHeader, Divider, FormControl,
  InputLabel, OutlinedInput, Grid, Stack, Typography, Box, Switch
} from '@mui/material';

export function StyledForm(): React.JSX.Element {
  // Estado local para almacenar los valores seleccionados
  const [data, setData] = React.useState({
    nombreAgencia: '',
    logoAgencia: '',
    tipografiaAgencia: '',
    colorTipografiaAgencia: '#000000',
    colorFondoApp: '#ffffff',
    colorPrimario: '#ff0000',
    colorSecundario: '#00ff00',
    colorTerciario: '#0000ff',
    imagenBackground: '',
    imagenBackgroundOpacidad: 50,
    videoBackground: '',
    videoBackgroundOpacidad: 50
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card sx={{ borderRadius: 2, boxShadow: 3, p: 3 }}>
        <CardHeader
          title="Configuración de Agencia"
          subheader="Datos Generales & Header"
          sx={{ textAlign: 'center', bgcolor: 'primary.light', color: 'white', borderRadius: 1 }}
        />
        <CardContent>
          {/* Your existing content here */}
        </CardContent>
          <Stack spacing={4}> {/* Más espacio entre secciones */}

            {/* 🔥 Datos Generales */}
            <Typography variant="h6">Datos Generales</Typography>
<Grid container spacing={3}>
  <Grid md={6} xs={12}>
    <FormControl fullWidth required>
      <InputLabel>Nombre de la Agencia</InputLabel>
      <OutlinedInput
        label="Nombre de la Agencia"
        name="nombreAgencia"
        value={data.nombreAgencia}
        onChange={handleChange}
      />
    </FormControl>
  </Grid>
  <Grid md={6} xs={12}>
    <FormControl fullWidth>
      <Typography variant="body2">Logo de la Agencia</Typography>
      <Button variant="contained" color="primary" fullWidth>
        Importar Logo
      </Button>
    </FormControl>
  </Grid>
  <Grid md={6} xs={12}>
    <FormControl fullWidth>
      <InputLabel>Tipografía</InputLabel>
      <OutlinedInput
        label="Tipografía"
        name="tipografiaAgencia"
        value={data.tipografiaAgencia}
        onChange={handleChange}
      />
    </FormControl>
  </Grid>
</Grid>

{/* 🔥 Selección de colores */}
<Typography variant="h6">Colores de la Agencia</Typography>
<Grid container spacing={3} alignItems="center">
  {/* Color de Tipografía */}
  <Grid md={4} xs={12}>
    <Typography variant="body2">Color de Tipografía</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <input
        type="color"
        name="colorTipografiaAgencia"
        value={data.colorTipografiaAgencia}
        onChange={handleChange}
        style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', cursor: 'pointer' }}
      />
      <OutlinedInput
        name="colorTipografiaAgencia"
        value={data.colorTipografiaAgencia}
        onChange={handleChange}
      />
    </Box>
  </Grid>

  {/* Color de Fondo */}
  <Grid md={4} xs={12}>
    <Typography variant="body2">Color de Fondo</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <input
        type="color"
        name="colorFondoApp"
        value={data.colorFondoApp}
        onChange={handleChange}
        style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', cursor: 'pointer' }}
      />
      <OutlinedInput
        name="colorFondoApp"
        value={data.colorFondoApp}
        onChange={handleChange}
      />
    </Box>
  </Grid>
</Grid>

{/* 🔥 Colores Primario, Secundario, Terciario */}
<Typography variant="h6">Colores de Marca</Typography>
<Grid container spacing={3} alignItems="center">
  {/* Color Primario */}
  <Grid md={4} xs={12}>
    <Typography variant="body2">Color Primario</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <input
        type="color"
        name="colorPrimario"
        value={data.colorPrimario}
        onChange={handleChange}
        style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', cursor: 'pointer' }}
      />
      <OutlinedInput
        name="colorPrimario"
        value={data.colorPrimario}
        onChange={handleChange}
      />
    </Box>
  </Grid>

  {/* Color Secundario */}
  <Grid md={4} xs={12}>
    <Typography variant="body2">Color Secundario</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <input
        type="color"
        name="colorSecundario"
        value={data.colorSecundario}
        onChange={handleChange}
        style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', cursor: 'pointer' }}
      />
      <OutlinedInput
        name="colorSecundario"
        value={data.colorSecundario}
        onChange={handleChange}
      />
    </Box>
  </Grid>

  {/* Color Terciario */}
  <Grid md={4} xs={12}>
    <Typography variant="body2">Color Terciario</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <input
        type="color"
        name="colorTerciario"
        value={data.colorTerciario}
        onChange={handleChange}
        style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', cursor: 'pointer' }}
      />
      <OutlinedInput
        name="colorTerciario"
        value={data.colorTerciario}
        onChange={handleChange}
      />
    </Box>
  </Grid>
</Grid>


            {/* 🔥 Header */}
<Divider />
<Typography variant="h6" sx={{ mt: 3 }}>Header</Typography>
<Grid container spacing={3}>
  {/* Imagen de Fondo */}
  <Grid md={6} xs={12}>
    <Typography variant="body2">Imagen de Fondo</Typography>
    <Button variant="contained" color="primary" fullWidth>
      Importar Imagen
    </Button>
  </Grid>

  {/* Opacidad Imagen */}
  <Grid md={6} xs={12}>
    <Typography variant="body2">Opacidad de la Imagen</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <input
        type="range"
        name="imagenBackgroundOpacidad"
        min="0"
        max="100"
        value={data.imagenBackgroundOpacidad}
        onChange={handleChange}
        style={{ width: '100%' }}
      />
      <Typography variant="body2" align="right">{data.imagenBackgroundOpacidad}%</Typography>
    </Box>
  </Grid>

  {/* Video de Fondo */}
  <Grid md={6} xs={12}>
    <Typography variant="body2">Video de Fondo</Typography>
    <Button variant="contained" color="primary" fullWidth>
      Importar Video
    </Button>
  </Grid>

  {/* Opacidad Video */}
  <Grid md={6} xs={12}>
    <Typography variant="body2">Opacidad del Video</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <input
        type="range"
        name="videoBackgroundOpacidad"
        min="0"
        max="100"
        value={data.videoBackgroundOpacidad}
        onChange={handleChange}
        style={{ width: '100%' }}
      />
      <Typography variant="body2" align="right">{data.videoBackgroundOpacidad}%</Typography>
    </Box>
  </Grid>
</Grid>
</Stack>
<CardContent />

<Divider />


<Divider />
<Divider />
<Typography variant="h6" sx={{ mt: 3 }}>Buscador</Typography>
<Grid container spacing={3} alignItems="center">
  
  {/* Tipografía */}
  <Grid md={6} xs={12}>
    <FormControl fullWidth>
      <InputLabel>Tipografía</InputLabel>
      <OutlinedInput label="Tipografía" name="buscadorTipografia" />
    </FormControl>
  </Grid>

  {/* Color de Tipografía */}
  <Grid md={6} xs={12}>
    <Typography variant="body2">Color de Tipografía</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <input
        type="color"
        name="buscadorTipografiaColor"
        style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', cursor: 'pointer' }}
      />
      <OutlinedInput name="buscadorTipografiaColor" />
    </Box>
  </Grid>

  {/* Color de Tipografía (Label) */}
  <Grid md={6} xs={12}>
    <Typography variant="body2">Color de Tipografía (Label)</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <input
        type="color"
        name="buscadorTipografiaColorLabel"
        style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', cursor: 'pointer' }}
      />
      <OutlinedInput name="buscadorTipografiaColorLabel" />
    </Box>
  </Grid>

  {/* Colores del Buscador */}
  <Grid md={4} xs={12}>
    <Typography variant="body2">Color Primario</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <input
        type="color"
        name="buscadorColorPrimario"
        style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', cursor: 'pointer' }}
      />
      <OutlinedInput name="buscadorColorPrimario" />
    </Box>
  </Grid>

  <Grid md={4} xs={12}>
    <Typography variant="body2">Color Secundario</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <input
        type="color"
        name="buscadorColorSecundario"
        style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', cursor: 'pointer' }}
      />
      <OutlinedInput name="buscadorColorSecundario" />
    </Box>
  </Grid>

  <Grid md={4} xs={12}>
    <Typography variant="body2">Color Terciario</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <input
        type="color"
        name="buscadorColorTerciario"
        style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', cursor: 'pointer' }}
      />
      <OutlinedInput name="buscadorColorTerciario" />
    </Box>
  </Grid>

</Grid>

<Divider />
<Typography variant="h6" sx={{ mt: 3 }}>Publicidad Cliente</Typography>

{/* Toggle para activar/desactivar Publicidad */}
<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
  <Typography variant="body2">¿Existe Publicidad?</Typography>
  <Switch
    name="publicidadExiste"
    onChange={(e) => {
      const section = document.getElementById("publicidad-section");
      if (section) {
        section.style.display = e.target.checked ? "block" : "none";
      }
    }}
  />
</Box>

{/* Contenedor que se oculta cuando el switch está apagado */}
<Box id="publicidad-section" sx={{ display: 'none' }}>
  <Grid container spacing={3} alignItems="center">

    {/* Título de la Publicidad */}
    <Grid md={6} xs={12}>
      <FormControl fullWidth>
        <InputLabel>Título de Publicidad</InputLabel>
        <OutlinedInput label="Título de Publicidad" name="publicidadTitulo" />
      </FormControl>
    </Grid>

    {/* Color de Tipografía */}
    <Grid md={6} xs={12}>
      <Typography variant="body2">Color de Tipografía</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <input
          type="color"
          name="publicidadTipografiaColor"
          style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', cursor: 'pointer' }}
        />
        <OutlinedInput name="publicidadTipografiaColor" />
      </Box>
    </Grid>

    {/* Colores de la Publicidad */}
    <Grid md={4} xs={12}>
      <Typography variant="body2">Color Primario</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <input
          type="color"
          name="publicidadColorPrimario"
          style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', cursor: 'pointer' }}
        />
        <OutlinedInput name="publicidadColorPrimario" />
      </Box>
    </Grid>

    <Grid md={4} xs={12}>
      <Typography variant="body2">Color Secundario</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <input
          type="color"
          name="publicidadColorSecundario"
          style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', cursor: 'pointer' }}
        />
        <OutlinedInput name="publicidadColorSecundario" />
      </Box>
    </Grid>

    <Grid md={4} xs={12}>
      <Typography variant="body2">Color Terciario</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <input
          type="color"
          name="publicidadColorTerciario"
          style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', cursor: 'pointer' }}
        />
        <OutlinedInput name="publicidadColorTerciario" />
      </Box>
    </Grid>

    {/* Imágenes de Publicidad */}
    <Grid md={4} xs={12}>
      <Typography variant="body2">Imagen 1</Typography>
      <Button variant="contained" color="primary" fullWidth>
        Importar Imagen 1
      </Button>
    </Grid>

    <Grid md={4} xs={12}>
      <Typography variant="body2">Imagen 2</Typography>
      <Button variant="contained" color="primary" fullWidth>
        Importar Imagen 2
      </Button>
    </Grid>

    <Grid md={4} xs={12}>
      <Typography variant="body2">Imagen 3</Typography>
      <Button variant="contained" color="primary" fullWidth>
        Importar Imagen 3
      </Button>
    </Grid>

  </Grid>
</Box>
<Divider />

<Typography variant="h6" sx={{ mt: 4, mb: 3 }}>Tarjetas</Typography>

<Grid container spacing={3} alignItems="center">

  {/* Título de las Tarjetas */}
  <Grid item md={6} xs={12}>
    <FormControl fullWidth>
      <InputLabel>Título de Tarjetas</InputLabel>
      <OutlinedInput label="Título de Tarjetas" name="tarjetasTitulo" />
    </FormControl>
  </Grid>

  {/* Tipografía */}
  <Grid item md={6} xs={12}>
    <FormControl fullWidth>
      <InputLabel>Tipografía</InputLabel>
      <OutlinedInput label="Tipografía" name="tarjetasTipografia" />
    </FormControl>
  </Grid>

  {/* Espaciado entre secciones */}
  <Grid item xs={12} sx={{ mt: 2 }} />

  {/* Color de Tipografía */}
  <Grid item xs={12}>
    <Typography variant="body2" sx={{ mb: 1 }}>Color de Tipografía</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <input
        type="color"
        name="tarjetasTipografiaColor"
        style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid #ccc', cursor: 'pointer' }}
      />
      <OutlinedInput name="tarjetasTipografiaColor" />
    </Box>
  </Grid>

  {/* Color de Tipografía (Título) */}
  <Grid item xs={12}>
    <Typography variant="body2" sx={{ mb: 1 }}>Color de Tipografía (Título)</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <input
        type="color"
        name="tarjetasTipografiaColorTitulo"
        style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid #ccc', cursor: 'pointer' }}
      />
      <OutlinedInput name="tarjetasTipografiaColorTitulo" />
    </Box>
  </Grid>

  {/* Color de Tipografía (Contenido) */}
  <Grid item xs={12}>
    <Typography variant="body2" sx={{ mb: 1 }}>Color de Tipografía (Contenido)</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <input
        type="color"
        name="tarjetasTipografiaColorContenido"
        style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid #ccc', cursor: 'pointer' }}
      />
      <OutlinedInput name="tarjetasTipografiaColorContenido" />
    </Box>
  </Grid>

  {/* Espaciado entre secciones */}
  <Grid item xs={12} sx={{ mt: 3 }} />

  {/* Colores de Tarjetas */}
  <Grid item xs={12}>
    <Typography variant="body2" sx={{ mb: 1 }}>Color Primario</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <input
        type="color"
        name="tarjetasColorPrimario"
        style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid #ccc', cursor: 'pointer' }}
      />
      <OutlinedInput name="tarjetasColorPrimario" />
    </Box>
  </Grid>

  <Grid item xs={12}>
    <Typography variant="body2" sx={{ mb: 1 }}>Color Secundario</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <input
        type="color"
        name="tarjetasColorSecundario"
        style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid #ccc', cursor: 'pointer' }}
      />
      <OutlinedInput name="tarjetasColorSecundario" />
    </Box>
  </Grid>

  <Grid item xs={12} sx={{ mb: 3 }}>
    <Typography variant="body2" sx={{ mb: 1 }}>Color Terciario</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <input
        type="color"
        name="tarjetasColorTerciario"
        style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid #ccc', cursor: 'pointer' }}
      />
      <OutlinedInput name="tarjetasColorTerciario" />
    </Box>
  </Grid>

</Grid>
<Divider />
<Typography variant="h6" sx={{ mt: 4, mb: 3 }}>Banner de Registro</Typography>

<Grid container spacing={3} alignItems="center">

  {/* Título del Banner */}
  <Grid item md={6} xs={12}>
    <FormControl fullWidth>
      <InputLabel>Título del Banner</InputLabel>
      <OutlinedInput label="Título del Banner" name="bannerRegistroTitulo" />
    </FormControl>
  </Grid>

  {/* Color de Tipografía */}
  <Grid item xs={12}>
    <Typography variant="body2" sx={{ mb: 1 }}>Color de Tipografía</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <input
        type="color"
        name="bannerRegistroTipografiaColor"
        style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid #ccc', cursor: 'pointer' }}
      />
      <OutlinedInput name="bannerRegistroTipografiaColor" />
    </Box>
  </Grid>

  {/* Espaciado entre secciones */}
  <Grid item xs={12} sx={{ mt: 3 }} />

  {/* Colores del Banner */}
  <Grid item xs={12}>
    <Typography variant="body2" sx={{ mb: 1 }}>Color Primario</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <input
        type="color"
        name="bannerRegistroColorPrimario"
        style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid #ccc', cursor: 'pointer' }}
      />
      <OutlinedInput name="bannerRegistroColorPrimario" />
    </Box>
  </Grid>

  <Grid item xs={12}>
    <Typography variant="body2" sx={{ mb: 1 }}>Color Secundario</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <input
        type="color"
        name="bannerRegistroColorSecundario"
        style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid #ccc', cursor: 'pointer' }}
      />
      <OutlinedInput name="bannerRegistroColorSecundario" />
    </Box>
  </Grid>

  <Grid item xs={12} sx={{ mb: 3 }}>
    <Typography variant="body2" sx={{ mb: 1 }}>Color Terciario</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <input
        type="color"
        name="bannerRegistroColorTerciario"
        style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid #ccc', cursor: 'pointer' }}
      />
      <OutlinedInput name="bannerRegistroColorTerciario" />
    </Box>
  </Grid>

</Grid>
<Divider />
<Typography variant="h6" sx={{ mt: 4, mb: 3 }}>Footer</Typography>

<Grid container spacing={3} alignItems="center">

  {/* Texto del Footer */}
  <Grid item xs={12}>
    <FormControl fullWidth>
      <InputLabel>Texto del Footer</InputLabel>
      <OutlinedInput label="Texto del Footer" name="footerTexto" />
    </FormControl>
  </Grid>

  {/* Tipografía del Footer */}
  <Grid item md={6} xs={12}>
    <FormControl fullWidth>
      <InputLabel>Tipografía del Footer</InputLabel>
      <OutlinedInput label="Tipografía" name="footerTipografia" />
    </FormControl>
  </Grid>

  {/* Color de Tipografía */}
  <Grid item md={6} xs={12}>
    <Typography variant="body2" sx={{ mb: 1 }}>Color de Tipografía</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <input
        type="color"
        name="footerTipografiaColor"
        style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid #ccc', cursor: 'pointer' }}
      />
      <OutlinedInput name="footerTipografiaColor" />
    </Box>
  </Grid>

  {/* Espaciado entre secciones */}
  <Grid item xs={12} sx={{ mt: 3 }} />

  {/* Colores del Footer */}
  <Grid item xs={12}>
    <Typography variant="body2" sx={{ mb: 1 }}>Color Primario</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <input
        type="color"
        name="footerColorPrimario"
        style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid #ccc', cursor: 'pointer' }}
      />
      <OutlinedInput name="footerColorPrimario" />
    </Box>
  </Grid>

  <Grid item xs={12}>
    <Typography variant="body2" sx={{ mb: 1 }}>Color Secundario</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <input
        type="color"
        name="footerColorSecundario"
        style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid #ccc', cursor: 'pointer' }}
      />
      <OutlinedInput name="footerColorSecundario" />
    </Box>
  </Grid>

  <Grid item xs={12} sx={{ mb: 3 }}>
    <Typography variant="body2" sx={{ mb: 1 }}>Color Terciario</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <input
        type="color"
        name="footerColorTerciario"
        style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid #ccc', cursor: 'pointer' }}
      />
      <OutlinedInput name="footerColorTerciario" />
    </Box>
  </Grid>

</Grid>



        <CardActions sx={{ justifyContent: 'center', p: 2 }}>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" color="secondary">Cancelar</Button>
            <Button variant="contained" color="primary">Guardar</Button>
          </Stack>
        </CardActions>
      </Card>
    </form>
  );
}
