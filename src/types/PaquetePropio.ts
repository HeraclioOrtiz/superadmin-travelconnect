export interface PaquetePropio {
  id: number;
  titulo: string;
  descripcion: string;
  pais: string;
  ciudad: string;
  ciudad_iata: string;
  fecha_vigencia_desde: string; // YYYY-MM-DD
  fecha_vigencia_hasta: string; // YYYY-MM-DD
  cant_noches: number;
  tipo_producto: string;
  activo: boolean;
  imagen_principal: string;
  edad_menores: number;
  transporte: string;
  tipo_moneda: string;
  descuento: number;
  componentes: {
    tipo: string;
    detalle: string;
  }[];
  categorias: string[];
  hoteles: string[];
  galeria_imagenes: string[];
  slug?: string;
}
