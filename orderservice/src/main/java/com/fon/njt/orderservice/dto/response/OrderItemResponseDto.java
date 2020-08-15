package com.fon.njt.orderservice.dto.response;

import com.fon.njt.orderservice.dto.book.BookResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class OrderItemResponseDto {
    private Long id;
    private BookResponseDto book;
    private Integer quantity;
    private BigDecimal itemPrice;
}
