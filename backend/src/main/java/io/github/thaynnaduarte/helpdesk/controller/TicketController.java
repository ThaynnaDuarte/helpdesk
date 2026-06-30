package io.github.thaynnaduarte.helpdesk.controller;

import io.github.thaynnaduarte.helpdesk.dto.CommentRequest;
import io.github.thaynnaduarte.helpdesk.dto.CommentResponse;
import io.github.thaynnaduarte.helpdesk.dto.TicketRequest;
import io.github.thaynnaduarte.helpdesk.dto.TicketResponse;
import io.github.thaynnaduarte.helpdesk.service.TicketCommentService;
import io.github.thaynnaduarte.helpdesk.service.TicketService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService service;
    private final TicketCommentService commentService;

    public TicketController(TicketService service, TicketCommentService commentService) {
        this.service = service;
        this.commentService = commentService;
    }

    @GetMapping
    public List<TicketResponse> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public TicketResponse getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public TicketResponse create(@RequestBody TicketRequest request) {
        return service.create(request);
    }

    @PatchMapping("/{id}/status")
    public TicketResponse updateStatus(@PathVariable Long id, @RequestBody java.util.Map<String, String> body) {
        return service.updateStatus(id, body.get("status"));
    }

    @GetMapping("/{id}/comments")
    public List<CommentResponse> getComments(@PathVariable Long id) {
        return commentService.findByTicket(id);
    }

    @PostMapping("/{id}/comments")
    public CommentResponse addComment(@PathVariable Long id, @RequestBody CommentRequest request) {
        return commentService.addComment(id, request);
    }

    @PatchMapping("/{id}/close")
    public TicketResponse close(@PathVariable Long id) {
        return service.updateStatus(id, "FINALIZADO");
    }
}
