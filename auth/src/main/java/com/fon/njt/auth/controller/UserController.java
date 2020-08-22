package com.fon.njt.auth.controller;

import com.fon.njt.auth.dto.UserRegisterDto;
import com.fon.njt.auth.mapper.UserMapper;
import com.fon.njt.auth.repository.UserRepository;
import com.fon.njt.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("register")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity register(@RequestBody @Valid final UserRegisterDto userDto){
        userService.register(userDto);
        return new ResponseEntity(HttpStatus.OK);
    }
}
