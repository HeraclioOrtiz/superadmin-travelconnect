'use client';

import { useFormContext, Controller } from 'react-hook-form';
import InputFormulario from './InputFormulario';
import SelectorColorCampo from './SelectorCampoColor';

const StepTarjetas = () => {
  const { register, control } = useFormContext();

  return (
    <div className="space-y-8 px-4 md:px-6 lg:px-8 py-6">
      {/* ----- Título y tipografía ----- */}
      <div className="space-y-4">
        <InputFormulario
          label="Título de la Sección de Tarjetas"
          {...register('tarjetas_titulo')}
        />

        <InputFormulario
          label="Tipografía"
          {...register('tarjetas_tipografia')}
        />
      </div>

      {/* ----- Colores de Tipografía ----- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="tarjetas_tipografia_color"
          control={control}
          render={({ field }) => (
            <SelectorColorCampo
              label="Color del Texto"
              {...field}
            />
          )}
        />

        <Controller
          name="tarjetas_tipografia_color_titulo"
          control={control}
          render={({ field }) => (
            <SelectorColorCampo
              label="Color del Título"
              {...field}
            />
          )}
        />

        <Controller
          name="tarjetas_tipografia_color_contenido"
          control={control}
          render={({ field }) => (
            <SelectorColorCampo
              label="Color del Contenido"
              {...field}
            />
          )}
        />
      </div>

      {/* ----- Paleta de Colores ----- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="tarjetas_color_primario"
          control={control}
          render={({ field }) => (
            <SelectorColorCampo
              label="Color Primario"
              {...field}
            />
          )}
        />

        <Controller
          name="tarjetas_color_secundario"
          control={control}
          render={({ field }) => (
            <SelectorColorCampo
              label="Color Secundario"
              {...field}
            />
          )}
        />

        <Controller
          name="tarjetas_color_terciario"
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

export default StepTarjetas;
