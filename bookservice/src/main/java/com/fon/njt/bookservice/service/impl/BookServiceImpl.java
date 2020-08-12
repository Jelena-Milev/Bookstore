package com.fon.njt.bookservice.service.impl;

import com.fon.njt.bookservice.dto.request.BookRequestDto;
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

import java.util.LinkedList;
import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final GenreRepository genreRepository;
    private final PublisherRepository publisherRepository;
    private final BookMapper mapper;

    @Autowired
    public BookServiceImpl(BookRepository bookRepository, AuthorRepository authorRepository, GenreRepository genreRepository, PublisherRepository publisherRepository, BookMapper mapper) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.genreRepository = genreRepository;
        this.publisherRepository = publisherRepository;
        this.mapper = mapper;
    }

    @Override
    public List<BookResponseDto> getAll() {
        final List<BookEntity> books = bookRepository.findAllByInStockTrue();
        return mapper.mapToDtos(books);
    }

    @Override
    public BookResponseDto getById(Long id) {
        final BookEntity book = bookRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Book", id));
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
        final GenreEntity genre = genreRepository.findById(genreId).orElseThrow(() -> new EntityNotFoundException("Genre", genreId));
        final List<BookEntity> books = bookRepository.findByGenresAndInStockTrue(genre);
        return mapper.mapToDtos(books);
    }

    @Override
    public BookResponseDto save(BookRequestDto dto) {
        if(bookRepository.existsByISBN(dto.getISBN()))
            throw new EntityAlreadyExistsException("Book");
        final BookEntity bookToSave = mapper.mapToEntity(dto);
        final BookEntity savedBook = bookRepository.save(bookToSave);
        return mapper.mapToDto(savedBook);
    }

    @Override
    public BookResponseDto delete(Long id) {
        final BookEntity bookToDelete = bookRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Book", id));
        bookToDelete.setInStock(false);
        final BookEntity deletedBook = bookRepository.save(bookToDelete);
        return mapper.mapToDto(deletedBook);
    }

    @Override
    public BookResponseDto update(Long id, BookRequestDto dto) {
        final BookEntity bookToUpdate = bookRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Book", id));
        updateBook(bookToUpdate, dto);
        final BookEntity updatedBook = bookRepository.save(bookToUpdate);
        return mapper.mapToDto(updatedBook);
    }

    @Override
    public List<BookResponseDto> getByIds(List<Long> bookIds) {
        final List<BookEntity> books = bookRepository.findByIdIn(bookIds);
        return mapper.mapToDtos(books);
    }

    private void updateBook(BookEntity bookEntity, BookRequestDto dto) {
        bookEntity.setISBN( dto.getISBN() );
        bookEntity.setTitle( dto.getTitle() );
        bookEntity.setPrice( dto.getPrice() );
        bookEntity.setNumberOfPages( dto.getNumberOfPages() );
        bookEntity.setBinding( dto.getBinding() );
        bookEntity.setPublicationYear( dto.getPublicationYear() );
        bookEntity.setDescription( dto.getDescription() );
        bookEntity.setInStock( dto.isInStock() );

        final PublisherEntity publisher = this.publisherRepository.findById(dto.getPublisherId()).orElseThrow(()->new EntityNotFoundException("Publisher", dto.getPublisherId()));
        bookEntity.setPublisher(publisher);

        bookEntity.removeGenres();
        if ( dto.getGenresIds() != null ) {
            for ( Long genreId : dto.getGenresIds() ) {
                final GenreEntity genre = this.genreRepository.findById(genreId).orElseThrow(()->new EntityNotFoundException("Genre", genreId));
                bookEntity.addGenre( genre );
            }
        }

        bookEntity.removeAuthors();
        if ( dto.getAuthorsIds() != null ) {
            for ( Long authorId : dto.getAuthorsIds() ) {
                final AuthorEntity author = this.authorRepository.findById(authorId).orElseThrow(()->new EntityNotFoundException("Author", authorId));
                bookEntity.addAuthor(author);
            }
        }
    }

}
