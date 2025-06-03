'use client';

import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  OutlinedInputProps,
} from '@mui/material';
import { forwardRef } from 'react';
import { SelectorFuente } from '@/components/ConfigAgencia/SelectorFuente';

interface InputFormularioProps extends OutlinedInputProps {
  label: string;
  name: string;
  helperText?: string;
  fullWidth?: boolean;
  optional?: boolean;
  esTipografia?: boolean;
}

const InputFormulario = forwardRef<HTMLInputElement, InputFormularioProps>(
  (
    {
      label,
      name,
      value,
      onChange,
      required = false,
      disabled = false,
      type = 'text',
      placeholder,
      helperText,
      fullWidth = true,
      optional = false,
      error = false,
      esTipografia = false,
      ...props
    },
    ref
  ) => {
    return (
      <Box sx={{ mb: 4 }}>
        <FormControl
          fullWidth={fullWidth}
          required={required}
          disabled={disabled}
          error={error}
        >
          <InputLabel shrink htmlFor={name}>
            {label}
            {optional && ' (Opcional)'}
          </InputLabel>

          {esTipografia ? (
            <SelectorFuente
              value={value as string}
              onChange={(nueva) =>
                onChange?.({ target: { name, value: nueva } } as any)
              }
              label={label}
            />
          ) : (
            <OutlinedInput
              id={name}
              name={name}
              value={value}
              onChange={onChange}
              label={`${label}${optional ? ' (Opcional)' : ''}`}
              type={type}
              placeholder={placeholder}
              inputRef={ref}
              {...props}
            />
          )}

          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      </Box>
    );
  }
);

InputFormulario.displayName = 'InputFormulario';

export default InputFormulario;
