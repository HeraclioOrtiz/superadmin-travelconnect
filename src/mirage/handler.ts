import { createServer, Response } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    routes() {
      this.namespace = 'api';

      this.post('/login', (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);

        // Superadmin simulado con agencia ficticia
        if (email === 'superadmin@example.com' && password === 'super123') {
          return {
            user: {
              id: '0',
              name: 'Superadmin',
              email: 'superadmin@example.com',
              rol: 'superadmin',
              id_agencia: 999, // ✅ Agencia simulada
            },
            token: 'fake-token-superadmin',
          };
        }

        // Admin simulado
        if (email === 'consultas@vaguviajes.com.ar' && password === '123456') {
          return {
            user: {
              id: '1',
              name: 'Admin',
              email: 'consultas@vaguviajes.com.ar',
              rol: 'admin',
              id_agencia: 7,
            },
            token: 'fake-token-admin',
          };
        }

        return new Response(
          401,
          { 'Content-Type': 'application/json' },
          { error: 'Credenciales inválidas' }
        );
      });

      // ✅ Endpoint simulado para agencia 999 (superadmin)
      this.get('/agencias/999', () => {
        return {
          id: 999,
          tenant_id: 1,
          estado: 1,
          nombre: 'Superadmin Agency',
          dominio: 'superadminagency',
          favicon: null,
          logo: 'superadmin/logo.png',
          fondo_1: null,
          fondo_2: null,
          color_principal: '#7B1FA2',
          color_barra_superior: null,
          color_fondo_app: '#f5f5f5',
          color_primario: null,
          color_secundario: '#CE93D8',
          color_terciario: '#4A0072',
          tipografia_agencia: 'Roboto',
          color_tipografia_agencia: '#212121',
          header_imagen_background: null,
          header_imagen_background_opacidad: '0.3',
          header_video_background: '',
          header_video_background_opacidad: '0.2',
          buscador_tipografia: 'Verdana',
          buscador_tipografia_color: '#FFFFFF',
          buscador_tipografia_color_label: '#888888',
          buscador_color_primario: '#7B1FA2',
          buscador_color_secundario: '#CE93D8',
          buscador_color_terciario: 'white',
          buscador_inputColor: '#2E003E',
          buscador_inputFondoColor: '#FFFFFF',
          publicidad_existe: 1,
          publicidad_titulo: '¡Ofertas Exclusivas!',
          publicidad_tipografia_color: '#4a0387',
          publicidad_color_primario: '#4a0387',
          publicidad_color_secundario: '#CE93D8',
          publicidad_color_terciario: '#4A0072',
          publicidad_imagen_1: null,
          publicidad_imagen_2: null,
          publicidad_imagen_3: null,
          tarjetas_titulo: 'Destinos recomendados',
          tarjetas_tipografia: 'Verdana',
          tarjetas_tipografia_color: 'white',
          tarjetas_tipografia_color_titulo: '#4a0387',
          tarjetas_tipografia_color_contenido: '#4A0072',
          tarjetas_color_primario: '#4a0387',
          tarjetas_color_secundario: 'white',
          tarjetas_color_terciario: '#4A0072',
          banner_registro_titulo: 'Registrate con Superadmin',
          banner_registro_tipografia_color: '#FFFFFF',
          banner_registro_color_primario: '#4a0387',
          banner_registro_color_secundario: '#CE93D8',
          banner_registro_color_terciario: '#4A0072',
          footer_texto: '© 2025 Superadmin Inc.',
          footer_tipografia: 'Verdana',
          footer_tipografia_color: 'white',
          footer_facebook: null,
          footer_twitter: null,
          footer_instagram: null,
          footer_whatsapp: null,
          footer_telefono: null,
          footer_email: 'soporte@superadmin.com',
          footer_direccion: null,
          footer_ciudad: null,
          footer_pais: 'Argentina',
          footer_color_primario: '#4a0387',
          footer_color_secundario: '#4a0387',
          footer_color_terciario: '#b8add5',
          redes_facebook: null,
          redes_twitter: null,
          redes_instagram: null,
          redes_whatsapp: null,
          contacto_telefono: null,
          contacto_email: null,
          ubicacion_direccion: null,
          ubicacion_ciudad: null,
          ubicacion_pais: null,
          imagenes: null,
          quienes_somos_es: 'Agencia de pruebas para superadmin.',
          quienes_somos_en: 'Test agency for superadmin.',
          quienes_somos_pt: 'Agência de teste para superadmin.',
          created_at: '2025-05-01T00:00:00Z',
          updated_at: '2025-05-01T00:00:00Z',
        };
      });

      this.passthrough('https://travelconnect.com.ar/**');
      this.passthrough();
    },
  });
}
