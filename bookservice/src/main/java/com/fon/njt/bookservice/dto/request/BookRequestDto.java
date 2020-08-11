package com.fon.njt.bookservice.dto.request;

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
public class BookRequestDto {
    private String ISBN;
    private String title;
    private BigDecimal price;
    private Integer numberOfPages;
    private String binding;
    private Integer publicationYear;
    private String description;
    private boolean inStock;
    private Long publisherId;
    private List<Long> authorsIds;
    private List<Long> genresIds;
}
