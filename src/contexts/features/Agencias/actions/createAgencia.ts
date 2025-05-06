import type { AgenciaFormValues, CreateAgenciaResponse } from '../forms';
import type { AgenciasContextState } from '../types';
import { transformarAgenciaParaEnvio } from '../transformarAgenciaParaEnvio'; // ajustá la ruta si está en otro lugar

export const createAgencia = async (
  formData: AgenciaFormValues,
  contextState: AgenciasContextState,
  stateMethods: { setError: (error: string | null) => void }
): Promise<CreateAgenciaResponse> => {
  try {
    console.group('[createAgencia] Inicio');

    // 🔍 Log: Datos crudos desde RHF
    console.log('[createAgencia] Datos crudos desde RHF (AgenciaFormValues):');
    for (const [clave, valor] of Object.entries(formData)) {
      const tipo =
        valor instanceof File ? 'File' :
        Array.isArray(valor) ? 'Array' :
        valor instanceof Date ? 'Date' :
        typeof valor;
      console.log(`→ ${clave}:`, valor, `(tipo: ${tipo})`);
    }

    // 1. Transformar datos
    const datosTransformados = transformarAgenciaParaEnvio(formData);
    datosTransformados.fecha_creacion = new Date().toISOString();

    // 2. Armado de FormData
    const formDataToSend = new FormData();
    for (const [clave, valor] of Object.entries(datosTransformados)) {
      if (valor !== null) {
        formDataToSend.append(clave, valor);
      }
    }

    // 🔍 Log: FormData a enviar
    console.log('[createAgencia] FormData a enviar (después de transformación):');
    Array.from(formDataToSend.entries()).forEach(([clave, valor]) => {
      const tipo =
        valor instanceof File ? 'File' :
        typeof valor;
      console.log(`→ ${clave}:`, valor, `(tipo: ${tipo})`);
    });

    // 3. Configuración del timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    // 4. Envío al backend
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
