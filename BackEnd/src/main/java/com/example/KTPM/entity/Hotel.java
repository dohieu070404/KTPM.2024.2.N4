package com.example.KTPM.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalTime;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "hotels")
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", nullable = false)
    private Integer id;

    @Size(max = 1000)
    @NotNull
    @Column(name = "Name", nullable = false, length = 1000)
    private String name;

    @Lob
    @Column(name = "Description")
    private String description;

    @NotNull
    @Lob
    @Column(name = "Address", nullable = false)
    private String address;

    @NotNull
    @Column(name = "Rating", nullable = false, precision = 3, scale = 1)
    private BigDecimal rating;

    @Size(max = 255)
    @NotNull
    @Column(name = "City", nullable = false)
    private String city;

    @Size(max = 255)
    @NotNull
    @Column(name = "Website_Address", nullable = false)
    private String websiteAddress;

    @Column(name = "Create_User_Id")
    private Integer createUserId;

    @Size(max = 20)
    @NotNull
    @Column(name = "Phone_Num", nullable = false, length = 20)
    private String phoneNum;

    @ColumnDefault("'14:00:00'")
    @Column(name = "Check_In_Time")
    private LocalTime checkInTime;

    @ColumnDefault("'12:00:00'")
    @Column(name = "Check_Out_Time")
    private LocalTime checkOutTime;

    @ColumnDefault("1")
    @Column(name = "Is_Active")
    private Boolean isActive;

    @Column(name = "Created_At", updatable = false, insertable = false)
    private Instant createdAt;

    @Column(name = "Edited_At")
    private Instant editedAt;
    @ManyToMany
    @JoinTable(
            name = "hotels_hotel_amenities", // tên bảng trung gian
            joinColumns = @JoinColumn(name = "Hotels_Id"), // tên cột đại diện cho hotel
            inverseJoinColumns = @JoinColumn(name = "Hotel_Amenities_Name") // tên cột đại diện cho amenity
    )
    private Set<HotelAmenity> hotelAmenities;
}