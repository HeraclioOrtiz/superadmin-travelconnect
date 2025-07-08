'use client'

import {
  Box,
  TextField,
  MenuItem,
  Rating,
  Typography
} from '@mui/material'
import { useState, useEffect, useMemo } from 'react'
import { PaquetePropio } from '@/types/PaquetePropio'
import BotonAgregarImagen from './BotonAgregarImagen'

// Utilidad para convertir "DD-MM-YYYY" a "YYYY-MM-DD"
const convertirFecha = (fecha: string | undefined) => {
  if (!fecha) return ''
  const [dd, mm, yyyy] = fecha.split('-')
  if (!dd || !mm || !yyyy) return ''
  return `${yyyy}-${mm}-${dd}`
}

interface FormularioPaquetePropioProps {
  paquete?: Partial<PaquetePropio> | null // ✅ Soporta duplicación
}

export default function FormularioPaquetePropio({ paquete }: FormularioPaquetePropioProps) {
  const [moneda, setMoneda] = useState(paquete?.tipo_moneda || 'ARS')
  const [estado, setEstado] = useState(paquete?.activo ? 'activo' : 'inactivo')

  useEffect(() => {
    setMoneda(paquete?.tipo_moneda || 'ARS')
    setEstado(paquete?.activo ? 'activo' : 'inactivo')
  }, [paquete])

  const fechaInicioFormateada = useMemo(
    () => convertirFecha(paquete?.fecha_vigencia_desde),
    [paquete?.fecha_vigencia_desde]
  )

  const fechaFinFormateada = useMemo(
    () => convertirFecha(paquete?.fecha_vigencia_hasta),
    [paquete?.fecha_vigencia_hasta]
  )

  return (
    <>
      <TextField
        id="titulo"
        name="titulo"
        label="Título"
        required
        fullWidth
        margin="dense"
        defaultValue={paquete?.titulo || ''}
      />

      <TextField
        id="descripcion"
        name="descripcion"
        label="Descripción"
        required
        fullWidth
        multiline
        rows={4}
        margin="dense"
        defaultValue={paquete?.descripcion || ''}
      />

      <TextField
        id="ciudad"
        name="ciudad"
        label="Ciudad"
        required
        fullWidth
        margin="dense"
        defaultValue={paquete?.ciudad || ''}
      />

      <TextField
        id="noches"
        name="noches"
        label="Cantidad de noches"
        type="number"
        required
        fullWidth
        margin="dense"
        defaultValue={paquete?.cant_noches || ''}
      />

      <TextField
        id="hotel"
        name="hotel"
        label="Hotel"
        required
        fullWidth
        margin="dense"
        defaultValue={paquete?.hoteles?.[0] || ''}
      />

      <Box display="flex" alignItems="center" gap={2} my={1}>
        <Typography variant="subtitle2">Estrellas:</Typography>
        <Rating name="rating" defaultValue={3} max={5} />
      </Box>

      <TextField
        id="moneda"
        name="moneda"
        label="Moneda"
        select
        required
        fullWidth
        margin="dense"
        value={moneda}
        onChange={(e) => setMoneda(e.target.value)}
      >
        <MenuItem value="ARS">ARS</MenuItem>
        <MenuItem value="USD">USD</MenuItem>
      </TextField>

      <TextField
        id="fecha_inicio"
        name="fecha_inicio"
        label="Fecha desde"
        type="date"
        required
        fullWidth
        margin="dense"
        defaultValue={fechaInicioFormateada}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        id="fecha_fin"
        name="fecha_fin"
        label="Fecha hasta"
        type="date"
        required
        fullWidth
        margin="dense"
        defaultValue={fechaFinFormateada}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        id="estado"
        name="estado"
        label="Estado"
        select
        required
        fullWidth
        margin="dense"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
      >
        <MenuItem value="activo">Activo</MenuItem>
        <MenuItem value="inactivo">Inactivo</MenuItem>
      </TextField>

      <BotonAgregarImagen name="imagen_principal" />
    </>
  )
}
