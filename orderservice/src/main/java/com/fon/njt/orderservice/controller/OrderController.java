package com.fon.njt.orderservice.controller;

import com.fon.njt.orderservice.dto.request.OrderItemRequestDto;
import com.fon.njt.orderservice.dto.request.OrderRequestDto;
import com.fon.njt.orderservice.dto.response.OrderResponseDto;
import com.fon.njt.orderservice.dto.user.UserInfoDto;
import com.fon.njt.orderservice.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(path = "/")
public class OrderController {

    private final OrderService orderService;
    private final AuthServiceAPI authServiceAPI;

    @Autowired
    public OrderController(OrderService orderService, AuthServiceAPI authServiceAPI) {
        this.orderService = orderService;
        this.authServiceAPI = authServiceAPI;
    }

    @GetMapping(path = "", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<List<OrderResponseDto>> getOrdersByUserId(@RequestParam final String userId){
        final UserInfoDto userInfoDto = authServiceAPI.getUserInfo(userId);
        final List<OrderResponseDto> result = orderService.getOrdersByUserId(userId, userInfoDto);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PostMapping(path = "items/availability", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<OrderResponseDto> checkAvailability(@RequestBody final List<@Valid OrderItemRequestDto> dto) {
        orderService.checkAvailability(dto);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping(path = "", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<OrderResponseDto> save(@RequestBody @Valid final OrderRequestDto dto) {
        final UserInfoDto userInfoDto = authServiceAPI.getUserInfo(dto.getUserId());
        final OrderResponseDto orderDto = orderService.create(dto, userInfoDto);
        return new ResponseEntity(orderDto, HttpStatus.OK);
    }
}
