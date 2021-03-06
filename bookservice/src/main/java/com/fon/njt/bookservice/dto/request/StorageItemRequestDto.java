package com.fon.njt.bookservice.dto.request;

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
    @Positive(message = "Number of book pieces available must be larger than zero")
    private Integer piecesAvailable;
    private boolean inStock;
}
