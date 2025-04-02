import { useFormContext } from 'react-hook-form';
import InputFormulario from './InputFormulario';
import BotonImportarArchivo from './ImportButton';
import SelectorColorCampo from './SelectorCampoColor';

const Step1Basic = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-20 px-4 md:px-6 lg:px-8 py-10">
      {/* ======= Sección: Información básica ======= */}
      <section className="space-y-10">
        <h2 className="text-xl font-semibold">Información Básica</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8">
          <InputFormulario label="Nombre" {...register('nombre')} />
          <InputFormulario label="Contraseña" type="password" {...register('password')} />
          <InputFormulario label="Dominio" {...register('dominio')} />
        </div>
      </section>

      {/* ======= Sección: Quiénes Somos ======= */}
      <section className="space-y-10">
        <h2 className="text-xl font-semibold">Quiénes Somos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8">
          <InputFormulario
            label="Español"
            optional
            {...register('quienes_somos_es')}
          />
          <InputFormulario
            label="Inglés"
            optional
            {...register('quienes_somos_en')}
          />
          <InputFormulario
            label="Portugués"
            optional
            {...register('quienes_somos_pt')}
          />
        </div>
      </section>

      {/* ======= Sección: Archivos ======= */}
      <section className="space-y-10">
        <h2 className="text-xl font-semibold">Archivos</h2>
        <div className="space-y-6">
          <BotonImportarArchivo
            label="Importar Logo"
            name="logo"
            accept="image/*"
            register={register}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8">
            <InputFormulario
              label="Favicon (URL)"
              {...register('favicon')}
              helperText="Puede ser un enlace o dejarse vacío"
            />
            <InputFormulario
              label="Fondo 1 (URL)"
              {...register('fondo_1')}
              helperText="Imagen de fondo principal"
              optional
            />
            <InputFormulario
              label="Fondo 2 (URL)"
              {...register('fondo_2')}
              helperText="Imagen de fondo secundaria"
              optional
            />
          </div>
        </div>
      </section>

      {/* ======= Sección: Colores ======= */}
      <section className="space-y-10">
        <h2 className="text-xl font-semibold">Colores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8">
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
        </div>
      </section>

      {/* ======= Sección: Filtros ======= */}
      <section className="space-y-10">
        <h2 className="text-xl font-semibold">Filtros de Imágenes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="filtro_imagen_1"
              {...register('filtro_imagen_1')}
              className="h-5 w-5"
            />
            <label htmlFor="filtro_imagen_1">Aplicar filtro a Fondo 1</label>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="filtro_imagen_2"
              {...register('filtro_imagen_2')}
              className="h-5 w-5"
            />
            <label htmlFor="filtro_imagen_2">Aplicar filtro a Fondo 2</label>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Step1Basic;
