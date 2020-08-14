package com.fon.njt.bookstorage.exception;

public class BookIsNotForSaleException extends RuntimeException {

    public BookIsNotForSaleException(Long id) {
        super("Book with id " + id + " is not for sale");
    }
}
