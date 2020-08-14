package com.fon.njt.bookservice.controller;

import com.fon.njt.bookservice.dto.request.StorageItemRequestDto;
import com.fon.njt.bookservice.dto.response.StorageItemResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@FeignClient(name="booksStorage-service")
public interface BookStorageAPI {

    @GetMapping(path = "items/bestsellers", produces = APPLICATION_JSON_VALUE)
    List<Long> getBestsellersIds(@RequestParam(required = false) final Integer numberOfBestsellers);

    @PostMapping(path = "items", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    StorageItemResponseDto createBookStorageItem(@RequestBody final StorageItemRequestDto dto);

    @RequestMapping(method = RequestMethod.PATCH, path = "items/{id}/pieces-available", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    StorageItemResponseDto updatePiecesAvailable(@PathVariable final Long id, @RequestBody final StorageItemRequestDto dto);

    @DeleteMapping(path = "items/{id}", produces = APPLICATION_JSON_VALUE)
    StorageItemResponseDto deleteBookStorageItem(@PathVariable final Long id);
}
