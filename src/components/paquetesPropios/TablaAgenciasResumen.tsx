'use client';

import {
  Box,
  CircularProgress,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { CaretDown, CaretRight } from '@phosphor-icons/react';
import { Fragment, useState } from 'react';

import { useAgenciasContext } from '@/contexts/features/Agencias/AgenciaProvider';
import { useFetchPaquetesDeAgencia } from '@/contexts/features/PaquetesPropiosProvider/actions/useFetchPaquetesDeAgencia';
import { SubtablaPaquetes } from './SubtablaPaquetes';

export function TablaAgenciasResumen(): React.JSX.Element {
  const {
    state: { agencias, loading, error }
  } = useAgenciasContext();

  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});
  const { cargarSiNoExiste } = useFetchPaquetesDeAgencia();

  const toggleRow = (id: string) => {
    setOpenRows((prev) => {
      const isOpening = !prev[id];
      if (isOpening) cargarSiNoExiste(id);
      return { ...prev, [id]: isOpening };
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" variant="body2">
        Error al cargar agencias: {error}
      </Typography>
    );
  }

  if (!agencias || agencias.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary">
        No se encontraron agencias.
      </Typography>
    );
  }

  return (
    <Box sx={{ overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Logo</TableCell>
            <TableCell>Nombre</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {agencias.map((agencia) => (
            <Fragment key={agencia.idAgencia}>
              <TableRow hover>
                <TableCell width="64px">
                  <IconButton onClick={() => toggleRow(agencia.idAgencia)}>
                    {openRows[agencia.idAgencia] ? <CaretDown /> : <CaretRight />}
                  </IconButton>
                </TableCell>

                <TableCell>
                  <Box
                    component="img"
                    src={agencia.logo}
                    alt={agencia.nombre}
                    sx={{ width: 40, height: 40, borderRadius: 1 }}
                  />
                </TableCell>

                <TableCell>{agencia.nombre}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={3} sx={{ p: 0, border: 0 }}>
                  <Collapse in={openRows[agencia.idAgencia]} timeout="auto" unmountOnExit>
                    <Box sx={{ p: 2 }}>
                      <SubtablaPaquetes
                        agenciaId={agencia.idAgencia}
                        nombreAgencia={agencia.nombre}
                      />
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
