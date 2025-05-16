'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';
import type { AgenciaBackData } from '@/types/AgenciaBackData';

interface ModalAgenciaContextType {
  isOpen: boolean;
  datosEdicion: AgenciaBackData | null;
  openModal: (agencia?: AgenciaBackData) => void;
  closeModal: () => void;
  setDatosEdicion: (agencia: AgenciaBackData | null) => void;
}

const ModalAgenciaContext = createContext<ModalAgenciaContextType | undefined>(undefined);

export const ModalAgenciaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [datosEdicion, setDatosEdicion] = useState<AgenciaBackData | null>(null);

  const openModal = useCallback((agencia?: AgenciaBackData) => {
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
        setDatosEdicion,
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
