package com.example.KTPM.dto.response;

import com.example.KTPM.entity.TransportCompany;
import com.example.KTPM.entity.TransportType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalTime;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TranSportRespone {

    private Integer id;
    private TranSportTypeRespone transportType;
    private TranSportCompanyRespone transportCompany;
    private String name;
    private String description;
    private String departureLocation;
    private String arrivalLocation;
    private Instant departureTime;
    private Instant arrivalTime;
    private BigDecimal price;
    private Integer availableSeats;
    private Boolean isActive;
    private Instant createdAt;
    private Instant updatedAt;
}
