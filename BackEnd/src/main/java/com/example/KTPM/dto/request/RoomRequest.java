package com.example.KTPM.dto.request;

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

//@Getter
//@Setter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomRequest {
//    private Hotel hotels;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer availableRooms;
    private Integer maxAdults;
    private Integer maxChildren;
}
