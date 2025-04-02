import { AgenciaFormValues, CreateAgenciaResponse } from '../forms';
import { Agencia, AgenciasContextState } from '../types';

export const createAgencia = async (
  formData: AgenciaFormValues,
  contextState: AgenciasContextState,
  stateMethods: {
    addTempAgencia: (tempAgencia: Omit<Agencia, 'id'>) => string;
    confirmAgencia: (tempId: string, realAgencia: Agencia) => void;
    revertTempAgencia: (tempId: string) => void;
    setError: (error: string | null) => void;
  }
): Promise<CreateAgenciaResponse> => {
  // 1. Preparar datos temporales (con tipo explícito)
  const tempAgenciaData: Omit<Agencia, 'id'> = {
    ...formData,
    fecha_creacion: new Date().toISOString(),
    // Aseguramos valores nulos donde corresponda
    quienes_somos_es: formData.quienes_somos_es ?? null,
    quienes_somos_en: formData.quienes_somos_en ?? null,
    quienes_somos_pt: formData.quienes_somos_pt ?? null,
    // Podés repetir lo mismo con otros campos opcionales si el backend lo necesita
  };

  // 2. Optimistic Update
  const tempId = stateMethods.addTempAgencia(tempAgenciaData);

  // 3. Llamada API
  try {
    const response = await fetch('https://triptest.com.ar/store_agencia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error al crear agencia');
    }

    // 4. Confirmar con datos reales
    stateMethods.confirmAgencia(tempId, {
      ...data.agencia,
      id: tempId
    });

    return { 
      success: true,
      agencia: data.agencia,
      statusCode: response.status
    };

  } catch (error) {
    // 5. Revertir y manejar error
    stateMethods.revertTempAgencia(tempId);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    stateMethods.setError(errorMessage);

    return {
      success: false,
      error: errorMessage,
      statusCode: 500
    };
  }
};
