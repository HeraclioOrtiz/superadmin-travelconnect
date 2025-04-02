import { useFormContext } from 'react-hook-form';
import InputFormulario from './InputFormulario';
import BotonImportarArchivo from './ImportButton';
import SelectorColorCampo from './SelectorCampoColor';

const Step1Basic= () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      {/* ----- Archivos ----- */}
      <BotonImportarArchivo
        label="Importar Logo"
        name="logo"
        accept="image/*"
        register={register}
      />

      <InputFormulario
        label="Favicon (URL)"
        {...register('favicon')}
        helperText="Puede ser un enlace o dejarse vacío"
      />

      <InputFormulario
        label="Fondo 1 (URL)"
        {...register('fondo_1')}
        helperText="URL de la imagen de fondo principal"
        optional
      />

      <InputFormulario
        label="Fondo 2 (URL)"
        {...register('fondo_2')}
        helperText="URL alternativa para fondo secundario"
        optional
      />

      {/* ----- Colores ----- */}
      <SelectorColorCampo
        label="Color Principal"
        descripcion="Color que se aplicará en botones y elementos destacados"
        {...register('color_principal')}
        error={!!errors.color_principal}
        
      />

      <SelectorColorCampo
        label="Color de la Barra Superior"
        descripcion="Color de fondo para la cabecera del sitio"
        {...register('color_barra_superior')}
        error={!!errors.color_barra_superior}
        
      />

      {/* ----- Filtros para Fondos ----- */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="filtro_imagen_1"
          {...register('filtro_imagen_1')}
          className="h-4 w-4"
        />
        <label htmlFor="filtro_imagen_1">Aplicar filtro a Fondo 1</label>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="filtro_imagen_2"
          {...register('filtro_imagen_2')}
          className="h-4 w-4"
        />
        <label htmlFor="filtro_imagen_2">Aplicar filtro a Fondo 2</label>
      </div>
    </div>
  );
};

export default Step1Basic
