import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService, ShoppingItem } from '../../services/supabase.service';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  items: ShoppingItem[] = [];
  newItemName = '';
  newItemQuantity = 1;
  loading = false;
  errorMessage = '';

  // Paginação
  currentPage = 0;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadItems();
  }

  async loadItems() {
    this.loading = true;
    this.errorMessage = '';

    try {
      const result = await this.supabaseService.getShoppingItems(
        this.currentPage,
        this.pageSize
      );
      this.items = result.data;
      this.totalItems = result.count;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    } catch (error: any) {
      this.errorMessage = error.message || 'Erro ao carregar itens';
    } finally {
      this.loading = false;
    }
  }

  async addItem() {
    if (!this.newItemName.trim()) {
      this.errorMessage = 'Digite o nome do item';
      return;
    }

    if (this.newItemQuantity < 1) {
      this.errorMessage = 'Quantidade deve ser maior que zero';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    try {
      await this.supabaseService.createShoppingItem(
        this.newItemName,
        this.newItemQuantity
      );
      this.newItemName = '';
      this.newItemQuantity = 1;
      this.currentPage = 0; // Volta para primeira página
      await this.loadItems();
    } catch (error: any) {
      this.errorMessage = error.message || 'Erro ao adicionar item';
    } finally {
      this.loading = false;
    }
  }

  async deleteItem(id: number) {
    if (!confirm('Deseja realmente excluir este item?')) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    try {
      await this.supabaseService.deleteShoppingItem(id);
      await this.loadItems();
    } catch (error: any) {
      this.errorMessage = error.message || 'Erro ao excluir item';
    } finally {
      this.loading = false;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadItems();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadItems();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.loadItems();
  }

  async logout() {
    try {
      await this.supabaseService.signOut();
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.errorMessage = error.message || 'Erro ao sair';
    }
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }
}
