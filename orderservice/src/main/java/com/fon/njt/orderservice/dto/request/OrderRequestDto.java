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
    @NotNull(message = "User id must not be null")
    @Positive(message = "User id must be valid id")
    private String userId;
    @NotNull(message = "Order items must not be null")
    @NotEmpty(message = "Order items must not be empty")
    private List<@Valid OrderItemRequestDto> items;
}
