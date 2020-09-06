package com.fon.njt.orderservice.service;

import com.fon.njt.orderservice.dto.PaymentIntentDto;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface PaymentService {
    PaymentIntent paymentIntent(PaymentIntentDto paymentIntentDto) throws StripeException;

    PaymentIntent confirm(String id) throws StripeException;

    PaymentIntent cancel(String id) throws StripeException;
}
