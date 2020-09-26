package com.fon.njt.auth.service.impl;

import com.fon.njt.auth.mail.Mail;
import com.fon.njt.auth.service.MailService;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
public class MailServiceImpl implements MailService {

    private final JavaMailSender mailSender;
    private final Configuration freeMarkerConfiguration;

    @Autowired
    public MailServiceImpl(JavaMailSender mailSender, Configuration freeMarkerConfiguration) {
        this.mailSender = mailSender;
        this.freeMarkerConfiguration = freeMarkerConfiguration;
    }

    @Override
    public void sendVerificationMail(Mail mail) throws MessagingException, IOException, TemplateException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,
                MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name());

        Template template = freeMarkerConfiguration.getTemplate("email-template.ftl");
        String html = FreeMarkerTemplateUtils.processTemplateIntoString(template, mail.getModel());
        helper.setTo(mail.getTo());
        helper.setTo(mail.getTo());
        helper.setText(html, true);
        helper.setSubject(mail.getSubject());
        helper.setFrom(mail.getFrom());

        mailSender.send(message);
    }
}
