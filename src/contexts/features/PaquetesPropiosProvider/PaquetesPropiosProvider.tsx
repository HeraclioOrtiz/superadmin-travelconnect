'use client';

import React, { createContext, useContext, useMemo } from 'react';
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
  modalAbierto: boolean;
  fetchPaquetesDeAgencia: (agenciaId: string) => Promise<void>;
  eliminarPaquete: (paqueteId: number) => Promise<void>;
  seleccionarPaquete: (paquete: PaquetePropio) => void;
  abrirModal: () => void;
  cerrarModal: () => void;
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

  const fetchPaquetesDeAgencia = async (agenciaId: string) => {
    setLoadingPorAgencia((prev) => ({ ...prev, [agenciaId]: true }));
    setErrorPorAgencia((prev) => ({ ...prev, [agenciaId]: null }));

    try {
      const paquetes = await fetchPaquetesPorAgencia(agenciaId);
      console.log(`📦 Paquetes recibidos en provider para agencia ${agenciaId}:`, paquetes);

      setPaquetesPorAgencia((prev) => {
        const nuevo = { ...prev, [agenciaId]: paquetes };
        console.log(`🧠 Contexto actualizado para agencia ${agenciaId}:`, nuevo);
        return nuevo;
      });
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
        const nuevo = { ...prev };
        for (const key in nuevo) {
          nuevo[key] = nuevo[key].filter((p) => p.id !== paqueteId);
        }
        return nuevo;
      });
    } catch (error) {
      console.error('Error al eliminar paquete:', error);
    }
  };

  const seleccionarPaquete = (paquete: PaquetePropio) => {
    setPaqueteSeleccionado(paquete);
    setModalAbierto(true);
  };

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => {
    setModalAbierto(false);
    setPaqueteSeleccionado(null);
  };

  const contextValue: PaquetesPropiosContextType = useMemo(
    () => ({
      paquetesPorAgencia,
      loadingPorAgencia,
      errorPorAgencia,
      paqueteSeleccionado,
      modalAbierto,
      fetchPaquetesDeAgencia,
      eliminarPaquete,
      seleccionarPaquete,
      abrirModal,
      cerrarModal
    }),
    [
      paquetesPorAgencia,
      loadingPorAgencia,
      errorPorAgencia,
      paqueteSeleccionado,
      modalAbierto
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
