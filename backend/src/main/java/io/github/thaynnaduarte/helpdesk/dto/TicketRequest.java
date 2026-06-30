package io.github.thaynnaduarte.helpdesk.dto;

public record TicketRequest(
    String creatorName,
    String creatorEmail,
    String title,
    String description,
    Long categoryId,
    String priority
) {}
