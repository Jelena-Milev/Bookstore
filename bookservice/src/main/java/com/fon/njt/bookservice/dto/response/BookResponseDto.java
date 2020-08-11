package com.fon.njt.bookservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookResponseDto {
    private Long id;
    private String ISBN;
    private String title;
    private BigDecimal price;
    private Integer numberOfPages;
    private String binding;
    private Integer publicationYear;
    private String description;
    private boolean inStock;
    private PublisherResponseDto publisher;
    private List<AuthorResponseDto> authors;
    private List<GenreResponseDto> genres;
}
