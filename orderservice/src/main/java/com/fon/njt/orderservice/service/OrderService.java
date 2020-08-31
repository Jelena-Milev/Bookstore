package com.fon.njt.orderservice.service;

import com.fon.njt.orderservice.dto.request.OrderRequestDto;
import com.fon.njt.orderservice.dto.response.OrderResponseDto;
import com.fon.njt.orderservice.dto.user.UserInfoDto;

import java.util.List;

public interface OrderService {
    OrderResponseDto save(OrderRequestDto dto, UserInfoDto userInfoDto);

    List<OrderResponseDto> getOrdersByUserId(String userId, UserInfoDto userInfoDto);
}
