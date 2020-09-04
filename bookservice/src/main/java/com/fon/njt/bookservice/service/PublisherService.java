package com.fon.njt.bookservice.service;

import com.fon.njt.bookservice.dto.request.PublisherRequestDto;
import com.fon.njt.bookservice.dto.response.PublisherResponseDto;

import java.util.List;

public interface PublisherService {
    List<PublisherResponseDto> getAll();

    PublisherResponseDto get(Long id);

    PublisherResponseDto save(PublisherRequestDto dto);

    PublisherResponseDto update(Long id, PublisherRequestDto dto);
}
