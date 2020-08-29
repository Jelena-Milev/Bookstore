package com.fon.njt.auth.service.impl;

import com.fon.njt.auth.dto.UserInfoDto;
import com.fon.njt.auth.dto.UserRegisterDto;
import com.fon.njt.auth.entity.UserEntity;
import com.fon.njt.auth.exception.EntityNotFoundException;
import com.fon.njt.auth.exception.UserAlreadyExistsException;
import com.fon.njt.auth.mapper.UserMapper;
import com.fon.njt.auth.repository.UserRepository;
import com.fon.njt.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {


    private final BCryptPasswordEncoder encoder;
    private final UserMapper userMapper;
    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(BCryptPasswordEncoder encoder, UserMapper userMapper, UserRepository userRepository) {
        this.encoder = encoder;
        this.userMapper = userMapper;
        this.userRepository = userRepository;
    }

    @Override
    public void register(UserRegisterDto userDto) {
        if(userRepository.existsByUsername(userDto.getUsername()))
            throw new UserAlreadyExistsException("User with username "+userDto.getUsername()+" already exists");
        final UserEntity newUser = userMapper.mapToEntity(userDto);
        newUser.setIdentifier(UUID.randomUUID().toString());
        newUser.setRole("USER");
        newUser.setPassword(encoder.encode(newUser.getPassword()));
        userRepository.save(newUser);
    }

    @Override
    public UserInfoDto getUserInfo(String id) {
        UserEntity user = userRepository.findByIdentifier(id).orElseThrow(() -> new EntityNotFoundException("User", id));
        UserInfoDto.UserInfoDtoBuilder userInfoDtoBuilder= UserInfoDto.builder();
        userInfoDtoBuilder.firstName(user.getFirstName())
                .lastName(user.getLastName())
                .streetNameAndNumber(user.getStreetNameAndNumber())
                .city(user.getCity())
                .zipCode(user.getZipCode())
                .phone(user.getPhone());
        return userInfoDtoBuilder.build();
    }
}
