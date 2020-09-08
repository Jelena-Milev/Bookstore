package com.fon.njt.orderservice.mapper;

import com.fon.njt.orderservice.dto.request.OrderRequestDto;
import com.fon.njt.orderservice.dto.response.OrderResponseDto;
import com.fon.njt.orderservice.dto.user.UserInfoDto;
import com.fon.njt.orderservice.model.OrderEntity;
import org.mapstruct.CollectionMappingStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(uses = OrderItemMapper.class, componentModel = "spring", collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED)
public interface OrderMapper {

    OrderEntity mapToEntity(OrderRequestDto dto);

    @Mapping(source = "userInfoDto", target = "userInfo")
    @Mapping(target = "date", expression = "java(java.time.format.DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(order.getDate()))")
    OrderResponseDto mapToDto(OrderEntity order, UserInfoDto userInfoDto);
}
