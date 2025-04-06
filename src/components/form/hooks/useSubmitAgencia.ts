import { useAgenciasContext } from '@/contexts/features/Agencias/AgenciaProvider';
import type { AgenciaFormValues } from '@/contexts/features/Agencias/forms';
import type { Agencia } from '@/contexts/features/Agencias/types'; // ✅ Usamos Agencia en lugar de AgenciaBackData

export const useSubmitAgencia = (datosEdicion?: Pick<Agencia, 'id'>) => {
  const context = useAgenciasContext();
  if (!context) {
    throw new Error('useAgenciasContext debe usarse dentro de AgenciasProvider');
  }

  const submitAgencia = async (formData: AgenciaFormValues) => {
    console.group('[useSubmitAgencia] Flujo completo');

    try {
      console.log('🔹 Paso 1/5: Datos recibidos del formulario', JSON.parse(JSON.stringify(formData)));
      console.log('🔹 Paso 2/5: Contexto disponible?', !!context);
      console.log('🔹 Paso 3/5: Acciones disponibles?', {
        createAgencia: typeof context.actions?.createAgencia,
        editAgencia: typeof context.actions?.editAgencia,
        fetchAgencias: typeof context.actions?.fetchAgencias,
      });

      if (!formData || Object.keys(formData).length === 0) {
        throw new Error('Datos del formulario vacíos');
      }

      const controller = new AbortController();
      const timeout = setTimeout(() => {
        controller.abort();
        throw new Error('Timeout: La acción tardó demasiado');
      }, 10000);

      let result;
      if (datosEdicion?.id) {
        console.log('🛠 Modo edición activado');
        result = await context.actions.editAgencia({ ...formData, id: datosEdicion.id });
      } else {
        console.log('🆕 Modo creación activado');
        result = await context.actions.createAgencia(formData);
      }

      clearTimeout(timeout);
      console.log('🔹 Paso 5/5: Resultado recibido', result);

      return {
        success: true,
        data: result,
        status: 'completed',
      };
    } catch (error) {
      console.error('❌ Error crítico:', {
        name: error instanceof Error ? error.name : 'UnknownError',
        message: error instanceof Error ? error.message : 'Fallo desconocido',
        stack: error instanceof Error ? error.stack : undefined,
      });

      return {
        success: false,
        status: 'error',
        message: error instanceof Error ? error.message : 'Fallo desconocido',
      };
    } finally {
      console.groupEnd();
    }
  };

  return submitAgencia;
};
