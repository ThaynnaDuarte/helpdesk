import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TicketService } from '../../../services/ticket.service';
import { CategoryService } from '../../../services/category.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-ticket-create',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, SelectModule, TextareaModule, RouterLink],
  template: `
    <div class="page-header">
      <div>
        <a routerLink="/tickets" class="voltar">← Voltar para chamados</a>
        <h2>Abrir Novo Chamado</h2>
      </div>
    </div>

    <div class="form-card">

      <div class="secao">
        <p class="secao-titulo">Dados do Solicitante</p>

        <div class="grid-2">
          <div class="field">
            <label>Nome completo *</label>
            <input pInputText [(ngModel)]="novoTicket.creatorName" placeholder="Ex: João da Silva" />
          </div>
          <div class="field">
            <label>E-mail para contato *</label>
            <input pInputText [(ngModel)]="novoTicket.creatorEmail" placeholder="Ex: joao@email.com" />
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="secao">
        <p class="secao-titulo">Dados do Chamado</p>

        <div class="field">
          <label>Título do problema *</label>
          <input pInputText [(ngModel)]="novoTicket.title" placeholder="Ex: Internet não funciona na sala 10" />
        </div>

        <div class="field">
          <label>Descrição detalhada *</label>
          <textarea pTextarea [(ngModel)]="novoTicket.description"
            placeholder="Descreva o problema com o máximo de detalhes possível." rows="5"></textarea>
        </div>

        <div class="grid-2">
          <div class="field">
            <label>Categoria *</label>
            <p-select
              [options]="categorias"
              [(ngModel)]="novoTicket.categoryId"
              optionLabel="name"
              optionValue="id"
              placeholder="Selecione uma categoria">
            </p-select>
          </div>
          <div class="field">
            <label>Prioridade *</label>
            <p-select
              [options]="prioridades"
              [(ngModel)]="novoTicket.priority"
              optionLabel="label"
              optionValue="value"
              placeholder="Selecione a prioridade">
            </p-select>
          </div>
        </div>
      </div>

      <div *ngIf="erro" class="msg-erro">{{ erro }}</div>

      <div class="acoes">
        <a routerLink="/tickets" class="p-button p-button-outlined">Cancelar</a>
        <button pButton label="Enviar Chamado" icon="pi pi-check" (click)="salvar()"></button>
      </div>
    </div>
  `,
  styles: [`
    .page-header { margin-bottom: 1.4rem; }
    .page-header h2 { margin-top: 0.3rem; }
    .voltar { font-size: 0.85rem; color: var(--text-mid); }
    .voltar:hover { color: var(--primary); text-decoration: none; }

    .form-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 2rem;
      box-shadow: var(--shadow-md);
      max-width: 780px;
    }

    .secao { margin-bottom: 0.5rem; }
    .secao-titulo {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: var(--text-soft);
      margin-bottom: 1.1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .secao-titulo::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--border);
    }

    .divider { border-top: 1px solid var(--border); margin: 1.4rem 0; }

    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

    .acoes {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
      margin-top: 1.5rem;
      padding-top: 1.2rem;
      border-top: 1px solid var(--border);
    }
  `]
})
export class TicketCreateComponent implements OnInit {

  categorias: any[] = [];

  prioridades = [
    { label: 'Baixa',   value: 'BAIXA' },
    { label: 'Média',   value: 'MEDIA' },
    { label: 'Alta',    value: 'ALTA' },
    { label: 'Urgente', value: 'URGENTE' }
  ];

  novoTicket = {
    creatorName: '', creatorEmail: '',
    title: '', description: '',
    categoryId: null as number | null,
    priority: ''
  };

  erro = '';

  constructor(
    private ticketService: TicketService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.categoryService.getAll().subscribe(dados => this.categorias = dados);
  }

  salvar() {
    if (!this.novoTicket.creatorName || !this.novoTicket.creatorEmail ||
        !this.novoTicket.title || !this.novoTicket.description ||
        !this.novoTicket.categoryId || !this.novoTicket.priority) {
      this.erro = 'Preencha todos os campos obrigatórios (*).';
      return;
    }
    this.erro = '';
    this.ticketService.create(this.novoTicket).subscribe(() => {
      this.router.navigate(['/tickets']);
    });
  }
}
