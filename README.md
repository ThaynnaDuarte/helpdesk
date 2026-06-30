# HelpDesk

Sistema de gerenciamento de chamados de suporte técnico desenvolvido com Spring Boot no backend e Angular no frontend.

## Sobre o projeto

O HelpDesk permite que usuários abram chamados de suporte, acompanhem o status e troquem mensagens com a equipe de atendimento. O sistema diferencia dois perfis: **Solicitante**, que abre e acompanha chamados, e **Atendente**, que responde e gerencia o atendimento.

## Tecnologias

**Backend**
- Java 21 com Spring Boot 3
- Spring Data JPA + H2 (banco em memória)
- Maven

**Frontend**
- Angular 19 (standalone components)
- PrimeNG como biblioteca de componentes
- TypeScript

## Funcionalidades

- Abertura de chamados com título, descrição, categoria e prioridade
- Listagem e filtragem de chamados
- Detalhamento do chamado com histórico de respostas
- Atualização de status (Aberto, Em Atendimento, Aguardando Responsável, Finalizado, Cancelado)
- Adição de comentários por solicitantes e atendentes
