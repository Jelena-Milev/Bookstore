package com.fon.njt.orderservice.dto.book;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class AuthorResponseDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String biography;
    private String imageUrl;
}
