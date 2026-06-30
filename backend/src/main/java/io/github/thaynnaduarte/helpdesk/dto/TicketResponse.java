package io.github.thaynnaduarte.helpdesk.dto;

import java.time.OffsetDateTime;

public record TicketResponse(
    Long id,
    String title,
    String description,
    String status,
    String priority,
    String categoryName,
    String creatorName,
    String creatorEmail,
    // "Não Atribuído" quando o chamado ainda não tem atendente
    String assigneeName,
    OffsetDateTime createdAt
) {}
