'use client';

import { useFormContext, Controller } from 'react-hook-form';
import InputFormulario from './InputFormulario';
import SelectorColorCampo from './SelectorCampoColor';

const StepBuscador = () => {
  const { register, control } = useFormContext();

  return (
    <div className="space-y-8 px-4 md:px-6 lg:px-8 py-6">
      {/* ----- Tipografía ----- */}
      <div className="space-y-4">
        <InputFormulario
          label="Tipografía del Buscador"
          esTipografia
          {...register('buscador_tipografia')}
        />
      </div>

      {/* ----- Colores de Texto ----- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="buscador_tipografia_color"
          control={control}
          render={({ field }) => (
            <SelectorColorCampo label="Color del Texto" {...field} />
          )}
        />
        <Controller
          name="buscador_tipografia_color_label"
          control={control}
          render={({ field }) => (
            <SelectorColorCampo label="Color de las Etiquetas" {...field} />
          )}
        />
      </div>

      {/* ----- Paleta del Buscador ----- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="buscador_color_primario"
          control={control}
          render={({ field }) => (
            <SelectorColorCampo label="Color Primario del Buscador" {...field} />
          )}
        />
        <Controller
          name="buscador_color_secundario"
          control={control}
          render={({ field }) => (
            <SelectorColorCampo label="Color Secundario del Buscador" {...field} />
          )}
        />
        <Controller
          name="buscador_color_terciario"
          control={control}
          render={({ field }) => (
            <SelectorColorCampo label="Color Terciario del Buscador" {...field} />
          )}
        />
      </div>

      {/* ----- Colores del Input ----- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="buscador_inputColor"
          control={control}
          render={({ field }) => (
            <SelectorColorCampo label="Color del Input" {...field} />
          )}
        />
        <Controller
          name="buscador_inputFondoColor"
          control={control}
          render={({ field }) => (
            <SelectorColorCampo label="Fondo del Input" {...field} />
          )}
        />
      </div>
    </div>
  );
};

export default StepBuscador;
