package com.example.KTPM.dto.response;

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
public class RoomImagesRespone {
    private Integer id;
    private String imageUrl;
    private Boolean isPrimary;
    private Instant createdAt;
}
