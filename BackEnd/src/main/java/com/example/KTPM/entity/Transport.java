package com.example.KTPM.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "transport")
public class Transport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Transport_Type_Id")
    private TransportType transportType;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "Transport_Company_Id")
    private TransportCompany transportCompany;

    @Size(max = 255)
    @NotNull
    @Column(name = "Name", nullable = false)
    private String name;

    @Lob
    @Column(name = "Description")
    private String description;

    @Size(max = 255)
    @NotNull
    @Column(name = "Departure_Location", nullable = false)
    private String departureLocation;

    @Size(max = 255)
    @NotNull
    @Column(name = "Arrival_Location", nullable = false)
    private String arrivalLocation;

    @NotNull
    @Column(name = "Departure_Time", nullable = false)
    private Instant departureTime;

    @NotNull
    @Column(name = "Arrival_Time", nullable = false)
    private Instant arrivalTime;

    @NotNull
    @Column(name = "Price", nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @NotNull
    @Column(name = "Available_Seats", nullable = false)
    private Integer availableSeats;

    @ColumnDefault("1")
    @Column(name = "Is_Active")
    private Boolean isActive;

    @Column(name = "Created_At", updatable = false, insertable = false)
    private Instant createdAt;

    @Column(name = "Updated_At")
    private Instant updatedAt;

}