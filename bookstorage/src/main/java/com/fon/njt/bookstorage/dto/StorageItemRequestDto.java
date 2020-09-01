package com.fon.njt.bookstorage.dto;

import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class StorageItemRequestDto {
    @NotNull(message = "Book id must not be null")
    @Positive(message = "Book id must be valid id")
    private Long bookId;
    @NotNull(message = "Number of book pieces available must not be null")
    private Integer piecesAvailable;
    private boolean inStock;
}
