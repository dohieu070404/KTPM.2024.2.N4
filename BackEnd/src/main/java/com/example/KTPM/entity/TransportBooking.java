package com.example.KTPM.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "transport_booking")
public class TransportBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "User_Id", nullable = false)
    private User user;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "Transport_Id", nullable = false)
    private Transport transport;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "Booking_Date")
    private Instant bookingDate;


    @Column(name = "Status")
    private String status;

    @NotNull
    @ColumnDefault("1")
    @Column(name = "Number_Of_Seats", nullable = false)
    private Integer numberOfSeats;

    @NotNull
    @Column(name = "Total_Price", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalPrice;

    @ColumnDefault("0")
    @Column(name = "Is_Deleted")
    private Boolean isDeleted;

    @Column(name = "Created_At", updatable = false, insertable = false)
    private Instant createdAt;

    @Column(name = "Updated_At")
    private Instant updatedAt;

    @Column(name = "Deleted_At")
    private Instant deletedAt;

}