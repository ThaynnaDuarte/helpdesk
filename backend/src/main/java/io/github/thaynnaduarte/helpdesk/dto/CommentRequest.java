package io.github.thaynnaduarte.helpdesk.dto;

public record CommentRequest(
    String authorName,
    String authorEmail,
    String content
) {}
