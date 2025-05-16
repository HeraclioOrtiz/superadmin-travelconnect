export interface AgenciaBackData {
  idAgencia: string;
  nombre: string;
  dominio: string; // ✅ agregado
  password: string; // ✅ agregado
  logo: string;
  estado: boolean;
  color_fondo_app: string;
  color_tipografia_agencia: string;
  tipografia_agencia: string;
  header_imagen_background: string | null;
  header_imagen_background_opacidad: number;
  header_video_background: string;
  header_video_background_opacidad: number;
  imagenes: string[];
  quienes_somos_es: string;
  quienes_somos_en: string;
  quienes_somos_pt: string;
  terminos_y_condiciones: string;
  terminosycondiciones: string;

  color: {
    primario: string | null;
    secundario: string;
    terciario: string;
  };

  contacto: {
    email: string;
    telefono: string;
  };

  ubicacion: {
    direccion: string;
    ciudad: string;
    pais: string;
  };

  buscador: {
    color: {
      primario: string;
      secundario: string;
      terciario: string;
    };
    inputColor: string | null;
    inputFondoColor: string | null;
    tipografia: string;
    tipografiaColor: string;
    tipografiaColorLabel: string;
  };

  publicidadCliente: {
    existe: boolean;
    titulo: string;
    tipografiaColor: string;
    color: {
      primario: string;
      secundario: string;
      terciario: string;
    };
  };

  tarjetas: {
    titulo: string;
    tipografia: string;
    tipografiaColor: string;
    tipografiaColorTitulo: string;
    tipografiaColorContenido: string;
    color: {
      primario: string;
      secundario: string;
      terciario: string;
    };
  };

  bannerRegistro: {
    titulo: string;
    tipografiaColor: string;
    color: {
      primario: string;
      secundario: string;
      terciario: string;
    };
  };

  footer: {
    texto: string;
    tipografia: string;
    tipografiaColor: string;
    color: {
      primario: string;
      secundario: string;
      terciario: string;
    };
  };

  redes: {
    facebook: string;
    instagram: string;
    twitter: string;
    whatsapp: string;
  };
}
