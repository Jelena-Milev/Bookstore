package com.fon.njt.orderservice.exception;

public class BookIsNotForSaleException extends RuntimeException {

    public BookIsNotForSaleException(Long id) {
        super("Book with id " + id + " is not for sale");
    }
}
