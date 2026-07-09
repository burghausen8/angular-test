import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { IAuthProvider } from '../auth/interfaces/auth-provider.interface';
import { AppUser } from '../auth/models/user.model';
import { AUTH_PROVIDER } from '../auth/tokens/auth.tokens';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<AppUser | null>(null);

  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    @Inject(AUTH_PROVIDER) private authProvider: IAuthProvider,
    private router: Router
  ) {}

  async initialize() {
    const session = await this.authProvider.getSession();

    this.currentUserSubject.next(session?.user ?? null);

    this.authProvider.onAuthStateChange((user) => {
      this.currentUserSubject.next(user);
    });
  }

  async login(email: string, password: string): Promise<void> {
    const session = await this.authProvider.signIn(email, password);

    this.currentUserSubject.next(session.user);

    this.router.navigate(['/shopping-list']);
  }

  async logout(): Promise<void> {
    await this.authProvider.signOut();

    this.currentUserSubject.next(null);

    this.router.navigate(['/login']);
  }

  getCurrentUser(): AppUser | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }
  forceLogout(): void {
    localStorage.removeItem('auth_token');
    this.currentUserSubject.next(null);
  }
}
