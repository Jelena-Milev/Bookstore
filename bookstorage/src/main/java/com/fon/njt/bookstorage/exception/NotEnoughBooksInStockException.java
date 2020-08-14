package com.fon.njt.bookstorage.exception;

public class NotEnoughBooksInStockException extends RuntimeException{

    public NotEnoughBooksInStockException(Long id) {
        super("There is not enough pieces of book with id "+id+" in stock");
    }
}
