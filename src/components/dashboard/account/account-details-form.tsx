'use client';

import * as React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  OutlinedInput,
  Grid,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';

import { useAgenciaEdicionContext } from '@/contexts/features/Agencias/AgenciaEdicionProvider';
import type { AgenciaFormValues } from '@/contexts/features/Agencias/forms';

type TipoMensaje = {
  tipo: 'success' | 'error';
  texto: string;
};

export function AccountDetailsForm(): React.JSX.Element {
  const { values, setValue, guardarCambios } = useAgenciaEdicionContext();
  const [mensaje, setMensaje] = React.useState<TipoMensaje | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    let parsed: any = value;

    if (type === 'number') {
      parsed = parseFloat(value);
    } else if (type === 'checkbox') {
      parsed = e.target.checked;
    }

    setValue(name as keyof AgenciaFormValues, parsed);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const resultado = await guardarCambios();
    if (resultado.success) {
      setMensaje({ tipo: 'success', texto: 'Cambios guardados con éxito' });
    } else {
      setMensaje({ tipo: 'error', texto: 'Error al guardar los cambios' });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader
            title="Perfil de la Agencia"
            subheader="Datos institucionales, contacto y redes"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              {/* Nombre */}
              <Grid item md={6} xs={12}>
                <FormControl fullWidth required>
                  <InputLabel shrink>Nombre de la Agencia</InputLabel>
                  <OutlinedInput
                    name="nombre"
                    value={values.nombre || ''}
                    onChange={handleInput}
                    label="Nombre de la Agencia"
                  />
                </FormControl>
              </Grid>

              {/* Contacto */}
              <Grid item md={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel shrink>Email de contacto</InputLabel>
                  <OutlinedInput
                    name="contacto_email"
                    value={values.contacto_email || ''}
                    onChange={handleInput}
                    label="Email de contacto"
                  />
                </FormControl>
              </Grid>

              <Grid item md={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel shrink>Teléfono</InputLabel>
                  <OutlinedInput
                    name="contacto_telefono"
                    value={values.contacto_telefono || ''}
                    onChange={handleInput}
                    label="Teléfono"
                  />
                </FormControl>
              </Grid>

              {/* Ubicación */}
              <Grid item md={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel shrink>Dirección</InputLabel>
                  <OutlinedInput
                    name="ubicacion_direccion"
                    value={values.ubicacion_direccion || ''}
                    onChange={handleInput}
                    label="Dirección"
                  />
                </FormControl>
              </Grid>

              <Grid item md={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel shrink>Ciudad</InputLabel>
                  <OutlinedInput
                    name="ubicacion_ciudad"
                    value={values.ubicacion_ciudad || ''}
                    onChange={handleInput}
                    label="Ciudad"
                  />
                </FormControl>
              </Grid>

              <Grid item md={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel shrink>País</InputLabel>
                  <OutlinedInput
                    name="ubicacion_pais"
                    value={values.ubicacion_pais || ''}
                    onChange={handleInput}
                    label="País"
                  />
                </FormControl>
              </Grid>

              {/* Información institucional */}
              <Grid item xs={12}>
                <Typography variant="subtitle1">Quiénes somos</Typography>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel shrink>Español</InputLabel>
                  <OutlinedInput
                    name="quienes_somos_es"
                    value={values.quienes_somos_es || ''}
                    onChange={handleInput}
                    label="Español"
                    multiline
                    minRows={2}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel shrink>Inglés</InputLabel>
                  <OutlinedInput
                    name="quienes_somos_en"
                    value={values.quienes_somos_en || ''}
                    onChange={handleInput}
                    label="Inglés"
                    multiline
                    minRows={2}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel shrink>Portugués</InputLabel>
                  <OutlinedInput
                    name="quienes_somos_pt"
                    value={values.quienes_somos_pt || ''}
                    onChange={handleInput}
                    label="Portugués"
                    multiline
                    minRows={2}
                  />
                </FormControl>
              </Grid>

              {/* Redes sociales */}
              <Grid item xs={12}>
                <Typography variant="subtitle1">Redes sociales</Typography>
              </Grid>

              <Grid item md={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel shrink>Facebook</InputLabel>
                  <OutlinedInput
                    name="redes_facebook"
                    value={values.redes_facebook || ''}
                    onChange={handleInput}
                    label="Facebook"
                  />
                </FormControl>
              </Grid>

              <Grid item md={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel shrink>Instagram</InputLabel>
                  <OutlinedInput
                    name="redes_instagram"
                    value={values.redes_instagram || ''}
                    onChange={handleInput}
                    label="Instagram"
                  />
                </FormControl>
              </Grid>

              <Grid item md={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel shrink>Twitter</InputLabel>
                  <OutlinedInput
                    name="redes_twitter"
                    value={values.redes_twitter || ''}
                    onChange={handleInput}
                    label="Twitter"
                  />
                </FormControl>
              </Grid>

              <Grid item md={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel shrink>WhatsApp</InputLabel>
                  <OutlinedInput
                    name="redes_whatsapp"
                    value={values.redes_whatsapp || ''}
                    onChange={handleInput}
                    label="WhatsApp"
                  />
                </FormControl>
              </Grid>

              {/* Términos y condiciones */}
              <Grid item xs={12}>
                <Typography variant="subtitle1">Términos y condiciones</Typography>
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                <Button
                  component="label"
                  variant="outlined"
                  color="primary"
                >
                  Importar PDF
                  <input
                    type="file"
                    hidden
                    accept="application/pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setValue('terminos_y_condiciones', file);
                    }}
                  />
                </Button>

                <Button
                  variant="outlined"
                  color="secondary"
                  disabled={typeof values.terminos_y_condiciones !== 'string'}
                  onClick={() => {
                    if (typeof values.terminos_y_condiciones === 'string') {
                      const url = values.terminos_y_condiciones;
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = 'terminos_y_condiciones.pdf';
                      link.target = '_blank';
                      link.click();
                    }
                  }}
                >
                  Exportar PDF
                </Button>
              </Grid>
            </Grid>
          </CardContent>

          <Divider />
          <CardActions sx={{ justifyContent: 'center', py: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Guardar cambios
            </Button>
          </CardActions>
        </Card>
      </form>

      {/* Snackbar */}
      {mensaje && (
        <Snackbar
          open
          autoHideDuration={4000}
          onClose={() => setMensaje(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setMensaje(null)}
            severity={mensaje.tipo}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {mensaje.texto}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

