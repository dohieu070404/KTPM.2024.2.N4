package com.example.KTPM.dto.response;

import com.example.KTPM.entity.Transport;
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
public class TransportBookingRespone {

    private Integer id;
    private UserRespone user;
    private TranSportRespone transport;
    private Instant bookingDate;
    private String status;
    private Integer numberOfSeats;
    private BigDecimal totalPrice;
    private Boolean isDeleted;
    private Instant createdAt;
    private Instant updatedAt;
    private Instant deletedAt;
}
