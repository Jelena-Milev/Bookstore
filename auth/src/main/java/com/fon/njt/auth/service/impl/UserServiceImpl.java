package com.fon.njt.auth.service.impl;

import com.fon.njt.auth.dto.UserInfoDto;
import com.fon.njt.auth.dto.UserRegisterDto;
import com.fon.njt.auth.dto.UserVerificationDto;
import com.fon.njt.auth.entity.UserEntity;
import com.fon.njt.auth.exception.BadVerificationLinkException;
import com.fon.njt.auth.exception.EntityNotFoundException;
import com.fon.njt.auth.exception.UserAlreadyExistsException;
import com.fon.njt.auth.exception.VerificationLinkExpiredException;
import com.fon.njt.auth.mail.Mail;
import com.fon.njt.auth.mapper.UserMapper;
import com.fon.njt.auth.repository.UserRepository;
import com.fon.njt.auth.service.MailService;
import com.fon.njt.auth.service.UserService;
import freemarker.template.TemplateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private final BCryptPasswordEncoder encoder;
    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final MailService mailService;

    @Autowired
    public UserServiceImpl(BCryptPasswordEncoder encoder, UserMapper userMapper, UserRepository userRepository, MailService mailService) {
        this.encoder = encoder;
        this.userMapper = userMapper;
        this.userRepository = userRepository;
        this.mailService = mailService;
    }

    @Override
    public void register(UserRegisterDto userDto) throws MessagingException, IOException, TemplateException {
        if(userRepository.existsByUsername(userDto.getUsername()))
            throw new UserAlreadyExistsException("Nalog sa unetim mejlom vec postoji.");
        final UserEntity newUser = userMapper.mapToEntity(userDto);
        newUser.setIdentifier(UUID.randomUUID().toString());
        newUser.setRole("USER");
        newUser.setVerified(false);
        newUser.setVerificationDeadline(LocalDateTime.now().plusDays(1));
        newUser.setPassword(encoder.encode(newUser.getPassword()));
        this.sendVerificationMail(newUser.getIdentifier(), newUser.getUsername());
        userRepository.save(newUser);
    }

    private void sendVerificationMail(String identifier, String mailTo) throws MessagingException, IOException, TemplateException {
        final String verificationUrl = "http://localhost:8100/auth/verify-user/"+identifier;
        Mail mail = new Mail();
        mail.setTo(mailTo);
        mail.setFrom("noreply.bookstore0@gmail.com");
        mail.setSubject("Bookstore: Verification link for your account");
        Map model = new HashMap();
        model.put("link", verificationUrl);
        mail.setModel(model);
        this.mailService.sendVerificationMail(mail);
    }

    @Override
    public UserInfoDto getUserInfo(String id) {
        UserEntity user = userRepository.findByIdentifier(id).orElseThrow(() -> new EntityNotFoundException("Korisnik ne postoji."));
        UserInfoDto.UserInfoDtoBuilder userInfoDtoBuilder= UserInfoDto.builder();
        userInfoDtoBuilder.firstName(user.getFirstName())
                .lastName(user.getLastName())
                .streetNameAndNumber(user.getStreetNameAndNumber())
                .city(user.getCity())
                .zipCode(user.getZipCode())
                .phone(user.getPhone());
        return userInfoDtoBuilder.build();
    }

    @Override
    public void validateVerificationAttempt(String identifier) {
        UserEntity user = userRepository.findByIdentifier(identifier).orElseThrow(() -> new BadVerificationLinkException("Link za verifikaciju ne postoji."));
        if(user.isVerified()) throw new BadVerificationLinkException("Link za verifikaciju je iskoriscen.");
        if(user.getVerificationDeadline().isBefore(LocalDateTime.now())){
            userRepository.delete(user);
            throw new VerificationLinkExpiredException("Link za verifikaciju je istekao");
        }
    }

    @Override
    public void verifyUser(String identifier, UserVerificationDto userVerificationDto) {
        validateVerificationAttempt(identifier);
        UserEntity user = userRepository.findByIdentifier(identifier).get();
        updateUser(user, userVerificationDto);
        user.setVerified(true);
        user.setVerificationDeadline(null);
        userRepository.save(user);
    }

    private void updateUser(UserEntity user, UserVerificationDto userVerificationDto) {
        user.setFirstName(userVerificationDto.getFirstName());
        user.setLastName(userVerificationDto.getLastName());
        user.setStreetNameAndNumber(userVerificationDto.getStreetNameAndNumber());
        user.setZipCode(userVerificationDto.getZipCode());
        user.setCity(userVerificationDto.getCity());
        user.setPhone(userVerificationDto.getPhone());
    }
}
