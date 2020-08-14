package com.fon.njt.bookservice.dto.response;

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
