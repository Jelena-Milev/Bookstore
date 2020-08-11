package com.fon.njt.bookservice.repository;

import com.fon.njt.bookservice.model.GenreEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<GenreEntity, Long> {
}
