import { AgenciaFormValues } from '@/contexts/features/Agencias/forms';

export const defaultAgenciaFormValues: AgenciaFormValues = {
  // === Datos Principales ===
  estado: false,
  nombre: '',
  dominio: '',
  password: '',
  logo: null,
  favicon: null,
  quienes_somos_es: '',
  quienes_somos_en: '',
  quienes_somos_pt: '',
  terminos_y_condiciones: null,

  // === Estilos Generales ===
  tipografia_agencia: '',
  color_tipografia_agencia: '#FFFFFF',
  color_fondo_app: '#FFFFFF',
  color_principal: '#FFFFFF',
  color_secundario: '#FFFFFF',
  color_terciario: '#FFFFFF',

  // === Header ===
  header_imagen_background: null,
  header_video_background: null,
  header_imagen_background_opacidad: 1,
  header_video_background_opacidad: 1,

  // === Buscador ===
  buscador_tipografia: '',
  buscador_tipografia_color: '#FFFFFF',
  buscador_tipografia_color_label: '#FFFFFF',
  buscador_color_primario: '#FFFFFF',
  buscador_color_secundario: '#FFFFFF',
  buscador_color_terciario: '#FFFFFF',
  buscador_inputColor: '#FFFFFF',
  buscador_inputFondoColor: '#FFFFFF',

  // === Publicidad Cliente ===
  publicidad_existe: false,
  publicidad_titulo: '',
  publicidad_tipografia_color: '#FFFFFF',
  publicidad_color_primario: '#FFFFFF',
  publicidad_color_secundario: '#FFFFFF',
  publicidad_color_terciario: '#FFFFFF',
  publicidad_imagen_1: null,
  publicidad_imagen_2: null,
  publicidad_imagen_3: null,

  // === Tarjetas ===
  tarjetas_titulo: '',
  tarjetas_tipografia: '',
  tarjetas_tipografia_color: '#FFFFFF',
  tarjetas_tipografia_color_titulo: '#FFFFFF',
  tarjetas_tipografia_color_contenido: '#FFFFFF',
  tarjetas_color_primario: '#FFFFFF',
  tarjetas_color_secundario: '#FFFFFF',
  tarjetas_color_terciario: '#FFFFFF',

  // === Banner de Registro ===
  banner_registro_titulo: '',
  banner_registro_tipografia_color: '#FFFFFF',
  banner_registro_color_primario: '#FFFFFF',
  banner_registro_color_secundario: '#FFFFFF',
  banner_registro_color_terciario: '#FFFFFF',

  // === Footer ===
  footer_texto: '',
  footer_tipografia: '',
  footer_tipografia_color: '#FFFFFF',
  footer_color_primario: '#FFFFFF',
  footer_color_secundario: '#FFFFFF',
  footer_color_terciario: '#FFFFFF',

  // === Redes sociales ===
  redes_facebook: '',
  redes_instagram: '',
  redes_twitter: '',
  redes_whatsapp: '',

  // === Contacto ===
  contacto_email: '',
  contacto_telefono: '',

  // === Ubicación ===
  ubicacion_direccion: '',
  ubicacion_ciudad: '',
  ubicacion_pais: '',
};

