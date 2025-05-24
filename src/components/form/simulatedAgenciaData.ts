// src/contexts/features/Agencias/simulacion/simulatedAgenciaData.ts

export const generarAgenciaSimuladaFiltrada = (
  archivos: { logo: File; fondo_1: File }
): Record<string, any> => {
  return {
    estado: true,
    nombre: 'Viajes del Caribe',
    password: 'securePassword123',
    dominio: 'viajesdelcaribe',
    fondo_1: archivos.fondo_1,
    logo: archivos.logo,

    quienes_somos_es: 'Somos una agencia especializada en viajes al Caribe.',
    quienes_somos_en: 'We are a travel agency specialized in Caribbean trips.',
    quienes_somos_pt: 'Somos uma agência especializada em viagens para o Caribe.',

    color_primario: '#3498db',
    color_barra_superior: '#2980b9',
    filtro_imagen_1: true,
    filtro_imagen_2: false,

    tipografia_agencia: "'Roboto', sans-serif",
    color_principal: '#3498db',
    color_tipografia_agencia: '#333333',
    color_fondo_app: '#f5f5f5',
    color_secundario: '#2ecc71',
    color_terciario: '#e74c3c',

    header_imagen_background_opacidad: 0.8,
    header_video_background_opacidad: 0.5,

    buscador_tipografia: "'Open Sans', sans-serif",
    buscador_tipografia_color: '#ffffff',
    buscador_tipografia_color_label: '#dddddd',
    buscador_color_primario: '#3498db',
    buscador_color_secundario: '#2980b9',
    buscador_color_terciario: '#1f618d',

    publicidad_existe: true,
    publicidad_titulo: 'Ofertas Especiales',
    publicidad_tipografia_color: '#ffffff',
    publicidad_color_primario: '#e74c3c',
    publicidad_color_secundario: '#c0392b',
    publicidad_color_terciario: '#d35400',

    tarjetas_titulo: 'Nuestros Destinos',
    tarjetas_tipografia: "'Montserrat', sans-serif",
    tarjetas_tipografia_color: '#2c3e50',
    tarjetas_tipografia_color_titulo: '#3498db',
    tarjetas_tipografia_color_contenido: '#7f8c8d',
    tarjetas_color_primario: '#ffffff',
    tarjetas_color_secundario: '#f5f5f5',
    tarjetas_color_terciario: '#ecf0f1',

    banner_registro_titulo: '¡Regístrate ya!',
    banner_registro_tipografia_color: '#ffffff',
    banner_registro_color_primario: '#2ecc71',
    banner_registro_color_secundario: '#27ae60',
    banner_registro_color_terciario: '#1abc9c',

    footer_texto: '© 2023 Viajes del Caribe',
    footer_tipografia: "'Lato', sans-serif",
    footer_tipografia_color: '#ffffff',
    footer_facebook: 'https://facebook.com/viajesdelcaribe',
    footer_twitter: 'https://twitter.com/viajescaribe',
    footer_instagram: 'https://instagram.com/viajesdelcaribe',
    footer_whatsapp: '+1234567890',
    footer_telefono: '+18001234567',
    footer_email: 'info@viajesdelcaribe.com',
    footer_direccion: 'Calle Principal 123',
    footer_ciudad: 'Santo Domingo',
    footer_pais: 'República Dominicana',

    // Archivos reales pasados como parámetro
    
  };
};

