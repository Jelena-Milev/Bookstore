package com.fon.njt.orderservice.service;

import com.fon.njt.orderservice.dto.request.OrderRequestDto;
import com.fon.njt.orderservice.dto.response.OrderResponseDto;
import com.fon.njt.orderservice.dto.user.UserInfoDto;

public interface OrderService {
    OrderResponseDto save(OrderRequestDto dto, UserInfoDto userInfoDto);
}
