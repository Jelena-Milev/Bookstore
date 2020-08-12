package com.fon.njt.bookservice.mapper;

import com.fon.njt.bookservice.dto.request.GenreRequestDto;
import com.fon.njt.bookservice.dto.response.GenreResponseDto;
import com.fon.njt.bookservice.exception.EntityNotFoundException;
import com.fon.njt.bookservice.model.GenreEntity;
import com.fon.njt.bookservice.repository.GenreRepository;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring")
public abstract class GenreMapper {

    @Autowired
    private GenreRepository repository;

    public abstract GenreEntity mapToEntity(GenreRequestDto dto);

    public abstract GenreResponseDto mapToDto(GenreEntity genre);

    public abstract List<GenreResponseDto> mapToDtos(List<GenreEntity> genres);

    public GenreEntity mapToEntity(Long genreId){
        if(genreId == null){
            return null;
        }
        return repository.findById(genreId).orElseThrow(()->new EntityNotFoundException("Genre", genreId));
    }

    public abstract Set<GenreEntity> mapToEntities(List<Long> genresIds);
}
