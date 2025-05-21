package com.example.KTPM.dto.request;

import com.example.KTPM.entity.TransportCompany;
import com.example.KTPM.entity.TransportType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalTime;
import java.util.Set;

//@Getter
//@Setter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TranSportRequest {
    private Integer transportTypeId;
    private String name;
    private String description;
    private String departureLocation;
    private String arrivalLocation;
    private Instant departureTime;
    private Instant arrivalTime;
    private BigDecimal price;
    private Integer availableSeats;

}
