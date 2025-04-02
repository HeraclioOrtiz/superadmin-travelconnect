"use client";

import { Box, Button } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { useRef } from 'react';

interface BotonImportarArchivoProps {
  label: string;
  name: string;
  register: any;
  accept?: string;
  multiple?: boolean;
}

const BotonImportarArchivo = ({
  label,
  name,
  register,
  accept,
  multiple = false,
}: BotonImportarArchivoProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <Box sx={{ mb: 4 }}>
      <input
        type="file"
        hidden
        multiple={multiple}
        accept={accept}
        {...register(name)}
        ref={(e) => {
          register(name).ref(e);
          inputRef.current = e;
        }}
      />
      <Button
        variant="outlined"
        color="inherit"
        startIcon={<UploadIcon fontSize="medium" />}
        onClick={handleClick}
      >
        {label}
      </Button>
    </Box>
  );
};

export default BotonImportarArchivo;
