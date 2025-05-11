import { AgenciaBackData } from './AgenciaBackData';
import { AgenciaBackCorregido } from './AgenciaBackCorregido';

export function normalizarAgenciaBackData(data: AgenciaBackData): AgenciaBackCorregido {
  return {
    ...data,
    estado: data.estado === 1,
    publicidad_existe: data.publicidad_existe === 1,
    header_imagen_background_opacidad: parseFloat(data.header_imagen_background_opacidad),
    header_video_background_opacidad: parseFloat(data.header_video_background_opacidad),
  };
}
