import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import { ChangeEvent } from "react";

interface InputFormularioProps {
  label: string;
  name: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  type?: string;
  placeholder?: string;
  helperText?: string;
  fullWidth?: boolean;
  optional?: boolean;
  error?: boolean;
}

const InputFormulario = ({
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
}: InputFormularioProps) => {
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
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default InputFormulario;
