package com.fon.njt.orderservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class OrderRequestDto {
    private Long userId;
    private List<OrderItemRequestDto> items;
}
