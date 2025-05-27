package com.example.KTPM.controller;

import com.example.KTPM.dto.request.ApiRespone;
import com.example.KTPM.dto.request.RoomRequest;
import com.example.KTPM.dto.response.HotelRespone;
import com.example.KTPM.dto.response.RoomRespone;
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
@RequestMapping("/room")
public class RoomController {
    @Autowired
    private RoomService roomService;
    //tạo room
    @PostMapping("/{hotelId}")//dat ten api
    public ApiRespone<RoomRespone> createRoom(@PathVariable Integer hotelId, @RequestBody @Valid RoomRequest request){
        return ApiRespone.<RoomRespone>builder()
                .code(1000)
                .result(roomService.createRoom(hotelId,request))
                .build();
    }

    //lấy all room của hotel
    @GetMapping("/{hotelId}")
    public ApiRespone<List<RoomRespone>> getHotelRoom(@PathVariable Integer hotelId) {
        var securityContext = SecurityContextHolder.getContext().getAuthentication();
        return ApiRespone.<List<RoomRespone>>builder()
                .code(1000)
                .result(roomService.getHotelRoom(hotelId))
                .build();
    }

    @PutMapping("/{hotelId}/{roomId}")
    public ApiRespone<RoomRespone> updateRoom(
            @PathVariable Integer hotelId,
            @PathVariable Integer roomId,
            @RequestBody @Valid RoomRequest request) {

        return ApiRespone.<RoomRespone>builder()
                .code(1000)
                .result(roomService.updateRoom(hotelId, roomId, request))
                .build();
    }

    @DeleteMapping("/{hotelId}/{roomId}")
    public ApiRespone<Void> delete(@PathVariable Integer hotelId, @PathVariable Integer roomId) {
            roomService.deleteRoom(hotelId, roomId);
            return ApiRespone.<Void>builder()
                .code(1000)
                .build();
    }

    @GetMapping("/filter/price")
    public ApiRespone<List<RoomRespone>> getRoomsSortedByPrice() {
        return ApiRespone.<List<RoomRespone>>builder()
                .result(roomService.getRoomsSortedByPrice())
                .build();
    }
    @GetMapping("/{roomId}")
    public ApiRespone<RoomRespone> getRoom(@PathVariable Integer roomId) {
        return  ApiRespone.<RoomRespone>builder()
                .result(roomService.getRoom(roomId))
                .build();
    }






//    @GetMapping("/filter")
//    public ApiRespone<List<HotelRespone>> getFilterByRating() {
//        var securityContext = SecurityContextHolder.getContext().getAuthentication();
//        return ApiRespone.<List<HotelRespone>>builder()
//                .result(hotelService.getFilterByRating())
//                .build();
//    }
//    @GetMapping
//    public ApiRespone<List<RoleRespone>> getAll() {
//        //SecurityContextHolder chứa thông tin đăng nhập của USER hiện tại
//        // var securityContext = SecurityContextHolder.getContext().getAuthentication();
//        return ApiRespone.<List<RoleRespone>>builder()
//                .result(roleService.getAllRoles())
//                .build();
//    }

    
}
