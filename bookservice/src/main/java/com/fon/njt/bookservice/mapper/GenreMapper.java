package com.fon.njt.bookservice.mapper;

import com.fon.njt.bookservice.dto.request.GenreRequestDto;
import com.fon.njt.bookservice.dto.response.GenreResponseDto;
import com.fon.njt.bookservice.model.GenreEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface GenreMapper {

    GenreEntity mapToEntity(GenreRequestDto dto);

    GenreResponseDto mapToDto(GenreEntity genre);

    List<GenreResponseDto> mapToDtos(List<GenreEntity> genres);
}
