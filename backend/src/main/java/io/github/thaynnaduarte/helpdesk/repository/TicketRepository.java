package io.github.thaynnaduarte.helpdesk.repository;

import io.github.thaynnaduarte.helpdesk.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
}
