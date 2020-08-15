package com.fon.njt.orderservice.dto.request;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class OrderItemRequestDto {
    private Long bookId;
    private Integer quantity;
}
