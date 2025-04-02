import { useFormContext } from 'react-hook-form';
import { useAgenciasContext } from '@/contexts/features/Agencias/AgenciaProvider';
import type { AgenciaFormValues } from '@/contexts/features/Agencias/forms';
import useModalAgencia from './useModalAgencia';

export const useSubmitAgencia = () => {
  const methods = useFormContext<AgenciaFormValues>();
  const { actions } = useAgenciasContext();
  const { closeModal } = useModalAgencia();

  const submitAgencia = methods.handleSubmit(async (data) => {
    await actions.createAgencia(data);
    closeModal(); // ✅ Cerramos el modal automáticamente
  });

  return submitAgencia;
};
