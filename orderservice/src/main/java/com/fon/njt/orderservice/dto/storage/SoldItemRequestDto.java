package com.fon.njt.orderservice.dto.storage;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class SoldItemRequestDto {
    @NotNull(message = "Book id must not be null")
    @Positive(message = "Book id must be valid id")
    private Long bookId;
    @NotNull(message = "Number of book pieces sold must not be null")
    @Positive(message = "Number of book pieces sold must be larger than zero")
    private Integer piecesSold;
}
