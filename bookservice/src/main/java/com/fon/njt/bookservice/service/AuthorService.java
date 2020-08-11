package com.fon.njt.bookservice.service;

import com.fon.njt.bookservice.dto.request.AuthorRequestDto;
import com.fon.njt.bookservice.dto.response.AuthorResponseDto;

import java.util.List;

public interface AuthorService {
    List<AuthorResponseDto> getAll();

    AuthorResponseDto get(Long id);

    AuthorResponseDto save(AuthorRequestDto dto);
}
