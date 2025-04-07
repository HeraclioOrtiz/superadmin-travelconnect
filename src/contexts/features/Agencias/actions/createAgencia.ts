import type { AgenciaFormValues, CreateAgenciaResponse } from '../forms';
import type { AgenciasContextState } from '../types';

export const createAgencia = async (
  formData: AgenciaFormValues,
  contextState: AgenciasContextState,
  stateMethods: { setError: (error: string | null) => void }
): Promise<CreateAgenciaResponse> => {
  try {
    console.group('[createAgencia] Inicio');

    // 1. Armado de FormData (sin validaciones previas)
    const formDataToSend = new FormData();
    formDataToSend.append('fecha_creacion', new Date().toISOString());

    for (const [clave, valor] of Object.entries(formData)) {
      if (
        valor === null ||
        valor === undefined ||
        (typeof valor === 'string' && valor.trim() === '')
      ) continue;

      if (valor instanceof File) {
        formDataToSend.append(clave, valor);
      } else {
        formDataToSend.append(clave, String(valor));
      }
    }

    // 2. Configuración del timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    // 3. Envío al backend
    const response = await fetch('https://triptest.com.ar/store_agencia', {
      method: 'POST',
      body: formDataToSend,
      signal: controller.signal,
      credentials: 'include'
    });

    clearTimeout(timeoutId);

    const data = await response.json().catch(() => ({}));

    if (!response.ok || data.errors || data.error || data.message) {
      const msg =
        data.errors?.join(', ') ||
        data.error ||
        data.message ||
        `Error HTTP ${response.status}`;
      throw new Error(msg);
    }

    if (!data.agencia) {
      throw new Error('El servidor no devolvió datos de agencia');
    }

    console.log('[createAgencia] Éxito', data.agencia);

    return {
      success: true,
      agencia: {
        ...data.agencia,
        fecha_creacion: data.agencia.fecha_creacion || new Date().toISOString()
      },
      statusCode: response.status
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error de red';
    console.error('[createAgencia] Error capturado:', errorMessage);
    stateMethods.setError(errorMessage);

    return {
      success: false,
      error: errorMessage,
      statusCode: (error as any)?.status || 500
    };
  } finally {
    console.groupEnd();
  }
};
