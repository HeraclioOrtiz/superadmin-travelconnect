import type { Agencia } from '@/contexts/features/Agencias/types';
import type { AgenciaFormValues } from '@/contexts/features/Agencias/forms';

// Validación segura para campos color
const colorSeguro = (color: string | null): string =>
  /^#[0-9A-Fa-f]{6}$/.test(color || '') ? color! : '#000000';

// Nueva interfaz para las URLs originales de imágenes/videos
export interface UrlsAgencia {
  logo: string;
  header_imagen_background: string;
  header_video_background: string;
  publicidad_imagen_1: string | null;
  publicidad_imagen_2: string | null;
  publicidad_imagen_3: string | null;
}

export const adaptarAgenciaParaEdicion = (
  agencia: Agencia
): { valores: AgenciaFormValues; urlsAgencia: UrlsAgencia } => {
  const valores: AgenciaFormValues = {
    // === Datos Principales ===
    estado: agencia.estado,
    nombre: agencia.nombre,
    password: agencia.password,
    dominio: agencia.dominio,
    logo: null,
    quienes_somos_es: agencia.quienes_somos_es,
    quienes_somos_en: agencia.quienes_somos_en,
    quienes_somos_pt: agencia.quienes_somos_pt,

    // === Datos Generales ===
    tipografia_agencia: agencia.tipografia_agencia,
    color_tipografia_agencia: colorSeguro(agencia.color_tipografia_agencia),
    color_fondo_app: colorSeguro(agencia.color_fondo_app),
    color_principal: colorSeguro(agencia.color_principal),
    color_secundario: colorSeguro(agencia.color_secundario),
    color_terciario: colorSeguro(agencia.color_terciario),

    // === Header ===
    header_imagen_background_opacidad: agencia.header_imagen_background_opacidad,
    header_video_background_opacidad: agencia.header_video_background_opacidad,
    header_imagen_background: null,
    header_video_background: null,

    // === Buscador ===
    buscador_tipografia: agencia.buscador_tipografia,
    buscador_tipografia_color: colorSeguro(agencia.buscador_tipografia_color),
    buscador_tipografia_color_label: colorSeguro(agencia.buscador_tipografia_color_label),
    buscador_color_primario: colorSeguro(agencia.buscador_color_primario),
    buscador_color_secundario: colorSeguro(agencia.buscador_color_secundario),
    buscador_color_terciario: colorSeguro(agencia.buscador_color_terciario),
    buscador_inputColor: colorSeguro(agencia.buscador_inputColor),
    buscador_inputFondoColor: colorSeguro(agencia.buscador_inputFondoColor),

    // === Publicidad Cliente ===
    publicidad_existe: agencia.publicidad_existe,
    publicidad_titulo: agencia.publicidad_titulo,
    publicidad_tipografia_color: colorSeguro(agencia.publicidad_tipografia_color),
    publicidad_color_primario: colorSeguro(agencia.publicidad_color_primario),
    publicidad_color_secundario: colorSeguro(agencia.publicidad_color_secundario),
    publicidad_color_terciario: colorSeguro(agencia.publicidad_color_terciario),
    publicidad_imagen_1: null,
    publicidad_imagen_2: null,
    publicidad_imagen_3: null,

    // === Tarjetas ===
    tarjetas_titulo: agencia.tarjetas_titulo,
    tarjetas_tipografia: agencia.tarjetas_tipografia,
    tarjetas_tipografia_color: colorSeguro(agencia.tarjetas_tipografia_color),
    tarjetas_tipografia_color_titulo: colorSeguro(agencia.tarjetas_tipografia_color_titulo),
    tarjetas_tipografia_color_contenido: colorSeguro(agencia.tarjetas_tipografia_color_contenido),
    tarjetas_color_primario: colorSeguro(agencia.tarjetas_color_primario),
    tarjetas_color_secundario: colorSeguro(agencia.tarjetas_color_secundario),
    tarjetas_color_terciario: colorSeguro(agencia.tarjetas_color_terciario),

    // === Banner de Registro ===
    banner_registro_titulo: agencia.banner_registro_titulo,
    banner_registro_tipografia_color: colorSeguro(agencia.banner_registro_tipografia_color),
    banner_registro_color_primario: colorSeguro(agencia.banner_registro_color_primario),
    banner_registro_color_secundario: colorSeguro(agencia.banner_registro_color_secundario),
    banner_registro_color_terciario: colorSeguro(agencia.banner_registro_color_terciario),

    // === Footer ===
    footer_texto: agencia.footer_texto,
    footer_tipografia: agencia.footer_tipografia,
    footer_tipografia_color: colorSeguro(agencia.footer_tipografia_color),
    footer_facebook: agencia.footer_facebook,
    footer_twitter: agencia.footer_twitter,
    footer_instagram: agencia.footer_instagram,
    footer_whatsapp: agencia.footer_whatsapp,
    footer_telefono: agencia.footer_telefono,
    footer_email: agencia.footer_email,
    footer_direccion: agencia.footer_direccion,
    footer_ciudad: agencia.footer_ciudad,
    footer_pais: agencia.footer_pais,
    footer_color_primario: colorSeguro(agencia.footer_color_primario),
    footer_color_secundario: colorSeguro(agencia.footer_color_secundario),
    footer_color_terciario: colorSeguro(agencia.footer_color_terciario),
  };

  const urlsAgencia: UrlsAgencia = {
    logo: agencia.logo,
    header_imagen_background: agencia.header_imagen_background,
    header_video_background: agencia.header_video_background,
    publicidad_imagen_1: agencia.publicidad_imagen_1,
    publicidad_imagen_2: agencia.publicidad_imagen_2,
    publicidad_imagen_3: agencia.publicidad_imagen_3,
  };

  return { valores, urlsAgencia };
};
