package com.fon.njt.bookservice.service.impl;

import com.fon.njt.bookservice.dto.request.PublisherRequestDto;
import com.fon.njt.bookservice.dto.response.PublisherResponseDto;
import com.fon.njt.bookservice.exception.EntityAlreadyExistsException;
import com.fon.njt.bookservice.exception.EntityNotFoundException;
import com.fon.njt.bookservice.mapper.PublisherMapper;
import com.fon.njt.bookservice.model.PublisherEntity;
import com.fon.njt.bookservice.repository.PublisherRepository;
import com.fon.njt.bookservice.service.PublisherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PublisherServiceImpl implements PublisherService {

    private final PublisherRepository repository;
    private final PublisherMapper mapper;

    @Autowired
    public PublisherServiceImpl(PublisherRepository repository, PublisherMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public List<PublisherResponseDto> getAll() {
        List<PublisherEntity> publishers = repository.findAllByOrderByNameAsc();
        return mapper.mapToDtos(publishers);
    }

    @Override
    public PublisherResponseDto get(Long id) {
        PublisherEntity publisher = repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Izdavac", id));
        return mapper.mapToDto(publisher);
    }

    @Override
    public PublisherResponseDto save(PublisherRequestDto dto) {
        if(repository.existsByName(dto.getName()))
            throw new EntityAlreadyExistsException("Izdavac sa unetim nazivom vec postoji.");
        final PublisherEntity publisherToSave = mapper.mapToEntity(dto);
        final PublisherEntity savedPublisher = repository.save(publisherToSave);
        return mapper.mapToDto(savedPublisher);
    }
}
