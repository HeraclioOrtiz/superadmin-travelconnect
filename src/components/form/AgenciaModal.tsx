'use client';

import React from 'react';
import { FormProvider } from 'react-hook-form';
import { stepsConfig } from './configStep';
import {
  Modal,
  Box,
  Typography,
  Divider,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import EstadoEnvioMensaje from './EstadoEnvioMensaje';
import ControlesStep from './ControlesStep';

import { useAgenciaForm } from './hooks/useAgenciaForm';
import { useModalAgenciaGlobal } from '@/contexts/ModalAgenciaProvider';
import { useAgenciaModalHandler } from './hooks/useAgenciaModalHandler';

const AgenciaModal = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const { isOpen, closeModal, datosEdicion } = useModalAgenciaGlobal();

  const methods = useAgenciaForm();
  const StepComponent = stepsConfig[currentStep]?.component;

  React.useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen]);

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      keepMounted={false}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '95vw',
          height: '90vh',
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
          outline: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          overflow: 'hidden',
        }}
      >
        <IconButton
          onClick={closeModal}
          sx={{ position: 'absolute', top: 8, right: 8 }}
          aria-label="Cerrar"
        >
          <CloseIcon />
        </IconButton>

        <FormProvider {...methods}>
          <form onSubmit={(e) => e.preventDefault()} autoComplete="off" style={{ height: '100%' }}>
            <AgenciaContenidoInterno
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              StepComponent={StepComponent}
              datosEdicion={datosEdicion}
            />
          </form>
        </FormProvider>
      </Box>
    </Modal>
  );
};

export default AgenciaModal;

// ===============================
// ✅ Subcomponente interno
// ===============================
interface PropsContenidoInterno {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  StepComponent: React.ElementType | undefined;
  datosEdicion: any;
}

const AgenciaContenidoInterno = ({
  currentStep,
  setCurrentStep,
  StepComponent,
  datosEdicion,
}: PropsContenidoInterno) => {
  const { submissionState, handleSubmitClick } = useAgenciaModalHandler();

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" fontWeight={600} id="modal-title">
          {stepsConfig[currentStep]?.title}
        </Typography>
        <Divider sx={{ mt: 1 }} />
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', pr: 1, mb: 2 }}>
        {StepComponent && <StepComponent />}
      </Box>

      <EstadoEnvioMensaje
        status={submissionState.status}
        message={submissionState.message}
        modoEdicion={!!datosEdicion}
      />

      <ControlesStep
        currentStep={currentStep}
        totalSteps={stepsConfig.length}
        isLoading={submissionState.status === 'loading'}
        isEditMode={!!datosEdicion}
        onBack={handleBack}
        onNext={handleNext}
        onSubmit={handleSubmitClick}
      />
    </div>
  );
};
