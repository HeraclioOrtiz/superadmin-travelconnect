import { useFormContext } from 'react-hook-form';
import InputFormulario from './InputFormulario';
import SelectorColorCampo from './SelectorCampoColor';
import BotonImportarArchivo from './ImportButton';

const StepPublicidadCliente = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-8 px-4 md:px-6 lg:px-8 py-6">
      {/* ----- Activar Publicidad ----- */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="publicidad_existe"
          {...register('publicidad_existe')}
          className="h-4 w-4"
        />
        <label htmlFor="publicidad_existe">Activar sección de publicidad</label>
      </div>

      {/* ----- Título y colores de texto ----- */}
      <div className="space-y-4">
        <InputFormulario
          label="Título de la Publicidad"
          {...register('publicidad_titulo')}
          optional
        />

        <SelectorColorCampo
          label="Color de la Tipografía"
          {...register('publicidad_tipografia_color')}
          error={!!errors.publicidad_tipografia_color}
        />
      </div>

      {/* ----- Paleta de colores ----- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectorColorCampo
          label="Color Primario"
          {...register('publicidad_color_primario')}
          error={!!errors.publicidad_color_primario}
        />

        <SelectorColorCampo
          label="Color Secundario"
          {...register('publicidad_color_secundario')}
          error={!!errors.publicidad_color_secundario}
        />

        <SelectorColorCampo
          label="Color Terciario"
          {...register('publicidad_color_terciario')}
          error={!!errors.publicidad_color_terciario}
        />
      </div>

      {/* ----- Imágenes ----- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BotonImportarArchivo
          label="Imagen 1 de Publicidad"
          name="publicidad_imagen_1"
          accept="image/*"
          register={register}
        />

        <BotonImportarArchivo
          label="Imagen 2 de Publicidad"
          name="publicidad_imagen_2"
          accept="image/*"
          register={register}
        />

        <BotonImportarArchivo
          label="Imagen 3 de Publicidad"
          name="publicidad_imagen_3"
          accept="image/*"
          register={register}
        />
      </div>
    </div>
  );
};

export default StepPublicidadCliente;
