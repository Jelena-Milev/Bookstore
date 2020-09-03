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

    //    private String email;

    @NotBlank(message = "Korisnicki nalog mora imati ime.")
    private String firstName;

    @NotBlank(message = "Korisnicki nalog mora imati prezime.")
    private String lastName;

    @NotBlank(message = "Korisnicki nalog mora imati ulicu i broj.")
    private String streetNameAndNumber;

    @NotBlank(message = "Korisnicki nalog mora imati broj telefona.")
    private String phone;

    @NotBlank(message = "Korisnicki nalog mora imati postanski broj.")
    private String zipCode;

    @NotBlank(message = "Korisnicki nalog mora imati opstinu.")
    private String city;
}
