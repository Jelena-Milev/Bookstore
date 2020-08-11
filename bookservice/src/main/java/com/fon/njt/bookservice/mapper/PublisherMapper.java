package com.fon.njt.bookservice.mapper;

import com.fon.njt.bookservice.dto.request.PublisherRequestDto;
import com.fon.njt.bookservice.dto.response.PublisherResponseDto;
import com.fon.njt.bookservice.model.PublisherEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PublisherMapper {

    PublisherEntity mapToEntity(PublisherRequestDto dto);

    PublisherResponseDto mapToDto(PublisherEntity author);

    List<PublisherResponseDto> mapToDtos(List<PublisherEntity> authors);
}
