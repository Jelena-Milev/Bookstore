package com.fon.njt.auth.exception;

public class BadVerificationLinkException extends RuntimeException {

    public BadVerificationLinkException(String message) {
        super(message);
    }
}