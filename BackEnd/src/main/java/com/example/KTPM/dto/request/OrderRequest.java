package com.example.KTPM.dto.request;

import com.example.KTPM.dto.response.UserRespone;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;

//@Getter
//@Setter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {
    private Instant orderDate;
    private String fullName;
    private String email;
    private String phoneNumber;
    private BigDecimal totalPrice;
    private BigDecimal discountAmount;
}
