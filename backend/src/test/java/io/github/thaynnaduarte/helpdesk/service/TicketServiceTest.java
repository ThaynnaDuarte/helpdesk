package io.github.thaynnaduarte.helpdesk.service;

import io.github.thaynnaduarte.helpdesk.entity.*;
import io.github.thaynnaduarte.helpdesk.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class TicketServiceTest {

    private TicketService service;
    private TicketRepository ticketRepo;
    private UserRepository userRepo;

    @BeforeEach
    void setup() {
        ticketRepo = Mockito.mock(TicketRepository.class);
        userRepo = Mockito.mock(UserRepository.class);
        service = new TicketService(ticketRepo, Mockito.mock(CategoryRepository.class), userRepo);
    }

    @Test
    void deveAtualizarStatusParaValorValido() {
        Category categoria = new Category();
        categoria.setName("Rede");

        User criador = new User();
        criador.setName("João");
        criador.setEmail("joao@email.com");

        Ticket ticket = new Ticket();
        ticket.setId(10L);
        ticket.setStatus("ABERTO");
        ticket.setCategory(categoria);
        ticket.setCreator(criador);

        Mockito.when(ticketRepo.findById(10L)).thenReturn(Optional.of(ticket));
        Mockito.when(ticketRepo.save(Mockito.any())).thenReturn(ticket);

        assertDoesNotThrow(() -> {
            service.updateStatus(10L, "EM_ATENDIMENTO");
        });
    }

    @Test
    void deveLancarErroParaStatusInvalido() {
        Ticket ticket = new Ticket();
        ticket.setId(10L);
        ticket.setStatus("ABERTO");

        Mockito.when(ticketRepo.findById(10L)).thenReturn(Optional.of(ticket));

        assertThrows(IllegalArgumentException.class, () -> {
            service.updateStatus(10L, "STATUS_INEXISTENTE");
        });
    }
}
