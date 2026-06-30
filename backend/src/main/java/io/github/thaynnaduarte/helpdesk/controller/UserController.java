package io.github.thaynnaduarte.helpdesk.controller;

import io.github.thaynnaduarte.helpdesk.dto.UserResponse;
import io.github.thaynnaduarte.helpdesk.service.UserService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public List<UserResponse> getAll() {
        return service.findAll();
    }
}
