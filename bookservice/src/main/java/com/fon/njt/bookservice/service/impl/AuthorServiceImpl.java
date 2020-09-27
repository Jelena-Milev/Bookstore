package com.fon.njt.bookservice.service.impl;

import com.fon.njt.bookservice.dto.request.AuthorRequestDto;
import com.fon.njt.bookservice.dto.response.AuthorResponseDto;
import com.fon.njt.bookservice.exception.EntityAlreadyExistsException;
import com.fon.njt.bookservice.exception.EntityNotFoundException;
import com.fon.njt.bookservice.mapper.AuthorMapper;
import com.fon.njt.bookservice.model.AuthorEntity;
import com.fon.njt.bookservice.model.GenreEntity;
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
        List<AuthorEntity> authors = repository.findAllByOrderByFirstNameAscLastNameAsc();
        return mapper.mapToDtos(authors);
    }

    @Override
    public AuthorResponseDto get(Long id) {
        AuthorEntity author = repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Autor", id));
        return mapper.mapToDto(author);
    }

    @Override
    public AuthorResponseDto save(AuthorRequestDto dto) {
        if (repository.existsByFirstNameAndLastName(dto.getFirstName(), dto.getLastName()))
            throw new EntityAlreadyExistsException("Autor sa unetim imenom i prezimenom već postoji.");
        final AuthorEntity authorToSave = mapper.mapToEntity(dto);
        final AuthorEntity savedAuthor = repository.save(authorToSave);
        return mapper.mapToDto(savedAuthor);
    }

    @Override
    public AuthorResponseDto update(Long id, AuthorRequestDto dto) {
        final AuthorEntity authorToUpdate = repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Autor", id));
        if (repository.existsByFirstNameAndLastName(dto.getFirstName(), dto.getLastName()) && !dto.getFirstName().toLowerCase().equals(authorToUpdate.getFirstName().toLowerCase())
                && !dto.getLastName().toLowerCase().equals(authorToUpdate.getLastName().toLowerCase()))
            throw new EntityAlreadyExistsException("Autor sa unetim imenom i prezimenom već postoji.");
        updateAuthor(authorToUpdate, dto);
        final AuthorEntity updatedAuthor = repository.save(authorToUpdate);
        return mapper.mapToDto(updatedAuthor);
    }

    private void updateAuthor(AuthorEntity authorToUpdate, AuthorRequestDto dto) {
        authorToUpdate.setFirstName(dto.getFirstName());
        authorToUpdate.setLastName(dto.getLastName());
        authorToUpdate.setBiography(dto.getBiography());
        authorToUpdate.setImageUrl(dto.getImageUrl());
    }
}
