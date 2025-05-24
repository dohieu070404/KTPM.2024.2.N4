package com.example.KTPM.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "order_details")
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "Order_Id", nullable = false)
    private Order order;

    @NotNull
    @Lob
    @Column(name = "Item_Type", nullable = false)
    private String itemType;

    @NotNull
    @Column(name = "Item_Id", nullable = false)
    private Integer itemId;

    @NotNull
    @Column(name = "Price", nullable = false, precision = 15, scale = 2)
    private BigDecimal price;

}