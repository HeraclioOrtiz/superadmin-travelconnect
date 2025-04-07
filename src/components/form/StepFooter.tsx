'use client';

import { useFormContext, Controller } from 'react-hook-form';
import InputFormulario from './InputFormulario';
import SelectorColorCampo from './SelectorCampoColor';

const StepFooter = () => {
  const { register, control } = useFormContext();

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

        <Controller
          name="footer_tipografia_color"
          control={control}
          render={({ field }) => (
            <SelectorColorCampo
              label="Color de la Tipografía"
              {...field}
            />
          )}
        />
      </div>

      {/* ----- Paleta de Colores ----- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="footer_color_primario"
          control={control}
          render={({ field }) => (
            <SelectorColorCampo
              label="Color Primario"
              {...field}
            />
          )}
        />

        <Controller
          name="footer_color_secundario"
          control={control}
          render={({ field }) => (
            <SelectorColorCampo
              label="Color Secundario"
              {...field}
            />
          )}
        />

        <Controller
          name="footer_color_terciario"
          control={control}
          render={({ field }) => (
            <SelectorColorCampo
              label="Color Terciario"
              {...field}
            />
          )}
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
