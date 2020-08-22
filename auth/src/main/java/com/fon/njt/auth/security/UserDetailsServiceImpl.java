package com.fon.njt.auth.security;

import com.fon.njt.auth.entity.UserEntity;
import com.fon.njt.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service // It has to be annotated with @Service.
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        final UserEntity user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Username: "+username+" not found"));
        return new UserDetailsImpl(user);
    }
}


