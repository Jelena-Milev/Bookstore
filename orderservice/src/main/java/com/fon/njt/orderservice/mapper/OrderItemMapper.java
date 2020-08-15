package com.fon.njt.orderservice.mapper;

import com.fon.njt.orderservice.dto.request.OrderItemRequestDto;
import com.fon.njt.orderservice.dto.response.OrderItemResponseDto;
import com.fon.njt.orderservice.model.OrderItemEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OrderItemMapper {

    OrderItemEntity mapToEntity(OrderItemRequestDto dto);

    OrderItemResponseDto mapToDto(OrderItemEntity orderItem);
}
