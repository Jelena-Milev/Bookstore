package com.fon.njt.orderservice.exception;

public class BookIsNotForSaleException extends RuntimeException {

    public BookIsNotForSaleException(String title) {
        super("Knjiga \"" + title + "\" nije na prodaju.");
    }
}
