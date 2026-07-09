import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ShoppingRepository } from '../domain/shopping.repository';
import { ShoppingItem } from '../domain/shopping.item';
import { environment } from '../../../../environments/environment';

interface PaginatedResponse {
  data: ShoppingItem[];
  count: number;
}

/**
 * Implementação do ShoppingRepository usando sua própria API REST.
 * Endpoints esperados:
 *   GET    /shopping-items?page=0&pageSize=10  → { data, count }
 *   POST   /shopping-items                     → ShoppingItem
 *   DELETE /shopping-items/:id                 → 204
 */
@Injectable()
export class HttpShoppingRepository implements ShoppingRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  async getShoppingItems(
    page = 0,
    pageSize = 10
  ): Promise<{ data: ShoppingItem[]; count: number }> {
    const params = new HttpParams().set('page', page).set('pageSize', pageSize);

    return firstValueFrom(
      this.http.get<PaginatedResponse>(`${this.baseUrl}/shopping-items`, {
        params,
      })
    );
  }

  async createShoppingItem(
    name: string,
    quantity: number
  ): Promise<ShoppingItem[]> {
    const item = await firstValueFrom(
      this.http.post<ShoppingItem>(`${this.baseUrl}/shopping-items`, {
        name,
        quantity,
      })
    );
    return [item];
  }

  async deleteShoppingItem(id: number): Promise<void> {
    await firstValueFrom(
      this.http.delete<void>(`${this.baseUrl}/shopping-items/${id}`)
    );
  }
}
