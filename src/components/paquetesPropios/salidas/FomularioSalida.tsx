'use client';

import {
  Grid,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { Salida } from '@/types/Salidas';
import { useEffect, useState } from 'react';

interface FormularioSalidaProps {
  salida: Partial<Salida>;
  onChange: (campo: keyof Salida, valor: any) => void;
}

const parseFecha = (fecha: string | null | undefined) =>
  typeof fecha === 'string' && fecha.includes('T') ? fecha.split('T')[0] : fecha || '';

export default function FormularioSalida({
  salida,
  onChange,
}: FormularioSalidaProps) {
  const [campos, setCampos] = useState<Partial<Salida>>(salida);

  useEffect(() => {
    setCampos(salida);
  }, [salida]);

  const handleChange =
    (campo: keyof Salida) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const valor =
        e.target.type === 'checkbox'
          ? e.target.checked
          : e.target.type === 'number'
          ? Number(e.target.value)
          : e.target.value;

      setCampos((prev) => ({ ...prev, [campo]: valor }));
      onChange(campo, valor);
    };

  const tiposPrecio = [
    'single',
    'doble',
    'triple',
    'cuadruple',
    'familia_1',
    'familia_2',
  ] as const;

  const subCampos = ['precio', 'impuesto', 'otro', 'otro2'];

  return (
    <Grid container spacing={2}>
      {/* 🔹 DATOS GENERALES */}
      <Grid item xs={12}>
        <Typography variant="subtitle1">Datos generales</Typography>
      </Grid>

      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Fecha desde"
          type="date"
          value={parseFecha(campos.fecha_desde)}
          onChange={handleChange('fecha_desde')}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Fecha hasta"
          type="date"
          value={parseFecha(campos.fecha_hasta)}
          onChange={handleChange('fecha_hasta')}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Fecha de viaje"
          type="date"
          value={parseFecha(campos.fecha_viaje)}
          onChange={handleChange('fecha_viaje')}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Cupos"
          type="number"
          value={campos.cupos ?? ''}
          onChange={handleChange('cupos')}
        />
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel
          control={
            <Switch
              checked={campos.venta_online || false}
              onChange={handleChange('venta_online')}
            />
          }
          label="Venta online"
        />
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel
          control={
            <Switch
              checked={campos.info_tramos || false}
              onChange={handleChange('info_tramos')}
            />
          }
          label="Info tramos"
        />
      </Grid>

      {/* 🔹 VUELO IDA */}
      <Grid item xs={12}>
        <Typography variant="subtitle1">Vuelo Ida</Typography>
      </Grid>

      {[
        ['ida_origen_fecha', 'date'],
        ['ida_origen_hora', 'time'],
        ['ida_origen_ciudad', 'text'],
        ['ida_destino_fecha', 'date'],
        ['ida_destino_hora', 'time'],
        ['ida_destino_ciudad', 'text'],
        ['ida_clase_vuelo', 'text'],
        ['ida_linea_aerea', 'text'],
        ['ida_vuelo', 'text'],
        ['ida_escalas', 'text'],
      ].map(([campo, tipo]) => (
        <Grid item xs={4} key={campo}>
          <TextField
            fullWidth
            label={campo.toString().replace(/_/g, ' ')}
            type={tipo as string}
            value={
              tipo === 'date'
                ? parseFecha(campos[campo as keyof Salida] as string)
                : campos[campo as keyof Salida] || ''
            }
            onChange={handleChange(campo as keyof Salida)}
            InputLabelProps={{ shrink: tipo === 'date' || tipo === 'time' }}
          />
        </Grid>
      ))}

      {/* 🔹 VUELO VUELTA */}
      <Grid item xs={12}>
        <Typography variant="subtitle1">Vuelo Vuelta</Typography>
      </Grid>

      {[
        ['vuelta_origen_fecha', 'date'],
        ['vuelta_origen_hora', 'time'],
        ['vuelta_origen_ciudad', 'text'],
        ['vuelta_destino_fecha', 'date'],
        ['vuelta_destino_hora', 'time'],
        ['vuelta_destino_ciudad', 'text'],
        ['vuelta_clase_vuelo', 'text'],
        ['vuelta_linea_aerea', 'text'],
        ['vuelta_vuelo', 'text'],
        ['vuelta_escalas', 'text'],
      ].map(([campo, tipo]) => (
        <Grid item xs={4} key={campo}>
          <TextField
            fullWidth
            label={campo.toString().replace(/_/g, ' ')}
            type={tipo as string}
            value={
              tipo === 'date'
                ? parseFecha(campos[campo as keyof Salida] as string)
                : campos[campo as keyof Salida] || ''
            }
            onChange={handleChange(campo as keyof Salida)}
            InputLabelProps={{ shrink: tipo === 'date' || tipo === 'time' }}
          />
        </Grid>
      ))}

      {/* 🔹 PRECIOS */}
      <Grid item xs={12}>
        <Typography variant="subtitle1">Precios</Typography>
      </Grid>

      {tiposPrecio.flatMap((tipo) =>
        subCampos.map((campo) => {
          const key = `${tipo}_${campo}` as keyof Salida;
          return (
            <Grid item xs={3} key={key}>
              <TextField
                fullWidth
                type="number"
                label={`${tipo} ${campo}`}
                value={campos[key] ?? ''}
                onChange={handleChange(key)}
              />
            </Grid>
          );
        })
      )}
    </Grid>
  );
}
