package io.github.thaynnaduarte.helpdesk.service;

import io.github.thaynnaduarte.helpdesk.dto.TicketRequest;
import io.github.thaynnaduarte.helpdesk.dto.TicketResponse;
import io.github.thaynnaduarte.helpdesk.entity.*;
import io.github.thaynnaduarte.helpdesk.repository.*;
import org.springframework.stereotype.Service;
import java.time.OffsetDateTime;
import java.util.List;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public TicketService(TicketRepository ticketRepo, CategoryRepository catRepo, UserRepository userRepo) {
        this.ticketRepository = ticketRepo;
        this.categoryRepository = catRepo;
        this.userRepository = userRepo;
    }

    public List<TicketResponse> findAll() {
        return ticketRepository.findAll().stream().map(this::toResponse).toList();
    }

    public TicketResponse findById(Long id) {
        Ticket ticket = ticketRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Chamado não encontrado"));
        return toResponse(ticket);
    }

    public TicketResponse updateStatus(Long id, String novoStatus) {
        Ticket ticket = ticketRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Chamado não encontrado"));

        TicketStatus.valueOf(novoStatus);

        ticket.setStatus(novoStatus);
        ticket.setUpdatedAt(OffsetDateTime.now());

        if (novoStatus.equals(TicketStatus.FINALIZADO.name())) {
            ticket.setClosedAt(OffsetDateTime.now());
        }

        return toResponse(ticketRepository.save(ticket));
    }

    public TicketResponse create(TicketRequest request) {
        Ticket ticket = new Ticket();
        ticket.setTitle(request.title());
        ticket.setDescription(request.description());
        ticket.setStatus(TicketStatus.ABERTO.name());
        ticket.setPriority(request.priority());

        Category category = categoryRepository.findById(request.categoryId())
            .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
        ticket.setCategory(category);

        User creator = userRepository.findByEmail(request.creatorEmail())
            .orElseGet(() -> {
                User novoUsuario = new User();
                novoUsuario.setName(request.creatorName());
                novoUsuario.setEmail(request.creatorEmail());
                novoUsuario.setRole("SOLICITANTE");
                return userRepository.save(novoUsuario);
            });
        ticket.setCreator(creator);

        return toResponse(ticketRepository.save(ticket));
    }

    private TicketResponse toResponse(Ticket ticket) {
        String assigneeName = ticket.getAssignee() != null ? ticket.getAssignee().getName() : "Não Atribuído";
        return new TicketResponse(
            ticket.getId(),
            ticket.getTitle(),
            ticket.getDescription(),
            ticket.getStatus(),
            ticket.getPriority(),
            ticket.getCategory().getName(),
            ticket.getCreator().getName(),
            ticket.getCreator().getEmail(),
            assigneeName,
            ticket.getCreatedAt()
        );
    }
}
