package com.fon.njt.bookservice.service.impl;

import com.fon.njt.bookservice.dto.request.BookRequestDto;
import com.fon.njt.bookservice.dto.response.BookResponseDto;
import com.fon.njt.bookservice.mapper.BookMapper;
import com.fon.njt.bookservice.model.AuthorEntity;
import com.fon.njt.bookservice.model.BookEntity;
import com.fon.njt.bookservice.model.GenreEntity;
import com.fon.njt.bookservice.repository.AuthorRepository;
import com.fon.njt.bookservice.repository.BookRepository;
import com.fon.njt.bookservice.repository.GenreRepository;
import com.fon.njt.bookservice.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final GenreRepository genreRepository;
    private final BookMapper mapper;

    @Autowired
    public BookServiceImpl(BookRepository bookRepository, AuthorRepository authorRepository, GenreRepository genreRepository, BookMapper mapper) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.genreRepository = genreRepository;
        this.mapper = mapper;
    }

    @Override
    public List<BookResponseDto> getAll() {
        final List<BookEntity> books = bookRepository.findAllByInStockTrue();
        return mapper.mapToDtos(books);
    }

    @Override
    public BookResponseDto getById(Long id) {
        final BookEntity book = bookRepository.findById(id).get();
        return mapper.mapToDto(book);
    }

    @Override
    public List<BookResponseDto> filterBooks(String title, String author) {
        List<BookEntity> filteredBooks = new LinkedList<>();
        if (title != null && author == null) {
            filteredBooks = bookRepository.findByTitleStartingWithAndInStockIsTrue(title);
        } else {
            List<AuthorEntity> authors = authorRepository.findByFirstNameStartingWithOrLastNameStartingWith(author, author);
            List<BookEntity> books = new LinkedList<>();
            if (title == null) {
                authors.forEach(a -> {
                    books.addAll(bookRepository.findByAuthorsAndInStockIsTrue(a));
                });
            } else {
                authors.forEach(a -> {
                    books.addAll(bookRepository.findByAuthorsAndTitleStartingWithAndInStockIsTrue(a, title));
                });
            }
            filteredBooks.addAll(books);
        }
        return mapper.mapToDtos(filteredBooks);
    }

    @Override
    public List<BookResponseDto> filterByGenre(Long genreId) {
        final GenreEntity genre = genreRepository.findById(genreId).get();
        final List<BookEntity> books = bookRepository.findByGenresAndInStockTrue(genre);
        return mapper.mapToDtos(books);
    }

    @Override
    public BookResponseDto save(BookRequestDto dto) {
        final BookEntity bookToSave = mapper.mapToEntity(dto);
        final BookEntity savedBook = bookRepository.save(bookToSave);
        return mapper.mapToDto(savedBook);
    }

    @Override
    public BookResponseDto delete(Long id) {
        final BookEntity bookToDelete = bookRepository.findById(id).get();
        bookToDelete.setInStock(false);
        final BookEntity deletedBook = bookRepository.save(bookToDelete);
        return mapper.mapToDto(deletedBook);
    }
}
