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

    @NotBlank(message = "Korisnicki nalog mora imati email.")
    private String username;

    @NotBlank(message = "Korisnicki nalog mora imati lozinku.")
    private String password;
}
