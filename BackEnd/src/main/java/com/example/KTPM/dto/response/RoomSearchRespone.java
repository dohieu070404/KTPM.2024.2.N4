package com.example.KTPM.dto.response;

import com.example.KTPM.entity.Hotel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomSearchRespone {
    private Integer id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer availableRooms;
    private Integer maxAdults;
    private Integer maxChildren;
    private String imageUrl;
    private String city;
    private BigDecimal rating;
    private String phoneNum;
    private String hotelName;
}
