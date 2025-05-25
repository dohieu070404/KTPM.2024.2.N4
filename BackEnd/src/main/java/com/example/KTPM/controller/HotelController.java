package com.example.KTPM.controller;

import com.example.KTPM.dto.request.HotelRequest;
import com.example.KTPM.dto.response.ApiRespone;
import com.example.KTPM.dto.response.HotelRespone;
import com.example.KTPM.service.HotelService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/hotel")
public class HotelController {
    
    private final HotelService hotelService;

    // Endpoint mới để filter hotels
    @GetMapping
    public ApiRespone<List<HotelRespone>> getHotels(
        @RequestParam(required = false) Integer minPrice,
        @RequestParam(required = false) Integer maxPrice,
        @RequestParam(defaultValue = "newest") String sortBy,
        @RequestParam(required = false) Integer rating,
        @RequestParam(required = false) String location
    ) {
        log.info("Filter hotels with params - minPrice: {}, maxPrice: {}, sortBy: {}, rating: {}, location: {}",
                minPrice, maxPrice, sortBy, rating, location);
                
        return ApiRespone.<List<HotelRespone>>builder()
                .code(1000)
                .result(hotelService.getFilteredHotels(minPrice, maxPrice, sortBy, rating, location))
                .build();
    }

    // Các endpoint còn lại giữ nguyên
    @PostMapping
    public ApiRespone<HotelRespone> createHotel(@RequestBody @Valid HotelRequest request) {
        try {
            return ApiRespone.<HotelRespone>builder()
                    .code(1000)
                    .result(hotelService.createHotel(request))
                    .build();
        } catch (Exception e) {
            e.printStackTrace();
            return ApiRespone.<HotelRespone>builder()
                    .code(9999)
                    .message(e.getMessage())
                    .build();
        }
    }


    @GetMapping("/filter")
    public ApiRespone<List<HotelRespone>> getFilterByRating() {
        var securityContext = SecurityContextHolder.getContext().getAuthentication();
        return ApiRespone.<List<HotelRespone>>builder()
                .code(1000)
                .result(hotelService.getFilterByRating())
                .build();
    }

    @GetMapping("/myHotel")
    public ApiRespone<List<HotelRespone>> getMyHotel() {
        var securityContext = SecurityContextHolder.getContext().getAuthentication();
        return ApiRespone.<List<HotelRespone>>builder()
                .code(1000)
                .result(hotelService.getMyHotel())
                .build();
    }

    @GetMapping("/{hotelId}")
    public ApiRespone<HotelRespone> getHotel(@PathVariable Integer hotelId) {
        return ApiRespone.<HotelRespone>builder()
                .code(1000)
                .result(hotelService.getHotel(hotelId))
                .build();
    }

    @PutMapping("/{id}")
    public ApiRespone<HotelRespone> updateHotel(
            @PathVariable Integer id,
            @RequestBody @Valid HotelRequest request) {
        return ApiRespone.<HotelRespone>builder()
                .code(1000)
                .result(hotelService.updateHotel(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiRespone<Void> deleteHotel(@PathVariable Integer id) {
        hotelService.deleteHotel(id);
        return ApiRespone.<Void>builder()
                .code(1000)
                .build();
    }
}