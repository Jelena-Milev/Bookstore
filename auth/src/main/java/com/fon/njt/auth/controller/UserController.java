package com.fon.njt.auth.controller;

import com.fon.njt.auth.dto.UserInfoDto;
import com.fon.njt.auth.dto.UserRegisterDto;
import com.fon.njt.auth.dto.UserVerificationDto;
import com.fon.njt.auth.mapper.UserMapper;
import com.fon.njt.auth.repository.UserRepository;
import com.fon.njt.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping()
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(path = "user-info/{id}", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity getUserInfo(@PathVariable final String id){
        UserInfoDto result = userService.getUserInfo(id);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PostMapping(path = "register", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity register(@RequestBody @Valid final UserRegisterDto userDto){
        userService.register(userDto);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping(path = "verification/{id}")
    public ResponseEntity validateVerificationAttempt(@PathVariable("id") final String identifier){
        userService.validateVerificationAttempt(identifier);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping(path = "verification/{id}", consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity verifyUser(@PathVariable("id") final String identifier, @RequestBody @Valid final UserVerificationDto userVerificationDto){
        userService.verifyUser(identifier, userVerificationDto);
        return new ResponseEntity(HttpStatus.OK);
    }
}
