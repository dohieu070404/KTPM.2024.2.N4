package com.example.KTPM.dto.request;

import lombok.Data;

@Data
public class SearchRequest {
    private String location;
    private Integer maxAdults;
    private Integer maxChildren;
    private Integer minPrice;
    private Integer maxPrice;
}
