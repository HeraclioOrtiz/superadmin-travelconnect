// src/components/form/hooks/usePrevisualizacionArchivo.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import { UseFormSetValue } from 'react-hook-form';

interface UsePrevisualizacionArchivoParams {
  campo: string;
  archivo: File | string | null | undefined;
  urlOriginal: string | null;
  setValue: UseFormSetValue<any>;
}

export const usePrevisualizacionArchivo = ({
  campo,
  archivo,
  urlOriginal,
  setValue
}: UsePrevisualizacionArchivoParams) => {
  const [urlPreview, setUrlPreview] = useState<string | null>(urlOriginal ?? null);

  // 🧠 Si archivo es File, crear URL temporal
  useEffect(() => {
    if (archivo instanceof File) {
      const objectUrl = URL.createObjectURL(archivo);
      setUrlPreview(objectUrl);
      setValue(campo, archivo); // ✅ sincroniza con RHF

      return () => URL.revokeObjectURL(objectUrl); // Limpieza
    }

    // Si no hay archivo pero sí url original, usarla
    if (!archivo && urlOriginal) {
      setUrlPreview(urlOriginal);
    }

    // Si archivo es string (ya cargado), usarlo como preview
    if (typeof archivo === 'string') {
      setUrlPreview(archivo);
    }
  }, [archivo, urlOriginal, campo, setValue]);

  const manejarCambio = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevoArchivo = e.target.files?.[0] ?? null;
    setValue(campo, nuevoArchivo); // ✅ actualiza RHF
  }, [campo, setValue]);

  const limpiarArchivo = useCallback(() => {
    setValue(campo, null);
    setUrlPreview(urlOriginal ?? null);
  }, [campo, setValue, urlOriginal]);

  return {
    urlPreview,
    manejarCambio,
    limpiarArchivo
  };
};


