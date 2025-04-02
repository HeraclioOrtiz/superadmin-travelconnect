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
  // 1. Validación básica
  if (!formData.nombre || !formData.dominio || !formData.password) {
    return { 
      success: false, 
      error: 'Nombre, dominio y password son requeridos',
      statusCode: 400
    };
  }

  // 2. Preparar datos temporales (con tipo explícito)
  const tempAgenciaData: Omit<Agencia, 'id'> = {
    ...formData,
    fecha_creacion: new Date().toISOString(),
    // Campos que podrían ser null en formData pero requeridos en Agencia
    quienes_somos_es: formData.quienes_somos_es ?? null,
    quienes_somos_en: formData.quienes_somos_en ?? null,
    quienes_somos_pt: formData.quienes_somos_pt ?? null,
    // Repite para otros campos opcionales que necesiten valor por defecto
  };

  // 3. Optimistic Update
  const tempId = stateMethods.addTempAgencia(tempAgenciaData);

  // 4. Llamada API
  try {
    const response = await fetch('/api/public/agencias', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error al crear agencia');
    }

    // 5. Confirmar con datos reales
    stateMethods.confirmAgencia(tempId, {
      ...data.agencia,
      id: tempId // Asegura que el ID temporal persista hasta la próxima recarga
    });

    return { 
      success: true,
      agencia: data.agencia,
      statusCode: response.status
    };

  } catch (error) {
    // 6. Revertir y manejar error
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