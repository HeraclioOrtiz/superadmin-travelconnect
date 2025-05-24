import { useAgenciasContext } from '@/contexts/features/Agencias/AgenciaProvider';
import type { AgenciaFormValues } from '@/contexts/features/Agencias/forms';
import { transformarAgenciaParaEnvio } from '@/contexts/features/Agencias/transformarAgenciaParaEnvio';

type AgenciaId = { id: number };

export const useSubmitAgencia = (datosEdicion?: AgenciaId) => {
  const context = useAgenciasContext();
  if (!context) {
    throw new Error('useAgenciasContext debe usarse dentro de AgenciasProvider');
  }

  const submitAgencia = async (formData: AgenciaFormValues) => {
    console.group('[useSubmitAgencia] Flujo completo');

    try {
      console.log('🔹 Paso 1/5: Datos recibidos del formulario', JSON.parse(JSON.stringify(formData)));

      if (!formData || Object.keys(formData).length === 0) {
        throw new Error('Datos del formulario vacíos');
      }

      const controller = new AbortController();
      const timeout = setTimeout(() => {
        controller.abort();
        throw new Error('Timeout: La acción tardó demasiado');
      }, 10000);

      const datosTransformados = transformarAgenciaParaEnvio(formData);

      let result;
      if (datosEdicion?.id) {
        console.log('🛠 Modo edición activado');
        const datosConId = new FormData();
        datosTransformados.forEach((valor, clave) => datosConId.append(clave, valor));
        datosConId.append('id', datosEdicion.id.toString());
        result = await context.actions.editAgencia(datosConId);
      } else {
        console.log('🆕 Modo creación activado');
        result = await context.actions.createAgencia(datosTransformados);
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

