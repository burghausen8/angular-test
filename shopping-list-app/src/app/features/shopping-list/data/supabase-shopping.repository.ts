import { Injectable } from '@angular/core';
import { ShoppingRepository } from '../domain/shopping.repository';
import { SupabaseService } from '../../../core/services/supabase.service';
import { AuthService } from '../../../core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SupabaseShoppingRepository implements ShoppingRepository {
  constructor(private supabase: SupabaseService, private auth: AuthService) {}

  async getShoppingItems(page = 0, pageSize = 10) {
    const user = this.auth.getCurrentUser();

    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    const from = page * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await this.supabase
      .getClient()
      .from('shopping_items')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;

    return {
      data: data ?? [],
      count: count ?? 0,
    };
  }

  async createShoppingItem(name: string, quantity: number) {
    const user = this.auth.getCurrentUser();

    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    const { data, error } = await this.supabase
      .getClient()
      .from('shopping_items')
      .insert([
        {
          name,
          quantity,
          user_id: user.id,
        },
      ])
      .select();

    if (error) throw error;

    return data;
  }

  async deleteShoppingItem(id: number) {
    const { error } = await this.supabase
      .getClient()
      .from('shopping_items')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}



// @Injectable({
//   providedIn: 'root',
// })
// export class ShoppingService {
//   constructor(private supabase: SupabaseService, private auth: AuthService) {}

//   async getShoppingItems(page = 0, pageSize = 10) {
//     const user = this.auth.getCurrentUser();

//     if (!user) {
//       throw new Error('Usuário não autenticado');
//     }

//     const from = page * pageSize;
//     const to = from + pageSize - 1;

//     const { data, error, count } = await this.supabase
//       .getClient()
//       .from('shopping_items')
//       .select('*', { count: 'exact' })
//       .eq('user_id', user.id)
//       .order('created_at', { ascending: false })
//       .range(from, to);

//     if (error) throw error;

//     return {
//       data: data ?? [],
//       count: count ?? 0,
//     };
//   }

//   async createShoppingItem(name: string, quantity: number) {
//     const user = this.auth.getCurrentUser();

//     if (!user) {
//       throw new Error('Usuário não autenticado');
//     }

//     const { data, error } = await this.supabase
//       .getClient()
//       .from('shopping_items')
//       .insert([
//         {
//           name,
//           quantity,
//           user_id: user.id,
//         },
//       ])
//       .select();

//     if (error) throw error;

//     return data;
//   }

//   async deleteShoppingItem(id: number) {
//     const { error } = await this.supabase
//       .getClient()
//       .from('shopping_items')
//       .delete()
//       .eq('id', id);

//     if (error) throw error;
//   }
// }
