'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';
import { PaquetePropio } from '@/types/PaquetePropio';
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
  paqueteActivoParaSalidas: PaquetePropio | null;
  modalAbierto: boolean;
  idAgenciaEnCreacion: string | null;
  setIdAgenciaEnCreacion: (id: string | null) => void;
  fetchPaquetesDeAgencia: (agenciaId: string) => Promise<void>;
  eliminarPaquete: (paqueteId: number) => Promise<void>;
  seleccionarPaquete: (paquete: PaquetePropio | null) => void;
  seleccionarPaqueteParaSalidas: (paquete: PaquetePropio) => void;
  limpiarPaqueteParaSalidas: () => void;
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
    setModalAbierto(true);
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
      paqueteActivoParaSalidas,
      modalAbierto,
      idAgenciaEnCreacion,
      setIdAgenciaEnCreacion,
      fetchPaquetesDeAgencia,
      eliminarPaquete,
      seleccionarPaquete,
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
      paqueteActivoParaSalidas,
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
