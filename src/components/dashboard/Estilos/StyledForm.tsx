'use client';

import * as React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Snackbar,
  Alert
} from '@mui/material';

import { useAgenciaEdicionContext } from '@/contexts/features/Agencias/AgenciaEdicionProvider';

import { IdentidadVisualSection } from './IdentidadVisualSection';
import { PaletaColoresSection } from './PaletaColoresSection';
import { EncabezadoSection } from './EncabezadoSection';
import { BuscadorSection } from './BuscadorSection';
import { PublicidadClienteSection } from './PublicidadClienteSection';
import { TarjetasSection } from './TarjetasSection';
import { BannerRegistroSection } from './BannerRegistroSection';
import { FooterSection } from './FooterSection';
import { ArchivosMultimediaSection } from './ArchivosMultimediaSection';

type TipoMensaje = {
  tipo: 'success' | 'error';
  texto: string;
};

export function StyledForm(): React.JSX.Element {
  const { guardarCambios } = useAgenciaEdicionContext();

  const [mensaje, setMensaje] = React.useState<TipoMensaje | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultado = await guardarCambios();
    if (resultado.success) {
      setMensaje({ tipo: 'success', texto: 'Cambios guardados con éxito' });
    } else {
      setMensaje({ tipo: 'error', texto: 'Hubo un error al guardar los cambios' });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            p: 0,
            display: 'flex',
            flexDirection: 'column',
            height: '80vh'
          }}
        >
          <CardHeader
            title="Estilos de la Agencia"
            subheader="Personalizá la identidad visual"
            sx={{
              textAlign: 'center',
              bgcolor: 'primary.light',
              color: 'white',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              py: 2
            }}
          />
          <Divider />
          <CardContent sx={{ flexGrow: 1, overflowY: 'auto', px: 3 }}>
            <Stack spacing={4} py={2}>
              <IdentidadVisualSection />
              <PaletaColoresSection />
              <EncabezadoSection />
              <BuscadorSection />
              <PublicidadClienteSection />
              <TarjetasSection />
              <BannerRegistroSection />
              <ArchivosMultimediaSection />
              <FooterSection />
            </Stack>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'center', p: 2 }}>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" color="secondary">
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Guardar cambios
              </Button>
            </Stack>
          </CardActions>
        </Card>
      </form>

      {/* Snackbar de feedback */}
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

