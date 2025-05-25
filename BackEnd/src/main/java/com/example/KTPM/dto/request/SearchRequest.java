package com.example.KTPM.dto.request;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SearchRequest {
    @NotNull
    private String location;

    @NotNull
    private LocalDate checkIn;

    @NotNull
    private LocalDate checkOut;

    private Integer maxAdults;
    private Integer maxChildren;

    // Bộ lọc nâng cao
    private Integer minPrice;
    private Integer maxPrice;
    private String sortBy;
}
