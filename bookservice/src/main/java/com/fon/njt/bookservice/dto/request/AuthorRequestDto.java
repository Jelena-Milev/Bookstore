package com.fon.njt.bookservice.dto.request;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AuthorRequestDto {
    private String firstName;
    private String lastName;
    private String biography;
    private String imageUrl;
}
