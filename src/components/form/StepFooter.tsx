import { useFormContext } from 'react-hook-form';
import InputFormulario from './InputFormulario';
import SelectorColorCampo from './SelectorCampoColor';

const StepFooter = () => {
  const { register } = useFormContext();

  return (
    <div className="space-y-8 px-4 md:px-6 lg:px-8 py-6">
      {/* ----- Texto y Tipografía ----- */}
      <div className="space-y-4">
        <InputFormulario
          label="Texto del Footer"
          {...register('footer_texto')}
        />

        <InputFormulario
          label="Tipografía"
          {...register('footer_tipografia')}
        />

        <SelectorColorCampo
          label="Color de la Tipografía"
          {...register('footer_tipografia_color')}
        />
      </div>

      {/* ----- Paleta de Colores ----- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectorColorCampo
          label="Color Primario"
          {...register('footer_color_primario')}
        />

        <SelectorColorCampo
          label="Color Secundario"
          {...register('footer_color_secundario')}
        />

        <SelectorColorCampo
          label="Color Terciario"
          {...register('footer_color_terciario')}
        />
      </div>

      {/* ----- Redes Sociales ----- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputFormulario
          label="Facebook"
          {...register('footer_facebook')}
        />

        <InputFormulario
          label="Twitter"
          {...register('footer_twitter')}
        />

        <InputFormulario
          label="Instagram"
          {...register('footer_instagram')}
        />

        <InputFormulario
          label="WhatsApp"
          {...register('footer_whatsapp')}
        />
      </div>

      {/* ----- Contacto ----- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputFormulario
          label="Teléfono"
          {...register('footer_telefono')}
        />

        <InputFormulario
          label="Email"
          {...register('footer_email')}
        />

        <InputFormulario
          label="Dirección"
          {...register('footer_direccion')}
        />

        <InputFormulario
          label="Ciudad"
          {...register('footer_ciudad')}
        />

        <InputFormulario
          label="País"
          {...register('footer_pais')}
        />
      </div>
    </div>
  );
};

export default StepFooter;