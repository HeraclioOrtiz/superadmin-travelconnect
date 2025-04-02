import { useFormContext } from 'react-hook-form';
import InputFormulario from './InputFormulario';
import SelectorColorCampo from './SelectorCampoColor';

const StepFooter = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      {/* ----- Texto y Tipografía ----- */}
      <InputFormulario
        label="Texto del Footer"
        {...register('footer_texto')}
        optional
      />

      <InputFormulario
        label="Tipografía"
        {...register('footer_tipografia')}
        optional
      />

      <SelectorColorCampo
        label="Color de la Tipografía"
        {...register('footer_tipografia_color')}
        error={!!errors.footer_tipografia_color}
      />

      {/* ----- Paleta de Colores ----- */}
      <SelectorColorCampo
        label="Color Primario"
        {...register('footer_color_primario')}
        error={!!errors.footer_color_primario}
      />

      <SelectorColorCampo
        label="Color Secundario"
        {...register('footer_color_secundario')}
        error={!!errors.footer_color_secundario}
      />

      <SelectorColorCampo
        label="Color Terciario"
        {...register('footer_color_terciario')}
        error={!!errors.footer_color_terciario}
      />

      {/* ----- Redes Sociales ----- */}
      <InputFormulario
        label="Facebook"
        {...register('footer_facebook')}
        optional
      />

      <InputFormulario
        label="Twitter"
        {...register('footer_twitter')}
        optional
      />

      <InputFormulario
        label="Instagram"
        {...register('footer_instagram')}
        optional
      />

      <InputFormulario
        label="WhatsApp"
        {...register('footer_whatsapp')}
        optional
      />

      {/* ----- Contacto ----- */}
      <InputFormulario
        label="Teléfono"
        {...register('footer_telefono')}
        optional
      />

      <InputFormulario
        label="Email"
        {...register('footer_email')}
        optional
      />

      <InputFormulario
        label="Dirección"
        {...register('footer_direccion')}
        optional
      />

      <InputFormulario
        label="Ciudad"
        {...register('footer_ciudad')}
        optional
      />

      <InputFormulario
        label="País"
        {...register('footer_pais')}
        optional
      />
    </div>
  );
};

export default StepFooter;
