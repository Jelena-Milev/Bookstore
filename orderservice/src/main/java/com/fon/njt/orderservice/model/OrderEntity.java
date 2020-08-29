package com.fon.njt.orderservice.model;

import com.fon.njt.orderservice.dto.request.OrderItemRequestDto;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "order_form")
public class OrderEntity {

    @Id
    @SequenceGenerator(name = "order_id", sequenceName = "order_id", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_id")
    private Long id;
    @EqualsAndHashCode.Include
    private String orderIdentifier;
    private String userId;
    @Column(columnDefinition = "DATE")
    private LocalDate date;
    private BigDecimal totalPrice;

    @OneToMany(mappedBy = "order", cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    List<OrderItemEntity> items;

    public void addItem(OrderItemEntity item) {
        if (this.items == null) {
            this.items = new ArrayList<>();
        }
        this.items.add(item);
        item.setOrder(this);
    }

    public void calculateTotalPrice() {
        this.totalPrice = new BigDecimal(0);
        for (OrderItemEntity item : items) {
            this.totalPrice = this.totalPrice.add(item.getItemPrice());
        }
    }
}
