package io.github.thaynnaduarte.helpdesk.repository;

import io.github.thaynnaduarte.helpdesk.entity.TicketComment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TicketCommentRepository extends JpaRepository<TicketComment, Long> {

    // Retorna comentários de um chamado em ordem cronológica
    List<TicketComment> findByTicketIdOrderByCreatedAtAsc(Long ticketId);
}
