// src/components/form/hooks/useAgenciaForm.ts
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { defaultAgenciaFormValues } from '../formDefaults';
import { useModalAgenciaGlobal } from '@/contexts/ModalAgenciaProvider';
import { adaptarAgenciaParaEdicion } from './adaptarAgenciaParaEdicio';
import type { AgenciaFormValues } from '@/contexts/features/Agencias/forms';
import type { UrlsAgencia } from './adaptarAgenciaParaEdicio';

export const useAgenciaForm = () => {
  const { datosEdicion, isOpen } = useModalAgenciaGlobal();
  const [isResetDone, setIsResetDone] = useState(false);
  const urlsRef = useRef<UrlsAgencia | null>(null);

  const methods = useForm<AgenciaFormValues>({
    mode: 'onChange',
    shouldUnregister: false,
    defaultValues: defaultAgenciaFormValues,
  });

  const { reset } = methods;

  useEffect(() => {
    if (isOpen) setIsResetDone(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || isResetDone) return;

    console.log('[useAgenciaForm] 🧪 datosEdicion recibido:', datosEdicion);

    if (datosEdicion) {
      const { valores, urlsAgencia } = adaptarAgenciaParaEdicion(datosEdicion);
      console.log('[useAgenciaForm] ✅ Modo edición, cargando valores:', valores);
      reset(valores);
      urlsRef.current = urlsAgencia;
      setIsResetDone(true);
    } else {
      console.log('[useAgenciaForm] 🧼 Modo creación, usando default');
      reset(defaultAgenciaFormValues);
      urlsRef.current = null;
      setIsResetDone(true);
    }
  }, [datosEdicion, isOpen, isResetDone, reset]);

  return {
    ...methods,
    urlsAgencia: urlsRef.current,
  };
};
