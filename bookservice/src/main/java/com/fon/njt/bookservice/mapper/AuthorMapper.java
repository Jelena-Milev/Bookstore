package com.fon.njt.bookservice.mapper;

import com.fon.njt.bookservice.dto.request.AuthorRequestDto;
import com.fon.njt.bookservice.dto.response.AuthorResponseDto;
import com.fon.njt.bookservice.model.AuthorEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AuthorMapper {

    AuthorEntity mapToEntity(AuthorRequestDto dto);

    AuthorResponseDto mapToDto(AuthorEntity author);

    List<AuthorResponseDto> mapToDtos(List<AuthorEntity> authors);
}
