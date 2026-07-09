import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
  IAuthProvider,
  AuthSession,
} from '../interfaces/auth-provider.interface';
import { AppUser } from '../models/user.model';
import { environment } from '../../../../environments/environment';
import { extractUserFromToken, isTokenExpired } from '../utils/jwt.utils';
import { RegisterUser } from '../models/register.user.model';

interface LoginResponse {
  token: string;
}

/**
 * Implementação do IAuthProvider usando sua própria API REST.
 * Endpoints esperados:
 *   POST /auth/login    → { user, token }
 *   POST /auth/logout   → 200
 *   GET  /auth/session  → { user, token } | 401
 */
@Injectable()
export class HttpAuthProvider implements IAuthProvider {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  async signIn(email: string, password: string): Promise<AuthSession> {
    const response = await firstValueFrom(
      this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, {
        email,
        password,
      })
    );

    const { token } = response;
    const user = extractUserFromToken(token);

    localStorage.setItem('auth_token', token);

    return { token, user };
  }

  async signOut(): Promise<void> {
    localStorage.removeItem('auth_token');
  }

  async register(email: string, password: string): Promise<RegisterUser> {
    const response = await firstValueFrom(
      this.http.post<RegisterUser>(`${this.baseUrl}/auth/register`, {
        email,
        password,
      })
    );

    return response;
  }

  async verifyTwoFactor(email: string, token: string): Promise<void> {
    await firstValueFrom(
      this.http.post(`${this.baseUrl}/auth/verify-2fa`, { email, token })
    );
  }

  async getSession(): Promise<AuthSession | null> {
    const token = localStorage.getItem('auth_token');
    if (!token) return null;

    if (isTokenExpired(token)) {
      localStorage.removeItem('auth_token');
      return null;
    }

    try {
      const user = extractUserFromToken(token);
      return { token, user };
    } catch {
      localStorage.removeItem('auth_token');
      return null;
    }
  }
  onAuthStateChange(_callback: (user: AppUser | null) => void): void {}
}
