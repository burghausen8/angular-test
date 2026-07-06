import { ShoppingItem } from './shopping.item';

export interface ShoppingRepository {
  getShoppingItems(
    page: number,
    pageSize: number
  ): Promise<{
    data: ShoppingItem[];
    count: number;
  }>;

  createShoppingItem(name: string, quantity: number): Promise<ShoppingItem[]>;

  deleteShoppingItem(id: number): Promise<void>;
}
