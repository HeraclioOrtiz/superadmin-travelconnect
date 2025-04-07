import Step1Basic from './Step1Basic'; 
import StepDatosGenerales from './StepDatosGenerales';
import StepHeader from './StepHeader'
import StepBuscador from './StepBuscador';
import StepPublicidadCliente from './StepPublicidadCliente';
import StepTarjetas from './StepTarjetas';
import StepBannerRegistro from './StepBannerRegistro';
import StepFooter from './StepFooter';

export const stepsConfig = [
  {
    title: "Datos Principales",
    description: "Información básica y apariencia inicial",
    component: Step1Basic,
    fields: [
      'estado',
      'nombre',
      'password',
      'dominio',
      'quienes_somos_es',
      'quienes_somos_en',
      'quienes_somos_pt',
      'logo',
      
    ]
  },
  {
    title: "Datos Generales",
    description: "Estilos tipográficos y paleta de colores base",
    component: StepDatosGenerales,
    fields: [
      'tipografia_agencia',
      'color_tipografia_agencia',
      'color_fondo_app',
      'color_principal',
      'color_secundario',
      'color_terciario'
    ]
  },
  {
    title: "Header",
    description: "Personalización del encabezado",
    component: StepHeader,
    fields: [
      'header_imagen_background',
      'header_imagen_background_opacidad',
      'header_video_background',
      'header_video_background_opacidad'
    ]
  },
  {
    title: "Buscador",
    description: "Estilo y comportamiento del buscador",
    component: StepBuscador,
    fields: [
      'buscador_tipografia',
      'buscador_tipografia_color',
      'buscador_tipografia_color_label',
      'buscador_color_primario',
      'buscador_color_secundario',
      'buscador_color_terciario',
      'buscador_inputColor',         // 🆕 Agregado
      'buscador_inputFondoColor'     // 🆕 Agregado
    ]
  },
  {
    title: "Publicidad Cliente",
    description: "Configuración de espacios publicitarios",
    component: StepPublicidadCliente,
    fields: [
      'publicidad_existe',
      'publicidad_titulo',
      'publicidad_tipografia_color',
      'publicidad_color_primario',
      'publicidad_color_secundario',
      'publicidad_color_terciario',
      'publicidad_imagen_1',
      'publicidad_imagen_2',
      'publicidad_imagen_3'
    ]
  },
  {
    title: "Tarjetas",
    description: "Diseño de tarjetas de contenido",
    component: StepTarjetas,
    fields: [
      'tarjetas_titulo',
      'tarjetas_tipografia',
      'tarjetas_tipografia_color',
      'tarjetas_tipografia_color_titulo',
      'tarjetas_tipografia_color_contenido',
      'tarjetas_color_primario',
      'tarjetas_color_secundario',
      'tarjetas_color_terciario'
    ]
  },
  {
    title: "Banner de Registro",
    description: "Personalización del banner de CTA",
    component: StepBannerRegistro,
    fields: [
      'banner_registro_titulo',
      'banner_registro_tipografia_color',
      'banner_registro_color_primario',
      'banner_registro_color_secundario',
      'banner_registro_color_terciario'
    ]
  },
  {
    title: "Footer",
    description: "Configuración del pie de página",
    component: StepFooter,
    fields: [
      'footer_texto',
      'footer_tipografia',
      'footer_tipografia_color',
      'footer_color_primario',
      'footer_color_secundario',
      'footer_color_terciario',
      'footer_facebook',
      'footer_twitter',
      'footer_instagram',
      'footer_whatsapp',
      'footer_telefono',
      'footer_email',
      'footer_direccion',
      'footer_ciudad',
      'footer_pais'
    ]
  }
] as const;

export type AgenciaFormFields = typeof stepsConfig[number]['fields'][number];
