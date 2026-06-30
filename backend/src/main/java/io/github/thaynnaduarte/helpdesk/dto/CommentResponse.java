package io.github.thaynnaduarte.helpdesk.dto;

import java.time.OffsetDateTime;

public record CommentResponse(
    Long id,
    String authorName,
    String authorEmail,
    String content,
    OffsetDateTime createdAt
) {}
