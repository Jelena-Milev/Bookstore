package com.fon.njt.orderservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class OrderRequestDto {
    @NotNull(message = "Narudzbenica mora imati identifikator korisnika.")
    private String userId;
    @NotBlank(message = "Narudzbenica mora imati identifikacioni broj placanja")
    private String orderIdentifier;
    @NotBlank(message = "Narudzbenica mora imati link izvoda placanja")
    private String paymentReceiptUrl;
    @NotNull(message = "Narudzbenica mora ima imati listu stavki.")
    @NotEmpty(message = "Lista stavki ne sme biti prazna.")
    private List<@Valid OrderItemRequestDto> items;
}
