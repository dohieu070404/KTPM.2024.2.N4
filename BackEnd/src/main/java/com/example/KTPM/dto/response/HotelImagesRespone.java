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

import java.time.Instant;
import java.util.Set;

//@Getter
//@Setter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HotelImagesRespone {
    private Integer id;
//    private Hotel hotels;
    private String imageUrl;
    private Boolean isPrimary;
    private Instant createdAt;
}
