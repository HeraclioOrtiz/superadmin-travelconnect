import { Agencia } from './types';

/**
 * Representa todos los campos necesarios para el formulario de creación/edición de agencias
 * (Mapeo completo de la interfaz Agencia)
 */
export interface AgenciaFormValues {
  // === Identificadores internos (opcional para edición) ===
 
  
  // === Datos Principales ===
  estado: boolean;
  nombre: string;
  password: string;
  dominio: string;
  logo: File | null;
  quienes_somos_es: string | null;
  quienes_somos_en: string | null;
  quienes_somos_pt: string | null;
  

  // === Datos Generales ===
  tipografia_agencia: string | null;
  color_tipografia_agencia: string;
  color_fondo_app: string;
  color_principal: string; 
  color_secundario: string;
  color_terciario: string;

  // === Header ===
  header_imagen_background_opacidad: number;
  header_video_background_opacidad: number;
  header_imagen_background: File | null;
  header_video_background: File | null;


  // === Buscador ===
  buscador_tipografia: string | null;
  buscador_tipografia_color: string;
  buscador_tipografia_color_label: string;
  buscador_color_primario: string;
  buscador_color_secundario: string;
  buscador_color_terciario: string;
  buscador_inputColor:string| null;
  buscador_inputFondoColor:string|null;

  // === Publicidad Cliente ===
  publicidad_existe: boolean;
  publicidad_titulo: string | null;
  publicidad_tipografia_color: string;
  publicidad_color_primario: string;
  publicidad_color_secundario: string;
  publicidad_color_terciario: string;
  publicidad_imagen_1: string | null;
  publicidad_imagen_2: string | null;
  publicidad_imagen_3: string | null;

  // === Tarjetas ===
  tarjetas_titulo: string | null;
  tarjetas_tipografia: string | null;
  tarjetas_tipografia_color: string;
  tarjetas_tipografia_color_titulo: string;
  tarjetas_tipografia_color_contenido: string;
  tarjetas_color_primario: string;
  tarjetas_color_secundario: string;
  tarjetas_color_terciario: string;

  // === Banner de Registro ===
  banner_registro_titulo: string | null;
  banner_registro_tipografia_color: string;
  banner_registro_color_primario: string;
  banner_registro_color_secundario: string;
  banner_registro_color_terciario: string;

  // === Footer ===
  footer_texto: string | null;
  footer_tipografia: string | null;
  footer_tipografia_color: string;
  footer_facebook: string | null;
  footer_twitter: string | null;
  footer_instagram: string | null;
  footer_whatsapp: string | null;
  footer_telefono: string | null;
  footer_email: string | null;
  footer_direccion: string | null;
  footer_ciudad: string | null;
  footer_pais: string | null;
  footer_color_primario: string | null;
  footer_color_secundario: string | null;
  footer_color_terciario: string | null;
   
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