package com.example.KTPM.dto.request;

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

//@Getter
//@Setter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HotelRequest {
    private String name;
    private String description;
    private String address;
    private BigDecimal rating;
    private String city;
    private String websiteAddress;
    private String phoneNum;
    private LocalTime checkInTime;
    private LocalTime checkOutTime;
}
