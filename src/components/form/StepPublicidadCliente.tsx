'use client';

import { useFormContext, Controller } from 'react-hook-form';
import InputFormulario from './InputFormulario';
import SelectorColorCampo from './SelectorCampoColor';
import BotonImportarArchivo from './ImportButton';
import { useAgenciaForm } from './hooks/useAgenciaForm';
import { usePrevisualizacionArchivo } from './hooks/usePrevisualizacionArchivo';
import { Box } from '@mui/material';

const StepPublicidadCliente = () => {
  const { register, watch, setValue, control } = useFormContext();
  const { urlsAgencia } = useAgenciaForm();

  const preview1 = usePrevisualizacionArchivo({
    campo: 'publicidad_imagen_1',
    archivo: watch('publicidad_imagen_1'),
    urlOriginal: urlsAgencia?.publicidadUrls?.[0] ?? null,
    setValue,
  });

  const preview2 = usePrevisualizacionArchivo({
    campo: 'publicidad_imagen_2',
    archivo: watch('publicidad_imagen_2'),
    urlOriginal: urlsAgencia?.publicidadUrls?.[1] ?? null,
    setValue,
  });

  const preview3 = usePrevisualizacionArchivo({
    campo: 'publicidad_imagen_3',
    archivo: watch('publicidad_imagen_3'),
    urlOriginal: urlsAgencia?.publicidadUrls?.[2] ?? null,
    setValue,
  });

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
        />

        <Controller
          name="publicidad_tipografia_color"
          control={control}
          render={({ field }) => (
            <SelectorColorCampo
              label="Color de la Tipografía"
              {...field}
            />
          )}
        />
      </div>

      {/* ----- Paleta de colores ----- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="publicidad_color_primario"
          control={control}
          render={({ field }) => (
            <SelectorColorCampo
              label="Color Primario"
              {...field}
            />
          )}
        />

        <Controller
          name="publicidad_color_secundario"
          control={control}
          render={({ field }) => (
            <SelectorColorCampo
              label="Color Secundario"
              {...field}
            />
          )}
        />

        <Controller
          name="publicidad_color_terciario"
          control={control}
          render={({ field }) => (
            <SelectorColorCampo
              label="Color Terciario"
              {...field}
            />
          )}
        />
      </div>

      {/* ----- Imágenes ----- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <BotonImportarArchivo
            label="Imagen 1 de Publicidad"
            accept="image/*"
            multiple={false}
            onChange={preview1.manejarCambio}
            register={register('publicidad_imagen_1')}
          />
          {preview1.urlPreview && (
            <Box
              component="img"
              src={preview1.urlPreview}
              alt="Preview Imagen 1"
              sx={{
                width: '100%',
                height: 140,
                objectFit: 'cover',
                border: '1px solid #ccc',
                borderRadius: 2,
                mt: 1,
              }}
            />
          )}
        </div>

        <div>
          <BotonImportarArchivo
            label="Imagen 2 de Publicidad"
            accept="image/*"
            multiple={false}
            onChange={preview2.manejarCambio}
            register={register('publicidad_imagen_2')}
          />
          {preview2.urlPreview && (
            <Box
              component="img"
              src={preview2.urlPreview}
              alt="Preview Imagen 2"
              sx={{
                width: '100%',
                height: 140,
                objectFit: 'cover',
                border: '1px solid #ccc',
                borderRadius: 2,
                mt: 1,
              }}
            />
          )}
        </div>

        <div>
          <BotonImportarArchivo
            label="Imagen 3 de Publicidad"
            accept="image/*"
            multiple={false}
            onChange={preview3.manejarCambio}
            register={register('publicidad_imagen_3')}
          />
          {preview3.urlPreview && (
            <Box
              component="img"
              src={preview3.urlPreview}
              alt="Preview Imagen 3"
              sx={{
                width: '100%',
                height: 140,
                objectFit: 'cover',
                border: '1px solid #ccc',
                borderRadius: 2,
                mt: 1,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StepPublicidadCliente;
