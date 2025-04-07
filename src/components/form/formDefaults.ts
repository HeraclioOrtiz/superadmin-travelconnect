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
  color_tipografia_agencia: '',
  color_fondo_app: '',
  color_principal: '', // ✅ el correcto
  color_secundario: '',
  color_terciario: '',

  // === Header ===
  header_imagen_background_opacidad: 1,
  header_video_background_opacidad: 1,
  header_imagen_background: null,
  header_video_background: null,

  // === Buscador ===
  buscador_tipografia: null,
  buscador_tipografia_color: '',
  buscador_tipografia_color_label: '',
  buscador_color_primario: '',
  buscador_color_secundario: '',
  buscador_color_terciario: '',
  buscador_inputColor: null,
  buscador_inputFondoColor: null,

  // === Publicidad Cliente ===
  publicidad_existe: false,
  publicidad_titulo: null,
  publicidad_tipografia_color: '',
  publicidad_color_primario: '',
  publicidad_color_secundario: '',
  publicidad_color_terciario: '',
  publicidad_imagen_1: null,
  publicidad_imagen_2: null,
  publicidad_imagen_3: null,

  // === Tarjetas ===
  tarjetas_titulo: null,
  tarjetas_tipografia: null,
  tarjetas_tipografia_color: '',
  tarjetas_tipografia_color_titulo: '',
  tarjetas_tipografia_color_contenido: '',
  tarjetas_color_primario: '',
  tarjetas_color_secundario: '',
  tarjetas_color_terciario: '',

  // === Banner de Registro ===
  banner_registro_titulo: null,
  banner_registro_tipografia_color: '',
  banner_registro_color_primario: '',
  banner_registro_color_secundario: '',
  banner_registro_color_terciario: '',

  // === Footer ===
  footer_texto: null,
  footer_tipografia: null,
  footer_tipografia_color: '',
  footer_facebook: null,
  footer_twitter: null,
  footer_instagram: null,
  footer_whatsapp: null,
  footer_telefono: null,
  footer_email: null,
  footer_direccion: null,
  footer_ciudad: null,
  footer_pais: null,
  footer_color_primario: null,
  footer_color_secundario: null,
  footer_color_terciario: null,
};
