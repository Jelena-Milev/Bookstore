package com.fon.njt.auth.service;

import com.fon.njt.auth.dto.UserInfoDto;
import com.fon.njt.auth.dto.UserRegisterDto;
import com.fon.njt.auth.dto.UserVerificationDto;

public interface UserService {
    void register(UserRegisterDto userDto);

    UserInfoDto getUserInfo(String id);

    void validateVerificationAttempt(String identifier);

    void verifyUser(String identifier, UserVerificationDto userVerificationDto);
}
