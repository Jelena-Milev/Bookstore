package com.fon.njt.bookservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AuthorResponseDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String biography;
    private String imageUrl;
}
