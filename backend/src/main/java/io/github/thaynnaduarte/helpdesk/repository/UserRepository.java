package io.github.thaynnaduarte.helpdesk.repository;

import io.github.thaynnaduarte.helpdesk.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // Usado para localizar um usuário antes de criar um novo (evita duplicatas)
    Optional<User> findByEmail(String email);
}
