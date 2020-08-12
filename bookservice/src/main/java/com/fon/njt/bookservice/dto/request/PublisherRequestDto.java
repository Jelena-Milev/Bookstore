package com.fon.njt.bookservice.dto.request;

import lombok.*;

import javax.validation.constraints.NotBlank;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class PublisherRequestDto {
    @NotBlank(message = "Name must not be blank")
    private String name;
    @NotBlank(message = "Address must not be blank")
    private String address;
    private String email;
    private String siteUrl;
}
