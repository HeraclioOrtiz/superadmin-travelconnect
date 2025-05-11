export interface AgenciaBackData {
    id: number;
    tenant_id: number;
    estado: number;
  
    nombre: string;
    dominio: string;
  
    quienes_somos_es: string | null;
    quienes_somos_en: string | null;
    quienes_somos_pt: string | null;
  
    favicon: string | null;
    logo: string;
  
    fondo_1: string | null;
    fondo_2: string | null;
  
    color_principal: string;
    color_barra_superior: string | null;
    color_fondo_app: string;
    color_primario: string | null;
    color_secundario: string;
    color_terciario: string;
    tipografia_agencia: string;
    color_tipografia_agencia: string;
  
    header_imagen_background: string | null;
    header_imagen_background_opacidad: string;
    header_video_background: string;
    header_video_background_opacidad: string;
  
    buscador_tipografia: string;
    buscador_tipografia_color: string;
    buscador_tipografia_color_label: string;
    buscador_color_primario: string;
    buscador_color_secundario: string;
    buscador_color_terciario: string;
    buscador_inputColor: string | null;
    buscador_inputFondoColor: string | null;
  
    publicidad_existe: number;
    publicidad_titulo: string;
    publicidad_tipografia_color: string;
    publicidad_color_primario: string;
    publicidad_color_secundario: string;
    publicidad_color_terciario: string;
    publicidad_imagen_1: string | null;
    publicidad_imagen_2: string | null;
    publicidad_imagen_3: string | null;
  
    tarjetas_titulo: string;
    tarjetas_tipografia: string;
    tarjetas_tipografia_color: string;
    tarjetas_tipografia_color_titulo: string;
    tarjetas_tipografia_color_contenido: string;
    tarjetas_color_primario: string;
    tarjetas_color_secundario: string;
    tarjetas_color_terciario: string;
  
    banner_registro_titulo: string;
    banner_registro_tipografia_color: string;
    banner_registro_color_primario: string;
    banner_registro_color_secundario: string;
    banner_registro_color_terciario: string;
  
    footer_texto: string;
    footer_tipografia: string;
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
  
    redes_facebook: string | null;
    redes_twitter: string | null;
    redes_instagram: string | null;
    redes_whatsapp: string | null;
  
    contacto_telefono: string | null;
    contacto_email: string | null;
  
    ubicacion_direccion: string | null;
    ubicacion_ciudad: string | null;
    ubicacion_pais: string | null;
  
    imagenes: string | null;
  
    created_at: string;
    updated_at: string;
  }
  