package com.fon.njt.auth.service;

import com.fon.njt.auth.mail.Mail;
import freemarker.template.TemplateException;

import javax.mail.MessagingException;
import java.io.IOException;

public interface MailService {
    void sendVerificationMail(Mail mail) throws MessagingException, IOException, TemplateException;
}
