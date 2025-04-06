import { useFormContext } from 'react-hook-form';
import InputFormulario from './InputFormulario';
import SelectorColorCampo from './SelectorCampoColor';

const StepDatosGenerales = () => {
  const { register } = useFormContext();

  return (
    <div className="space-y-8 px-4 md:px-6 lg:px-8 py-6">
      {/* ----- Tipografía ----- */}
      <div className="space-y-4">
        <InputFormulario
          label="Tipografía de la Agencia"
          {...register('tipografia_agencia')}
        />
        <SelectorColorCampo
          label="Color de la Tipografía"
          descripcion="Color principal del texto en la aplicación"
          {...register('color_tipografia_agencia')}
        />
      </div>

      {/* ----- Colores Base ----- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectorColorCampo
          label="Color de Fondo de la App"
          descripcion="Color general de fondo de toda la aplicación"
          {...register('color_fondo_app')}
        />

        <SelectorColorCampo
          label="Color Principal"
          descripcion="Color utilizado para elementos principales"
          {...register('color_principal')}
        />

        <SelectorColorCampo
          label="Color Secundario"
          descripcion="Color para elementos secundarios y destacados"
          {...register('color_secundario')}
        />

        <SelectorColorCampo
          label="Color Terciario"
          descripcion="Color adicional para acentos u otros elementos"
          {...register('color_terciario')}
        />
      </div>
    </div>
  );
};

export default StepDatosGenerales;
