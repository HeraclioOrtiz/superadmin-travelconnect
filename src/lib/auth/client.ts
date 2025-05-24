'use client';

import type { User } from '@/types/user';

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const TOKEN_KEY = 'custom-auth-token';
const USER_KEY = 'usuario';

class AuthClient {
  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { email, password } = params;
    const isSuperadmin = email === 'superadmin@example.com';

    const endpoint = isSuperadmin
      ? '/api/login'
      : 'https://travelconnect.com.ar/agencia/login';

    console.log(`🟡 Enviando login a ${endpoint} con:`, params);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.log('🔴 Error de login:', data.error);
        return { error: data.error || 'Error desconocido' };
      }

      const data = await response.json();

      const token = isSuperadmin ? data.token : data.access_token;
      const rawUser = isSuperadmin ? data.user : data.agencia;

      const user: User = {
        id: rawUser.id,
        nombre: rawUser.nombre,
        dominio: rawUser.dominio ?? null,
        rol: isSuperadmin ? 'superadmin' : 'admin',
      };

      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));

      console.log('🟢 Login exitoso:', user);
      return {};
    } catch (error) {
      console.error('🔴 Error inesperado en login:', error);
      return { error: 'Ocurrió un error inesperado' };
    }
  }

  async signUp(params: SignUpParams): Promise<{ error?: string }> {
    const { email } = params;

    if (email !== 'admin@example.com') {
      localStorage.setItem(TOKEN_KEY, 'fake-token');
      return {};
    }

    return { error: 'Este email ya está en uso' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    const token = localStorage.getItem(TOKEN_KEY);
    const userRaw = localStorage.getItem(USER_KEY);

    if (!token) return { data: null, error: 'Token no encontrado' };
    if (!userRaw) return { data: null, error: 'Usuario no encontrado' };

    try {
      const user: User = JSON.parse(userRaw);
      return { data: user };
    } catch {
      return { data: null, error: 'Error al leer usuario' };
    }
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    return {};
  }
}

export const authClient = new AuthClient();
