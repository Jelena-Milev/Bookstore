package com.fon.njt.orderservice.dto.book;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class GenreResponseDto {
    private Long id;
    private String name;
}
