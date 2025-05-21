package com.example.KTPM.controller;

import com.example.KTPM.dto.request.*;
import com.example.KTPM.dto.response.RoomBookingRespone;
import com.example.KTPM.dto.response.RoomRespone;
import com.example.KTPM.dto.response.UserRespone;
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
    //cập nhật trạng thái booking
    @PutMapping("/{bookingId}")
    public ApiRespone<RoomBookingRespone> updateBookingStatus(@PathVariable Integer bookingId, @RequestBody BookingStatusRequest request) {
        return ApiRespone.<RoomBookingRespone>builder()
                .code(1000)
                .result(roomBookingService.updateBookingStatus(bookingId, request))
                .build();
    }

    @GetMapping("/my")
    public ApiRespone<List<RoomBookingRespone>> getMyBookings() {
        return ApiRespone.<List<RoomBookingRespone>>builder()
                .code(1000)
                .result(roomBookingService.getMyBookings())
                .build();
    }

    @DeleteMapping("/{bookingId}")
    public ApiRespone<Void> deleteRoomBooking(@PathVariable Integer bookingId) {
        roomBookingService.deleteRoomBooking(bookingId);
        return ApiRespone.<Void>builder().code(1000).build();
    }

}
