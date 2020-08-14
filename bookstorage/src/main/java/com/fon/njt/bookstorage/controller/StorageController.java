package com.fon.njt.bookstorage.controller;

import com.fon.njt.bookstorage.dto.SoldItemRequestDto;
import com.fon.njt.bookstorage.dto.StorageItemRequestDto;
import com.fon.njt.bookstorage.dto.StorageItemResponseDto;
import com.fon.njt.bookstorage.model.StorageItemEntity;
import com.fon.njt.bookstorage.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(path = "items")
public class StorageController {

    private final StorageService service;

    @Autowired
    public StorageController(StorageService service) {
        this.service = service;
    }

    @GetMapping(path = "bestsellers", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity getBestsellers(@RequestParam(required = false) final Integer numberOfBestsellers){
        Integer numberOfBooks = numberOfBestsellers;
        if (numberOfBooks == null) {
            numberOfBooks = new Integer(10);
        }
        final List<Long> result = service.getBestsellersIds(numberOfBooks);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PostMapping(path = "", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity saveBookItem(@RequestBody @Valid final StorageItemRequestDto dto){
        final StorageItemResponseDto result = service.save(dto);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PatchMapping(path = "{id}/pieces-available", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity updateBookPiecesAvailable(@PathVariable final Long id, @RequestBody @Valid final StorageItemRequestDto dto){
        final StorageItemResponseDto result = service.updatePiecesAvailable(id, dto);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PatchMapping(path = "pieces-sold/bulk", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity updateBooksSold(@RequestBody @NotEmpty(message = "Sold books list cannot be empty.") final List<@Valid SoldItemRequestDto> itemsSoldDtos){
        final List<StorageItemResponseDto> result = service.updatePiecesSold(itemsSoldDtos);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @DeleteMapping(path = "{id}", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity delete(@PathVariable final Long id){
        final StorageItemResponseDto result = service.delete(id);
        return new ResponseEntity(result, HttpStatus.OK);
    }
}
