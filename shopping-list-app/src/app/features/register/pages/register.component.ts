import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  loading = false;
  errorMessage = '';
  is2FA = false;
  showPassword = false;

  otpDigits: string[] = ['', '', '', '', '', ''];

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  constructor(private authService: AuthService, private router: Router) {}

  async onSubmit() {
    if (this.is2FA) {
      const token = this.otpDigits.join('');
      if (token.length < 6) {
        this.errorMessage = 'Por favor, insira os 6 dígitos do código';
        return;
      }
      this.loading = true;
      this.errorMessage = '';
      try {
        await this.authService.verifyTwoFactor(this.email, token);
        this.router.navigate(['/login']);
      } catch (error: any) {
        this.errorMessage = error.message || 'Código inválido';
        this.otpDigits = ['', '', '', '', '', ''];
        setTimeout(() => this.otpInputs.first?.nativeElement.focus(), 0);
      } finally {
        this.loading = false;
      }
      return;
    }

    if (!this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Por favor, preencha todos os campos';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'As duas senhas devem ser iguais';
      return;
    }
    this.loading = true;
    this.errorMessage = '';

    try {
      await this.authService.register(this.email, this.password);
      this.is2FA = true;
    } catch (error: any) {
      this.errorMessage = error.message || 'Erro ao autenticar';
    } finally {
      this.loading = false;
    }
  }

  onOtpInput(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');
    this.otpDigits[index] = value ? value[value.length - 1] : '';
    input.value = this.otpDigits[index];

    if (this.otpDigits[index] && index < 5) {
      const inputs = this.otpInputs.toArray();
      inputs[index + 1]?.nativeElement.focus();
    }
  }

  onOtpKeydown(index: number, event: KeyboardEvent) {
    if (event.key === 'Backspace' && !this.otpDigits[index] && index > 0) {
      const inputs = this.otpInputs.toArray();
      this.otpDigits[index - 1] = '';
      inputs[index - 1]?.nativeElement.focus();
    }
  }

  onOtpPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pasted =
      event.clipboardData?.getData('text').replace(/\D/g, '') ?? '';
    for (let i = 0; i < 6; i++) {
      this.otpDigits[i] = pasted[i] ?? '';
    }
    const inputs = this.otpInputs.toArray();
    const focusIndex = Math.min(pasted.length, 5);
    inputs[focusIndex]?.nativeElement.focus();
  }

  toggleMode() {
    this.is2FA = !this.is2FA;
    this.errorMessage = '';
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onClickbackLogin() {
    this.router.navigate(['/login']);
  }
}
