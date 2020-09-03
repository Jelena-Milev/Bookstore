package com.fon.njt.bookservice.exception;

public class OperationNotAvailableException extends RuntimeException{

    public OperationNotAvailableException() {
        super("Zahteva operacija nije raspoloziva u ovom trenutku. Molimo pokusajte kasnije.");
    }
}
