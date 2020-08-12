package com.fon.njt.bookservice.exception;

public class EntityAlreadyExistsException extends RuntimeException {

    public EntityAlreadyExistsException(String entityName) {

        super(entityName + " already exists");
    }
}
