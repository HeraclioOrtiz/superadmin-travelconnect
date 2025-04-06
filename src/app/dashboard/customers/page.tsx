'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import AgenciaModal from '@/components/form/AgenciaModal';
import BotonAccion from '@/components/form/BotonAccion';
import { useAgenciasContext } from '@/contexts/features/Agencias/AgenciaProvider';
import { agenciasToCustomers } from './agenciasToCustomers';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import type { Customer } from '@/components/dashboard/customer/Customer';
import BotonSimulacionAgencia from '@/components/form/BotonSimulacionAgencia';
import { useModalAgenciaGlobal } from '@/contexts/ModalAgenciaProvider';
import type { Agencia } from '@/contexts/features/Agencias/types'; // ✅ Usamos el tipo correcto

export default function Page(): React.JSX.Element {
  const { state, actions } = useAgenciasContext();
  const { agencias } = state;

  const { openModal, setDatosEdicion } = useModalAgenciaGlobal(); // ✅ Usamos el contexto global

  React.useEffect(() => {
    actions.fetchAgencias();
  }, []);

  const customers = agenciasToCustomers(agencias);
  const page = 0;
  const rowsPerPage = 5;
  const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

  const handleAbrirCreacion = () => {
    setDatosEdicion(null); // Limpia datos
    openModal();           // Abre modal en modo creación
  };

  const handleEditarAgencia = (customer: Customer) => {
    const agenciaOriginal = agencias.find((a) => a.id === customer.id);

    if (agenciaOriginal) {
      setDatosEdicion(agenciaOriginal); // ✅ Usamos directamente Agencia
      openModal();
    }
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Agencias</Typography>
        </Stack>
        <div>
          <BotonSimulacionAgencia />
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
      />

      <AgenciaModal /> {/* ✅ Sin props */}
    </Stack>
  );
}

function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
