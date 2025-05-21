package com.example.KTPM.dto.request;

import com.example.KTPM.dto.response.RoomRespone;
import com.example.KTPM.dto.response.UserRespone;
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
public class RoomBookingRequest {
    private LocalDate checkIn;
    private LocalDate checkOut;
    private Integer numberOfRooms;
    private Integer adults;
    private Integer children;
}
