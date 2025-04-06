import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  OutlinedInputProps,
} from "@mui/material";
import { ChangeEvent, forwardRef } from "react";

interface InputFormularioProps extends OutlinedInputProps {
  label: string;
  name: string;
  helperText?: string;
  fullWidth?: boolean;
  optional?: boolean;
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
      type = "text",
      placeholder,
      helperText,
      fullWidth = true,
      optional = false,
      error = false,
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
          <InputLabel htmlFor={name}>
            {label}
            {optional && " (Opcional)"}
          </InputLabel>
          <OutlinedInput
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            label={`${label}${optional ? " (Opcional)" : ""}`}
            type={type}
            placeholder={placeholder}
            inputRef={ref}  // Aquí pasamos la ref al input interno
            {...props}      // Pasamos todas las props adicionales
          />
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      </Box>
    );
  }
);

InputFormulario.displayName = "InputFormulario"; // Importante para DevTools

export default InputFormulario;