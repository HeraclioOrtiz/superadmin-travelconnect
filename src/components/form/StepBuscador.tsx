import { useFormContext } from 'react-hook-form';
import InputFormulario from './InputFormulario';
import SelectorColorCampo from './SelectorCampoColor';

const StepBuscador = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-8 px-4 md:px-6 lg:px-8 py-6">
      {/* ----- Tipografía ----- */}
      <div className="space-y-4">
        <InputFormulario
          label="Tipografía del Buscador"
          {...register('buscador_tipografia')}
          optional
        />
      </div>

      {/* ----- Colores de Texto ----- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectorColorCampo
          label="Color del Texto"
          {...register('buscador_tipografia_color')}
          error={!!errors.buscador_tipografia_color}
        />

        <SelectorColorCampo
          label="Color de las Etiquetas"
          {...register('buscador_tipografia_color_label')}
          error={!!errors.buscador_tipografia_color_label}
        />
      </div>

      {/* ----- Paleta del Buscador ----- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectorColorCampo
          label="Color Primario del Buscador"
          {...register('buscador_color_primario')}
          error={!!errors.buscador_color_primario}
        />

        <SelectorColorCampo
          label="Color Secundario del Buscador"
          {...register('buscador_color_secundario')}
          error={!!errors.buscador_color_secundario}
        />

        <SelectorColorCampo
          label="Color Terciario del Buscador"
          {...register('buscador_color_terciario')}
          error={!!errors.buscador_color_terciario}
        />
      </div>
    </div>
  );
};

export default StepBuscador;
