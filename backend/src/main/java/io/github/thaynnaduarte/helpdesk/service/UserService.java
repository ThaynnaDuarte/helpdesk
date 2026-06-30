package io.github.thaynnaduarte.helpdesk.service;

import io.github.thaynnaduarte.helpdesk.dto.UserResponse;
import io.github.thaynnaduarte.helpdesk.entity.User;
import io.github.thaynnaduarte.helpdesk.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public List<UserResponse> findAll() {
        return repository.findAll().stream()
            .map(u -> new UserResponse(u.getId(), u.getName(), u.getEmail(), u.getRole(), u.getCreatedAt()))
            .toList();
    }
}
