import type { AgenciaFormValues } from '../forms';
import type { AgenciasContextState } from '../types';

export const editAgencia = async (
  formData: AgenciaFormValues & { id: number },
  contextState: AgenciasContextState,
  stateMethods: { setError: (error: string | null) => void }
): Promise<{
  success: boolean;
  error?: string;
  statusCode?: number;
}> => {
  try {
    console.group('[editAgencia] Inicio');

    if (!formData.id) {
      throw new Error('ID de agencia no especificado para edición');
    }

    const formDataToSend = new FormData();
    formDataToSend.append('id', String(formData.id));

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

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch('https://triptest.com.ar/update_agencia', {
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
      throw new Error('El servidor no devolvió datos de la agencia modificada');
    }

    console.log('[editAgencia] Éxito', data.agencia);

    return {
      success: true,
      statusCode: response.status
    };

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error de red';
    console.error('[editAgencia] Error capturado:', message);
    stateMethods.setError(message);

    return {
      success: false,
      error: message,
      statusCode: (error as any)?.status || 500
    };
  } finally {
    console.groupEnd();
  }
};
