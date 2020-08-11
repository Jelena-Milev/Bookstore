package com.fon.njt.bookservice.service.impl;

import com.fon.njt.bookservice.dto.request.GenreRequestDto;
import com.fon.njt.bookservice.dto.response.GenreResponseDto;
import com.fon.njt.bookservice.mapper.GenreMapper;
import com.fon.njt.bookservice.model.GenreEntity;
import com.fon.njt.bookservice.repository.GenreRepository;
import com.fon.njt.bookservice.service.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenreServiceImpl implements GenreService {

    private final GenreRepository repository;
    private final GenreMapper mapper;

    @Autowired
    public GenreServiceImpl(GenreRepository repository, GenreMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public List<GenreResponseDto> getAll() {
        List<GenreEntity> genres = repository.findAll();
        return mapper.mapToDtos(genres);
    }

    @Override
    public GenreResponseDto get(Long id) {
        GenreEntity genre = repository.findById(id).get();
        return mapper.mapToDto(genre);
    }

    @Override
    public GenreResponseDto save(GenreRequestDto dto) {
        final GenreEntity genreToSave = mapper.mapToEntity(dto);
        final GenreEntity savedGenre = repository.save(genreToSave);
        return mapper.mapToDto(savedGenre);
    }
}
