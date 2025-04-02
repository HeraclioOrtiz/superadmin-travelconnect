'use client';
import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import AgenciaModal from '@/components/form/AgenciaModal';
import useModalAgencia from '@/components/form/hooks/useModalAgencia';
import BotonAccion from '@/components/form/BotonAccion';
import { useForm, FormProvider } from 'react-hook-form';
import { AgenciaFormValues, CreateAgenciaResponse } from '@/contexts/features/Agencias/forms';
import { useAgenciasContext } from '@/contexts/features/Agencias/AgenciaProvider';
import { agenciasToCustomers } from "./agenciasToCustomers"
import { config } from '@/config';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import type { Customer } from '@/components/dashboard/customer/Customer'




export default function Page(): React.JSX.Element {
  const { state, actions } = useAgenciasContext();
  const { agencias, loading, error } = state;

  React.useEffect(() => {
    actions.fetchAgencias(); // O se puede usar en un custom hook
  }, []);

  const customers = agenciasToCustomers(agencias); 

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
            
            
          </Stack>
        </Stack>
        <div>
        <BotonAccion
      icono={<AddBusinessIcon />}
      label="Crear Agencia"
      color="primary"
      variant="contained"
      onClickHooks={[openModal]}
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
function useEffect(arg0: () => void, arg1: { fetchAgencias: () => Promise<void>; createAgencia: (formData: AgenciaFormValues) => Promise<CreateAgenciaResponse>; startAutoRefresh: () => void; stopAutoRefresh: () => void; }[]) {
  throw new Error('Function not implemented.');
}

