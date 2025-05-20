'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

import BotonAccion from '@/components/form/BotonAccion';
import AgenciaModal from '@/components/form/AgenciaModal';
import { useAgenciasContext } from '@/contexts/features/Agencias/AgenciaProvider';
import { useModalAgenciaGlobal } from '@/contexts/ModalAgenciaProvider';

import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import { AgenciaBackData } from '@/types/AgenciaBackData';

import { ModalServiciosAgencia } from '../../../components/ConfigAgencia/ModalServiciosAgencia';
import { useModalServiciosAgenciaSuper } from './useModalServiciosAgenciaSuper';

export default function Page(): React.JSX.Element {
  const { state, actions } = useAgenciasContext();
  const { agencias } = state;

  const { isOpen, openModal, setDatosEdicion } = useModalAgenciaGlobal();
  const {
    modalServiciosOpen,
    agenciaSeleccionada,
    abrirModalServicios,
    cerrarModalServicios,
  } = useModalServiciosAgenciaSuper();

  React.useEffect(() => {
    actions.fetchAgencias();
  }, [actions]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleAbrirCreacion = () => {
    setDatosEdicion(null);
    openModal();
  };

  const handleEditarAgencia = (agencia: AgenciaBackData) => {
    const agenciaOriginal = agencias.find((a) => a.idAgencia === agencia.idAgencia);
    if (agenciaOriginal) {
      openModal(agenciaOriginal);
    } else {
      console.warn("No se encontró la agencia para editar:", agencia.idAgencia);
    }
  };

  const handleEliminarAgencia = async (agencia: AgenciaBackData) => {
    const confirmado = window.confirm(`¿Estás seguro de que querés eliminar la agencia "${agencia.nombre}"?`);
    if (!confirmado) return;

    const result = await actions.deleteAgencia(Number(agencia.idAgencia));

    if (result.success) {
      console.log(`✅ Agencia eliminada: ${agencia.nombre}`);
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
        rows={agencias}
        count={agencias.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onEdit={handleEditarAgencia}
        onServicios={abrirModalServicios}
        onEliminar={handleEliminarAgencia}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
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
