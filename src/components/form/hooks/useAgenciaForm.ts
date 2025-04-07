// src/components/form/hooks/useAgenciaForm.ts
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { defaultAgenciaFormValues } from '../formDefaults';
import { useModalAgenciaGlobal } from '@/contexts/ModalAgenciaProvider';
import { adaptarAgenciaParaEdicion } from './adaptarAgenciaParaEdicio';
import type { AgenciaFormValues } from '@/contexts/features/Agencias/forms';
import type { UrlsAgencia } from './adaptarAgenciaParaEdicio';

export const useAgenciaForm = () => {
  const { datosEdicion } = useModalAgenciaGlobal();

  const urlsRef = useRef<UrlsAgencia | null>(null);

  const methods = useForm<AgenciaFormValues>({
    mode: 'onChange',
    shouldUnregister: false,
    defaultValues: defaultAgenciaFormValues,
  });

  const { reset } = methods;

  useEffect(() => {
    if (datosEdicion) {
      const { valores, urlsAgencia } = adaptarAgenciaParaEdicion(datosEdicion);
      console.log('[useAgenciaForm] ✅ Modo edición, cargando datos:', valores);
      reset(valores);
      urlsRef.current = urlsAgencia;
    } else {
      console.log('[useAgenciaForm] 🧼 Modo creación, reseteando a default');
      reset(defaultAgenciaFormValues);
      urlsRef.current = null;
    }
  }, [datosEdicion, reset]);

  return {
    ...methods,
    urlsAgencia: urlsRef.current,
  };
};
