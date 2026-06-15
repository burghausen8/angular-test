// import { Injectable } from '@angular/core';
// import { SupabaseService } from './supabase.service';
// import { Router } from '@angular/router';
// import { User } from '@supabase/supabase-js';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   constructor(private supabase: SupabaseService, private router: Router) {}

//   async login(email: string, password: string) {
//     console.log('cheguei aqui');
//     await this.supabase.signIn(email, password);

//     this.router.navigate(['/shopping-list']);
//   }

//   async signUp(email: string, password: string) {
//     return this.supabase.signUp(email, password);
//   }

//   async logout() {
//     await this.supabase.signOut();
//     this.router.navigate(['/login']);
//   }

//   getCurrentUser(): User | null {
//     return this.supabase.getCurrentUser();
//   }

//   async loadSession() {

//     const { data } =
//         await this.supabase.auth.getSession();

//     this.currentUserSubject.next(
//         data.session?.user ?? null
//     );

// }
// }

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
    await this.supabaseAuth.signIn(email, password);

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
