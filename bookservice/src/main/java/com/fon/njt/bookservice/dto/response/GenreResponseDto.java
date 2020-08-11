package com.fon.njt.bookservice.dto.response;

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
