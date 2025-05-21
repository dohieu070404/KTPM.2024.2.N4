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
public class TranSportCompanyRespone {

    private Integer id;
    private String name;
    private String description;
    private String phone;
    private String email;
    private String website;
    private Integer createUserId;
    private Boolean isActive;
    private Instant createdAt;
    private Instant updatedAt;
}
