package io.github.thaynnaduarte.helpdesk.entity;

// ciclo de vida: ABERTO → EM_ATENDIMENTO → AGUARDANDO_RESPONSAVEL → FINALIZADO | CANCELADO
public enum TicketStatus {
    ABERTO,
    EM_ATENDIMENTO,
    AGUARDANDO_RESPONSAVEL,
    FINALIZADO,
    CANCELADO
}
