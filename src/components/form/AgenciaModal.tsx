import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { stepsConfig} from './configStep';
import BotonAccion from './BotonAccion';
import { ChevronLeft, ChevronRight, Save } from '@mui/icons-material';
import { Modal } from '@mui/material'; // Assuming Modal is from @mui/material

type AgenciaModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void; // Tipar con tu interfaz de formulario
};

const AgenciaModal = ({ isOpen, onClose, onSubmit }: AgenciaModalProps) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const methods = useForm(); // 🛠️ Tipar con tu interfaz (ej: useForm<AgenciaFormValues>())
  const StepComponent = stepsConfig[currentStep]?.component;
  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (isValid) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => setCurrentStep(prev => prev - 1);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {/* Header */}
          <div className="modal-header">
            <h3>{stepsConfig[currentStep]?.title}</h3>
          </div>

          {/* Contenido del Step Actual */}
          <div className="modal-body">
            {StepComponent && <StepComponent />}
            </div>

          {/* Footer con Navegación */}
          <div className="modal-footer">
            <div>
              {currentStep > 0 && (
                <BotonAccion
                  label="Anterior"
                  onClickHooks={[handleBack]}
                  icono={<ChevronLeft />}
                  variant="outlined"
                />
              )}
            </div>
            <div>
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
                  type="submit"
                  icono={<Save />}
                  variant="contained"
                  color="success"
                />
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default AgenciaModal;