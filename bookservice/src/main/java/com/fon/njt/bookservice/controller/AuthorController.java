package com.fon.njt.bookservice.controller;

import com.fon.njt.bookservice.dto.request.AuthorRequestDto;
import com.fon.njt.bookservice.dto.response.AuthorResponseDto;
import com.fon.njt.bookservice.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(path = "authors")
public class AuthorController {

    private final AuthorService service;

    @Autowired
    public AuthorController(AuthorService service) {
        this.service = service;
    }

    @GetMapping(path="", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity getAll(){
        final List<AuthorResponseDto> result = this.service.getAll();
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping(path = "{id}", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity get(@PathVariable final Long id){
        final AuthorResponseDto result = this.service.get(id);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PostMapping(path="", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity add(@RequestBody @Valid final AuthorRequestDto dto){
        final AuthorResponseDto result = this.service.save(dto);
        return new ResponseEntity(result, HttpStatus.CREATED);
    }
}
