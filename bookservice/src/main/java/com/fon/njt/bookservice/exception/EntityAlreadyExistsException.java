package com.fon.njt.bookservice.exception;

public class EntityAlreadyExistsException extends RuntimeException {

    public EntityAlreadyExistsException(String message) {

        super(message);
    }
}
