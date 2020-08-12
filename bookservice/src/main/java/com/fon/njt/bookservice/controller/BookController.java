package com.fon.njt.bookservice.controller;

import com.fon.njt.bookservice.dto.request.BookRequestDto;
import com.fon.njt.bookservice.dto.response.BookResponseDto;
import com.fon.njt.bookservice.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(path = "books")
public class BookController {

    private final BookService service;

    @Autowired
    public BookController(BookService service) {
        this.service = service;
    }

    @GetMapping(path = "", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity getAll(){
        List<BookResponseDto> result = service.getAll();
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping(path = "{id}", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity get(@PathVariable final Long id){
        BookResponseDto result = service.getById(id);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping(path = "filter", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity filter(@RequestParam(required = false) final String title,
                                 @RequestParam(required = false) final String author,
                                 @RequestParam(required = false) final Long genreId){
        if (title == null && author == null & genreId == null) {
            return getAll();
        }
        if (genreId != null) {
            return filterByGenre(genreId);
        }
        List<BookResponseDto> result = service.filterBooks(title, author);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    private ResponseEntity<List<BookResponseDto>> filterByGenre(Long genreId){
        List<BookResponseDto> result = service.filterByGenre(genreId);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    //TODO
    @GetMapping(path = "best-sellers", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity get(@RequestParam(required = false) final Integer number){
        return null;
    }

    @PostMapping(path = "", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity save(@RequestBody @Valid final BookRequestDto dto){
        BookResponseDto result = service.save(dto);
        return new ResponseEntity(result, HttpStatus.CREATED);
    }

    //TODO
    @PutMapping(path = "{id}", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity update(@PathVariable final Long id, @RequestBody @Valid final BookRequestDto dto){
        BookResponseDto result = service.update(id, dto);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @DeleteMapping(path = "{id}", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity delete(@PathVariable final Long id){
        BookResponseDto result = service.delete(id);
        return new ResponseEntity(result, HttpStatus.OK);
    }
}
