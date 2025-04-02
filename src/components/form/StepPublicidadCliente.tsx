import { useFormContext } from 'react-hook-form';
import InputFormulario from './InputFormulario';
import SelectorColorCampo from './SelectorCampoColor';
import BotonImportarArchivo from './ImportButton';

const StepPublicidadCliente = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      {/* ----- Activar Publicidad ----- */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="publicidad_existe"
          {...register('publicidad_existe')}
          className="h-4 w-4"
        />
        <label htmlFor="publicidad_existe">Activar sección de publicidad</label>
      </div>

      {/* ----- Título y colores de texto ----- */}
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

      {/* ----- Paleta de colores ----- */}
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

      {/* ----- Imágenes ----- */}
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
  );
};

export default StepPublicidadCliente;
