import { AgenciaBackData } from './AgenciaBackData';

export type AgenciaBackCorregido = Omit<
  AgenciaBackData,
  'estado' |
  'publicidad_existe' |
  'header_imagen_background_opacidad' |
  'header_video_background_opacidad'
> & {
  estado: boolean;
  publicidad_existe: boolean;
  header_imagen_background_opacidad: number;
  header_video_background_opacidad: number;
};
