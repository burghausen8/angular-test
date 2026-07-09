import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  errorMessage = '';
  isSignUp = false;

  constructor(private authService: AuthService) {}

  async onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, preencha todos os campos';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    try {
      // if (this.isSignUp) {
      //   await this.authService.signUp(this.email, this.password);
      //   this.errorMessage =
      //     'Cadastro realizado! Verifique seu email para confirmar.';
      //   this.isSignUp = false;
      // } else {
      await this.authService.login(this.email, this.password);
      // }
    } catch (error: any) {
      this.errorMessage = error.message || 'Erro ao autenticar';
    } finally {
      this.loading = false;
    }
  }

  toggleMode() {
    this.isSignUp = !this.isSignUp;
    this.errorMessage = '';
  }
}
