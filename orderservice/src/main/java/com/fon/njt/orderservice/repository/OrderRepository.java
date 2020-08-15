package com.fon.njt.orderservice.repository;

import com.fon.njt.orderservice.model.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
}
