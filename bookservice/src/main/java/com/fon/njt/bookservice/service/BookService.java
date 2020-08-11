package com.fon.njt.bookservice.service;

import com.fon.njt.bookservice.dto.request.BookRequestDto;
import com.fon.njt.bookservice.dto.response.BookResponseDto;

import java.util.List;

public interface BookService {
    List<BookResponseDto> getAll();

    BookResponseDto getById(Long id);

    List<BookResponseDto> filterBooks(String title, String author);

    List<BookResponseDto> filterByGenre(Long genreId);

    BookResponseDto save(BookRequestDto dto);

    BookResponseDto delete(Long id);
}
