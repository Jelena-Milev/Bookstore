package com.fon.njt.bookstorage.exception;

public class EntityAlreadyExistsException extends RuntimeException {

    public EntityAlreadyExistsException(String entityName) {

        super(entityName + " already exists");
    }
}
