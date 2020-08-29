package com.fon.njt.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class UserInfoDto {
    private String firstName;
    private String lastName;
    private String streetNameAndNumber;
    private String phone;
    private String zipCode;
    private String city;
}
