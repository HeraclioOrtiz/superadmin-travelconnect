'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Agencia } from './features/Agencias/types';

interface ModalAgenciaContextType {
  isOpen: boolean;
  datosEdicion: Agencia | null;
  openModal: (agencia?: Agencia) => void;
  closeModal: () => void;
  setDatosEdicion: (agencia: Agencia | null) => void; // ✅ agregado
}

const ModalAgenciaContext = createContext<ModalAgenciaContextType | undefined>(undefined);

export const ModalAgenciaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [datosEdicion, setDatosEdicion] = useState<Agencia | null>(null);

  const openModal = useCallback((agencia?: Agencia) => {
    setDatosEdicion(agencia ?? null);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setDatosEdicion(null);
  }, []);

  return (
    <ModalAgenciaContext.Provider
      value={{
        isOpen,
        datosEdicion,
        openModal,
        closeModal,
        setDatosEdicion, // ✅ agregado al value
      }}
    >
      {children}
    </ModalAgenciaContext.Provider>
  );
};

export const useModalAgenciaGlobal = () => {
  const context = useContext(ModalAgenciaContext);
  if (!context) {
    throw new Error('useModalAgenciaGlobal debe usarse dentro de ModalAgenciaProvider');
  }
  return context;
};
