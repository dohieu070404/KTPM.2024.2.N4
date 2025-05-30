package com.example.KTPM.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

//@Getter
//@Setter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingStatusRequest {
    private String status;
}
