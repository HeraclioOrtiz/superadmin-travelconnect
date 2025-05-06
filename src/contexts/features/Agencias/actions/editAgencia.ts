import type { AgenciaFormValues } from '../forms';
import type { AgenciasContextState } from '../types';

function formatearCampoParaFormData(clave: string, valor: any): [string, string | Blob] | null {
  if (valor === null || valor === undefined || (typeof valor === 'string' && valor.trim() === '')) {
    return null;
  }

  if (valor instanceof File || valor instanceof Blob) {
    return [clave, valor];
  }

  if (Array.isArray(valor)) {
    return [clave, JSON.stringify(valor)];
  }

  if (typeof valor === 'boolean') {
    return [clave, valor ? '1' : '0'];
  }

  if (valor instanceof Date) {
    return [clave, valor.toISOString()];
  }

  return [clave, valor];
}

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

    // 🔍 Log: Datos crudos desde RHF (formulario)
    console.log('[editAgencia] Datos crudos desde RHF (AgenciaFormValues):');
    for (const [clave, valor] of Object.entries(formData)) {
      const tipo =
        valor instanceof File ? 'File' :
        Array.isArray(valor) ? 'Array' :
        valor instanceof Date ? 'Date' :
        typeof valor;
      console.log(`→ ${clave}:`, valor, `(tipo: ${tipo})`);
    }

    // 1. Armado de FormData
    const formDataToSend = new FormData();
    formDataToSend.append('id', String(formData.id));

    for (const [clave, valor] of Object.entries(formData)) {
      const campoFormateado = formatearCampoParaFormData(clave, valor);
      if (campoFormateado) {
        formDataToSend.append(campoFormateado[0], campoFormateado[1]);
      }
    }

    // 🔍 Log: FormData a enviar
    console.log('[editAgencia] FormData a enviar (después de sanitizado):');
    Array.from(formDataToSend.entries()).forEach(([clave, valor]) => {
      const tipo = valor instanceof File ? 'File' : typeof valor;
      console.log(`→ ${clave}:`, valor, `(tipo: ${tipo})`);
    });

    // 2. Configuración del timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    // 3. Envío al backend
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
