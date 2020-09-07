package com.fon.njt.orderservice.service.impl;

import com.fon.njt.orderservice.dto.PaymentIntentDto;
import com.fon.njt.orderservice.service.PaymentService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Value("${stripe.key.secret}")
    String secretKey;

    @Override
    public PaymentIntent paymentIntent(PaymentIntentDto paymentIntentDto) throws StripeException {
        Stripe.apiKey = secretKey;
        Map<String, Object> params = new HashMap<>();
        params.put("amount", paymentIntentDto.getAmount());
        params.put("currency", paymentIntentDto.getCurrency());
        params.put("description", paymentIntentDto.getDescription());
        ArrayList payment_method_types = new ArrayList();
        payment_method_types.add("card");
        params.put("payment_method_types", payment_method_types);
        return PaymentIntent.create(params);
    }

    @Override
    public PaymentIntent confirm(String id) throws StripeException {
        Stripe.apiKey = secretKey;
        PaymentIntent paymentIntent = PaymentIntent.retrieve(id);
        Map<String, Object> params = new HashMap<>();
        params.put("payment_method", "pm_card_visa");
        PaymentIntent updatedPaymentIntent = paymentIntent.confirm(params);
//        updatedPaymentIntent
        return updatedPaymentIntent;
    }

    @Override
    public PaymentIntent cancel(String id) throws StripeException {
        Stripe.apiKey = secretKey;
        PaymentIntent paymentIntent = PaymentIntent.retrieve(id);
        paymentIntent.cancel();
        return paymentIntent;
    }
}
