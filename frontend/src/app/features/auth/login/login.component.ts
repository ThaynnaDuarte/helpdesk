import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="login-box">
      <h2>Quem é você? 👤</h2>
      <p>Escolha um perfil para entrar no sistema:</p>
      <button pButton label="Entrar como Solicitante (João)" (click)="login(1)" class="p-button-secondary w-full mb-2"></button>
      <button pButton label="Entrar como Atendente (Maria)" (click)="login(2)" class="w-full"></button>
    </div>
  `,
  styles: [`.login-box { max-width: 400px; margin: 100px auto; text-align: center; border: 1px solid #ccc; padding: 2rem; border-radius: 8px; }`]
})
export class LoginComponent {
  constructor(private router: Router) {}

  login(id: number) {
    sessionStorage.setItem('userId', id.toString());
    this.router.navigate(['/tickets']);
  }
}
