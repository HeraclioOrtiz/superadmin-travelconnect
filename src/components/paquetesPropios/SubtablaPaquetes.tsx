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
import { PencilSimple, Trash, CopySimple } from '@phosphor-icons/react'; // ✅ nuevo ícono

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
    abrirModalCreacion,
    seleccionarPaqueteParaSalidas,
    setIdAgenciaEnCreacion,
    duplicarPaquete,
  } = usePaquetesPropios();

  const loading = paquetesPorAgencia[agenciaId] === undefined;
  const error = false;
  const paquetes = paquetesPorAgencia[agenciaId] || [];

  const handleCrearNuevo = () => {
    console.log('🟢 Click en crear paquete');
    abrirModalCreacion(agenciaId);
  };

  const handleEditar = (paquete: PaquetePropio) => {
    console.log('🟠 Click en editar paquete:', paquete);
    seleccionarPaquete(paquete);
    abrirModal();
  };

  const handleEliminar = async (id: number) => {
    const confirm = window.confirm('¿Estás seguro de eliminar este paquete?');
    if (confirm) {
      await eliminarPaquete(id);
    }
  };

  const handleVerSalidas = (paquete: PaquetePropio) => {
    console.log('🔵 Ver salidas del paquete', paquete.id);
    seleccionarPaqueteParaSalidas(paquete);
    setIdAgenciaEnCreacion(agenciaId);
  };

  const handleDuplicar = (paquete: PaquetePropio) => {
    console.log('🟣 Duplicar paquete:', paquete);
    setIdAgenciaEnCreacion(agenciaId); // ✅ clave para evitar error
    duplicarPaquete(paquete);
    abrirModal();
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
              <TableCell>Salidas</TableCell>
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
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleVerSalidas(paquete)}
                  >
                    Ver salidas ({paquete.salidas.length})
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Editar">
                    <IconButton onClick={() => handleEditar(paquete)}>
                      <PencilSimple size={20} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Duplicar">
                    <IconButton onClick={() => handleDuplicar(paquete)}>
                      <CopySimple size={20} /> {/* ✅ nuevo ícono claro */}
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
