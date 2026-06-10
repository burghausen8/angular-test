import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '/login' },
];
