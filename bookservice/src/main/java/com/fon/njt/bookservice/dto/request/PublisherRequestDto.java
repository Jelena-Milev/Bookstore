package com.fon.njt.bookservice.dto.request;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class PublisherRequestDto {
    private String name;
    private String address;
    private String email;
    private String siteUrl;
}
