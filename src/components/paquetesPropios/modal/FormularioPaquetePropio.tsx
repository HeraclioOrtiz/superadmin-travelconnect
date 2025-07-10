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
import { Hotel } from '@/types/Hotel'
import BotonAgregarImagen from './BotonAgregarImagen'

const convertirFecha = (fecha: string | undefined) => {
  if (!fecha) return ''
  const [dd, mm, yyyy] = fecha.split('-')
  if (!dd || !mm || !yyyy) return ''
  return `${yyyy}-${mm}-${dd}`
}

interface FormularioPaquetePropioProps {
  paquete?: Partial<PaquetePropio> | null
}

export default function FormularioPaquetePropio({ paquete }: FormularioPaquetePropioProps) {
  const [moneda, setMoneda] = useState(paquete?.tipo_moneda || 'ARS')
  const [estado, setEstado] = useState(paquete?.activo ? 'activo' : 'inactivo')

  const [hotel, setHotel] = useState<Hotel>({
    hotel_id: paquete?.hotel?.hotel_id || '',
    hotel_nombre: paquete?.hotel?.hotel_nombre || '',
    hotel_categoria: paquete?.hotel?.hotel_categoria || '3'
  })

  useEffect(() => {
    setMoneda(paquete?.tipo_moneda || 'ARS')
    setEstado(paquete?.activo ? 'activo' : 'inactivo')
    setHotel({
      hotel_id: paquete?.hotel?.hotel_id || '',
      hotel_nombre: paquete?.hotel?.hotel_nombre || '',
      hotel_categoria: paquete?.hotel?.hotel_categoria || '3'
    })
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
        id="hotel_nombre"
        name="hotel_nombre"
        label="Nombre del Hotel"
        required
        fullWidth
        margin="dense"
        value={hotel.hotel_nombre}
        onChange={(e) => setHotel((prev) => ({ ...prev, hotel_nombre: e.target.value }))}
      />

      <TextField
        id="hotel_categoria"
        name="hotel_categoria"
        label="Categoría del Hotel"
        required
        fullWidth
        margin="dense"
        value={hotel.hotel_categoria}
        onChange={(e) => setHotel((prev) => ({ ...prev, hotel_categoria: e.target.value }))}
      />

      <Box display="flex" alignItems="center" gap={2} my={1}>
        <Typography variant="subtitle2">Estrellas:</Typography>
        <Rating
          name="rating"
          value={parseInt(hotel.hotel_categoria) || 0}
          max={5}
          onChange={(_, newValue) =>
            setHotel((prev) => ({
              ...prev,
              hotel_categoria: newValue?.toString() || '0'
            }))
          }
        />
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
