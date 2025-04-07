'use client';

'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

import BotonAccion from '@/components/form/BotonAccion';
import AgenciaModal from '@/components/form/AgenciaModal'; // ✅ IMPORT NECESARIO
import BotonSimulacionAgencia from '@/components/form/BotonSimulacionAgencia';

import { useAgenciasContext } from '@/contexts/features/Agencias/AgenciaProvider';
import { useModalAgenciaGlobal } from '@/contexts/ModalAgenciaProvider';

import { agenciasToCustomers } from './agenciasToCustomers';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import type { Customer } from '@/components/dashboard/customer/Customer';


export default function Page(): React.JSX.Element {
  const { state, actions } = useAgenciasContext();
  const { agencias } = state;

  const { isOpen, openModal, setDatosEdicion } = useModalAgenciaGlobal();

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
    // Buscar la agencia original que corresponde al ID del customer
    const agenciaOriginal = agencias.find((a) => a.id === customer.id);
  
    // Si encontramos la agencia, asignamos los datos de edición y abrimos el modal
    if (agenciaOriginal) {
      console.log("Datos de Customer:", customer);
      console.log("Agencia encontrada:", agenciaOriginal);
  
      setDatosEdicion(agenciaOriginal); // Guardamos los datos de la agencia para la edición
      openModal(); // Abrimos el modal en modo edición
    } else {
      console.log("No se encontró una agencia con el ID proporcionado:", customer.id);
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

      {isOpen && <AgenciaModal />}
    </Stack>
  );
}

function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
