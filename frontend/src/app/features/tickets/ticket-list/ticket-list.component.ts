import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TicketService } from '../../../services/ticket.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterLink],
  template: `
    <div class="page-header">
      <div>
        <h2>Chamados de Suporte</h2>
        <p class="subtitulo">{{ tickets.length }} chamado(s) registrado(s)</p>
      </div>
      <a routerLink="/tickets/new" class="p-button p-button-sm">
        <span class="pi pi-plus" style="margin-right:0.4rem"></span> Novo Chamado
      </a>
    </div>

    <p-table [value]="tickets" [rows]="10" [paginator]="true" [rowsPerPageOptions]="[10, 25, 50]">
      <ng-template pTemplate="header">
        <tr>
          <th style="width:60px">#</th>
          <th>Título</th>
          <th>Solicitante</th>
          <th>Categoria</th>
          <th>Prioridade</th>
          <th>Status</th>
          <th>Aberto em</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-ticket>
        <tr>
          <td class="id-col">{{ ticket.id }}</td>
          <td>
            <a [routerLink]="['/tickets', ticket.id]" class="titulo-link">{{ ticket.title }}</a>
          </td>
          <td>
            <div class="solicitante-nome">{{ ticket.creatorName }}</div>
            <div class="solicitante-email">{{ ticket.creatorEmail }}</div>
          </td>
          <td>{{ ticket.categoryName }}</td>
          <td>
            <span [class]="'badge badge-' + ticket.priority.toLowerCase()">{{ labelPrioridade(ticket.priority) }}</span>
          </td>
          <td>
            <span [class]="'badge badge-' + ticket.status.toLowerCase()">{{ labelStatus(ticket.status) }}</span>
          </td>
          <td class="data-col">{{ ticket.createdAt | date:'dd/MM/yyyy' }}<br><span class="hora">{{ ticket.createdAt | date:'HH:mm' }}</span></td>
        </tr>
      </ng-template>
      <ng-template pTemplate="emptymessage">
        <tr>
          <td colspan="7" class="vazio">
            Nenhum chamado registrado ainda.
            <a routerLink="/tickets/new">Abrir o primeiro chamado</a>
          </td>
        </tr>
      </ng-template>
    </p-table>
  `,
  styles: [`
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    .page-header h2 { margin-bottom: 0.15rem; }
    .subtitulo { color: var(--text-soft); font-size: 0.85rem; margin: 0; }

    .id-col { color: var(--text-soft); font-size: 0.82rem; font-weight: 600; }

    .titulo-link {
      color: var(--text);
      font-weight: 500;
      text-decoration: none;
    }
    .titulo-link:hover { color: var(--primary); text-decoration: underline; }

    .solicitante-nome { font-weight: 500; font-size: 0.9rem; color: var(--text); }
    .solicitante-email { color: var(--text-soft); font-size: 0.78rem; }

    .data-col { font-size: 0.85rem; color: var(--text-mid); }
    .hora { color: var(--text-soft); font-size: 0.78rem; }

    .vazio { text-align: center; padding: 3rem !important; color: var(--text-soft); }
  `]
})
export class TicketListComponent implements OnInit {
  tickets: any[] = [];

  constructor(private service: TicketService) {}

  ngOnInit() {
    this.service.getAll().subscribe(dados => this.tickets = dados);
  }

  labelPrioridade(valor: string): string {
    const map: Record<string, string> = {
      BAIXA: 'Baixa', MEDIA: 'Média', ALTA: 'Alta', URGENTE: 'Urgente'
    };
    return map[valor] ?? valor;
  }

  labelStatus(valor: string): string {
    const map: Record<string, string> = {
      ABERTO: 'Aberto',
      EM_ATENDIMENTO: 'Em Atendimento',
      AGUARDANDO_RESPONSAVEL: 'Aguardando',
      FINALIZADO: 'Finalizado',
      CANCELADO: 'Cancelado'
    };
    return map[valor] ?? valor;
  }
}
