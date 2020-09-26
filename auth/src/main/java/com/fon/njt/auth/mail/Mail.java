package com.fon.njt.auth.mail;

import lombok.*;

import java.util.Map;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Mail {
    private String from;
    private String to;
    private String content;
    private String subject;
    private Map<String, Object> model;
}
