package com.fon.njt.auth.exception;

public class VerificationLinkExpiredException extends RuntimeException {

    public VerificationLinkExpiredException(String message) {
        super(message);
    }
}