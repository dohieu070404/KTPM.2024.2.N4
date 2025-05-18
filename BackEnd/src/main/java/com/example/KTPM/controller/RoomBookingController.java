package com.example.KTPM.controller;

import com.example.KTPM.dto.request.ApiRespone;
import com.example.KTPM.dto.request.RoomBookingRequest;
import com.example.KTPM.dto.request.RoomRequest;
import com.example.KTPM.dto.response.RoomBookingRespone;
import com.example.KTPM.dto.response.RoomRespone;
import com.example.KTPM.service.RoomBookingService;
import com.example.KTPM.service.RoomService;
import jakarta.validation.Valid;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Builder
@RestController
@RequestMapping("/room/booking")
public class RoomBookingController {
    @Autowired
    private RoomBookingService roomBookingService;
    //tạo room
    @PostMapping("/{roomId}")//dat ten api
    public ApiRespone<RoomBookingRespone> createRoomBooking(@PathVariable Integer roomId, @RequestBody @Valid RoomBookingRequest request){
        return ApiRespone.<RoomBookingRespone>builder()
                .code(1000)
                .result(roomBookingService.createRoomBooking(roomId,request))
                .build();
    }

    
}
