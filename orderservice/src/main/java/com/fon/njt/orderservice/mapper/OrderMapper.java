package com.fon.njt.orderservice.mapper;

import com.fon.njt.orderservice.dto.request.OrderRequestDto;
import com.fon.njt.orderservice.dto.response.OrderResponseDto;
import com.fon.njt.orderservice.model.OrderEntity;
import org.mapstruct.CollectionMappingStrategy;
import org.mapstruct.Mapper;

@Mapper(uses = OrderItemMapper.class, componentModel = "spring", collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED)
public interface OrderMapper {

    OrderEntity mapToEntity(OrderRequestDto dto);
    OrderResponseDto mapToDto(OrderEntity order);
}
