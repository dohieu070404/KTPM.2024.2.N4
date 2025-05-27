
package com.example.KTPM.controller;

import com.example.KTPM.dto.request.ApiRespone;
import com.example.KTPM.dto.request.BookingStatusRequest;
import com.example.KTPM.dto.request.TransportBookingRequest;
import com.example.KTPM.dto.response.TransportBookingRespone;
import com.example.KTPM.service.TransportBookingService;
import jakarta.validation.Valid;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Builder
@RestController
@RequestMapping("/transport/booking")
public class TransportBookingController {
    @Autowired
    private TransportBookingService transportBookingService;
    //tạo transport
    @PostMapping("/{transportId}")//dat ten api
    public ApiRespone<TransportBookingRespone> createTransportBooking(@PathVariable Integer transportId, @RequestBody @Valid TransportBookingRequest request){
        return ApiRespone.<TransportBookingRespone>builder()
                .code(1000)
                .result(transportBookingService.createTransportBooking(transportId,request))
                .build();
    }
    //cập nhật trạng thái booking
    @PutMapping("/{bookingId}")
    public ApiRespone<TransportBookingRespone> updateBookingStatus(@PathVariable Integer bookingId, @RequestBody BookingStatusRequest request) {
        return ApiRespone.<TransportBookingRespone>builder()
                .code(1000)
                .result(transportBookingService.updateBookingStatus(bookingId, request))
                .build();
    }

    //lấy thông tin booking
    @GetMapping("/{bookingId}")
    public ApiRespone<List<TransportBookingRespone>> getMyBookings() {
        return ApiRespone.<List<TransportBookingRespone>>builder()
                .code(1000)
                .result(transportBookingService.getMyBookings())
                .build();
    }

    // xóa booking
    @DeleteMapping("/{bookingId}")
    public ApiRespone<String> deleteTransportBooking(@PathVariable Integer bookingId) {
        transportBookingService.deleteTransportBooking(bookingId);
        return ApiRespone.<String>builder()
                .code(1000)
                .build();
    }
    
}
