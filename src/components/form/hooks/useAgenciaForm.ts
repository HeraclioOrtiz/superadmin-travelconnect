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
    // 🔄 Cuando se abre el modal, reiniciamos el estado de reset
    if (isOpen) setIsResetDone(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || isResetDone) return;

    if (datosEdicion) {
      const { valores, urlsAgencia } = adaptarAgenciaParaEdicion(datosEdicion);
      console.log('[useAgenciaForm] ✅ Modo edición, cargando datos:', valores);
      reset(valores);
      urlsRef.current = urlsAgencia;
      setIsResetDone(true);
    } else {
      console.log('[useAgenciaForm] 🧼 Modo creación, reseteando a default');
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
