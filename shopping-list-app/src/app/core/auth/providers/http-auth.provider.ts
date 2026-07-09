import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
  IAuthProvider,
  AuthSession,
} from '../interfaces/auth-provider.interface';
import { AppUser } from '../models/user.model';
import { environment } from '../../../../environments/environment';

interface LoginResponse {
  user: AppUser;
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
    localStorage.setItem('auth_token', response.token);
    return response;
  }

  async signOut(): Promise<void> {
    await firstValueFrom(
      this.http.post<void>(`${this.baseUrl}/auth/logout`, {})
    );
    localStorage.removeItem('auth_token');
  }

  async getSession(): Promise<AuthSession | null> {
    const token = localStorage.getItem('auth_token');
    if (!token) return null;

    try {
      const response = await firstValueFrom(
        this.http.get<LoginResponse>(`${this.baseUrl}/auth/session`)
      );
      return response;
    } catch {
      localStorage.removeItem('auth_token');
      return null;
    }
  }

  // Sua API REST não tem WebSocket de estado — o interceptor cuida do 401.
  // Este hook é mantido para compatibilidade com a interface.
  onAuthStateChange(_callback: (user: AppUser | null) => void): void {}
}
