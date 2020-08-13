package com.fon.njt.bookstorage.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class SoldItemRequestDto {
    private Long bookId;
    private Integer piecesSold;
}
