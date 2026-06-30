package io.github.thaynnaduarte.helpdesk.config;

import io.github.thaynnaduarte.helpdesk.entity.*;
import io.github.thaynnaduarte.helpdesk.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepo;
    private final CategoryRepository catRepo;

    public DataSeeder(UserRepository userRepo, CategoryRepository catRepo) {
        this.userRepo = userRepo;
        this.catRepo = catRepo;
    }

    @Override
    public void run(String... args) {
        if (userRepo.count() == 0) {
            User joao = new User();
            joao.setName("João Solicitante");
            joao.setEmail("joao@email.com");
            joao.setRole("SOLICITANTE");
            userRepo.save(joao);

            User maria = new User();
            maria.setName("Maria Atendente");
            maria.setEmail("maria@email.com");
            maria.setRole("ATENDENTE");
            userRepo.save(maria);

            Category ti = new Category();
            ti.setName("Informática/TI");
            ti.setDescription("Problemas com computador, internet ou mouse");
            catRepo.save(ti);

            System.out.println("✅ Banco de dados populado com sucesso!");
        }
    }
}
