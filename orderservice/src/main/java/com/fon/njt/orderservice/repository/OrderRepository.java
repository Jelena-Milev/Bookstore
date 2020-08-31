package com.fon.njt.orderservice.repository;

import com.fon.njt.orderservice.model.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {

    List<OrderEntity> findByUserIdEquals(String userId);
}
