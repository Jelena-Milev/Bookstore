package com.fon.njt.bookservice.dto.request;

import lombok.*;

import javax.validation.constraints.NotBlank;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class AuthorRequestDto {

    @NotBlank(message = "Autor mora imati ime.")
    private String firstName;
    @NotBlank(message = "Autor mora imati prezime.")
    private String lastName;
    private String biography;
    private String imageUrl;
}
