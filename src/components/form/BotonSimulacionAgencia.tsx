'use client';

import React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useSubmitAgenciaSimulada } from './useSubmitAgenciaSimulada';

const BotonSimulacionAgencia: React.FC = () => {
  const submitAgencia = useSubmitAgenciaSimulada();

  const [logoFile, setLogoFile] = React.useState<File | null>(null);
  const [fondoFile, setFondoFile] = React.useState<File | null>(null);

  const [estado, setEstado] = React.useState<'idle' | 'success' | 'error' | 'loading'>('idle');
  const [mensaje, setMensaje] = React.useState<string | null>(null);

  const handleSimulacion = async () => {
    console.groupCollapsed('[Simulación] Enviando agencia simulada');

    if (!logoFile || !fondoFile) {
      setMensaje('⚠️ Debes seleccionar logo y fondo');
      return;
    }

    try {
      setEstado('loading');
      setMensaje('Enviando datos simulados...');

      const resultado = await submitAgencia({ logo: logoFile, fondo_1: fondoFile });

      console.log('[Simulación] Resultado del backend:', resultado);
      setEstado('success');
      setMensaje('✅ Enviado correctamente');
    } catch (error) {
      console.error('[Simulación] Error al enviar:', error);
      setEstado('error');
      setMensaje('❌ Error al enviar');
    } finally {
      console.groupEnd();
      setTimeout(() => {
        setEstado('idle');
        setMensaje(null);
      }, 3000);
    }
  };

  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ marginBottom: 16 }}>
        <label>Logo: </label>
        <input type="file" accept="image/*" onChange={e => setLogoFile(e.target.files?.[0] ?? null)} />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label>Fondo 1: </label>
        <input type="file" accept="image/*,video/*" onChange={e => setFondoFile(e.target.files?.[0] ?? null)} />
      </div>

      <Button
        variant="outlined"
        color={estado === 'error' ? 'error' : estado === 'success' ? 'success' : 'primary'}
        startIcon={<SendIcon />}
        onClick={handleSimulacion}
        disabled={estado === 'loading'}
      >
        {estado === 'loading' ? 'Enviando...' : 'Simular creación de agencia'}
      </Button>

      {mensaje && (
        <div style={{ marginTop: 8, fontStyle: 'italic', color: '#555' }}>
          {mensaje}
        </div>
      )}
    </div>
  );
};

export default BotonSimulacionAgencia;
