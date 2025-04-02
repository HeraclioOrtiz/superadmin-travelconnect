import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';
// import BotonAccion from "./BotonAccion"; // Ensure the file exists or update the path
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import AgenciaModal from '@/components/form/AgenciaModal';
import useModalAgencia from '@/components/form/hooks/useModalAgencia';
import BotonAccion from '@/components/form/BotonAccion';
import { useForm, FormProvider } from 'react-hook-form';
import { AgenciaFormValues } from '@/contexts/features/Agencias/forms';

import { config } from '@/config';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import type { Customer } from '@/components/dashboard/customer/Customer'
import { mapValues } from 'lodash';

export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

const customers = [
  {
    id: 'CLI-010',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg',
    nombre: 'Tienda Shopify',
    email: 'contacto@tiendashopify.com',
    fechaAlta: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
    estado: 'activo',
    
  },
  {
    id: 'CLI-009',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    nombre: 'Distribuciones Amazon',
    email: 'info@distribucionesamazon.com',
    fechaAlta: dayjs().subtract(2, 'weeks').format('YYYY-MM-DD'),
    estado: 'pendiente',
    
  },
  {
    id: 'CLI-008',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    nombre: 'Apple Servicios',
    email: 'soporte@apple-services.com',
    fechaAlta: dayjs().subtract(3, 'days').format('YYYY-MM-DD'),
    estado: 'activo',
    
  },
  {
    id: 'CLI-007',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    nombre: 'Microsoft Cloud',
    email: 'admin@microsoftcloud.com',
    fechaAlta: dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
    estado: 'inactivo',
    
  },
  {
    id: 'CLI-006',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    nombre: 'Google Workspace',
    email: 'contact@googleworkspace.com',
    fechaAlta: dayjs().subtract(6, 'months').format('YYYY-MM-DD'),
    estado: 'activo',
    
  },
  {
    id: 'CLI-005',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Twitter_logo.svg',
    nombre: 'Twitter Ads',
    email: 'ventas@twitterads.com',
    fechaAlta: dayjs().subtract(2, 'months').format('YYYY-MM-DD'),
    estado: 'activo',
    
  },
  {
    id: 'CLI-004',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    nombre: 'Netflix Content',
    email: 'info@netflixcontent.com',
    fechaAlta: dayjs().subtract(1, 'week').format('YYYY-MM-DD'),
    estado: 'pendiente',
    
  },
  {
    id: 'CLI-003',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Ubuntu_logo.svg',
    nombre: 'Ubuntu Cloud',
    email: 'soporte@ubuntucloud.com',
    fechaAlta: dayjs().subtract(8, 'months').format('YYYY-MM-DD'),
    estado: 'activo',
    
  },
  {
    id: 'CLI-002',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Dell_logo_2016.svg',
    nombre: 'Dell Solutions',
    email: 'ventas@dellsolutions.com',
    fechaAlta: dayjs().subtract(3, 'months').format('YYYY-MM-DD'),
    estado: 'inactivo',
    
  },
  {
    id: 'CLI-001',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adobe_Systems_logo.svg',
    nombre: 'Adobe Creative',
    email: 'suscripciones@adobecreative.com',
    fechaAlta: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
    estado: 'activo',
    
  }
] satisfies Customer[];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;
  const { isOpen, openModal, closeModal } = useModalAgencia();
  const emptyForm: AgenciaFormValues = {
    estado: false,
    nombre: '',
    password: '',
    dominio: '',
    quienes_somos_es: null,
    quienes_somos_en: null,
    quienes_somos_pt: null,
    favicon: '',
    logo: null,
    fondo_1: null,
    fondo_2: null,
    color_principal: '',
    color_barra_superior: '',
    filtro_imagen_1: false,
    filtro_imagen_2: false,
  
    // --- Datos Generales ---
    tipografia_agencia: null,
    color_tipografia_agencia: null,
    color_fondo_app: null,
    color_primario: null,
    color_secundario: null,
    color_terciario: null,
  
    // --- Header ---
    header_imagen_background: null,
    header_imagen_background_opacidad: null,
    header_video_background: null,
    header_video_background_opacidad: null,
  
    // --- Buscador ---
    buscador_tipografia: null,
    buscador_tipografia_color: null,
    buscador_tipografia_color_label: null,
    buscador_color_primario: null,
    buscador_color_secundario: null,
    buscador_color_terciario: null,
  
    // --- Publicidad ---
    publicidad_existe: false,
    publicidad_titulo: null,
    publicidad_tipografia_color: null,
    publicidad_color_primario: null,
    publicidad_color_secundario: null,
    publicidad_color_terciario: null,
    publicidad_imagen_1: null,
    publicidad_imagen_2: null,
    publicidad_imagen_3: null,
  
    // --- Tarjetas ---
    tarjetas_titulo: null,
    tarjetas_tipografia: null,
    tarjetas_tipografia_color: null,
    tarjetas_tipografia_color_titulo: null,
    tarjetas_tipografia_color_contenido: null,
    tarjetas_color_primario: null,
    tarjetas_color_secundario: null,
    tarjetas_color_terciario: null,
  
    // --- Banner Registro ---
    banner_registro_titulo: null,
    banner_registro_tipografia_color: null,
    banner_registro_color_primario: null,
    banner_registro_color_secundario: null,
    banner_registro_color_terciario: null,
  
    // --- Footer ---
    footer_texto: null,
    footer_tipografia: null,
    footer_tipografia_color: null,
    footer_color_primario: null,
    footer_color_secundario: null,
    footer_color_terciario: null,
    footer_facebook: null,
    footer_twitter: null,
    footer_instagram: null,
    footer_whatsapp: null,
    footer_telefono: null,
    footer_email: null,
    footer_direccion: null,
    footer_ciudad: null,
    footer_pais: null,
  };
  const methods = useForm<AgenciaFormValues>({
    defaultValues: emptyForm,
  });

  const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Agencias</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
        <BotonAccion
      icono={<AddBusinessIcon />}
      label="Crear Agencia"
      color="primary"
      variant="contained"
      onClickHooks={[useModalAgencia().openModal]}
    />
        </div>
      </Stack>
      <CustomersFilters />
      <CustomersTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      />
      <FormProvider {...methods}>
      <AgenciaModal
        isOpen={isOpen}
        onClose={closeModal}
        onSubmit={(data) => console.log(data)} // Reemplaza luego con tu función de guardado
      />
      </FormProvider>
    </Stack>
    
  );
}

function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
