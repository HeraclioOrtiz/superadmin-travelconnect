import { useFormContext } from 'react-hook-form';
import InputFormulario from './InputFormulario';
import SelectorColorCampo from './SelectorCampoColor';

const StepTarjetas = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-8 px-4 md:px-6 lg:px-8 py-6">
      {/* ----- Título y tipografía ----- */}
      <div className="space-y-4">
        <InputFormulario
          label="Título de la Sección de Tarjetas"
          {...register('tarjetas_titulo')}
          optional
        />

        <InputFormulario
          label="Tipografía"
          {...register('tarjetas_tipografia')}
          optional
        />
      </div>

      {/* ----- Colores de Tipografía ----- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectorColorCampo
          label="Color del Texto"
          {...register('tarjetas_tipografia_color')}
          error={!!errors.tarjetas_tipografia_color}
        />

        <SelectorColorCampo
          label="Color del Título"
          {...register('tarjetas_tipografia_color_titulo')}
          error={!!errors.tarjetas_tipografia_color_titulo}
        />

        <SelectorColorCampo
          label="Color del Contenido"
          {...register('tarjetas_tipografia_color_contenido')}
          error={!!errors.tarjetas_tipografia_color_contenido}
        />
      </div>

      {/* ----- Paleta de Colores ----- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectorColorCampo
          label="Color Primario"
          {...register('tarjetas_color_primario')}
          error={!!errors.tarjetas_color_primario}
        />

        <SelectorColorCampo
          label="Color Secundario"
          {...register('tarjetas_color_secundario')}
          error={!!errors.tarjetas_color_secundario}
        />

        <SelectorColorCampo
          label="Color Terciario"
          {...register('tarjetas_color_terciario')}
          error={!!errors.tarjetas_color_terciario}
        />
      </div>
    </div>
  );
};

export default StepTarjetas;
