'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';
import { PaquetePropio } from '@/types/PaquetePropio';
import { Salida } from '@/types/Salidas';
import {
  fetchPaquetesPorAgencia,
  eliminarPaquetePorId
} from '@/components/paquetesPropios/paquetespropiosService';
import { usePaquetesPropiosState } from './state/usePaquetesPropiosState';

interface PaquetesPropiosContextType {
  paquetesPorAgencia: Record<string, PaquetePropio[]>;
  loadingPorAgencia: Record<string, boolean>;
  errorPorAgencia: Record<string, string | null>;

  paqueteSeleccionado: PaquetePropio | null;
  paqueteADuplicar: PaquetePropio | null;
  paqueteActivoParaSalidas: PaquetePropio | null;

  salidaADuplicar: Salida | null;
  setSalidaADuplicar: (salida: Salida | null) => void;
  limpiarSalidaADuplicar: () => void;

  modalAbierto: boolean;
  idAgenciaEnCreacion: string | null;

  setIdAgenciaEnCreacion: (id: string | null) => void;
  fetchPaquetesDeAgencia: (agenciaId: string) => Promise<void>;
  eliminarPaquete: (paqueteId: number) => Promise<void>;

  seleccionarPaquete: (paquete: PaquetePropio | null) => void;
  duplicarPaquete: (paquete: PaquetePropio) => void;

  seleccionarPaqueteParaSalidas: (paquete: PaquetePropio) => void;
  limpiarPaqueteParaSalidas: () => void;

  duplicarSalida: (salida: Salida, paqueteId: number, agenciaId: string) => void;

  abrirModal: () => void;
  cerrarModal: () => void;
  abrirModalCreacion: (agenciaId: string) => void;
}

const PaquetesPropiosContext = createContext<PaquetesPropiosContextType | undefined>(undefined);

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
  } = usePaquetesPropiosState();

  const [idAgenciaEnCreacion, setIdAgenciaEnCreacion] = useState<string | null>(null);
  const [paqueteActivoParaSalidas, setPaqueteActivoParaSalidas] = useState<PaquetePropio | null>(null);
  const [paqueteADuplicar, setPaqueteADuplicar] = useState<PaquetePropio | null>(null);
  const [salidaADuplicar, setSalidaADuplicar] = useState<Salida | null>(null);

  const fetchPaquetesDeAgencia = async (agenciaId: string) => {
    setLoadingPorAgencia((prev) => ({ ...prev, [agenciaId]: true }));
    setErrorPorAgencia((prev) => ({ ...prev, [agenciaId]: null }));

    try {
      const paquetes = await fetchPaquetesPorAgencia(agenciaId);
      setPaquetesPorAgencia((prev) => ({
        ...prev,
        [agenciaId]: paquetes
      }));
    } catch (error: any) {
      setErrorPorAgencia((prev) => ({
        ...prev,
        [agenciaId]: error.message
      }));
    } finally {
      setLoadingPorAgencia((prev) => ({ ...prev, [agenciaId]: false }));
    }
  };

  const eliminarPaquete = async (paqueteId: number) => {
    try {
      await eliminarPaquetePorId(paqueteId);
      setPaquetesPorAgencia((prev) => {
        const actualizado = { ...prev };
        for (const key in actualizado) {
          actualizado[key] = actualizado[key].filter((p) => p.id !== paqueteId);
        }
        return actualizado;
      });
    } catch (error) {
      console.error('Error al eliminar paquete:', error);
    }
  };

  const seleccionarPaquete = (paquete: PaquetePropio | null) => {
    setPaqueteSeleccionado(paquete);
    setPaqueteADuplicar(null);
    setModalAbierto(true);
  };

  const duplicarPaquete = (paquete: PaquetePropio) => {
    setPaqueteADuplicar(paquete);
    setPaqueteSeleccionado(null);
    setModalAbierto(true);
  };

  const duplicarSalida = (salida: Salida, paqueteId: number, agenciaId: string) => {
    setSalidaADuplicar(salida);
    setIdAgenciaEnCreacion(agenciaId);
    const paquete = paquetesPorAgencia[agenciaId]?.find((p) => p.id === paqueteId) ?? null;
    setPaqueteActivoParaSalidas(paquete);
  };

  const limpiarSalidaADuplicar = () => {
    setSalidaADuplicar(null);
  };

  const seleccionarPaqueteParaSalidas = (paquete: PaquetePropio) => {
    setPaqueteActivoParaSalidas(paquete);
  };

  const limpiarPaqueteParaSalidas = () => {
    setPaqueteActivoParaSalidas(null);
  };

  const abrirModal = () => setModalAbierto(true);

  const cerrarModal = () => {
    setModalAbierto(false);
    setPaqueteSeleccionado(null);
    setPaqueteADuplicar(null);
    setSalidaADuplicar(null);
    setIdAgenciaEnCreacion(null);
  };

  const abrirModalCreacion = (agenciaId: string) => {
    setIdAgenciaEnCreacion(agenciaId);
    seleccionarPaquete(null);
  };

  const contextValue: PaquetesPropiosContextType = useMemo(
    () => ({
      paquetesPorAgencia,
      loadingPorAgencia,
      errorPorAgencia,
      paqueteSeleccionado,
      paqueteADuplicar,
      paqueteActivoParaSalidas,
      salidaADuplicar,
      setSalidaADuplicar,
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
      salidaADuplicar,
      modalAbierto,
      idAgenciaEnCreacion
    ]
  );

  return (
    <PaquetesPropiosContext.Provider value={contextValue}>
      {children}
    </PaquetesPropiosContext.Provider>
  );
};

export const usePaquetesPropiosContext = () => {
  const context = useContext(PaquetesPropiosContext);
  if (!context) {
    throw new Error('usePaquetesPropiosContext debe usarse dentro de PaquetesPropiosProvider');
  }
  return context;
};
