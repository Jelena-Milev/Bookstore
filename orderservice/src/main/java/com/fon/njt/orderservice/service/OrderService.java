package com.fon.njt.orderservice.service;

import com.fon.njt.orderservice.dto.request.OrderRequestDto;
import com.fon.njt.orderservice.dto.response.OrderResponseDto;

public interface OrderService {
    OrderResponseDto save(OrderRequestDto dto);
}
