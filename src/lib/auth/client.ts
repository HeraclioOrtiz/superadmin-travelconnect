'use client';

import type { User } from '@/types/user';
import { API_BASE_URL } from '@/config';

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

const TOKEN_KEY = 'custom-auth-token';

class AuthClient {
  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    try {
      console.log('[authClient] Intentando login con:', params);

      const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        console.error('[authClient] Error en login:', body);
        return { error: body.error || 'Credenciales inválidas' };
      }

      const { token } = await res.json();
      console.log('[authClient] Login exitoso. Token recibido:', token);
      localStorage.setItem(TOKEN_KEY, token);
      return {};
    } catch (err) {
      console.error('[authClient] Error de red al intentar login', err);
      return { error: 'Error de red' };
    }
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      console.warn('[authClient] No hay token en localStorage');
      return { data: null, error: 'Token no encontrado' };
    }

    try {
      const res = await fetch(`${API_BASE_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.error('[authClient] Falló la obtención del usuario');
        return { data: null, error: 'No se pudo obtener el usuario' };
      }

      const data = await res.json();
      console.log('[authClient] Usuario obtenido:', data);
      return { data };
    } catch (err) {
      console.error('[authClient] Error de red al obtener usuario', err);
      return { data: null, error: 'Error de red' };
    }
  }

  async signOut(): Promise<{ error?: string }> {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      console.warn('[authClient] No hay token al intentar logout');
      return {};
    }

    try {
      await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('[authClient] Logout exitoso');
    } catch (err) {
      console.warn('[authClient] Error de red durante logout', err);
    }

    localStorage.removeItem(TOKEN_KEY);
    return {};
  }
}

export const authClient = new AuthClient();
