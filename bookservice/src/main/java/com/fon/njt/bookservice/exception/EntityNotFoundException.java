package com.fon.njt.bookservice.exception;

public class EntityNotFoundException extends RuntimeException {

    public EntityNotFoundException(String entityName, Long id) {
        super(entityName + " nije pronadjen/a");
    }
}
