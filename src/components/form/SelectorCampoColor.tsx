'use client';
import { Box, OutlinedInput, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface SelectorColorCampoProps {
  label: string;
  descripcion?: string;
  error?: boolean;
  helperText?: string;
  // Lo demás se pasa desde register()
  [x: string]: any;
}

const SelectorColorCampo = ({
  label,
  descripcion,
  error = false,
  helperText,
  ...rest
}: SelectorColorCampoProps) => {
  const [color, setColor] = useState(rest.value || "#000000");

  useEffect(() => {
    if (rest.value !== undefined) {
      setColor(rest.value);
    }
  }, [rest.value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    rest.onChange?.(e);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        mb: 4, // <- separación vertical externa
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {label}
      </Typography>

      {descripcion && (
        <Typography variant="caption" color="text.secondary">
          {descripcion}
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <input
          type="color"
          {...rest}
          value={color}
          onChange={handleChange}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            transition: "transform 0.2s",
          }}
        />
        <OutlinedInput
          {...rest}
          value={color}
          onChange={handleChange}
          sx={{
            maxWidth: 140,
            fontSize: "0.9rem",
            "& input": {
              padding: "10px",
            },
          }}
        />
      </Box>

      {helperText && (
        <Typography variant="caption" color={error ? "error" : "text.secondary"}>
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default SelectorColorCampo;
