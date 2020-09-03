package com.fon.njt.orderservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class OrderRequestDto {
    @NotNull(message = "Narudzbenica mora ima imati identifikator korisnika.")
    private String userId;
    @NotNull(message = "Narudzbenica mora ima imati listu stavki.")
    @NotEmpty(message = "Lista stavki ne sme biti prazna.")
    private List<@Valid OrderItemRequestDto> items;
}
