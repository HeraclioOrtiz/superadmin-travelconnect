'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { StyledForm } from '@/components/dashboard/Estilos/StyledForm';
import { useUserContext } from '@/contexts/user-context';
import { agenciasService } from '@/contexts/features/Agencias/services/agenciasService';
import { mapFormToPayload } from '@/contexts/features/Agencias/services/agenciaMapper';

export default function Page(): React.JSX.Element {
  const { user, agenciaRaw, actualizarAgenciaLocal } = useUserContext();

  const handleSubmitEstilos = React.useCallback(
    async (payloadUnknown: unknown) => {
      // StyledForm ya construye el payload con mapFormToPayload; solo tipamos
      const payload = payloadUnknown as ReturnType<typeof mapFormToPayload>;

      // Resolver ID (flujo Admin por ahora)
      const id =
        
        (user?.agencia_id as string | undefined) ?? agenciaRaw?.idAgencia;

      if (!id) {
        throw new Error('No se pudo resolver el ID de la agencia.');
      }

      console.groupCollapsed('[EstilosContainer] submit');
      console.info('ID usado:', id);

      const back = await agenciasService.update(id, payload);

      // Admin: rehidratar contexto local con BackData
      await actualizarAgenciaLocal(back);

      console.info('[EstilosContainer] OK');
      console.groupEnd();
    },
    [user, agenciaRaw, actualizarAgenciaLocal]
  );

  return (
    <Stack spacing={3}>
      {/* Título */}
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Configuración de Estilos</Typography>
        </Stack>
      </Stack>

      {/* Formulario visual */}
      <StyledForm onSubmitPayload={handleSubmitEstilos} />
    </Stack>
  );
}
