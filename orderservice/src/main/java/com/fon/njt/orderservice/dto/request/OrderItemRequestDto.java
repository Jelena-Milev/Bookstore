package com.fon.njt.orderservice.dto.request;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class OrderItemRequestDto {
    @NotNull(message = "Stavka narudzbenice mora imati id knjige.")
    @Positive(message = "Id knjige mora biti validan id.")
    private Long bookId;
    @NotBlank(message = "Stavka narudzbenice mora imati naziv knjige.")
    private String bookTitle;
    @NotNull(message = "Broj knjiga ne sme biti null.")
    @Positive(message = "Broj knjiga mora biti veci od nule.")
    private Integer quantity;
}
