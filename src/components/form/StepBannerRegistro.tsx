'use client';

import { useFormContext, Controller } from 'react-hook-form';
import InputFormulario from './InputFormulario';
import SelectorColorCampo from './SelectorCampoColor';

const StepBannerRegistro = () => {
  const { register, control } = useFormContext();

  return (
    <div className="space-y-8 px-4 md:px-6 lg:px-8 py-6">
      {/* ----- Título ----- */}
      <div className="space-y-4">
        <InputFormulario
          label="Título del Banner de Registro"
          {...register('banner_registro_titulo')}
        />
      </div>

      {/* ----- Colores ----- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="banner_registro_tipografia_color"
          control={control}
          render={({ field }) => (
            <SelectorColorCampo
              label="Color del Texto"
              {...field}
            />
          )}
        />

        <Controller
          name="banner_registro_color_primario"
          control={control}
          render={({ field }) => (
            <SelectorColorCampo
              label="Color Primario"
              {...field}
            />
          )}
        />

        <Controller
          name="banner_registro_color_secundario"
          control={control}
          render={({ field }) => (
            <SelectorColorCampo
              label="Color Secundario"
              {...field}
            />
          )}
        />

        <Controller
          name="banner_registro_color_terciario"
          control={control}
          render={({ field }) => (
            <SelectorColorCampo
              label="Color Terciario"
              {...field}
            />
          )}
        />
      </div>
    </div>
  );
};

export default StepBannerRegistro;

