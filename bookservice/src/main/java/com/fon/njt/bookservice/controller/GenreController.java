package com.fon.njt.bookservice.controller;

import com.fon.njt.bookservice.dto.request.GenreRequestDto;
import com.fon.njt.bookservice.dto.response.GenreResponseDto;
import com.fon.njt.bookservice.service.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(path = "genres")
public class GenreController {

    private final GenreService service;

    @Autowired
    public GenreController(GenreService service) {
        this.service = service;
    }

    @GetMapping(path="", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity getAll(){
        final List<GenreResponseDto> result = this.service.getAll();
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping(path = "{id}", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity get(@PathVariable final Long id){
        final GenreResponseDto result = this.service.get(id);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PostMapping(path="", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity add(@RequestBody @Valid final GenreRequestDto dto){
        final GenreResponseDto result = this.service.save(dto);
        return new ResponseEntity(result, HttpStatus.CREATED);
    }

    @PutMapping(path = "{id}", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity update(@PathVariable final Long id, @RequestBody @Valid final GenreRequestDto dto){
        GenreResponseDto result = service.update(id, dto);
        return new ResponseEntity(result, HttpStatus.OK);
    }
}
