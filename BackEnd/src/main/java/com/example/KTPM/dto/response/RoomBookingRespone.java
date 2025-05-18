package com.example.KTPM.dto.response;

import com.example.KTPM.entity.RoomType;
import com.example.KTPM.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomBookingRespone {
    private UserRespone user;
    private RoomRespone roomType;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private String status;
    private Integer numberOfRooms;
    private Integer adults;
    private Integer children;
    private BigDecimal totalPrice;
    private Boolean isDeleted;
    private Instant createdAt;
    private Instant updatedAt;
    private Instant deletedAt;
}
