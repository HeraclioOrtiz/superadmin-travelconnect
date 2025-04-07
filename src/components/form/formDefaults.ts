import { AgenciaFormValues } from "@/contexts/features/Agencias/forms";

export const defaultAgenciaFormValues: AgenciaFormValues = {
  // === Datos Principales ===
  estado: false,
  nombre: '',
  password: '',
  dominio: '',
  logo: null,
  quienes_somos_es: null,
  quienes_somos_en: null,
  quienes_somos_pt: null,

  // === Datos Generales ===
  tipografia_agencia: null,
  color_tipografia_agencia: '#FFFFFF',  // Blanco
  color_fondo_app: '#FFFFFF',           // Blanco
  color_principal: '#FFFFFF',           // Blanco
  color_secundario: '#FFFFFF',          // Blanco
  color_terciario: '#FFFFFF',           // Blanco

  // === Header ===
  header_imagen_background_opacidad: 1,
  header_video_background_opacidad: 1,
  header_imagen_background: null,
  header_video_background: null,

  // === Buscador ===
  buscador_tipografia: null,
  buscador_tipografia_color: '#FFFFFF',  // Blanco
  buscador_tipografia_color_label: '#FFFFFF',  // Blanco
  buscador_color_primario: '#FFFFFF',   // Blanco
  buscador_color_secundario: '#FFFFFF',  // Blanco
  buscador_color_terciario: '#FFFFFF',   // Blanco
  buscador_inputColor: '#FFFFFF',        // Blanco
  buscador_inputFondoColor: '#FFFFFF',   // Blanco

  // === Publicidad Cliente ===
  publicidad_existe: false,
  publicidad_titulo: null,
  publicidad_tipografia_color: '#FFFFFF', // Blanco
  publicidad_color_primario: '#FFFFFF',   // Blanco
  publicidad_color_secundario: '#FFFFFF', // Blanco
  publicidad_color_terciario: '#FFFFFF',  // Blanco
  publicidad_imagen_1: null,
  publicidad_imagen_2: null,
  publicidad_imagen_3: null,

  // === Tarjetas ===
  tarjetas_titulo: null,
  tarjetas_tipografia: null,
  tarjetas_tipografia_color: '#FFFFFF',  // Blanco
  tarjetas_tipografia_color_titulo: '#FFFFFF',  // Blanco
  tarjetas_tipografia_color_contenido: '#FFFFFF', // Blanco
  tarjetas_color_primario: '#FFFFFF',    // Blanco
  tarjetas_color_secundario: '#FFFFFF',   // Blanco
  tarjetas_color_terciario: '#FFFFFF',    // Blanco

  // === Banner de Registro ===
  banner_registro_titulo: null,
  banner_registro_tipografia_color: '#FFFFFF', // Blanco
  banner_registro_color_primario: '#FFFFFF',   // Blanco
  banner_registro_color_secundario: '#FFFFFF', // Blanco
  banner_registro_color_terciario: '#FFFFFF',  // Blanco

  // === Footer ===
  footer_texto: null,
  footer_tipografia: null,
  footer_tipografia_color: '#FFFFFF', // Blanco
  footer_facebook: null,
  footer_twitter: null,
  footer_instagram: null,
  footer_whatsapp: null,
  footer_telefono: null,
  footer_email: null,
  footer_direccion: null,
  footer_ciudad: null,
  footer_pais: null,
  footer_color_primario: '#FFFFFF',  // Blanco
  footer_color_secundario: '#FFFFFF', // Blanco
  footer_color_terciario: '#FFFFFF',  // Blanco
};
