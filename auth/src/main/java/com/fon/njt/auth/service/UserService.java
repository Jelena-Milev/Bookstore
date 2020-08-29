package com.fon.njt.auth.service;

import com.fon.njt.auth.dto.UserInfoDto;
import com.fon.njt.auth.dto.UserRegisterDto;

public interface UserService {
    void register(UserRegisterDto userDto);

    UserInfoDto getUserInfo(String id);
}
