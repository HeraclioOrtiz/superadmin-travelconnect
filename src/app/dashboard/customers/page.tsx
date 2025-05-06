'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

import BotonAccion from '@/components/form/BotonAccion';
import AgenciaModal from '@/components/form/AgenciaModal';
import { useAgenciasContext } from '@/contexts/features/Agencias/AgenciaProvider';
import { useModalAgenciaGlobal } from '@/contexts/ModalAgenciaProvider';

import { agenciasToCustomers } from './agenciasToCustomers';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import type { Customer } from '@/components/dashboard/customer/Customer';

import { ModalServiciosAgencia } from '../../../components/ConfigAgencia/ModalServiciosAgencia';
import { useModalServiciosAgencia } from './useModalServiciosAgencia';

export default function Page(): React.JSX.Element {
  const { state, actions } = useAgenciasContext();
  const { agencias } = state;

  const { isOpen, openModal, setDatosEdicion } = useModalAgenciaGlobal();
  const {
    modalServiciosOpen,
    agenciaSeleccionada,
    abrirModalServicios,
    cerrarModalServicios,
  } = useModalServiciosAgencia();

  React.useEffect(() => {
    actions.fetchAgencias();
  }, []);

  const customers = agenciasToCustomers(agencias);
  const page = 0;
  const rowsPerPage = 5;
  const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

  const handleAbrirCreacion = () => {
    setDatosEdicion(null);
    openModal();
  };

  const handleEditarAgencia = (customer: Customer) => {
    const agenciaOriginal = agencias.find((a) => a.id === customer.id);
    if (agenciaOriginal) {
      console.log("Datos de Customer:", customer);
      console.log("Agencia encontrada:", agenciaOriginal);
      setDatosEdicion(agenciaOriginal);
      openModal();
    } else {
      console.log("No se encontró una agencia con el ID proporcionado:", customer.id);
    }
  };

  const handleEliminarAgencia = async (customer: Customer) => {
    const confirmado = window.confirm(`¿Estás seguro de que querés eliminar la agencia "${customer.nombre}"?`);
    if (!confirmado) return;

    const result = await actions.deleteAgencia(customer.id);

    if (result.success) {
      console.log(`✅ Agencia eliminada: ${customer.nombre}`);
    } else {
      console.error(`❌ Error eliminando agencia: ${result.error}`);
    }
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Agencias</Typography>
        </Stack>
        <div>
          <BotonAccion
            icono={<AddBusinessIcon />}
            label="Crear Agencia"
            color="primary"
            variant="contained"
            onClickHooks={[handleAbrirCreacion]}
          />
        </div>
      </Stack>

      <CustomersFilters />

      <CustomersTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
        onEdit={handleEditarAgencia}
        onServicios={abrirModalServicios}
        onEliminar={handleEliminarAgencia} // ✅ conexión hecha
      />

      {isOpen && <AgenciaModal />}

      {modalServiciosOpen && agenciaSeleccionada && (
        <ModalServiciosAgencia
          open={modalServiciosOpen}
          onClose={cerrarModalServicios}
        />
      )}
    </Stack>
  );
}

function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
