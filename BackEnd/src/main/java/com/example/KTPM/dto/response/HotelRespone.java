package com.example.KTPM.dto.response;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalTime;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HotelRespone {

    private Integer id;
    private String name;
    private String description;
    private String address;
    private BigDecimal rating;
    private String city;
    private String websiteAddress;
    private Integer createUserId;
    private String phoneNum;
    private LocalTime checkInTime;
    private LocalTime checkOutTime;
    private Boolean isActive;
    private Instant createdAt;
    private Instant editedAt;
    private Set<HotelAmenityRespone> hotelAmenities;
}
