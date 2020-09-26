package com.fon.njt.bookservice.service.impl;

import com.fon.njt.bookservice.controller.bookstorage.BookStorageAPI;
import com.fon.njt.bookservice.dto.request.BookRequestDto;
import com.fon.njt.bookservice.dto.request.StorageItemRequestDto;
import com.fon.njt.bookservice.dto.response.BookResponseDto;
import com.fon.njt.bookservice.exception.EntityAlreadyExistsException;
import com.fon.njt.bookservice.exception.EntityNotFoundException;
import com.fon.njt.bookservice.mapper.BookMapper;
import com.fon.njt.bookservice.model.AuthorEntity;
import com.fon.njt.bookservice.model.BookEntity;
import com.fon.njt.bookservice.model.GenreEntity;
import com.fon.njt.bookservice.model.PublisherEntity;
import com.fon.njt.bookservice.repository.AuthorRepository;
import com.fon.njt.bookservice.repository.BookRepository;
import com.fon.njt.bookservice.repository.GenreRepository;
import com.fon.njt.bookservice.repository.PublisherRepository;
import com.fon.njt.bookservice.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final GenreRepository genreRepository;
    private final PublisherRepository publisherRepository;
    private final BookMapper mapper;

    private final BookStorageAPI bookStorageAPI;

    @Autowired
    public BookServiceImpl(BookRepository bookRepository, AuthorRepository authorRepository, GenreRepository genreRepository, PublisherRepository publisherRepository, BookMapper mapper, BookStorageAPI bookStorageAPI) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.genreRepository = genreRepository;
        this.publisherRepository = publisherRepository;
        this.mapper = mapper;
        this.bookStorageAPI = bookStorageAPI;
    }

    @Override
    public List<BookResponseDto> getAll() {
        final List<BookEntity> books = bookRepository.findAllByOrderByTitleAsc();
        return mapper.mapToDtos(books);
    }

    @Override
    public List<BookResponseDto> getAllInStock() {
        final List<BookEntity> books = bookRepository.findAllByInStockTrueOrderByTitleAsc();
        return mapper.mapToDtos(books);
    }

    @Override
    public BookResponseDto getById(Long id) {
        final BookEntity book = bookRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Knjiga", id));
        return mapper.mapToDto(book);
    }

    @Override
    public List<BookResponseDto> filterBooks(String title, String author) {
        List<BookEntity> filteredBooks = new LinkedList<>();
        if (title != null && author == null) {
            title = title.trim();
            filteredBooks = bookRepository.findByTitleContainsAndInStockIsTrue(title);
        } else {
            author = author.trim();
            String firstName = author;
            String lastName = author;
            if (author.indexOf(' ') != -1) {
                String[] authorNames = author.split(" ");
                firstName = authorNames[0];
                lastName = authorNames[1];
            }
            List<AuthorEntity> authors = authorRepository.findByFirstNameStartingWithOrLastNameStartingWith(firstName, lastName);
            List<BookEntity> books = new LinkedList<>();
            if (title == null) {
                authors.forEach(a -> {
                    books.addAll(bookRepository.findByAuthorsAndInStockIsTrue(a));
                });
            } else {
                String trimmedTitle = title.trim();
                authors.forEach(a -> {
                    books.addAll(bookRepository.findByAuthorsAndTitleContainsAndInStockIsTrue(a, trimmedTitle));
                });
            }
            filteredBooks.addAll(books);
        }
        return mapper.mapToDtos(filteredBooks);
    }

    @Override
    public List<BookResponseDto> filterByGenre(Long genreId) {
        final GenreEntity genre = genreRepository.findById(genreId).orElseThrow(() -> new EntityNotFoundException("Zanr", genreId));
        final List<BookEntity> books = bookRepository.findByGenresAndInStockTrue(genre);
        return mapper.mapToDtos(books);
    }

    @Override
    @Transactional
    public BookResponseDto save(BookRequestDto dto) {
        if (bookRepository.existsByISBN(dto.getISBN()))
            throw new EntityAlreadyExistsException("Knjiga sa unetim ISBN brojem vec postoji.");
        final BookEntity bookToSave = mapper.mapToEntity(dto);
        final BookEntity savedBook = bookRepository.save(bookToSave);
        this.bookStorageAPI.createBookStorageItem(new StorageItemRequestDto(savedBook.getId(), dto.getPiecesAvailable(), savedBook.isInStock()));
        return mapper.mapToDto(savedBook);
    }

    @Override
    @Transactional
    public BookResponseDto delete(Long id) {
        final BookEntity bookToDelete = bookRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Knjiga", id));
        bookToDelete.setInStock(false);
        final BookEntity deletedBook = bookRepository.save(bookToDelete);
        this.bookStorageAPI.deleteBookStorageItem(id);
        return mapper.mapToDto(deletedBook);
    }

    @Override
    @Transactional
    public BookResponseDto update(Long id, BookRequestDto dto) {
        final BookEntity bookToUpdate = bookRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Knjiga", id));
        if (bookRepository.existsByISBN(dto.getISBN()) && !dto.getISBN().equals(bookToUpdate.getISBN()))
            throw new EntityAlreadyExistsException("Knjiga sa unetim ISBN brojem vec postoji.");
        updateBook(bookToUpdate, dto);
        final BookEntity updatedBook = bookRepository.save(bookToUpdate);
        this.bookStorageAPI.updatePiecesAvailable(updatedBook.getId(), new StorageItemRequestDto(id, dto.getPiecesAvailable(), dto.isInStock()));
        return mapper.mapToDto(updatedBook);
    }

    @Override
    public List<BookResponseDto> getBestsellers(List<Long> bookIds) {
        final List<BookEntity> books = new ArrayList<>(bookIds.size());
        for (Long bookId : bookIds) {
            if (!bookRepository.existsById(bookId))
                continue;
            final BookEntity book = bookRepository.findById(bookId).orElse(new BookEntity());
            books.add(book);
        }
        return mapper.mapToDtos(books);
    }

    @Override
    public List<BookResponseDto> getByIds(List<Long> bookIds) {
        final List<BookEntity> books = bookRepository.findByIdIn(bookIds);
        return mapper.mapToDtos(books);
    }

    private void updateBook(BookEntity bookEntity, BookRequestDto dto) {
        bookEntity.setISBN(dto.getISBN());
        bookEntity.setTitle(dto.getTitle());
        bookEntity.setPrice(dto.getPrice());
        bookEntity.setNumberOfPages(dto.getNumberOfPages());
        bookEntity.setBinding(dto.getBinding());
        bookEntity.setPublicationYear(dto.getPublicationYear());
        bookEntity.setDescription(dto.getDescription());
        bookEntity.setImageUrl(dto.getImageUrl());
        bookEntity.setInStock(dto.isInStock());
//      pieces available changing

        final PublisherEntity publisher = this.publisherRepository.findById(dto.getPublisherId()).orElseThrow(() -> new EntityNotFoundException("Izdavac", dto.getPublisherId()));
        bookEntity.setPublisher(publisher);

        bookEntity.removeGenres();
        if (dto.getGenresIds() != null) {
            for (Long genreId : dto.getGenresIds()) {
                final GenreEntity genre = this.genreRepository.findById(genreId).orElseThrow(() -> new EntityNotFoundException("Zanr", genreId));
                bookEntity.addGenre(genre);
            }
        }

        bookEntity.removeAuthors();
        if (dto.getAuthorsIds() != null) {
            for (Long authorId : dto.getAuthorsIds()) {
                final AuthorEntity author = this.authorRepository.findById(authorId).orElseThrow(() -> new EntityNotFoundException("Autor", authorId));
                bookEntity.addAuthor(author);
            }
        }
    }

}
