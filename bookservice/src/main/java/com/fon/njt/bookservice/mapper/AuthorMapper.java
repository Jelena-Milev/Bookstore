package com.fon.njt.bookservice.mapper;

import com.fon.njt.bookservice.dto.request.AuthorRequestDto;
import com.fon.njt.bookservice.dto.response.AuthorResponseDto;
import com.fon.njt.bookservice.model.AuthorEntity;
import com.fon.njt.bookservice.repository.AuthorRepository;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring")
public abstract class AuthorMapper {

    @Autowired
    private AuthorRepository repository;

    public abstract AuthorEntity mapToEntity(AuthorRequestDto dto);

    public abstract AuthorResponseDto mapToDto(AuthorEntity author);

    public abstract List<AuthorResponseDto> mapToDtos(List<AuthorEntity> authors);

    public AuthorEntity mapToEntity(Long authorId) {
        if (authorId == null)
            return null;
        return repository.findById(authorId).get();
    }

    public abstract Set<AuthorEntity> mapToEntities(List<Long> authorsIds);
}
