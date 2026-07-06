import { Inject, Injectable } from '@angular/core';
import { ShoppingRepository } from '../domain/shopping.repository';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  constructor(
    @Inject(SHOPPING_REPOSITORY) private repository: ShoppingRepository
  ) {}

  getShoppingItems(page: number, pageSize: number) {
    return this.repository.getShoppingItems(page, pageSize);
  }

  createShoppingItem(name: string, quantity: number) {
    return this.repository.createShoppingItem(name, quantity);
  }

  deleteShoppingItem(id: number) {
    return this.repository.deleteShoppingItem(id);
  }
}

import { InjectionToken } from '@angular/core';

export const SHOPPING_REPOSITORY = new InjectionToken<ShoppingRepository>(
  'ShoppingRepository'
);
