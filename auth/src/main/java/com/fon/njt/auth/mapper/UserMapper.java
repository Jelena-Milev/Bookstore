package com.fon.njt.auth.mapper;

import com.fon.njt.auth.dto.UserRegisterDto;
import com.fon.njt.auth.entity.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserEntity mapToEntity(UserRegisterDto userDto);
}
