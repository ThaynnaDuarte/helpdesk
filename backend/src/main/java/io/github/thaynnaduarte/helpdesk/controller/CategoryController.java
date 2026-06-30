package io.github.thaynnaduarte.helpdesk.controller;

import io.github.thaynnaduarte.helpdesk.dto.CategoryResponse;
import io.github.thaynnaduarte.helpdesk.service.CategoryService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService service;

    public CategoryController(CategoryService service) {
        this.service = service;
    }

    @GetMapping
    public List<CategoryResponse> getAll() {
        return service.findAll();
    }
}
