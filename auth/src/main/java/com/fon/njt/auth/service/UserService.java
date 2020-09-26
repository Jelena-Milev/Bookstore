package com.fon.njt.auth.service;

import com.fon.njt.auth.dto.UserInfoDto;
import com.fon.njt.auth.dto.UserRegisterDto;
import com.fon.njt.auth.dto.UserVerificationDto;
import freemarker.template.TemplateException;

import javax.mail.MessagingException;
import java.io.IOException;

public interface UserService {
    void register(UserRegisterDto userDto) throws MessagingException, IOException, TemplateException;

    UserInfoDto getUserInfo(String id);

    void validateVerificationAttempt(String identifier);

    void verifyUser(String identifier, UserVerificationDto userVerificationDto);
}
