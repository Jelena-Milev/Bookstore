package com.fon.njt.auth.service.impl;

import com.fon.njt.auth.dto.UserRegisterDto;
import com.fon.njt.auth.entity.UserEntity;
import com.fon.njt.auth.exception.UserAlreadyExistsException;
import com.fon.njt.auth.mapper.UserMapper;
import com.fon.njt.auth.repository.UserRepository;
import com.fon.njt.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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
        newUser.setRole("USER");
        newUser.setPassword(encoder.encode(newUser.getPassword()));
        userRepository.save(newUser);
    }
}
