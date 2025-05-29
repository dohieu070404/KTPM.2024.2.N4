package com.example.KTPM.dto.response;

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
public class RoomSearchRespone {
    private String name;
//    private String location;
//    private String description;
    private BigDecimal price;
//    private Integer availableRooms;
//    private Integer maxAdults;
//    private Integer maxChildren;
}
