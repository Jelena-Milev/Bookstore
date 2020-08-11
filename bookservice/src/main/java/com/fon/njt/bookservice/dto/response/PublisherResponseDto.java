package com.fon.njt.bookservice.dto.response;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class PublisherResponseDto {
    private Long id;
    private String name;
    private String address;
    private String email;
    private String siteUrl;
}
