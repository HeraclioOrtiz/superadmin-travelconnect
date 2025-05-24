'use client';

import { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { defaultAgenciaFormValues } from '../formDefaults';
import { useModalAgenciaGlobal } from '@/contexts/ModalAgenciaProvider';
import { useSubmitAgencia } from './useSubmitAgencia';
import type { AgenciaFormValues } from '@/contexts/features/Agencias/forms';

export const useAgenciaModalHandler = () => {
  const [submissionState, setSubmissionState] = useState<{
    status: 'idle' | 'loading' | 'success' | 'error';
    message?: string;
  }>({ status: 'idle' });

  const { closeModal, datosEdicion } = useModalAgenciaGlobal();
  const methods = useFormContext<AgenciaFormValues>();
  const { reset, getValues } = methods;
  const submitAgencia = useSubmitAgencia(datosEdicion ? { id: Number(datosEdicion.idAgencia) } : undefined);


  const handleSubmitClick = useCallback(async () => {
    console.groupCollapsed('[Modal] Inicio del proceso de envío');

    try {
      const formData = getValues();

      if (datosEdicion) {
        const confirm = window.confirm(`¿Seguro que desea modificar los datos de ${formData.nombre}?`);
        if (!confirm) return;
      }

      setSubmissionState({ status: 'loading', message: 'Enviando datos...' });

      const result = await submitAgencia(formData);

      if (!result.success) {
        throw new Error(result.message ?? 'Error al guardar los datos de la agencia');
      }

      setSubmissionState({ status: 'success', message: '¡Datos guardados correctamente!' });

      setTimeout(() => {
        reset(defaultAgenciaFormValues);
        closeModal();
        setSubmissionState({ status: 'idle' });
      }, 1500);
    } catch (error) {
      console.error('[Modal] ❌ Error al enviar la agencia:', error);
      setSubmissionState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Error desconocido al guardar',
      });

      setTimeout(() => {
        setSubmissionState({ status: 'idle' });
      }, 3000);
    } finally {
      console.groupEnd();
    }
  }, [datosEdicion, getValues, reset, closeModal, submitAgencia]);

  return {
    submissionState,
    handleSubmitClick,
  };
};

