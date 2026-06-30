import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <div class="layout">
      <header class="navbar">
        <a routerLink="/tickets" class="logo">
          <span class="logo-icon">&#128187;</span>
          HelpDesk
        </a>
        <nav class="menu">
          <a routerLink="/tickets" class="menu-link">Chamados</a>
          <a routerLink="/tickets/new" class="btn-new">+ Novo Chamado</a>
        </nav>
      </header>

      <main class="main-content">
        <router-outlet></router-outlet>
      </main>

    </div>
  `,
  styles: [`
    .layout { min-height: 100vh; display: flex; flex-direction: column; background: #f8fafc; }

    .navbar {
      background: linear-gradient(135deg, #3730a3 0%, #4f46e5 100%);
      padding: 0 2rem;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 2px 12px rgba(79,70,229,0.25);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      color: #fff;
      font-size: 1.1rem;
      font-weight: 700;
      text-decoration: none;
      letter-spacing: -0.01em;
    }
    .logo:hover { text-decoration: none; opacity: 0.9; }
    .logo-icon { font-size: 1.2rem; }

    .menu { display: flex; align-items: center; gap: 0.75rem; }

    .menu-link {
      color: rgba(255,255,255,0.8);
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
      padding: 0.4rem 0.85rem;
      border-radius: 6px;
      transition: background 0.15s, color 0.15s;
    }
    .menu-link:hover { background: rgba(255,255,255,0.12); color: #fff; text-decoration: none; }

    .btn-new {
      background: rgba(255,255,255,0.18);
      color: #fff;
      font-weight: 600;
      border: 1.5px solid rgba(255,255,255,0.35);
      padding: 0.4rem 1.1rem;
      border-radius: 6px;
      font-size: 0.875rem;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      transition: background 0.15s, border-color 0.15s;
    }
    .btn-new:hover { background: rgba(255,255,255,0.28); text-decoration: none; color: #fff; }

    .main-content {
      flex: 1;
      padding: 2rem;
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
    }
  `]
})
export class AppComponent {}
