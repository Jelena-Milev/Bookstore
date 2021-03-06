package com.fon.njt.bookservice.service;

import com.fon.njt.bookservice.dto.request.BookRequestDto;
import com.fon.njt.bookservice.dto.response.BookResponseDto;

import java.util.List;

public interface BookService {
    List<BookResponseDto> getAll();

    List<BookResponseDto> getAllInStock();

    BookResponseDto getById(Long id);

    List<BookResponseDto> filterBooks(String title, String author);

    List<BookResponseDto> filterByGenre(Long genreId);

    BookResponseDto save(BookRequestDto dto);

    BookResponseDto delete(Long id);

    BookResponseDto update(Long id, BookRequestDto dto);

    List<BookResponseDto> getBestsellers(List<Long> bookIds);

    List<BookResponseDto> getByIds(List<Long> bookIds);

}
