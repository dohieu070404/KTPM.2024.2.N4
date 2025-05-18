package com.example.KTPM.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "room_booking")
public class RoomBooking {
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
    @JoinColumn(name = "Room_Type_Id", nullable = false)
    private RoomType roomType;

    @NotNull
    @Column(name = "Check_In", nullable = false)
    private LocalDate checkIn;

    @NotNull
    @Column(name = "Check_Out", nullable = false)
    private LocalDate checkOut;

    @Lob
    @Column(name = "status")
    private String status;

    @NotNull
    @ColumnDefault("1")
    @Column(name = "Number_Of_Rooms", nullable = false)
    private Integer numberOfRooms;

    @NotNull
    @ColumnDefault("1")
    @Column(name = "Adults", nullable = false)
    private Integer adults;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "Children", nullable = false)
    private Integer children;

    @NotNull
    @Column(name = "Total_Price", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalPrice;

    @ColumnDefault("0")
    @Column(name = "Is_Deleted")
    private Boolean isDeleted;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "Created_At")
    private Instant createdAt;

    @Column(name = "Updated_At")
    private Instant updatedAt;

    @Column(name = "Deleted_At")
    private Instant deletedAt;

}