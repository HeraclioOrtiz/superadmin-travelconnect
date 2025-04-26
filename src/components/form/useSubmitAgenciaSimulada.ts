// src/contexts/features/Agencias/simulacion/useSubmitAgenciaSimulada.ts

import { generarAgenciaSimuladaFiltrada } from './simulatedAgenciaData';
import { crearAgenciaSimulada } from './crearAgenciaSimulada';

interface ArchivosSimulados {
  logo: File;
  fondo_1: File;
}

export const useSubmitAgenciaSimulada = () => {
  const submitAgenciaSimulada = async (archivos: ArchivosSimulados) => {
    console.group('[Simulación] Envío personalizado');

    try {
      const payload = generarAgenciaSimuladaFiltrada(archivos);
      console.log('🔹 Payload generado:', payload);

      const respuesta = await crearAgenciaSimulada(payload);

      if (!respuesta.success) {
        throw new Error(respuesta.error || 'Error desconocido en la respuesta del servidor');
      }

      console.log('✅ Agencia simulada enviada correctamente:', respuesta);
      return { success: true, data: respuesta.data };
    } catch (error) {
      console.error('❌ Error en envío simulado:', error);
      throw new Error('Fallo en submitAgenciaSimulada');
    } finally {
      console.groupEnd();
    }
  };
  return submitAgenciaSimulada;
};
