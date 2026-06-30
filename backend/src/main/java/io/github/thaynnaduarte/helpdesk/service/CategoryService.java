package io.github.thaynnaduarte.helpdesk.service;

import io.github.thaynnaduarte.helpdesk.dto.CategoryResponse;
import io.github.thaynnaduarte.helpdesk.entity.Category;
import io.github.thaynnaduarte.helpdesk.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository repository;

    public CategoryService(CategoryRepository repository) {
        this.repository = repository;
    }

    public List<CategoryResponse> findAll() {
        return repository.findAll().stream()
            .map(c -> new CategoryResponse(c.getId(), c.getName(), c.getDescription(), c.getCreatedAt()))
            .toList();
    }
}
