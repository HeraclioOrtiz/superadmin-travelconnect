import { useFormContext } from 'react-hook-form';
import InputFormulario from './InputFormulario';
import SelectorColorCampo from './SelectorCampoColor';

const StepFooter = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-8 px-4 md:px-6 lg:px-8 py-6">
      {/* ----- Texto y Tipografía ----- */}
      <div className="space-y-4">
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
      </div>

      {/* ----- Paleta de Colores ----- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>

      {/* ----- Redes Sociales ----- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>

      {/* ----- Contacto ----- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </div>
  );
};

export default StepFooter;
