'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material'
import { useState, useEffect, FormEvent } from 'react'
import { Salida } from '@/types/Salidas'
import FormularioSalida from '../salidas/FomularioSalida'
import { usePaquetesPropios } from '@/contexts/features/PaquetesPropiosProvider/usePaquetesPropios'

interface ModalSalidaEditorProps {
  open: boolean
  onClose: () => void
  onSubmit: (salida: Salida) => void
}

export default function ModalSalidaEditor({
  open,
  onClose,
  onSubmit
}: ModalSalidaEditorProps) {
  const {
    salidaSeleccionada,
    salidaADuplicar,
    limpiarSalidaSeleccionada,
    setSalidaADuplicar,
    paqueteActivoParaSalidas,
    idAgenciaEnCreacion
  } = usePaquetesPropios()

  const [formData, setFormData] = useState<Salida>(getInitialSalida())

  useEffect(() => {
    let base: Salida | null = salidaSeleccionada ?? salidaADuplicar ?? null

    if (base) {
      const fechas = [
        'fecha_desde', 'fecha_hasta', 'fecha_viaje',
        'ida_origen_fecha', 'ida_destino_fecha',
        'vuelta_origen_fecha', 'vuelta_destino_fecha'
      ] as const

      const dataNormalizada: any = {
        ...base,
        id: 0,
        created_at: '',
        updated_at: '',
        paquete_id: paqueteActivoParaSalidas?.id ?? 0,
        usuario_id: idAgenciaEnCreacion ?? ''
      }

      fechas.forEach(campo => {
        const valor = base[campo]
        if (typeof valor === 'string' && valor) {
          if (valor.includes('T')) {
            dataNormalizada[campo] = valor.split('T')[0]
          } else if (/^\d{2}-\d{2}-\d{4}$/.test(valor)) {
            const [d, m, y] = valor.split('-')
            dataNormalizada[campo] = `${y}-${m}-${d}`
          }
        } else if (valor === null) {
          dataNormalizada[campo] = ''
        }
      })

      setFormData(dataNormalizada)
    } else {
      setFormData(getInitialSalida())
    }
  }, [
    salidaSeleccionada,
    salidaADuplicar,
    open,
    paqueteActivoParaSalidas,
    idAgenciaEnCreacion
  ])

  const handleChange = (campo: keyof Salida, valor: any) => {
    setFormData(prev => ({ ...prev, [campo]: valor }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
    limpiarSalidaSeleccionada()
    setSalidaADuplicar(null)
    onClose()
  }

  const getTitulo = () => {
    if (salidaADuplicar) return 'Duplicar salida'
    if (salidaSeleccionada) return 'Editar salida'
    return 'Agregar nueva salida'
  }

  const getBoton = () => {
    if (salidaADuplicar) return 'Crear duplicado'
    if (salidaSeleccionada) return 'Guardar cambios'
    return 'Crear salida'
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{getTitulo()}</DialogTitle>
        <DialogContent dividers>
          <FormularioSalida salida={formData} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined">
            Cancelar
          </Button>
          <Button type="submit" variant="contained">
            {getBoton()}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

function getInitialSalida(): Salida {
  return {
    id: 0,
    paquete_id: 0,
    salida_externo_id: null,
    venta_online: false,
    cupos: 0,
    fecha_viaje: '',
    fecha_desde: '',
    fecha_hasta: '',
    info_tramos: false,

    ida_origen_fecha: '',
    ida_origen_hora: null,
    ida_origen_ciudad: null,
    ida_destino_fecha: null,
    ida_destino_hora: null,
    ida_destino_ciudad: null,
    ida_clase_vuelo: null,
    ida_linea_aerea: null,
    ida_vuelo: null,
    ida_escalas: null,

    vuelta_origen_fecha: null,
    vuelta_origen_hora: null,
    vuelta_origen_ciudad: null,
    vuelta_destino_fecha: null,
    vuelta_destino_hora: null,
    vuelta_destino_ciudad: null,
    vuelta_clase_vuelo: null,
    vuelta_linea_aerea: null,
    vuelta_vuelo: null,
    vuelta_escalas: null,

    single_precio: 0,
    single_impuesto: 0,
    single_otro: 0,
    single_otro2: 0,

    doble_precio: 0,
    doble_impuesto: 0,
    doble_otro: 0,
    doble_otro2: 0,

    triple_precio: 0,
    triple_impuesto: 0,
    triple_otro: 0,
    triple_otro2: 0,

    cuadruple_precio: 0,
    cuadruple_impuesto: 0,
    cuadruple_otro: 0,
    cuadruple_otro2: 0,

    familia_1_precio: 0,
    familia_1_impuesto: 0,
    familia_1_otro: 0,
    familia_1_otro2: 0,

    familia_2_precio: 0,
    familia_2_impuesto: 0,
    familia_2_otro: 0,
    familia_2_otro2: 0,

    created_at: '',
    updated_at: ''
  }
}
