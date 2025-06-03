'use client';

import { useFormContext, Controller } from 'react-hook-form';
import InputFormulario from './InputFormulario';
import SelectorColorCampo from './SelectorCampoColor';

const StepDatosGenerales = () => {
  const { register, control } = useFormContext();

  return (
    <div className="space-y-8 px-4 md:px-6 lg:px-8 py-6">
      {/* ----- Tipografía ----- */}
      <div className="space-y-4">
        <InputFormulario
          label="Tipografía de la Agencia"
          esTipografia
          {...register('tipografia_agencia')}
        />
        <Controller
          name="color_tipografia_agencia"
          control={control}
          render={({ field }) => (
            <SelectorColorCampo
              label="Color de la Tipografía"
              descripcion="Color principal del texto en la aplicación"
              {...field}
            />
          )}
        />
      </div>

      {/* ----- Colores Base ----- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="color_fondo_app"
          control={control}
          render={({ field }) => (
            <SelectorColorCampo
              label="Color de Fondo de la App"
              descripcion="Color general de fondo de toda la aplicación"
              {...field}
            />
          )}
        />

        <Controller
          name="color_principal"
          control={control}
          render={({ field }) => (
            <SelectorColorCampo
              label="Color Principal"
              descripcion="Color utilizado para elementos principales"
              {...field}
            />
          )}
        />

        <Controller
          name="color_secundario"
          control={control}
          render={({ field }) => (
            <SelectorColorCampo
              label="Color Secundario"
              descripcion="Color para elementos secundarios y destacados"
              {...field}
            />
          )}
        />

        <Controller
          name="color_terciario"
          control={control}
          render={({ field }) => (
            <SelectorColorCampo
              label="Color Terciario"
              descripcion="Color adicional para acentos u otros elementos"
              {...field}
            />
          )}
        />
      </div>
    </div>
  );
};

export default StepDatosGenerales;
