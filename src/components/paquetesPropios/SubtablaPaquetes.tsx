'use client';

import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Tooltip,
} from '@mui/material';
import { PencilSimple, Trash } from '@phosphor-icons/react';

import { usePaquetesPropios } from '@/contexts/features/PaquetesPropiosProvider/usePaquetesPropios';
import type { PaquetePropio } from '@/types/PaquetePropio';

interface SubtablaPaquetesProps {
  agenciaId: string;
  nombreAgencia: string;
}

export function SubtablaPaquetes({ agenciaId, nombreAgencia }: SubtablaPaquetesProps) {
  const {
    paquetesPorAgencia,
    eliminarPaquete,
    seleccionarPaquete,
    abrirModal,
    loadingPorAgencia,
    errorPorAgencia,
  } = usePaquetesPropios();

  const loading = loadingPorAgencia[agenciaId];
  const error = errorPorAgencia[agenciaId];
  const paquetes = paquetesPorAgencia[agenciaId] || [];

  const handleCrearNuevo = () => {
    seleccionarPaquete(null as unknown as PaquetePropio); // abrir modal vacío
    abrirModal();
  };

  const handleEditar = (paquete: PaquetePropio) => {
    seleccionarPaquete(paquete);
    abrirModal();
  };

  const handleEliminar = async (id: number) => {
    const confirm = window.confirm('¿Estás seguro de eliminar este paquete?');
    if (confirm) {
      await eliminarPaquete(id);
    }
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">
          Paquetes propios de <strong>{nombreAgencia}</strong>
        </Typography>
        <Button variant="contained" onClick={handleCrearNuevo}>
          + Crear paquete propio
        </Button>
      </Stack>

      {loading && (
        <Box display="flex" justifyContent="center" py={3}>
          <CircularProgress size={32} />
        </Box>
      )}

      {error && (
        <Typography color="error" variant="body2">
          Error al cargar paquetes: {error}
        </Typography>
      )}

      {!loading && !error && paquetes.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          No hay paquetes propios registrados para esta agencia.
        </Typography>
      )}

      {!loading && !error && paquetes.length > 0 && (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Ciudad</TableCell>
              <TableCell>País</TableCell>
              <TableCell>Desde</TableCell>
              <TableCell>Hasta</TableCell>
              <TableCell>Noches</TableCell>
              <TableCell>Moneda</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paquetes.map((paquete) => (
              <TableRow key={paquete.id} hover>
                <TableCell>{paquete.titulo}</TableCell>
                <TableCell>{paquete.ciudad}</TableCell>
                <TableCell>{paquete.pais}</TableCell>
                <TableCell>{paquete.fecha_vigencia_desde}</TableCell>
                <TableCell>{paquete.fecha_vigencia_hasta}</TableCell>
                <TableCell>{paquete.cant_noches}</TableCell>
                <TableCell>{paquete.tipo_moneda}</TableCell>
                <TableCell>{paquete.descuento}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Editar">
                    <IconButton onClick={() => handleEditar(paquete)}>
                      <PencilSimple size={20} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton onClick={() => handleEliminar(paquete.id)}>
                      <Trash size={20} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
}
