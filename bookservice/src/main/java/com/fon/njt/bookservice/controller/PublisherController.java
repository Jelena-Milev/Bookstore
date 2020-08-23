package com.fon.njt.bookservice.controller;

import com.fon.njt.bookservice.dto.request.PublisherRequestDto;
import com.fon.njt.bookservice.dto.response.PublisherResponseDto;
import com.fon.njt.bookservice.service.PublisherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@CrossOrigin()
@RequestMapping(path = "publishers")
public class PublisherController {

    private final PublisherService service;

    @Autowired
    public PublisherController(PublisherService service) {
        this.service = service;
    }

    @GetMapping(path="", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity getAll(){
        final List<PublisherResponseDto> result = this.service.getAll();
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping(path = "{id}", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity get(@PathVariable final Long id){
        final PublisherResponseDto result = this.service.get(id);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PostMapping(path="", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity add(@RequestBody @Valid final PublisherRequestDto dto){
        final PublisherResponseDto result = this.service.save(dto);
        return new ResponseEntity(result, HttpStatus.CREATED);
    }
}
