'use client'

import React, { createContext, useContext, useMemo, useState } from 'react'
import { PaquetePropio } from '@/types/PaquetePropio'
import { Salida } from '@/types/Salidas'
import {
  fetchPaquetesPorAgencia,
  eliminarPaquetePorId
} from '@/components/paquetesPropios/paquetespropiosService'
import { usePaquetesPropiosState } from './state/usePaquetesPropiosState'
import { Hotel } from '@/types/Hotel'

interface PaquetesPropiosContextType {
  paquetesPorAgencia: Record<string, PaquetePropio[]>
  loadingPorAgencia: Record<string, boolean>
  errorPorAgencia: Record<string, string | null>

  paqueteSeleccionado: PaquetePropio | null
  paqueteADuplicar: PaquetePropio | null
  paqueteActivoParaSalidas: PaquetePropio | null

  salidaSeleccionada: Salida | null
  salidaADuplicar: Salida | null
  setSalidaADuplicar: (salida: Salida | null) => void
  limpiarSalidaSeleccionada: () => void
  limpiarSalidaADuplicar: () => void
  seleccionarSalida: (salida: Salida, paqueteId: number, agenciaId: string) => void

  modalAbierto: boolean
  idAgenciaEnCreacion: string | null

  setIdAgenciaEnCreacion: (id: string | null) => void
  fetchPaquetesDeAgencia: (agenciaId: string) => Promise<void>
  eliminarPaquete: (paqueteId: number) => Promise<void>

  seleccionarPaquete: (paquete: PaquetePropio | null) => void
  duplicarPaquete: (paquete: PaquetePropio) => void

  seleccionarPaqueteParaSalidas: (paquete: PaquetePropio) => void
  limpiarPaqueteParaSalidas: () => void

  duplicarSalida: (salida: Salida, paqueteId: number, agenciaId: string) => void

  abrirModal: () => void
  cerrarModal: () => void
  abrirModalCreacion: (agenciaId: string) => void
}

const PaquetesPropiosContext = createContext<PaquetesPropiosContextType | undefined>(undefined)

export const PaquetesPropiosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    paquetesPorAgencia,
    loadingPorAgencia,
    errorPorAgencia,
    paqueteSeleccionado,
    modalAbierto,
    setPaquetesPorAgencia,
    setLoadingPorAgencia,
    setErrorPorAgencia,
    setPaqueteSeleccionado,
    setModalAbierto
  } = usePaquetesPropiosState()

  const [idAgenciaEnCreacion, setIdAgenciaEnCreacion] = useState<string | null>(null)
  const [paqueteActivoParaSalidas, setPaqueteActivoParaSalidas] = useState<PaquetePropio | null>(null)
  const [paqueteADuplicar, setPaqueteADuplicar] = useState<PaquetePropio | null>(null)

  const [salidaSeleccionada, setSalidaSeleccionada] = useState<Salida | null>(null)
  const [salidaADuplicar, setSalidaADuplicar] = useState<Salida | null>(null)

  /* ---------------------------------- FETCH --------------------------------- */
  const fetchPaquetesDeAgencia = async (agenciaId: string) => {
    setLoadingPorAgencia(prev => ({ ...prev, [agenciaId]: true }))
    setErrorPorAgencia(prev => ({ ...prev, [agenciaId]: null }))

    try {
      const paquetesRaw = await fetchPaquetesPorAgencia(agenciaId)

      const paquetesTransformados: PaquetePropio[] = paquetesRaw.map((paqueteRaw: any) => {
        let hotel: Hotel | null = null

        try {
          const hotelesParsed = JSON.parse(paqueteRaw.hoteles)
          if (Array.isArray(hotelesParsed) && hotelesParsed.length > 0) {
            hotel = hotelesParsed[0]
          }
        } catch (error) {
          console.warn(`Error al parsear 'hoteles' del paquete ${paqueteRaw.id}`, error)
        }

        const { hoteles, ...rest } = paqueteRaw

        return {
          ...rest,
          hotel
        } as PaquetePropio
      })

      setPaquetesPorAgencia(prev => ({
        ...prev,
        [agenciaId]: paquetesTransformados
      }))
    } catch (error: any) {
      setErrorPorAgencia(prev => ({
        ...prev,
        [agenciaId]: error.message
      }))
    } finally {
      setLoadingPorAgencia(prev => ({ ...prev, [agenciaId]: false }))
    }
  }

  /* ------------------------------ ACCIONES CRUD ----------------------------- */
  const eliminarPaquete = async (paqueteId: number) => {
    try {
      await eliminarPaquetePorId(paqueteId)
      setPaquetesPorAgencia(prev => {
        const actualizado = { ...prev }
        for (const key in actualizado) {
          actualizado[key] = actualizado[key].filter(p => p.id !== paqueteId)
        }
        return actualizado
      })
    } catch (error) {
      console.error('Error al eliminar paquete:', error)
    }
  }

  /* ------------------------- SELECCIÓN / DUPLICADO -------------------------- */
  const seleccionarPaquete = (paquete: PaquetePropio | null) => {
    setPaqueteSeleccionado(paquete)
    setPaqueteADuplicar(null)
    setIdAgenciaEnCreacion(paquete?.usuario_id ? paquete.usuario_id.toString() : null)
    setModalAbierto(true)
  }

  const duplicarPaquete = (paquete: PaquetePropio) => {
    setPaqueteADuplicar(paquete)
    setPaqueteSeleccionado(null)
    setIdAgenciaEnCreacion(paquete.usuario_id ? paquete.usuario_id.toString() : null)
    setModalAbierto(true)
  }

  /* ------------------------------ SALIDAS: CRUD ----------------------------- */
  const seleccionarSalida = (salida: Salida, paqueteId: number, agenciaId: string) => {
    setSalidaSeleccionada(salida)
    setSalidaADuplicar(null)
    setIdAgenciaEnCreacion(agenciaId)
    const paquete = paquetesPorAgencia[agenciaId]?.find(p => p.id === paqueteId) ?? null
    setPaqueteActivoParaSalidas(paquete)
  }

  const duplicarSalida = (salida: Salida, paqueteId: number, agenciaId: string) => {
    setSalidaADuplicar(salida)
    setSalidaSeleccionada(null)
    setIdAgenciaEnCreacion(agenciaId)
    const paquete = paquetesPorAgencia[agenciaId]?.find(p => p.id === paqueteId) ?? null
    setPaqueteActivoParaSalidas(paquete)
  }

  const limpiarSalidaSeleccionada = () => setSalidaSeleccionada(null)
  const limpiarSalidaADuplicar = () => setSalidaADuplicar(null)

  const seleccionarPaqueteParaSalidas = (paquete: PaquetePropio) =>
    setPaqueteActivoParaSalidas(paquete)

  const limpiarPaqueteParaSalidas = () => setPaqueteActivoParaSalidas(null)

  /* --------------------------- CONTROL DEL MODAL ---------------------------- */
  const abrirModal = () => setModalAbierto(true)

  const cerrarModal = () => {
    setModalAbierto(false)
    setPaqueteSeleccionado(null)
    setPaqueteADuplicar(null)
    setSalidaSeleccionada(null)
    setSalidaADuplicar(null)
    setIdAgenciaEnCreacion(null)
  }

  const abrirModalCreacion = (agenciaId: string) => {
    setIdAgenciaEnCreacion(agenciaId)
    seleccionarPaquete(null)
  }

  /* ------------------------------ CONTEXT VALUE ----------------------------- */
  const contextValue: PaquetesPropiosContextType = useMemo(
    () => ({
      paquetesPorAgencia,
      loadingPorAgencia,
      errorPorAgencia,
      paqueteSeleccionado,
      paqueteADuplicar,
      paqueteActivoParaSalidas,

      salidaSeleccionada,
      salidaADuplicar,
      setSalidaADuplicar,
      seleccionarSalida,
      limpiarSalidaSeleccionada,
      limpiarSalidaADuplicar,

      modalAbierto,
      idAgenciaEnCreacion,
      setIdAgenciaEnCreacion,
      fetchPaquetesDeAgencia,
      eliminarPaquete,
      seleccionarPaquete,
      duplicarPaquete,
      duplicarSalida,
      seleccionarPaqueteParaSalidas,
      limpiarPaqueteParaSalidas,
      abrirModal,
      cerrarModal,
      abrirModalCreacion
    }),
    [
      paquetesPorAgencia,
      loadingPorAgencia,
      errorPorAgencia,
      paqueteSeleccionado,
      paqueteADuplicar,
      paqueteActivoParaSalidas,
      salidaSeleccionada,
      salidaADuplicar,
      modalAbierto,
      idAgenciaEnCreacion
    ]
  )

  return (
    <PaquetesPropiosContext.Provider value={contextValue}>
      {children}
    </PaquetesPropiosContext.Provider>
  )
}

export const usePaquetesPropiosContext = () => {
  const context = useContext(PaquetesPropiosContext)
  if (!context) {
    throw new Error('usePaquetesPropiosContext debe usarse dentro de PaquetesPropiosProvider')
  }
  return context
}
