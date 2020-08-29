package com.fon.njt.orderservice.dto.response;

import com.fon.njt.orderservice.dto.user.UserInfoDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class OrderResponseDto {
    private Long id;
    private String orderIdentifier;
    private UserInfoDto userInfo;
    private String userId;
    private LocalDate date;
    private BigDecimal totalPrice;
    List<OrderItemResponseDto> items;
}
