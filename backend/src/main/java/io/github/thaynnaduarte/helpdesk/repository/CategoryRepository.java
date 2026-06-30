package io.github.thaynnaduarte.helpdesk.repository;

import io.github.thaynnaduarte.helpdesk.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
