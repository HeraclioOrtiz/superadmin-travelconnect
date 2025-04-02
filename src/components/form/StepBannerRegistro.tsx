import { useFormContext } from 'react-hook-form';
import InputFormulario from './InputFormulario';
import SelectorColorCampo from './SelectorCampoColor';

const StepBannerRegistro = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      {/* ----- Título ----- */}
      <InputFormulario
        label="Título del Banner de Registro"
        {...register('banner_registro_titulo')}
        optional
      />

      {/* ----- Colores ----- */}
      <SelectorColorCampo
        label="Color del Texto"
        {...register('banner_registro_tipografia_color')}
        error={!!errors.banner_registro_tipografia_color}
      />

      <SelectorColorCampo
        label="Color Primario"
        {...register('banner_registro_color_primario')}
        error={!!errors.banner_registro_color_primario}
      />

      <SelectorColorCampo
        label="Color Secundario"
        {...register('banner_registro_color_secundario')}
        error={!!errors.banner_registro_color_secundario}
      />

      <SelectorColorCampo
        label="Color Terciario"
        {...register('banner_registro_color_terciario')}
        error={!!errors.banner_registro_color_terciario}
      />
    </div>
  );
};

export default StepBannerRegistro;
