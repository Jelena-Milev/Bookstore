package com.fon.njt.auth.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;


public class MyAuthenticationFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
        Map<String, Object> response = new HashMap<>();
        if (e.getMessage().equals("Bad credentials")) {
            response.put("message", "Pogresno korisnicko ime ili lozinka");
            httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
        else{
            response.put("message", e.getMessage());
            httpServletResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        OutputStream out = httpServletResponse.getOutputStream();
        ObjectMapper mapper = new ObjectMapper();
        mapper.writerWithDefaultPrettyPrinter().writeValue(out, response);
        out.flush();
    }
}
