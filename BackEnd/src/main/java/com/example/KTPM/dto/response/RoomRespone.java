package com.example.KTPM.dto.response;

import com.example.KTPM.entity.Hotel;
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

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomRespone {

    private Integer id;
//    private Hotel hotels;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer maxAdults;
    private Integer maxChildren;
    private Boolean isActive;
    private Instant createdAt;
    private Instant updatedAt;
}
