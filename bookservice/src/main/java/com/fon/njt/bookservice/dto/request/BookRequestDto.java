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
    @NotBlank(message = "Knjiga mora imati ISBN broj.")
    private String ISBN;

    @NotBlank(message = "Knjiga mora imati naslov.")
    private String title;

    @NonNull
    @Positive(message = "Cena knjige mora biti pozitivan broj veci od nule.")
    private BigDecimal price;

    private Integer numberOfPages;
    private String binding;
    private Integer publicationYear;

    @NotBlank(message = "Knjiga mora imati opis.")
    private String description;

    @NotNull(message = "Knjiga mora imati izdavaca.")
    private Long publisherId;

    @NotEmpty(message = "Knjiga mora imati barem jednog autora.")
    private List<Long> authorsIds;

    @NotEmpty(message = "Knjiga mora imati barem jedan zanr.")
    private List<Long> genresIds;

    private boolean inStock;
    private String imageUrl;

    private Integer piecesAvailable;
}
