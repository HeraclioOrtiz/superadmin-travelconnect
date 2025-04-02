import { useFormContext } from 'react-hook-form';
import InputFormulario from './InputFormulario';
import BotonImportarArchivo from './ImportButton';

const StepHeader = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-8 px-4 md:px-6 lg:px-8 py-6">
      {/* ----- Imagen de fondo ----- */}
      <div className="space-y-4">
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
      </div>

      {/* ----- Video de fondo ----- */}
      <div className="space-y-4">
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
    </div>
  );
};

export default StepHeader;
