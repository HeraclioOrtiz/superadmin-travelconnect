// contexts/features/Agencias/actions/deleteAgencia.ts
export const deleteAgencia = async (
  id: number,
  stateMethods: { setError: (error: string | null) => void }
): Promise<{
  success: boolean;
  error?: string;
  statusCode?: number;
}> => {
  try {
    console.group('[deleteAgencia] Inicio');

    if (!id) {
      throw new Error('ID de agencia no especificado para eliminación');
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(`https://travelconnect.com.ar/agencias/${id}`, {
      method: 'DELETE',
      signal: controller.signal,
      credentials: 'include'
    });

    clearTimeout(timeoutId);

    const data = await response.json().catch(() => ({}));

    if (!response.ok || data.error) {
      const msg = data.error || `Error HTTP ${response.status}`;
      throw new Error(msg);
    }

    console.log('[deleteAgencia] Éxito:', data.message || 'Agencia eliminada');

    return {
      success: true,
      statusCode: response.status
    };

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error de red';
    console.error('[deleteAgencia] Error capturado:', message);
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
