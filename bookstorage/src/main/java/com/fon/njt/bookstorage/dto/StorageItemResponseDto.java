package com.fon.njt.bookstorage.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class StorageItemResponseDto {
    private Long bookId;
    private Integer piecesAvailable;
    private boolean inStock;
}
