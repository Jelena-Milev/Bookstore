package com.fon.njt.bookservice.dto.request;

import lombok.*;

import javax.validation.constraints.NotBlank;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class PublisherRequestDto {
    @NotBlank(message = "Izdavac mora imati naziv.")
    private String name;
    @NotBlank(message = "Izdavac mora imati adresu.")
    private String address;
    private String email;
    private String siteUrl;
}
