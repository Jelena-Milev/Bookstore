package com.fon.njt.auth.security;


import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;

@Getter
public class JwtConfig {

    @Value("${security.token.uri:/auth/**}")
    private String Uri;
    @Value("${security.token.header:Authorization}")
    private String header;
    @Value("${security.token.prefix:Bearer }")
    private String prefix;
    @Value("${security.token.expiration:#{24*60*60}}")
    private int expiration;
    @Value("${security.token.secret:NapredneJavaTehnologije}")
    private String secret;
}
