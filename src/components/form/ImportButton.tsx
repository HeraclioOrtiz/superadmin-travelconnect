// src/components/form/BotonImportarArchivo.tsx
'use client';

import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import { forwardRef, useRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface BotonImportarArchivoProps {
  label: string;
  accept?: string;
  multiple?: boolean;
  register?: UseFormRegisterReturn;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  urlPreview?: string | null;
  onClearPreview?: () => void;
}

const BotonImportarArchivo = forwardRef<HTMLInputElement, BotonImportarArchivoProps>(
  (
    {
      label,
      accept,
      multiple = false,
      register,
      onChange,
      urlPreview,
      onClearPreview,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
      inputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      register?.onChange(e);
    };

    const setRefs = (element: HTMLInputElement | null) => {
      (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = element;

      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = element;
      }

      register?.ref(element);
    };

    return (
      <Box sx={{ mb: 4 }}>
        <input
          type="file"
          hidden
          multiple={multiple}
          accept={accept}
          ref={setRefs}
          onChange={handleChange}
          {...props}
        />

        <Stack direction="row" alignItems="center" spacing={2}>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<UploadIcon fontSize="medium" />}
            onClick={handleClick}
          >
            {label}
          </Button>

          {urlPreview && (
            <Stack direction="row" alignItems="center" spacing={1}>
              <ImageIcon />
              <Typography variant="body2" sx={{ maxWidth: 200 }} noWrap>
                Vista previa
              </Typography>
              <IconButton onClick={onClearPreview} aria-label="Eliminar vista previa">
                <DeleteIcon />
              </IconButton>
            </Stack>
          )}
        </Stack>

        {urlPreview && (
          <Box
            component="img"
            src={urlPreview}
            alt="Vista previa"
            sx={{
              mt: 2,
              maxWidth: 250,
              maxHeight: 150,
              borderRadius: 2,
              boxShadow: 1,
            }}
          />
        )}
      </Box>
    );
  }
);

BotonImportarArchivo.displayName = 'BotonImportarArchivo';

export default BotonImportarArchivo;

