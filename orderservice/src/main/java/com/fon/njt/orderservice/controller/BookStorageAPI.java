package com.fon.njt.orderservice.controller;

import com.fon.njt.orderservice.dto.storage.SoldItemRequestDto;
import com.fon.njt.orderservice.dto.storage.StorageItemResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@FeignClient(name="storage-service")
public interface BookStorageAPI {

    @RequestMapping(method = RequestMethod.PATCH, path = "items/pieces-sold/bulk", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    List<StorageItemResponseDto> updateBooksSold(@RequestBody final List<SoldItemRequestDto> itemsSoldDtos);

    @GetMapping(path = "items/bulk", produces = APPLICATION_JSON_VALUE)
    List<StorageItemResponseDto> getStorageItemsInBulk(@RequestBody final List<Long> bookIds);
}