package com.fon.njt.bookservice.repository;

import com.fon.njt.bookservice.model.AuthorEntity;
import com.fon.njt.bookservice.model.BookEntity;
import com.fon.njt.bookservice.model.GenreEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<BookEntity, Long> {

//    List<BookEntity> findByIdInAndInStockTrue(List<Long> ids);
    List<BookEntity> findByIdIn(List<Long> ids);

    List<BookEntity> findAllByOrderByTitleAsc();

    List<BookEntity> findAllByInStockTrueOrderByTitleAsc();

    List<BookEntity> findByTitleContainsAndInStockIsTrue(String title);

    List<BookEntity> findByAuthorsAndInStockIsTrue(AuthorEntity author);

    List<BookEntity> findByAuthorsAndTitleContainsAndInStockIsTrue(AuthorEntity author, String title);

    List<BookEntity> findByGenresAndInStockTrue(GenreEntity genre);

    boolean existsByISBN(String isbn);

    boolean existsById(Long id);
}
