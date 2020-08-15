package com.fon.njt.orderservice.dto.book;

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
