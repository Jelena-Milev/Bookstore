package com.fon.njt.bookservice.repository;

import com.fon.njt.bookservice.model.BookEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<BookEntity, Long> {
}
