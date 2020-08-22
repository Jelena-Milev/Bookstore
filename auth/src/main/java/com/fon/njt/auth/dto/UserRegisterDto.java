package com.fon.njt.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class UserRegisterDto {

    @NotBlank(message = "Username must not be blank")
    private String username;

    @NotBlank(message = "Password must not be blank")
    private String password;

    //    private String email;

    @NotBlank(message = "First name must not be blank")
    private String firstName;

    @NotBlank(message = "Last name must not be blank")
    private String lastName;

    @NotBlank(message = "Street name and number must not be blank")
    private String streetNameAndNumber;

    @NotBlank(message = "Phone must not be blank")
    private String phone;

    @NotBlank(message = "Zip code must not be blank")
    private String zipCode;

    @NotBlank(message = "City must not be blank")
    private String city;
}
