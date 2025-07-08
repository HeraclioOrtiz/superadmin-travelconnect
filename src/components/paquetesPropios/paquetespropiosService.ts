import { PaquetePropio } from '@/types/PaquetePropio';

/**
 * Fetch de paquetes propios por agencia.
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

/**
 * Crea un nuevo paquete propio.
 */
export const crearPaquetePropio = async (data: FormData | object): Promise<Response> => {
  const isFormData = data instanceof FormData;

  console.log('📤 [CREAR PAQUETE] Payload enviado:');
  if (isFormData) {
    (data as FormData).forEach((value, key) => {
      console.log(`   ${key}:`, value);
    });
  } else {
    console.log(data);
  }

  const res = await fetch('https://travelconnect.com.ar/create_paquete', {
    method: 'POST',
    headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
    body: isFormData ? data : JSON.stringify(data),
  });

  console.log('📤 Resultado al crear paquete:', res.status);

  if (!res.ok) {
    const errorText = await res.text();
    console.error('❌ Error al crear paquete:', errorText);
    throw new Error('Error al crear paquete');
  }

  return res;
};

/**
 * Edita un paquete propio existente por su ID.
 */
export const editarPaquetePropio = async (id: number, data: FormData | object): Promise<Response> => {
  const isFormData = data instanceof FormData;

  console.log(`✏️ [EDITAR PAQUETE] ID ${id} - Payload enviado:`);
  if (isFormData) {
    (data as FormData).forEach((value, key) => {
      console.log(`   ${key}:`, value);
    });
  } else {
    console.log(data);
  }

  const res = await fetch(`https://travelconnect.com.ar/paquetes/${id}/update`, {
    method: 'POST',
    headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
    body: isFormData ? data : JSON.stringify(data),
  });

  console.log(`✏️ Resultado al editar paquete ID ${id}:`, res.status);

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`❌ Error al editar paquete ID ${id}:`, errorText);
    throw new Error('Error al editar paquete');
  }

  return res;
};
