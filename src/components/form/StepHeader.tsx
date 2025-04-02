import { useFormContext } from 'react-hook-form';
import InputFormulario from './InputFormulario';
import BotonImportarArchivo from './ImportButton';

const StepHeader = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      {/* ----- Imagen de fondo ----- */}
      <BotonImportarArchivo
        label="Importar Imagen de Fondo del Header"
        name="header_imagen_background"
        accept="image/*"
        register={register}
      />

      <InputFormulario
        label="Opacidad de la Imagen"
        type="number"
        {...register('header_imagen_background_opacidad')}
      />

      {/* ----- Video de fondo ----- */}
      <BotonImportarArchivo
        label="Importar Video de Fondo del Header"
        name="header_video_background"
        accept="video/*"
        register={register}
      />

      <InputFormulario
        label="Opacidad del Video"
        type="number"
        {...register('header_video_background_opacidad')}
      />
    </div>
  );
};

export default StepHeader;
