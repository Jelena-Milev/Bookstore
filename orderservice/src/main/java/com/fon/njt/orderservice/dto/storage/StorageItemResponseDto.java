package com.fon.njt.orderservice.dto.storage;

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
