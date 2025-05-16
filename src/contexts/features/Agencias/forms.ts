import { AgenciaBackData } from '@/types/AgenciaBackData';

export interface AgenciaFormValues {
  // --- Identificación y autenticación ---
  nombre: string;
  dominio: string;
  estado: boolean;
  password: string;

  // --- Archivos ---
  logo?: File | null;
  favicon?: File | null;
  header_imagen_background?: File | null;
  header_video_background?: File | null;
  publicidad_imagen_1?: File | null;
  publicidad_imagen_2?: File | null;
  publicidad_imagen_3?: File | null;
  terminos_y_condiciones?: File | null;

  // --- Estilos generales ---
  tipografia_agencia?: string;
  color_tipografia_agencia?: string;
  color_fondo_app?: string;

  color_principal?: string;
  color_secundario?: string;
  color_terciario?: string;

  // --- Header ---
  header_imagen_background_opacidad?: number;
  header_video_background_opacidad?: number;

  // --- Buscador ---
  buscador_tipografia?: string;
  buscador_tipografia_color?: string;
  buscador_tipografia_color_label?: string;
  buscador_inputColor?: string;
  buscador_inputFondoColor?: string;
  buscador_color_primario?: string;
  buscador_color_secundario?: string;
  buscador_color_terciario?: string;

  // --- Publicidad Cliente ---
  publicidad_existe?: boolean;
  publicidad_titulo?: string;
  publicidad_tipografia_color?: string;
  publicidad_color_primario?: string;
  publicidad_color_secundario?: string;
  publicidad_color_terciario?: string;

  // --- Tarjetas ---
  tarjetas_titulo?: string;
  tarjetas_tipografia?: string;
  tarjetas_tipografia_color?: string;
  tarjetas_tipografia_color_titulo?: string;
  tarjetas_tipografia_color_contenido?: string;
  tarjetas_color_primario?: string;
  tarjetas_color_secundario?: string;
  tarjetas_color_terciario?: string;

  // --- Banner Registro ---
  banner_registro_titulo?: string;
  banner_registro_tipografia_color?: string;
  banner_registro_color_primario?: string;
  banner_registro_color_secundario?: string;
  banner_registro_color_terciario?: string;

  // --- Información institucional ---
  quienes_somos_es?: string;
  quienes_somos_en?: string;
  quienes_somos_pt?: string;

  // --- Footer ---
  footer_texto?: string;
  footer_tipografia?: string;
  footer_tipografia_color?: string;

  footer_color_primario?: string;
  footer_color_secundario?: string;
  footer_color_terciario?: string;

  // --- Redes sociales ---
  redes_facebook?: string;
  redes_instagram?: string;
  redes_twitter?: string;
  redes_whatsapp?: string;

  // --- Contacto ---
  contacto_email?: string;
  contacto_telefono?: string;

  // --- Ubicación ---
  ubicacion_direccion?: string;
  ubicacion_ciudad?: string;
  ubicacion_pais?: string;
}

// ======================
// Tipos de Respuesta
// ======================

export interface CreateAgenciaResponse {
  success: boolean;
  agencia?: AgenciaBackData;
  error?: string;
  statusCode?: number;
}

export interface EditAgenciaResponse {
  success: boolean;
  error?: string;
  statusCode?: number;
}
