package com.fon.njt.bookservice.dto.request;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.math.BigDecimal;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookRequestDto {
    @NotBlank(message = "ISBN must not be blank")
    private String ISBN;

    @NotBlank(message = "Title must not be blank")
    private String title;

    @NonNull
    @Positive(message = "Price must be positive number or zero")
    private BigDecimal price;

    private Integer numberOfPages;
    private String binding;
    private Integer publicationYear;

    @NotBlank(message = "Description must not be blank")
    private String description;

    @NotNull(message = "Book must have a publisher")
    private Long publisherId;

    @NotEmpty(message = "Book must have at least one author")
    private List<Long> authorsIds;

    @NotEmpty(message = "Book must have at least one genre")
    private List<Long> genresIds;

    private boolean inStock;

    private Integer piecesAvailable;
}
