package com.fon.njt.bookservice.mapper;

import com.fon.njt.bookservice.dto.request.BookRequestDto;
import com.fon.njt.bookservice.dto.response.BookResponseDto;
import com.fon.njt.bookservice.model.BookEntity;
import org.mapstruct.CollectionMappingStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(uses = {PublisherMapper.class,
        AuthorMapper.class,
        GenreMapper.class},
        componentModel = "spring", collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED)
public abstract class BookMapper {

    @Mapping(source = "dto.publisherId", target = "publisher")
    @Mapping(source = "dto.authorsIds", target = "authors")
    @Mapping(source = "dto.genresIds", target = "genres")
    public abstract BookEntity mapToEntity(BookRequestDto dto);

    public abstract BookResponseDto mapToDto(BookEntity book);

    public abstract List<BookResponseDto> mapToDtos(List<BookEntity> books);
}
