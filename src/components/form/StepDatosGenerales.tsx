import { useFormContext } from 'react-hook-form';
import InputFormulario from './InputFormulario';
import SelectorColorCampo from './SelectorCampoColor';

const StepDatosGenerales = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      {/* ----- Tipografía ----- */}
      <InputFormulario
        label="Tipografía de la Agencia"
        {...register('tipografia_agencia')}
        optional
      />

      <SelectorColorCampo
        label="Color de la Tipografía"
        descripcion="Color principal del texto en la aplicación"
        {...register('color_tipografia_agencia')}
        error={!!errors.color_tipografia_agencia}
      />

      {/* ----- Colores Base ----- */}
      <SelectorColorCampo
        label="Color de Fondo de la App"
        descripcion="Color general de fondo de toda la aplicación"
        {...register('color_fondo_app')}
        error={!!errors.color_fondo_app}
      />

      <SelectorColorCampo
        label="Color Primario"
        descripcion="Color utilizado para elementos principales"
        {...register('color_primario')}
        error={!!errors.color_primario}
      />

      <SelectorColorCampo
        label="Color Secundario"
        descripcion="Color para elementos secundarios y destacados"
        {...register('color_secundario')}
        error={!!errors.color_secundario}
      />

      <SelectorColorCampo
        label="Color Terciario"
        descripcion="Color adicional para acentos u otros elementos"
        {...register('color_terciario')}
        error={!!errors.color_terciario}
      />
    </div>
  );
};

export default StepDatosGenerales;
