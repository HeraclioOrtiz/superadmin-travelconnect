// src/contexts/features/Agencias/simulacion/crearAgenciaSimulada.ts

import type { generarAgenciaSimuladaFiltrada } from './simulatedAgenciaData';

type AgenciaSimuladaPayload = Awaited<ReturnType<typeof generarAgenciaSimuladaFiltrada>>;

/**
 * Envía una agencia simulada al backend usando FormData.
 * Este método es usado en la simulación alternativa fuera del flujo de formularios.
 */
export const crearAgenciaSimulada = async (datos: AgenciaSimuladaPayload) => {
  console.group('[crearAgenciaSimulada] Enviando al backend');

  try {
    const formData = new FormData();

    // Convertir los campos al formato de envío (FormData)
    Object.entries(datos).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (value instanceof File) {
          formData.append(key, value, value.name);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    const response = await fetch('https://triptest.com.ar/store_agencia', {
      method: 'POST',
      body: formData,
    });

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      const mensaje =
        json?.errors?.join(', ') ||
        json?.error ||
        json?.message ||
        `Error HTTP ${response.status}`;
      throw new Error(mensaje);
    }

    console.log('[crearAgenciaSimulada] Respuesta:', json);
    return {
      success: true,
      data: json,
      status: response.status,
    };
  } catch (error) {
    console.error('[crearAgenciaSimulada] Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
      status: 500,
    };
  } finally {
    console.groupEnd();
  }
};
