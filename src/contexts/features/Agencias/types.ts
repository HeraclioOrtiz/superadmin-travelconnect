export interface Agencia {
  // === Identificadores y estado ===
  id: number;
  fecha_alta: string;
  estado: boolean;

  // === Datos Principales ===
  nombre: string;
  password: string;
  dominio: string;
  logo: string;
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
  header_imagen_background: string;
  header_video_background: string;

  // === Buscador ===
  buscador_tipografia: string | null;
  buscador_tipografia_color: string;
  buscador_tipografia_color_label: string;
  buscador_color_primario: string;
  buscador_color_secundario: string;
  buscador_color_terciario: string;
  buscador_inputColor: string | null;
  buscador_inputFondoColor: string | null;

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

  // === APIs
  apis_consumidas: string[];
}

export interface AgenciasContextState {
  agencias: Agencia[]; // ✅ ahora contiene la info real que viene del backend
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}
