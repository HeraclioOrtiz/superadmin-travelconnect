import type { AgenciaFormValues } from './forms';

/**
 * Transforma los valores del formulario en un objeto FormData
 * para ser compatible con endpoints Laravel que esperan archivos y texto.
 */
export function transformarAgenciaParaEnvio(
  datos: AgenciaFormValues
): FormData {
  const formData = new FormData();

  for (const [clave, valor] of Object.entries(datos)) {
    if (valor instanceof File) {
      formData.append(clave, valor);
    } else if (typeof valor === 'boolean') {
      formData.append(clave, valor ? '1' : '0');
    } else if (valor instanceof Date) {
      formData.append(clave, valor.toISOString());
    } else if (Array.isArray(valor)) {
      formData.append(clave, JSON.stringify(valor));
    } else if (valor === undefined || valor === null) {
      formData.append(clave, '');
    } else {
      formData.append(clave, valor.toString());
    }
  }

  return formData;
}

