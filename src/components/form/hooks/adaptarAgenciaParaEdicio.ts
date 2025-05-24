import { AgenciaFormValues } from '@/contexts/features/Agencias/forms';
import { AgenciaBackData } from '@/types/AgenciaBackData';

export interface UrlsAgencia {
  logoUrl?: string;
  headerImagenUrl?: string;
  headerVideoUrl?: string;
  publicidadUrls?: [string?, string?, string?];
  terminosUrl?: string;
}

export function adaptarAgenciaParaEdicion(agencia: AgenciaBackData): {
  valores: AgenciaFormValues;
  urlsAgencia: UrlsAgencia;
} {
  const valores: AgenciaFormValues = {
    // --- Identificación y autenticación ---
    nombre: agencia.nombre,
    dominio: agencia.dominio ?? '',
    estado: agencia.estado,
    password: '',

    // --- Archivos (as string coerced to File | null for compatibility) ---
    logo: agencia.logo as unknown as File | null ?? null,
    header_imagen_background: agencia.header_imagen_background as unknown as File | null ?? null,
    header_video_background: agencia.header_video_background as unknown as File | null ?? null,
    publicidad_imagen_1: agencia.imagenes?.[0] as unknown as File | null ?? null,
    publicidad_imagen_2: agencia.imagenes?.[1] as unknown as File | null ?? null,
    publicidad_imagen_3: agencia.imagenes?.[2] as unknown as File | null ?? null,
    terminos_y_condiciones: agencia.terminos_y_condiciones as unknown as File | null ?? null,

    // --- Estilos generales ---
    tipografia_agencia: agencia.tipografia_agencia ?? '',
    color_tipografia_agencia: agencia.color_tipografia_agencia ?? '',
    color_fondo_app: agencia.color_fondo_app ?? '',
    color_principal: agencia.color?.primario ?? '#FFFFFF',
    color_secundario: agencia.color?.secundario ?? '#FFFFFF',
    color_terciario: agencia.color?.terciario ?? '#FFFFFF',

    // --- Header ---
    header_imagen_background_opacidad: agencia.header_imagen_background_opacidad ?? 1,
    header_video_background_opacidad: agencia.header_video_background_opacidad ?? 1,

    // --- Buscador ---
    buscador_tipografia: agencia.buscador?.tipografia ?? '',
    buscador_tipografia_color: agencia.buscador?.tipografiaColor ?? '',
    buscador_tipografia_color_label: agencia.buscador?.tipografiaColorLabel ?? '',
    buscador_inputColor: agencia.buscador?.inputColor ?? '',
    buscador_inputFondoColor: agencia.buscador?.inputFondoColor ?? '',
    buscador_color_primario: agencia.buscador?.color?.primario ?? '',
    buscador_color_secundario: agencia.buscador?.color?.secundario ?? '',
    buscador_color_terciario: agencia.buscador?.color?.terciario ?? '',

    // --- Publicidad Cliente ---
    publicidad_existe: agencia.publicidadCliente?.existe ?? false,
    publicidad_titulo: agencia.publicidadCliente?.titulo ?? '',
    publicidad_tipografia_color: agencia.publicidadCliente?.tipografiaColor ?? '',
    publicidad_color_primario: agencia.publicidadCliente?.color?.primario ?? '',
    publicidad_color_secundario: agencia.publicidadCliente?.color?.secundario ?? '',
    publicidad_color_terciario: agencia.publicidadCliente?.color?.terciario ?? '',

    // --- Tarjetas ---
    tarjetas_titulo: agencia.tarjetas?.titulo ?? '',
    tarjetas_tipografia: agencia.tarjetas?.tipografia ?? '',
    tarjetas_tipografia_color: agencia.tarjetas?.tipografiaColor ?? '',
    tarjetas_tipografia_color_titulo: agencia.tarjetas?.tipografiaColorTitulo ?? '',
    tarjetas_tipografia_color_contenido: agencia.tarjetas?.tipografiaColorContenido ?? '',
    tarjetas_color_primario: agencia.tarjetas?.color?.primario ?? '',
    tarjetas_color_secundario: agencia.tarjetas?.color?.secundario ?? '',
    tarjetas_color_terciario: agencia.tarjetas?.color?.terciario ?? '',

    // --- Banner Registro ---
    banner_registro_titulo: agencia.bannerRegistro?.titulo ?? '',
    banner_registro_tipografia_color: agencia.bannerRegistro?.tipografiaColor ?? '',
    banner_registro_color_primario: agencia.bannerRegistro?.color?.primario ?? '',
    banner_registro_color_secundario: agencia.bannerRegistro?.color?.secundario ?? '',
    banner_registro_color_terciario: agencia.bannerRegistro?.color?.terciario ?? '',

    // --- Información institucional ---
    quienes_somos_es: agencia.quienes_somos_es ?? '',
    quienes_somos_en: agencia.quienes_somos_en ?? '',
    quienes_somos_pt: agencia.quienes_somos_pt ?? '',

    // --- Footer ---
    footer_texto: agencia.footer?.texto ?? '',
    footer_tipografia: agencia.footer?.tipografia ?? '',
    footer_tipografia_color: agencia.footer?.tipografiaColor ?? '',
    footer_color_primario: agencia.footer?.color?.primario ?? '',
    footer_color_secundario: agencia.footer?.color?.secundario ?? '',
    footer_color_terciario: agencia.footer?.color?.terciario ?? '',

    // --- Redes sociales ---
    redes_facebook: agencia.redes?.facebook ?? '',
    redes_instagram: agencia.redes?.instagram ?? '',
    redes_twitter: agencia.redes?.twitter ?? '',
    redes_whatsapp: agencia.redes?.whatsapp ?? '',

    // --- Contacto ---
    contacto_email: agencia.contacto?.email ?? '',
    contacto_telefono: agencia.contacto?.telefono ?? '',

    // --- Ubicación ---
    ubicacion_direccion: agencia.ubicacion?.direccion ?? '',
    ubicacion_ciudad: agencia.ubicacion?.ciudad ?? '',
    ubicacion_pais: agencia.ubicacion?.pais ?? '',
  };

  const urlsAgencia: UrlsAgencia = {
    logoUrl: agencia.logo ?? undefined,
    headerImagenUrl: agencia.header_imagen_background ?? undefined,
    headerVideoUrl: agencia.header_video_background ?? undefined,
    publicidadUrls: [
      agencia.imagenes?.[0],
      agencia.imagenes?.[1],
      agencia.imagenes?.[2],
    ],
    terminosUrl: agencia.terminos_y_condiciones ?? undefined,
  };

  return { valores, urlsAgencia };
}

