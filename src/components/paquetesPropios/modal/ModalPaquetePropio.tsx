'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material'
import { usePaquetesPropios } from '@/contexts/features/PaquetesPropiosProvider/usePaquetesPropios'
import { FormEvent } from 'react'
import FormularioPaquetePropio from './FormularioPaquetePropio'
import {
  crearPaquetePropio,
  editarPaquetePropio
} from '@/components/paquetesPropios/paquetespropiosService'

export default function ModalPaquetePropio() {
  const {
    modalAbierto,
    cerrarModal,
    paqueteSeleccionado,
    fetchPaquetesDeAgencia,
    idAgenciaEnCreacion
  } = usePaquetesPropios()

  const isEditando = Boolean(paqueteSeleccionado)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    if (!form.titulo?.value) {
      alert('El título es obligatorio.')
      return
    }

    if (!idAgenciaEnCreacion) {
      alert('Error: faltó seleccionar la agencia.')
      return
    }

    const formData = new FormData()
    formData.append('titulo', form.titulo.value)
    formData.append('descripcion', form.descripcion.value)
    formData.append('pais', 'Argentina')
    formData.append('ciudad', form.ciudad.value)
    formData.append('ciudad_iata', '')
    formData.append('fecha_vigencia_desde', form.fecha_inicio.value)
    formData.append('fecha_vigencia_hasta', form.fecha_fin.value)
    formData.append('cant_noches', form.noches.value)
    formData.append('tipo_producto', 'Vacacional')
    formData.append('activo', form.estado.value === 'activo' ? '1' : '0')
    formData.append('edad_menores', '0')
    formData.append('transporte', 'Aéreo')
    formData.append('tipo_moneda', form.moneda.value)
    formData.append('descuento', '0')

    // ✅ Leer el valor de estrellas (Rating)
    const estrellas = form.estrellas?.value || '3' // default si no se toca
    formData.append('estrellas', estrellas)

    formData.append('componentes[]', '')
    formData.append('categorias[]', '')
    formData.append('hoteles[]', form.hotel.value)
    formData.append('galeria_imagenes[]', '')

    formData.append('usuario_id', idAgenciaEnCreacion)

    if (form.imagen_principal?.files?.[0]) {
      formData.append('imagen_principal', form.imagen_principal.files[0])
    }

    try {
      if (isEditando && paqueteSeleccionado?.id) {
        await editarPaquetePropio(paqueteSeleccionado.id, formData)
      } else {
        await crearPaquetePropio(formData)
      }

      await fetchPaquetesDeAgencia(idAgenciaEnCreacion)
      cerrarModal()
    } catch (error) {
      console.error(error)
      alert('Ocurrió un error al guardar el paquete.')
    }
  }

  return (
    <Dialog open={modalAbierto} onClose={cerrarModal} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {isEditando ? 'Editar paquete propio' : 'Crear nuevo paquete propio'}
        </DialogTitle>
        <DialogContent>
          <FormularioPaquetePropio paquete={paqueteSeleccionado} />
        </DialogContent>
        <DialogActions>
          <Button onClick={cerrarModal}>Cancelar</Button>
          <Button type="submit" variant="contained">
            {isEditando ? 'Guardar cambios' : 'Crear paquete'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
