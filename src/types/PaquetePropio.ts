import { Salida } from './Salidas'
import { Hotel } from './Hotel'

export interface PaquetePropio {
  id: number
  titulo: string
  descripcion: string
  pais: string
  ciudad: string
  ciudad_iata: string | null

  fecha_vigencia_desde: string // formato "DD-MM-YYYY"
  fecha_vigencia_hasta: string

  cant_noches: number
  tipo_producto: string | null
  activo: boolean

  imagen_principal: string
  edad_menores: number
  transporte: string | null
  tipo_moneda: string

  descuento: string // viene como "0.00"

  componentes: {
    tipo: string
    detalle: string
  }[] // viene como string serializado, parsear antes de usar

  categorias: string[]         // lo mismo: parsear
  hotel: Hotel                 // ✅ actualizado: ahora es un objeto
  galeria_imagenes: string[]   // lo mismo

  slug?: string
  paquete_externo_id?: string
  usuario?: string | null
  usuario_id?: number
  fecha_modificacion?: string | null

  created_at?: string
  updated_at?: string

  salidas: Salida[]
}
