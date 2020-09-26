package com.fon.njt.auth.controller;

import com.fon.njt.auth.dto.UserInfoDto;
import com.fon.njt.auth.dto.UserRegisterDto;
import com.fon.njt.auth.dto.UserVerificationDto;
import com.fon.njt.auth.mail.Mail;
import com.fon.njt.auth.service.impl.MailServiceImpl;
import com.fon.njt.auth.service.UserService;
import freemarker.template.TemplateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping()
public class UserController {

    private final UserService userService;
    private final MailServiceImpl mailService;

    @Autowired
    public UserController(UserService userService, MailServiceImpl mailService) {
        this.userService = userService;
        this.mailService = mailService;
    }

    @GetMapping(path = "user-info/{id}", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity getUserInfo(@PathVariable final String id){
        UserInfoDto result = userService.getUserInfo(id);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PostMapping(path = "register", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity register(@RequestBody @Valid final UserRegisterDto userDto) throws MessagingException, IOException, TemplateException {
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

    @PostMapping(path="register/send-mail", consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity sendMail(@RequestBody final String mailTo) throws MessagingException, IOException, TemplateException {
        Mail mail = new Mail();
        mail.setTo(mailTo);
        mail.setFrom("bookstore@no-reply.com");
        mail.setSubject("Bookstore: Verification link for your account");

        Map model = new HashMap();
        model.put("link", "https://fonis.rs");
        mail.setModel(model);

        this.mailService.sendVerificationMail(mail);
        return new ResponseEntity(HttpStatus.OK);
    }
}
