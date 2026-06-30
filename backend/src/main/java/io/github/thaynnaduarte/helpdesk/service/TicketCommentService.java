package io.github.thaynnaduarte.helpdesk.service;

import io.github.thaynnaduarte.helpdesk.dto.CommentRequest;
import io.github.thaynnaduarte.helpdesk.dto.CommentResponse;
import io.github.thaynnaduarte.helpdesk.entity.Ticket;
import io.github.thaynnaduarte.helpdesk.entity.TicketComment;
import io.github.thaynnaduarte.helpdesk.entity.User;
import io.github.thaynnaduarte.helpdesk.repository.TicketCommentRepository;
import io.github.thaynnaduarte.helpdesk.repository.TicketRepository;
import io.github.thaynnaduarte.helpdesk.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TicketCommentService {

    private final TicketCommentRepository commentRepository;
    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;

    public TicketCommentService(TicketCommentRepository commentRepository,
                                TicketRepository ticketRepository,
                                UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
    }

    public List<CommentResponse> findByTicket(Long ticketId) {
        return commentRepository.findByTicketIdOrderByCreatedAtAsc(ticketId)
            .stream()
            .map(c -> new CommentResponse(
                c.getId(),
                c.getAuthor().getName(),
                c.getAuthor().getEmail(),
                c.getContent(),
                c.getCreatedAt()
            ))
            .toList();
    }

    public CommentResponse addComment(Long ticketId, CommentRequest request) {
        Ticket ticket = ticketRepository.findById(ticketId)
            .orElseThrow(() -> new RuntimeException("Chamado não encontrado"));

        User author = userRepository.findByEmail(request.authorEmail())
            .orElseGet(() -> {
                User novoUsuario = new User();
                novoUsuario.setName(request.authorName());
                novoUsuario.setEmail(request.authorEmail());
                novoUsuario.setRole("SOLICITANTE");
                return userRepository.save(novoUsuario);
            });

        TicketComment comentario = new TicketComment();
        comentario.setTicket(ticket);
        comentario.setAuthor(author);
        comentario.setContent(request.content());

        TicketComment salvo = commentRepository.save(comentario);

        return new CommentResponse(
            salvo.getId(),
            salvo.getAuthor().getName(),
            salvo.getAuthor().getEmail(),
            salvo.getContent(),
            salvo.getCreatedAt()
        );
    }
}
