'use client'

import { PaquetePropio } from '@/types/PaquetePropio'
import { Hotel } from '@/types/Hotel'

/* 🛠️ Normalizador de campo `hotel` */
const normalizarHotel = (p: any): Hotel => {
  if (p.hotel?.nombre) {
    return p.hotel
  }

  if (typeof p.hoteles === 'string') {
    try {
      const parsed = JSON.parse(p.hoteles)
      return {
        id_hotel: parsed.hotel_id || '',
        nombre: parsed.hotel_nombre || '',
        categoria_hotel: parsed.hotel_categoria || '3'
      }
    } catch {
      /* ignora error de parseo */
    }
  }

  return {
    id_hotel: '',
    nombre: '',
    categoria_hotel: '3'
  }
}

/**
 * Fetch de paquetes propios por agencia.
 */
export const fetchPaquetesPorAgencia = async (idAgencia: string): Promise<PaquetePropio[]> => {
  console.log(`📡 Llamando a fetchPaquetesPorAgencia con id: ${idAgencia}`)

  try {
    const res = await fetch(`https://travelconnect.com.ar/paquetes/agencia/${idAgencia}`)
    console.log(`🛰️ Respuesta HTTP status: ${res.status}`)

    if (!res.ok) {
      console.error(`❌ Error HTTP al obtener paquetes de la agencia ${idAgencia}`)
      throw new Error(`Error al obtener paquetes de la agencia ${idAgencia}`)
    }

    const json = await res.json()
    console.log(`📦 Paquetes crudos recibidos para agencia ${idAgencia}:`, json)

    const paquetes = (json as PaquetePropio[]).map(p => ({
      ...p,
      hotel: normalizarHotel(p)
    }))

    console.log(`✅ Paquetes normalizados para agencia ${idAgencia}:`, paquetes)

    return paquetes
  } catch (error) {
    console.error(`🛑 Error en fetchPaquetesPorAgencia(${idAgencia}):`, error)
    throw error
  }
}

/**
 * Elimina un paquete propio por su ID.
 */
export const eliminarPaquetePorId = async (idPaquete: number): Promise<boolean> => {
  try {
    const res = await fetch(`https://travelconnect.com.ar/delete_paquete/${idPaquete}`, {
      method: 'DELETE',
    })

    console.log(`🗑️ Intentando eliminar paquete ID: ${idPaquete} - Status: ${res.status}`)

    if (!res.ok) {
      const errorText = await res.text()
      console.error(`❌ Error HTTP al eliminar paquete ${idPaquete}:`, errorText)
      throw new Error(`Error al eliminar paquete ${idPaquete}`)
    }

    return true
  } catch (error) {
    console.error(`🛑 Error en eliminarPaquetePorId(${idPaquete}):`, error)
    throw error
  }
}

/**
 * Crea un nuevo paquete propio.
 */
export const crearPaquetePropio = async (data: FormData | object): Promise<PaquetePropio> => {
  const isFormData = data instanceof FormData
  const bodyPayload = isFormData ? data : JSON.stringify(data)

  console.log('📤 [CREAR PAQUETE] Payload enviado:')
  if (isFormData) {
    data.forEach((value, key) => {
      console.log(`   ${key}:`, value)
    })
  } else {
    console.log(data)
  }

  const res = await fetch('https://travelconnect.com.ar/create_paquete', {
    method: 'POST',
    headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
    body: bodyPayload,
  })

  console.log('📤 Resultado al crear paquete:', res.status)

  if (!res.ok) {
    const errorText = await res.text()
    console.error('❌ Error al crear paquete:', errorText)
    throw new Error('Error al crear paquete')
  }

  const nuevoPaquete = await res.json()
  return {
    ...nuevoPaquete,
    hotel: normalizarHotel(nuevoPaquete)
  }
}

/**
 * Edita un paquete propio existente por su ID.
 */
export const editarPaquetePropio = async (id: number, data: FormData | object): Promise<PaquetePropio> => {
  const isFormData = data instanceof FormData
  const bodyPayload = isFormData ? data : JSON.stringify(data)

  console.log(`✏️ [EDITAR PAQUETE] ID ${id} - Payload enviado:`)
  if (isFormData) {
    data.forEach((value, key) => {
      console.log(`   ${key}:`, value)
    })
  } else {
    console.log(data)
  }

  const res = await fetch(`https://travelconnect.com.ar/paquetes/${id}/update`, {
    method: 'POST',
    headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
    body: bodyPayload,
  })

  console.log(`✏️ Resultado al editar paquete ID ${id}:`, res.status)

  if (!res.ok) {
    const errorText = await res.text()
    console.error(`❌ Error al editar paquete ID ${id}:`, errorText)
    throw new Error('Error al editar paquete')
  }

  const paqueteActualizado = await res.json()
  return {
    ...paqueteActualizado,
    hotel: normalizarHotel(paqueteActualizado)
  }
}
