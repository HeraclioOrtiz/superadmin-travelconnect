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
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        return { error: body.message || 'Invalid credentials' };
      }

      const { token } = await res.json();
      localStorage.setItem(TOKEN_KEY, token);
      return {};
    } catch (err) {
      return { error: 'Network error' };
    }
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return { data: null, error: 'No token found' }; // 👈 Agregado
    }

    try {
      const res = await fetch(`${API_BASE_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        return { data: null, error: 'Failed to fetch user' }; // 👈 Agregado
      }

      const data = await res.json();
      return { data };
    } catch {
      return { data: null, error: 'Network error' }; // 👈 Agregado
    }
  }

  async signOut(): Promise<{ error?: string }> {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return {};

    try {
      await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch {
      // Silent fail
    }

    localStorage.removeItem(TOKEN_KEY);
    return {};
  }
}

export const authClient = new AuthClient();
