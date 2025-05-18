package com.example.KTPM.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

//@Getter
//@Setter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomAmenityRequest {
    private String name;
    private String description;
    private String icon;
}
