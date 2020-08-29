package com.fon.njt.orderservice.controller;

import com.fon.njt.orderservice.dto.book.BookResponseDto;
import com.fon.njt.orderservice.dto.user.UserInfoDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@FeignClient(name="auth-service")
public interface AuthServiceAPI {

    @GetMapping(path = "/bulk", produces = APPLICATION_JSON_VALUE)
    List<BookResponseDto> getBooksInBulk(@RequestBody final List<Long> bookIds);

    @GetMapping(path = "user-info/{id}", produces = APPLICATION_JSON_VALUE)
    UserInfoDto getUserInfo(@PathVariable final String id);
}
