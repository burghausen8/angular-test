import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

export interface ShoppingItem {
  id?: number;
  name: string;
  quantity: number;
  user_id: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private client: SupabaseClient;

  constructor() {
    this.client = createClient(
      environment.supabase.url,
      environment.supabase.key
    );
  }

  getClient(): SupabaseClient {
    return this.client;
  }

  // private async checkUser() {
  //   if (!this.isBrowser) return;

  //   const { data } = await this.supabase.auth.getSession();
  //   this.currentUserSubject.next(data.session?.user || null);
  // }

  // // Autenticação
  // async signIn(email: string, password: string) {
  //   if (!this.isBrowser) throw new Error('Only available in browser');

  //   const { data, error } = await this.supabase.auth.signInWithPassword({
  //     email,
  //     password,
  //   });

  //   if (error) throw error;
  //   this.currentUserSubject.next(data.user);
  //   return data;
  // }

  // async signUp(email: string, password: string) {
  //   if (!this.isBrowser) throw new Error('Only available in browser');

  //   const { data, error } = await this.supabase.auth.signUp({
  //     email,
  //     password,
  //   });

  //   if (error) throw error;
  //   return data;
  // }

  // async signOut() {
  //   if (!this.isBrowser) throw new Error('Only available in browser');

  //   const { error } = await this.supabase.auth.signOut();
  //   if (error) throw error;
  //   this.currentUserSubject.next(null);
  // }

  // getCurrentUser(): User | null {
  //   return this.currentUserSubject.value;
  // }

  // // CRUD de itens da lista de compras
  // async getShoppingItems(page: number = 0, pageSize: number = 10) {
  //   if (!this.isBrowser) throw new Error('Only available in browser');

  //   const user = this.getCurrentUser();
  //   if (!user) throw new Error('Usuário não autenticado');

  //   const from = page * pageSize;
  //   const to = from + pageSize - 1;

  //   const { data, error, count } = await this.supabase
  //     .from('shopping_items')
  //     .select('*', { count: 'exact' })
  //     .eq('user_id', user.id)
  //     .order('created_at', { ascending: false })
  //     .range(from, to);

  //   if (error) throw error;
  //   return { data: data || [], count: count || 0 };
  // }

  // async createShoppingItem(name: string, quantity: number) {
  //   if (!this.isBrowser) throw new Error('Only available in browser');

  //   const user = this.getCurrentUser();
  //   if (!user) throw new Error('Usuário não autenticado');

  //   const { data, error } = await this.supabase
  //     .from('shopping_items')
  //     .insert([
  //       {
  //         name,
  //         quantity,
  //         user_id: user.id,
  //       },
  //     ])
  //     .select();

  //   if (error) throw error;
  //   return data;
  // }

  // async deleteShoppingItem(id: number) {
  //   if (!this.isBrowser) throw new Error('Only available in browser');

  //   const { error } = await this.supabase
  //     .from('shopping_items')
  //     .delete()
  //     .eq('id', id);

  //   if (error) throw error;
  // }
}
