import type { AgenciaFormValues } from './forms';

export function transformarAgenciaParaEnvio(
  datos: AgenciaFormValues
): Record<string, string | File | null> {
  const resultado: Record<string, string | File | null> = {};

  for (const [clave, valor] of Object.entries(datos)) {
    if (valor instanceof File) {
      resultado[clave] = valor;
    } else if (typeof valor === 'boolean') {
      resultado[clave] = valor ? '1' : '0';
    } else if (valor instanceof Date) {
      resultado[clave] = valor.toISOString();
    } else if (Array.isArray(valor)) {
      resultado[clave] = JSON.stringify(valor);
    } else if (valor === undefined) {
      resultado[clave] = null;
    } else {
      resultado[clave] = valor ?? null;
    }
  }

  return resultado;
}
