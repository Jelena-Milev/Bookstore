package com.fon.njt.bookservice.dto.request;

import lombok.*;

import javax.validation.constraints.NotBlank;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class GenreRequestDto {

    @NotBlank(message = "Genre name must not be blank")
    private String name;
}
