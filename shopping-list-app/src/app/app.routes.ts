import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/pages/login.component';
import { ShoppingListComponent } from './features/shopping-list/pages/shopping-list.component';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { RegisterComponent } from './features/register/pages/register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '/login' },
];
