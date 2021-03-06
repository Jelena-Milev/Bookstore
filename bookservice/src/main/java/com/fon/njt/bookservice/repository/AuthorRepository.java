package com.fon.njt.bookservice.repository;

import com.fon.njt.bookservice.model.AuthorEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuthorRepository extends JpaRepository<AuthorEntity, Long> {
    List<AuthorEntity> findAllByOrderByFirstNameAscLastNameAsc();

    List<AuthorEntity> findByFirstNameStartingWithOrLastNameStartingWith(String author, String author1);

    boolean existsByFirstNameAndLastName(String firstName, String lastName);
}
