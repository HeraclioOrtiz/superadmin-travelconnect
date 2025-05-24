'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useSelection } from '@/hooks/use-selection';
import { AgenciaBackData } from '@/types/AgenciaBackData';

interface CustomersTableProps {
  rows: AgenciaBackData[];
  count: number;
  page: number;
  rowsPerPage: number;
  onEdit?: (agencia: AgenciaBackData) => void;
  onServicios?: (agencia: AgenciaBackData) => void;
  onEliminar?: (agencia: AgenciaBackData) => void;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

export function CustomersTable({
  rows,
  count,
  page,
  rowsPerPage,
  onEdit,
  onServicios,
  onEliminar,
  onPageChange,
  onRowsPerPageChange,
}: CustomersTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => rows.map((agencia) => agencia.idAgencia), [rows]);
  const { selected } = useSelection(rowIds);

  React.useEffect(() => {
    const ids = rows.map(r => r.idAgencia);
    const uniqueIds = new Set(ids);
    if (ids.length !== uniqueIds.size) {
      console.warn('⚠️ IDs duplicados detectados en CustomersTable:', ids);
    }
    if (ids.some(id => !id)) {
      console.warn('⚠️ IDs nulos o indefinidos en CustomersTable:', ids);
    }
  }, [rows]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
    onPageChange(0);
  };

  const paginatedRows = React.useMemo(() => {
    const start = page * rowsPerPage;
    return rows.slice(start, start + rowsPerPage);
  }, [page, rowsPerPage, rows]);

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '900px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              {/* <TableCell>Estado</TableCell> */}
              <TableCell>Modificar</TableCell>
              <TableCell>Servicios</TableCell>
              <TableCell>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row, index) => {
              const isSelected = selected?.has(row.idAgencia);
              const key = row.idAgencia || `row-fallback-${index}`;

              return (
                <TableRow hover key={key} selected={isSelected}>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Avatar src={row.logo} />
                      <Typography variant="subtitle2">{row.nombre}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.contacto?.email || '—'}</TableCell>
                  {/* <TableCell>{row.estado ? 'Activa' : 'Inactiva'}</TableCell> */}
                  <TableCell>
                    <button
                      onClick={() => onEdit?.(row)}
                      style={{
                        background: '#1976d2',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: 4,
                        cursor: 'pointer',
                      }}
                    >
                      Modificar
                    </button>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Servicios de la agencia">
                      <IconButton onClick={() => onServicios?.(row)}>
                        <AssignmentIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Eliminar agencia">
                      <IconButton color="error" onClick={() => onEliminar?.(row)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}

