import { useFormContext } from 'react-hook-form';
import InputFormulario from './InputFormulario';
import SelectorColorCampo from './SelectorCampoColor';

const StepTarjetas = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      {/* ----- Título y tipografía ----- */}
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

      {/* ----- Colores de Tipografía ----- */}
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

      {/* ----- Paleta de Colores ----- */}
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
  );
};

export default StepTarjetas;
