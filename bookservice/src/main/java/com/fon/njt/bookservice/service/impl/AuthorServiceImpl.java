package com.fon.njt.bookservice.service.impl;

import com.fon.njt.bookservice.dto.request.AuthorRequestDto;
import com.fon.njt.bookservice.dto.response.AuthorResponseDto;
import com.fon.njt.bookservice.mapper.AuthorMapper;
import com.fon.njt.bookservice.model.AuthorEntity;
import com.fon.njt.bookservice.repository.AuthorRepository;
import com.fon.njt.bookservice.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorServiceImpl implements AuthorService {

    private final AuthorRepository repository;
    private final AuthorMapper mapper;

    @Autowired
    public AuthorServiceImpl(AuthorRepository repository, AuthorMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public List<AuthorResponseDto> getAll() {
        List<AuthorEntity> authors = repository.findAll();
        return mapper.mapToDtos(authors);
    }

    @Override
    public AuthorResponseDto get(Long id) {
        AuthorEntity author = repository.findById(id).get();
        return mapper.mapToDto(author);
    }

    @Override
    public AuthorResponseDto save(AuthorRequestDto dto) {
        final AuthorEntity authorToSave = mapper.mapToEntity(dto);
        final AuthorEntity savedAuthor = repository.save(authorToSave);
        return mapper.mapToDto(savedAuthor);
    }
}
