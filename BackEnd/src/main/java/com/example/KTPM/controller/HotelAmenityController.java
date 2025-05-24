package com.example.KTPM.controller;

import com.example.KTPM.dto.request.HotelAmenityRequest;
import com.example.KTPM.dto.request.HotelAmenityRequest;
import com.example.KTPM.dto.response.ApiRespone;
import com.example.KTPM.dto.response.HotelAmenityRespone;
import com.example.KTPM.dto.response.HotelAmenityRespone;
import com.example.KTPM.service.HotelAmenityService;
import jakarta.validation.Valid;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Builder
@RestController
@RequestMapping("/hotelAmenity")
public class HotelAmenityController {
    @Autowired
    private HotelAmenityService hotelAmenityService;
    //tạo hotelAmenity
    @PostMapping//dat ten api
    public ApiRespone<HotelAmenityRespone> createHotelAmenity(@RequestBody @Valid HotelAmenityRequest request){
        return ApiRespone.<HotelAmenityRespone>builder()
                .code(1000)
                .result(hotelAmenityService.create(request))
                .build();
    }
    //lấy all hotelAmenity của hotel hiện tại
    @GetMapping
    public ApiRespone<List<HotelAmenityRespone>> getAll() {
        return ApiRespone.<List<HotelAmenityRespone>>builder()
                .result(hotelAmenityService.getAllHotelAmenitys())
                .build();
    }
    //cập nhật hotelAmenity
    @PutMapping("/{hotelAmenityId}")
    HotelAmenityRespone updateHotelAmenity(@PathVariable String hotelAmenityId, @RequestBody HotelAmenityRequest request){
        return hotelAmenityService.updateHotelAmenity(hotelAmenityId,request);
    }

    //xóa hotelAmenity
    @DeleteMapping("/{hotelAmenityId}")
    public ApiRespone<Void> deleteHotelAmenity(@PathVariable String hotelAmenityId) {
        hotelAmenityService.deleteHotelAmenity(hotelAmenityId);
        return ApiRespone.<Void>builder().build();
    }

}
