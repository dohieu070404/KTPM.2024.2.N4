package com.example.KTPM.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import com.example.KTPM.enums.OrderStatus;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "User_Id")
    private User user;

    @Column(name = "Order_Date",updatable = false, insertable = false)
    private Instant orderDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "Status")
    private OrderStatus status;


    @Size(max = 100)
    @ColumnDefault("''")
    @Column(name = "Full_Name", length = 100)
    private String fullName;

    @Size(max = 100)
    @ColumnDefault("''")
    @Column(name = "Email", length = 100)
    private String email;

    @Size(max = 100)
    @NotNull
    @Column(name = "Phone_Number", nullable = false, length = 100)
    private String phoneNumber;

    @NotNull
    @ColumnDefault("0.00")
    @Column(name = "Total_Price", nullable = false, precision = 15, scale = 2)
    private BigDecimal totalPrice;

    @NotNull
    @ColumnDefault("20000.00")
    @Column(name = "Discount_Amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal discountAmount;

    @Column(name = "Final_Price", precision = 15, scale = 2,updatable = false, insertable = false)
    private BigDecimal finalPrice;

    @Column(name = "Is_Deleted")
    private Boolean isDeleted = false;

    @Column(name = "Deleted_At")
    private Instant deletedAt;


}