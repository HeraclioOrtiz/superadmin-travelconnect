import Step1Basic from './Step1Basic';
import StepDatosGenerales from './StepDatosGenerales';
import StepHeader from './StepHeader';
import StepBuscador from './StepBuscador';
import StepPublicidadCliente from './StepPublicidadCliente';
import StepTarjetas from './StepTarjetas';
import StepBannerRegistro from './StepBannerRegistro';
import StepFooter from './StepFooter';

export const stepsConfig = [
  {
    title: "Datos Básicos",
    description: "Información principal de la agencia",
    component: Step1Basic,
  },
 
  {
    title: "Datos Generales",
    description: "Colores base, fondo y tipografía general",
    component: StepDatosGenerales,
  },
  {
    title: "Header",
    description: "Imagen o video de fondo del encabezado",
    component: StepHeader,
  },
  {
    title: "Buscador",
    description: "Estilo y colores del buscador",
    component: StepBuscador,
  },
  {
    title: "Publicidad Cliente",
    description: "Estilos, título e imágenes de publicidad",
    component: StepPublicidadCliente,
  },
  {
    title: "Tarjetas",
    description: "Colores, textos y tipografía de tarjetas",
    component: StepTarjetas,
  },
  {
    title: "Banner de Registro",
    description: "Estilo visual del banner final de registro",
    component: StepBannerRegistro,
  },
  {
    title: "Footer",
    description: "Datos de contacto, redes y diseño del pie de página",
    component: StepFooter,
  },
];
