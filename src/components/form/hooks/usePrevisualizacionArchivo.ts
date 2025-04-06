// src/components/form/hooks/usePrevisualizacionArchivo.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import { UseFormSetValue } from 'react-hook-form';

interface UsePrevisualizacionArchivoParams {
  campo: string;
  archivo: File | null;
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

  // Genera una URL local para el archivo subido
  useEffect(() => {
    if (!archivo) return;

    const objectUrl = URL.createObjectURL(archivo);
    setUrlPreview(objectUrl);
    setValue(campo, archivo); // ✅ sincroniza con RHF

    return () => URL.revokeObjectURL(objectUrl); // Limpia al desmontar o cambiar archivo
  }, [archivo, campo, setValue]);

  // Actualiza la previsualización si cambia la URL original (modo edición)
  useEffect(() => {
    if (!archivo && urlOriginal) {
      setUrlPreview(urlOriginal);
    }
  }, [urlOriginal, archivo]);

  // Manejador de cambio de archivo
  const manejarCambio = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevoArchivo = e.target.files?.[0] ?? null;
    setValue(campo, nuevoArchivo); // ✅ actualiza RHF
  }, [campo, setValue]);

  // Limpia archivo (previsualización y RHF)
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
