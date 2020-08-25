package com.fon.njt.bookservice.repository;

import com.fon.njt.bookservice.model.GenreEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GenreRepository extends JpaRepository<GenreEntity, Long> {

    List<GenreEntity> findAllByOrderByNameAsc();

    boolean existsByName(String name);
}
