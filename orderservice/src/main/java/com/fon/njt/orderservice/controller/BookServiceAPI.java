package com.fon.njt.orderservice.controller;

import com.fon.njt.orderservice.dto.book.BookResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@FeignClient(name="books-service")
public interface BookServiceAPI {

    @GetMapping(path = "books/bulk", produces = APPLICATION_JSON_VALUE)
    List<BookResponseDto> getBooksInBulk(@RequestBody final List<Long> bookIds);
}
