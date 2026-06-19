import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '@supabase/supabase-js';

import { SupabaseAuthService } from './supabase-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private supabaseAuth: SupabaseAuthService,
    private router: Router
  ) {}

  async initialize() {
    const session = await this.supabaseAuth.getSession();

    this.currentUserSubject.next(session?.user ?? null);

    this.supabaseAuth.onAuthStateChange((user) => {
      this.currentUserSubject.next(user);
    });
  }

  async login(email: string, password: string) {
    const session = await this.supabaseAuth.signIn(email, password);

    this.currentUserSubject.next(session.user);

    this.router.navigate(['/shopping-list']);
  }

  async signUp(email: string, password: string) {
    return this.supabaseAuth.signUp(email, password);
  }

  async logout() {
    await this.supabaseAuth.signOut();

    this.currentUserSubject.next(null);

    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }
}
