package com.fon.njt.orderservice.exception;

public class NotEnoughBooksInStockException extends RuntimeException{

    public NotEnoughBooksInStockException(String title) {
        super("Knjige \"" + title + "\" nema na stanju u trazenoj kolicini.");
    }
}
