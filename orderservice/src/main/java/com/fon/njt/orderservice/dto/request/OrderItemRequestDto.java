package com.fon.njt.orderservice.dto.request;

import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class OrderItemRequestDto {
    @NotNull(message = "Book id must not be null")
    @Positive(message = "Book id must be valid id")
    private Long bookId;
    @NotNull(message = "Number of book pieces must not be null")
    @Positive(message = "Number of book pieces must be larger than zero")
    private Integer quantity;
}
