import * as yup from 'yup';

// ================================================
// 1. Esquemas Individuales por Paso
// ================================================

/**
 * Paso 1: Datos Básicos de la Agencia
 */
export const paso1Schema = yup.object().shape({
  estado: yup.boolean().default(true),
  nombre: yup
    .string()
    .required('El nombre es obligatorio')
    .min(3, 'Mínimo 3 caracteres')
    .max(50, 'Máximo 50 caracteres'),
  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .min(8, 'Mínimo 8 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      'Debe incluir mayúsculas, minúsculas y números'
    ),
  dominio: yup
    .string()
    .required('El dominio es obligatorio')
    .matches(
      /^[a-z0-9-]+$/,
      'Solo minúsculas, números y guiones (sin espacios)'
    ),
  quienes_somos_es: yup.string().nullable().max(500),
  quienes_somos_en: yup.string().nullable().max(500),
  quienes_somos_pt: yup.string().nullable().max(500),
});

/**
 * Paso 2: Configuración de Estilos
 */
export const paso2Schema = yup.object().shape({
  color_principal: yup
    .string()
    .required('El color principal es obligatorio')
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Debe ser un código HEX válido'),
  color_barra_superior: yup
    .string()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Debe ser un código HEX válido')
    .nullable(),
  tipografia_agencia: yup.string().nullable(),
  // ... (agrega todos los campos de estilo)
});

/**
 * Paso 3: Multimedia y Archivos
 */
export const paso3Schema = yup.object().shape({
  logo: yup
    .mixed<File | string>()
    .nullable()
    .test('file-size', 'El archivo es muy grande (max 2MB)', (value) => {
      if (!value || typeof value === 'string') return true;
      return value?.size <= 2_000_000;
    })
    .test('file-type', 'Formato no soportado (solo JPG/PNG)', (value) => {
      if (!value || typeof value === 'string') return true;
      return ['image/jpeg', 'image/png'].includes(value?.type);
    })
    .nullable(),
  // ... (repetir para favicon, fondo_1, etc.)
});

// ================================================
// 2. Esquema Unificado (Para Envío Final)
// ================================================

export const agenciaSchemaCompleto = paso1Schema
  .concat(paso2Schema)
  .concat(paso3Schema);

// ================================================
// 3. Tipos Derivados (Para TypeScript)
// ================================================

export type Paso1Values = yup.InferType<typeof paso1Schema>;
export type Paso2Values = yup.InferType<typeof paso2Schema>;
export type Paso3Values = yup.InferType<typeof paso3Schema>;
export type AgenciaFormValues = yup.InferType<typeof agenciaSchemaCompleto>;

// ================================================
// 4. Utilitarios de Validación
// ================================================

/**
 * Valida un paso específico
 */
export const validarPaso = async (
  step: number,
  values: Partial<AgenciaFormValues>
) => {
  const schema = [paso1Schema, paso2Schema, paso3Schema][step];
  try {
    await schema.validate(values, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      const errors = err.inner.reduce<Record<string, string>>((acc, curr) => {
        if (curr.path) acc[curr.path] = curr.message;
        return acc;
      }, {});
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { general: 'Error desconocido' } };
  }
};