import { PaquetePropio } from '@/types/PaquetePropio';

/**
 * Fetch de paquetes propios por agencia.
 * Llama a la API real y devuelve un array de PaquetePropio.
 */
export const fetchPaquetesPorAgencia = async (idAgencia: string): Promise<PaquetePropio[]> => {
  console.log(`📡 Llamando a fetchPaquetesPorAgencia con id: ${idAgencia}`);

  try {
    const res = await fetch(`https://travelconnect.com.ar/paquetes/agencia/${idAgencia}`);

    console.log(`🛰️ Respuesta HTTP status: ${res.status}`);

    if (!res.ok) {
      console.error(`❌ Error HTTP al obtener paquetes de la agencia ${idAgencia}`);
      throw new Error(`Error al obtener paquetes de la agencia ${idAgencia}`);
    }

    const json = await res.json();

    console.log(`📦 Paquetes recibidos para agencia ${idAgencia}:`, json);

    // ✅ Retornar directamente el array
    return json;
  } catch (error) {
    console.error(`🛑 Error en fetchPaquetesPorAgencia(${idAgencia}):`, error);
    throw error;
  }
};

/**
 * Elimina un paquete propio por su ID.
 */
export const eliminarPaquetePorId = async (idPaquete: number): Promise<boolean> => {
  try {
    const res = await fetch(`https://travelconnect.com.ar/delete_paquete/${idPaquete}`, {
      method: 'DELETE',
    });

    console.log(`🗑️ Intentando eliminar paquete ID: ${idPaquete} - Status: ${res.status}`);

    if (!res.ok) {
      console.error(`❌ Error HTTP al eliminar paquete ${idPaquete}`);
      throw new Error(`Error al eliminar paquete ${idPaquete}`);
    }

    return true;
  } catch (error) {
    console.error(`🛑 Error en eliminarPaquetePorId(${idPaquete}):`, error);
    throw error;
  }
};
