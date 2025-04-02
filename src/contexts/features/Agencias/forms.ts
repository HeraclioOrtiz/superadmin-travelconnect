import { Agencia } from './types';

/**
 * Representa todos los campos necesarios para el formulario de creación/edición de agencias
 * (Mapeo completo de la interfaz Agencia)
 */
export interface AgenciaFormValues {
  // === Datos Principales ===
  estado: boolean;
  nombre: string;
  password: string;
  dominio: string;
  quienes_somos_es: string | null;
  quienes_somos_en: string | null;
  quienes_somos_pt: string | null;
  favicon: string | null;
  logo: File| string | null;
  fondo_1: string | null;
  fondo_2: string | null;
  color_principal: string;
  color_barra_superior: string;
  filtro_imagen_1: boolean;
  filtro_imagen_2: boolean;
  

  // === Datos Generales ===
  tipografia_agencia: string | null;
  color_tipografia_agencia: string | null;
  color_fondo_app: string | null;
  color_primario: string | null;
  color_secundario: string | null;
  color_terciario: string | null;

  // === Header ===
  header_imagen_background: File| string | null;
  header_imagen_background_opacidad: number | null;
  header_video_background: File|string | null;
  header_video_background_opacidad: number | null;

  // === Buscador ===
  buscador_tipografia: string | null;
  buscador_tipografia_color: string | null;
  buscador_tipografia_color_label: string | null;
  buscador_color_primario: string | null;
  buscador_color_secundario: string | null;
  buscador_color_terciario: string | null;

  // === Publicidad Cliente ===
  publicidad_existe: boolean;
  publicidad_titulo: string | null;
  publicidad_tipografia_color: string | null;
  publicidad_color_primario: string | null;
  publicidad_color_secundario: string | null;
  publicidad_color_terciario: string | null;
  publicidad_imagen_1: File| string | null;
  publicidad_imagen_2: File |string | null;
  publicidad_imagen_3: File| string | null;

  // === Tarjetas ===
  tarjetas_titulo: string | null;
  tarjetas_tipografia: string | null;
  tarjetas_tipografia_color: string | null;
  tarjetas_tipografia_color_titulo: string | null;
  tarjetas_tipografia_color_contenido: string | null;
  tarjetas_color_primario: string | null;
  tarjetas_color_secundario: string | null;
  tarjetas_color_terciario: string | null;

  // === Banner de Registro ===
  banner_registro_titulo: string | null;
  banner_registro_tipografia_color: string | null;
  banner_registro_color_primario: string | null;
  banner_registro_color_secundario: string | null;
  banner_registro_color_terciario: string | null;

  // === Footer ===
  footer_texto: string | null;
  footer_tipografia: string | null;
  footer_tipografia_color: string | null;
  footer_color_primario: string | null;
  footer_color_secundario: string | null;
  footer_color_terciario: string | null;
  footer_facebook: string | null;
  footer_twitter: string | null;
  footer_instagram: string | null;
  footer_whatsapp: string | null;
  footer_telefono: string | null;
  footer_email: string | null;
  footer_direccion: string | null;
  footer_ciudad: string | null;
  footer_pais: string | null;
}

/**
 * Respuesta estándar para operaciones CRUD
 */
export type CrudAgenciaCreateResponse = {
    success: boolean;
    agencia?: AgenciaFormValues;
    error?: string;
    statusCode?: number;  // <-- Añade esta línea
  };
  export type CrudAgenciaUpdateResponse = {
    success: boolean;
    agencia?: Agencia;
    error?: string;
    statusCode?: number;  // <-- Añade esta línea
  };
  export type CreateAgenciaResponse = CrudAgenciaCreateResponse;
  export type UpdateAgenciaResponse = CrudAgenciaUpdateResponse;
  export type DeleteAgenciaResponse = Pick<CrudAgenciaUpdateResponse, 'success' | 'error' | 'statusCode'>;  // <--