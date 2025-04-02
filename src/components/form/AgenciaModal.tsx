'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { stepsConfig } from './configStep';
import BotonAccion from './BotonAccion';
import { ChevronLeft, ChevronRight, Save } from '@mui/icons-material';
import { Modal, Box, Typography, Divider, Fade, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSubmitAgencia } from './hooks/useSubmitAgencia';

type AgenciaModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void; // Tipar si querés con AgenciaFormValues
};

const AgenciaModal = ({ isOpen, onClose, onSubmit }: AgenciaModalProps) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const methods = useForm(); // useForm<AgenciaFormValues>()
  const StepComponent = stepsConfig[currentStep]?.component;

  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (isValid) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const submitAgencia = useSubmitAgencia(); // Hook que cierra modal + envía

  return (
    <Modal open={isOpen} onClose={onClose} closeAfterTransition>
      <Fade in={isOpen}>
        <Box
          sx={{
            position: 'absolute' as const,
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
          {/* Botón de cierre */}
          <IconButton
            onClick={onClose}
            sx={{ position: 'absolute', top: 8, right: 8 }}
            aria-label="Cerrar"
          >
            <CloseIcon />
          </IconButton>

          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              {/* Header */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>
                  {stepsConfig[currentStep]?.title}
                </Typography>
                <Divider sx={{ mt: 1 }} />
              </Box>

              {/* Contenido scrollable */}
              <Box
                sx={{
                  flex: 1,
                  overflowY: 'auto',
                  pr: 1,
                  mb: 2,
                }}
              >
                {StepComponent && <StepComponent />}
              </Box>

              {/* Footer */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                  pt: 2,
                  borderTop: '1px solid #eee',
                }}
              >
                {currentStep > 0 ? (
                  <BotonAccion
                    label="Anterior"
                    onClickHooks={[handleBack]}
                    icono={<ChevronLeft />}
                    variant="outlined"
                  />
                ) : (
                  <Box /> // para mantener el espacio
                )}

                {currentStep < stepsConfig.length - 1 ? (
                  <BotonAccion
                    label="Siguiente"
                    onClickHooks={[handleNext]}
                    icono={<ChevronRight />}
                    variant="contained"
                  />
                ) : (
                  <BotonAccion
                    label="Guardar"
                    type="button"
                    icono={<Save />}
                    variant="contained"
                    color="success"
                    onClickHooks={[submitAgencia, onClose]}
                  />
                )}
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AgenciaModal;
