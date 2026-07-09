import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { AuthService } from './core/services/auth.service';

// Tokens de injeção
import { AUTH_PROVIDER } from './core/auth/tokens/auth.tokens';
import { SHOPPING_REPOSITORY } from './features/shopping-list/services/shopping.service';

// Implementações concretas — troque aqui para usar outra API
import { HttpAuthProvider } from './core/auth/providers/http-auth.provider';
import { HttpShoppingRepository } from './features/shopping-list/data/http-shopping.repository';
import { authInterceptor } from './core/auth/interceptors/auth.interceptor';

export function initializeAuth(auth: AuthService) {
  return () => auth.initialize();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),

    // Inversão de dependência: registra as implementações concretas nos tokens
    { provide: AUTH_PROVIDER, useClass: HttpAuthProvider },
    { provide: SHOPPING_REPOSITORY, useClass: HttpShoppingRepository },

    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuth,
      deps: [AuthService],
      multi: true,
    },
  ],
};
