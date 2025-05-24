import type { AgenciasContextState } from '../../../../types/types';

export const editAgencia = async (
  formData: FormData,
  contextState: AgenciasContextState,
  stateMethods: { setError: (error: string | null) => void }
): Promise<{
  success: boolean;
  error?: string;
  statusCode?: number;
}> => {
  try {
    console.group('[editAgencia] Inicio');

    // ✅ Obtener ID desde FormData
    const id = formData.get('id');
    if (!id || typeof id !== 'string') {
      throw new Error('El campo "id" es obligatorio y debe ser string para editar una agencia');
    }

    // ❌ Eliminar el campo 'id' si no es requerido por el backend en el body
    formData.delete('id');

    // 🔍 Log de FormData
    console.log('[editAgencia] FormData recibido:');
    Array.from(formData.entries()).forEach(([clave, valor]) => {
      const tipo = valor instanceof File ? 'File' : typeof valor;
      console.log(`→ ${clave}:`, valor, `(tipo: ${tipo})`);
    });

    // ⏱ Configuración del timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    // 📡 Envío al backend con el ID en la URL
    const response = await fetch(`https://travelconnect.com.ar/agencias/${id}`, {
      method: 'POST',
      body: formData,
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

