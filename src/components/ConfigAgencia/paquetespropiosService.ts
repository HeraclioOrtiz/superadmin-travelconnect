// src/servicios/especificos/paquetespropiosService.ts

/**
 * Sube un archivo CSV para realizar actualización masiva de paquetes.
 * @param agenciaId - ID de la agencia activa
 * @param archivo - Archivo CSV (File)
 * @returns Objeto con éxito, mensaje y estadísticas si aplica
 */
export const subirArchivoPaquetes = async (
  agenciaId: number,
  archivo: File
): Promise<
  | {
      status: 'success';
      message: string;
      stats: {
        total_records: number;
        created: number;
        updated: number;
        deactivated: number;
        errors: number;
      };
    }
  | {
      status: 'error';
      message: string;
      required_fields?: string[];
      errors?: any[];
    }
> => {
  const formData = new FormData();
  formData.append('agencia_id', agenciaId.toString());
  formData.append('csv_file', archivo);

  try {
    const response = await fetch('https://travelconnect.com.ar/update_package', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Error al subir archivo CSV:', error);
    return {
      status: 'error',
      message: 'Error de red al intentar subir el archivo',
    };
  }
};

/**
 * Exporta los paquetes de una agencia a un archivo CSV descargable.
 * @param agenciaId - ID de la agencia activa
 * @returns URL del archivo descargable o null si falla
 */
export const exportarArchivoPaquetes = async (
  agenciaId: number
): Promise<string | null> => {
  try {
    const response = await fetch('https://travelconnect.com.ar/exportar-paquetes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ agencia_id: agenciaId }),
    });

    const data = await response.json();

    if (response.ok && data.download_url) {
      return data.download_url;
    } else {
      console.error('❌ Error al exportar paquetes:', data.message);
      return null;
    }
  } catch (error) {
    console.error('💥 Error en exportarArchivoPaquetes:', error);
    return null;
  }
};

