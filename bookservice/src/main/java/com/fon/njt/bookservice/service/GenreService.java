package com.fon.njt.bookservice.service;

import com.fon.njt.bookservice.dto.request.GenreRequestDto;
import com.fon.njt.bookservice.dto.response.GenreResponseDto;

import java.util.List;

public interface GenreService {
    List<GenreResponseDto> getAll();

    GenreResponseDto get(Long id);

    GenreResponseDto save(GenreRequestDto dto);

    GenreResponseDto update(Long id, GenreRequestDto dto);
}
