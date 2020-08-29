package com.fon.njt.auth.exception;

public class EntityNotFoundException extends RuntimeException {

    public EntityNotFoundException(String entityName, String id) {
        super(entityName + " with id: " + id + " not found");
    }
}
