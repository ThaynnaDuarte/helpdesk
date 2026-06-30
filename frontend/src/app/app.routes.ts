import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/tickets', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },

  {
    path: 'tickets',
    loadComponent: () => import('./features/tickets/ticket-list/ticket-list.component').then(m => m.TicketListComponent)
  },

  {
    path: 'tickets/new',
    loadComponent: () => import('./features/tickets/ticket-create/ticket-create.component').then(m => m.TicketCreateComponent)
  },

  {
    path: 'tickets/:id',
    loadComponent: () => import('./features/tickets/ticket-detail/ticket-detail.component').then(m => m.TicketDetailComponent)
  }
];
