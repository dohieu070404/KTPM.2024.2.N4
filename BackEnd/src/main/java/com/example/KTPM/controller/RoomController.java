package com.example.KTPM.controller;

import com.example.KTPM.dto.request.ApiRespone;
import com.example.KTPM.dto.request.RoomRequest;
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
    @PostMapping("/{hotel_id}")//dat ten api
    public ApiRespone<RoomRespone> createRoom(@PathVariable Integer hotel_id, @RequestBody @Valid RoomRequest request){
        return ApiRespone.<RoomRespone>builder()
                .code(1000)
                .result(roomService.createRoom(hotel_id,request))
                .build();
    }
    //lấy all room của hotel
    @GetMapping("/{hotel_id}")
    public ApiRespone<List<RoomRespone>> getHotelRoom(@PathVariable Integer hotel_id) {
        var securityContext = SecurityContextHolder.getContext().getAuthentication();
        return ApiRespone.<List<RoomRespone>>builder()
                .result(roomService.getHotelRoom(hotel_id))
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
//    @PutMapping("/{roleId}")
//    RoleRespone updateRole(@PathVariable String roleId, @RequestBody RoleRequest request){
//        return roleService.updateRole(roleId,request);
//    }
//    @DeleteMapping("/{role}")
//    ApiRespone<Void> delete(@PathVariable Integer role) {
//        roleService.deleteRole(role);
//        return ApiRespone.<Void>builder().build();
//    }
}
