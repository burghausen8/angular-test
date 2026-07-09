import { InjectionToken } from '@angular/core';
import { IAuthProvider } from '../interfaces/auth-provider.interface';

export const AUTH_PROVIDER = new InjectionToken<IAuthProvider>('AUTH_PROVIDER');
