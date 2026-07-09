import { RegisterUser } from '../models/register.user.model';
import { AppUser } from '../models/user.model';

export interface AuthSession {
  user: AppUser;
  token: string;
}

export interface IAuthProvider {
  signIn(email: string, password: string): Promise<AuthSession>;
  signOut(): Promise<void>;
  register(email: string, password: string): Promise<RegisterUser>;
  verifyTwoFactor(email: string, token: string): Promise<void>;
  getSession(): Promise<AuthSession | null>;
  onAuthStateChange(callback: (user: AppUser | null) => void): void;
}
