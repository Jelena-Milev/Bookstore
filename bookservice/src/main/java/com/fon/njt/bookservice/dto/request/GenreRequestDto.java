package com.fon.njt.bookservice.dto.request;

import lombok.*;

import javax.validation.constraints.NotBlank;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class GenreRequestDto {

    @NotBlank(message = "Zanr mora imati naziv.")
    private String name;
}
