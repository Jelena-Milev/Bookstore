package com.fon.njt.orderservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class OrderResponseDto {
    private Long id;
    private String orderIdentifier;
    //UserDto - first name, last name, address, email, phone
    private Long userId;
    private LocalDate date;
    private BigDecimal totalPrice;
    List<OrderItemResponseDto> items;
}
