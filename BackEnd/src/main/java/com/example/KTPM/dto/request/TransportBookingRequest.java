package com.example.KTPM.dto.request;

import com.example.KTPM.entity.Transport;
import com.example.KTPM.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

//@Getter
//@Setter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransportBookingRequest {
    private Instant bookingDate;
    private Integer numberOfSeats;
}
