package com.fon.njt.orderservice.model;

import com.fon.njt.orderservice.dto.book.BookResponseDto;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "order_item")
public class OrderItemEntity {

    @Id
    @SequenceGenerator(name = "order_item_id", sequenceName = "order_item_id", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_item_id")
    private Long id;
    @EqualsAndHashCode.Include
    private Long bookId;

    private Integer quantity;

    private BigDecimal itemPrice;
    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private OrderEntity order;

    @Transient
    private BookResponseDto book;
}
