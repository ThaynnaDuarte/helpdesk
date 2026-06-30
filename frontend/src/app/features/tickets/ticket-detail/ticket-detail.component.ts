import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TicketService } from '../../../services/ticket.service';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, TextareaModule, InputTextModule, SelectModule, RouterLink],
  template: `
    <div *ngIf="carregando" class="estado-centro">Carregando chamado...</div>

    <div *ngIf="!carregando && !ticket" class="estado-centro">
      <p>Chamado não encontrado.</p>
      <a routerLink="/tickets">← Voltar para a lista</a>
    </div>

    <ng-container *ngIf="ticket">

      <div class="page-header">
        <div>
          <a routerLink="/tickets" class="voltar">← Chamados</a>
          <h2>
            <span class="id-label">#{{ ticket.id }}</span>
            {{ ticket.title }}
          </h2>
        </div>
        <span [class]="'badge badge-' + ticket.status.toLowerCase()">{{ labelStatus(ticket.status) }}</span>
      </div>

      <div class="layout-colunas">

        <div class="coluna-principal">

          <div class="card">
            <p class="card-label">Descrição do problema</p>
            <p class="descricao-texto">{{ ticket.description }}</p>
          </div>

          <h3>Respostas ({{ comentarios.length }})</h3>

          <div *ngIf="comentarios.length === 0" class="sem-conteudo">
            Nenhuma resposta ainda.
          </div>

          <div *ngFor="let c of comentarios" class="comentario-card">
            <div class="comentario-header">
              <div class="avatar">{{ c.authorName.charAt(0).toUpperCase() }}</div>
              <div>
                <strong>{{ c.authorName }}</strong>
                <span class="comentario-email">{{ c.authorEmail }}</span>
              </div>
              <span class="comentario-data">{{ c.createdAt | date:'dd/MM/yyyy HH:mm' }}</span>
            </div>
            <p class="comentario-texto">{{ c.content }}</p>
          </div>

          <div class="card form-resposta">
            <p class="card-label">Adicionar Resposta</p>

            <div class="grid-2">
              <div class="field">
                <label>Seu nome *</label>
                <input pInputText [(ngModel)]="novoComentario.authorName" placeholder="Ex: Maria Atendente" />
              </div>
              <div class="field">
                <label>Seu e-mail *</label>
                <input pInputText [(ngModel)]="novoComentario.authorEmail" placeholder="Ex: maria@email.com" />
              </div>
            </div>

            <div class="field">
              <label>Mensagem *</label>
              <textarea pTextarea [(ngModel)]="novoComentario.content"
                placeholder="Digite sua resposta aqui..." rows="4"></textarea>
            </div>

            <div *ngIf="erroComentario" class="msg-erro">{{ erroComentario }}</div>

            <div style="display:flex; justify-content:flex-end;">
              <button pButton label="Enviar Resposta" icon="pi pi-send" (click)="enviarResposta()"></button>
            </div>
          </div>

        </div>

        <aside class="painel-lateral">

          <div class="card">
            <p class="card-label">Informações</p>
            <div class="info-item">
              <span class="info-rotulo">Solicitante</span>
              <span>{{ ticket.creatorName }}</span>
            </div>
            <div class="info-item">
              <span class="info-rotulo">E-mail</span>
              <span class="email-text">{{ ticket.creatorEmail }}</span>
            </div>
            <div class="info-item">
              <span class="info-rotulo">Categoria</span>
              <span>{{ ticket.categoryName }}</span>
            </div>
            <div class="info-item">
              <span class="info-rotulo">Prioridade</span>
              <span [class]="'badge badge-' + ticket.priority.toLowerCase()">{{ labelPrioridade(ticket.priority) }}</span>
            </div>
            <div class="info-item">
              <span class="info-rotulo">Aberto em</span>
              <span>{{ ticket.createdAt | date:'dd/MM/yyyy' }}<br><small>{{ ticket.createdAt | date:'HH:mm' }}</small></span>
            </div>
          </div>

          <div class="card">
            <p class="card-label">Alterar Status</p>
            <p-select
              [options]="statusDisponiveis"
              [(ngModel)]="statusSelecionado"
              optionLabel="label"
              optionValue="value"
              class="w-full">
            </p-select>
            <button pButton label="Salvar Status" icon="pi pi-check-circle"
              (click)="alterarStatus()" class="w-full mt-2"></button>
            <div *ngIf="mensagemStatus" class="msg-ok" style="margin-top:0.5rem">{{ mensagemStatus }}</div>
          </div>

        </aside>
      </div>

    </ng-container>
  `,
  styles: [`
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.5rem;
      gap: 1rem;
    }
    .page-header h2 { margin: 0.25rem 0 0; display: flex; align-items: baseline; gap: 0.5rem; }
    .id-label { color: var(--text-soft); font-size: 1rem; font-weight: 400; }
    .voltar { font-size: 0.82rem; color: var(--text-mid); }
    .voltar:hover { color: var(--primary); text-decoration: none; }

    .layout-colunas {
      display: grid;
      grid-template-columns: 1fr 280px;
      gap: 1.25rem;
      align-items: start;
    }

    .coluna-principal { display: flex; flex-direction: column; gap: 1rem; }

    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 1.25rem 1.5rem;
      box-shadow: var(--shadow);
    }

    .card-label {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: var(--text-soft);
      margin-bottom: 0.85rem;
    }

    .descricao-texto { white-space: pre-wrap; color: var(--text-mid); line-height: 1.75; font-size: 0.95rem; }

    .sem-conteudo {
      color: var(--text-soft);
      font-style: italic;
      padding: 2rem;
      text-align: center;
      background: #fafbff;
      border-radius: var(--radius-sm);
      border: 1px dashed var(--border);
    }

    .comentario-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 1.1rem 1.4rem;
      box-shadow: var(--shadow);
    }
    .comentario-header {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      margin-bottom: 0.75rem;
    }
    .avatar {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: var(--primary);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.88rem;
      flex-shrink: 0;
    }
    .comentario-autor strong { color: var(--text); font-size: 0.9rem; }
    .comentario-email { color: var(--text-soft); font-size: 0.78rem; display: block; }
    .comentario-data { margin-left: auto; color: var(--text-soft); font-size: 0.78rem; white-space: nowrap; }
    .comentario-texto { color: var(--text-mid); white-space: pre-wrap; margin: 0; line-height: 1.6; }

    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }

    .painel-lateral { display: flex; flex-direction: column; gap: 1rem; }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      padding: 0.55rem 0;
      border-bottom: 1px solid #f1f5f9;
      font-size: 0.88rem;
    }
    .info-item:last-child { border-bottom: none; }
    .info-rotulo {
      font-size: 0.68rem;
      color: var(--text-soft);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .email-text { color: var(--primary); word-break: break-all; font-size: 0.875rem; }

    .estado-centro { text-align: center; padding: 4rem; color: var(--text-soft); }

    .w-full { width: 100%; }
    .mt-2 { margin-top: 0.6rem; }
  `]
})
export class TicketDetailComponent implements OnInit {

  ticket: any = null;
  comentarios: any[] = [];
  carregando = true;
  erroComentario = '';
  statusSelecionado = '';
  mensagemStatus = '';

  statusDisponiveis = [
    { label: 'Aberto',                 value: 'ABERTO' },
    { label: 'Em Atendimento',         value: 'EM_ATENDIMENTO' },
    { label: 'Aguardando Responsável', value: 'AGUARDANDO_RESPONSAVEL' },
    { label: 'Finalizado',             value: 'FINALIZADO' },
    { label: 'Cancelado',              value: 'CANCELADO' }
  ];

  novoComentario = { authorName: '', authorEmail: '', content: '' };

  constructor(private route: ActivatedRoute, private ticketService: TicketService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.ticketService.getById(id).subscribe({
      next: (dados) => { this.ticket = dados; this.statusSelecionado = dados.status; this.carregando = false; },
      error: () => { this.ticket = null; this.carregando = false; }
    });

    this.ticketService.getComments(id).subscribe({
      next: (dados) => this.comentarios = dados,
      error: () => this.comentarios = []
    });
  }

  labelStatus(valor: string): string {
    return this.statusDisponiveis.find(s => s.value === valor)?.label ?? valor;
  }

  labelPrioridade(valor: string): string {
    const map: Record<string, string> = { BAIXA: 'Baixa', MEDIA: 'Média', ALTA: 'Alta', URGENTE: 'Urgente' };
    return map[valor] ?? valor;
  }

  alterarStatus() {
    if (!this.statusSelecionado) return;
    this.ticketService.updateStatus(this.ticket.id, this.statusSelecionado).subscribe({
      next: (atualizado) => {
        this.ticket = atualizado;
        this.mensagemStatus = 'Status atualizado!';
        setTimeout(() => this.mensagemStatus = '', 3000);
      },
      error: () => this.mensagemStatus = 'Erro ao atualizar.'
    });
  }

  enviarResposta() {
    if (!this.novoComentario.authorName || !this.novoComentario.authorEmail || !this.novoComentario.content) {
      this.erroComentario = 'Preencha todos os campos obrigatórios (*).';
      return;
    }
    this.erroComentario = '';
    this.ticketService.addComment(this.ticket.id, this.novoComentario).subscribe({
      next: (item) => {
        this.comentarios.push(item);
        this.novoComentario = { authorName: '', authorEmail: '', content: '' };
      },
      error: () => this.erroComentario = 'Erro ao enviar. Tente novamente.'
    });
  }
}
