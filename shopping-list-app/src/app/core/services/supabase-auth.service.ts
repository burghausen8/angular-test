import { Injectable } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class SupabaseAuthService {
  constructor(private supabaseService: SupabaseService) {}

  private get auth() {
    return this.supabaseService.getClient().auth;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return data;
  }

  async signUp(email: string, password: string) {
    const { data, error } = await this.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    return data;
  }

  async signOut() {
    const { error } = await this.auth.signOut();

    if (error) throw error;
  }

  async getSession() {
    const { data, error } = await this.auth.getSession();

    if (error) throw error;

    return data.session;
  }

  async getUser(): Promise<User | null> {
    const { data, error } = await this.auth.getUser();

    if (error) throw error;

    return data.user;
  }

  onAuthStateChange(callback: (user: User | null) => void) {
    return this.auth.onAuthStateChange((_event, session) => {
      callback(session?.user ?? null);
    });
  }
}
