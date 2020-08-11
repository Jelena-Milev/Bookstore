package com.fon.njt.bookservice.repository;

import com.fon.njt.bookservice.model.AuthorEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository extends JpaRepository<AuthorEntity, Long> {
}
