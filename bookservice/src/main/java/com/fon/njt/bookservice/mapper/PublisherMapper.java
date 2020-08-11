package com.fon.njt.bookservice.mapper;

import com.fon.njt.bookservice.dto.request.PublisherRequestDto;
import com.fon.njt.bookservice.dto.response.PublisherResponseDto;
import com.fon.njt.bookservice.model.PublisherEntity;
import com.fon.njt.bookservice.repository.PublisherRepository;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class PublisherMapper {

    @Autowired
    private PublisherRepository repository;

    public abstract PublisherEntity mapToEntity(PublisherRequestDto dto);

    public abstract PublisherResponseDto mapToDto(PublisherEntity author);

    public abstract List<PublisherResponseDto> mapToDtos(List<PublisherEntity> authors);

    public PublisherEntity mapToEntity(Long publisherId) {
        if (publisherId == null)
            return null;
        return repository.findById(publisherId).get();
    }
}
