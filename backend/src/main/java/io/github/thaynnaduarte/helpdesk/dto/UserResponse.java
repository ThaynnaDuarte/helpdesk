package io.github.thaynnaduarte.helpdesk.dto;

import java.time.OffsetDateTime;

public record UserResponse(
    Long id,
    String name,
    String email,
    String role,
    OffsetDateTime createdAt
) {}
