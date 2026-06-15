import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user = auth.getCurrentUser();

  if (!user) {
    return true;
  }

  router.navigate(['/shopping-list']);

  return false;
};
