package com.example.KTPM.controller;

import com.example.KTPM.dto.request.ApiRespone;
import com.example.KTPM.dto.request.RoomImagesRequest;
import com.example.KTPM.dto.response.RoomImagesRespone;
import com.example.KTPM.service.RoomImagesService;
import jakarta.validation.Valid;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Builder
@RestController
@RequestMapping("/hotel/room/image")
public class RoomImagesController {
    @Autowired
    private RoomImagesService roomImagesService;
    //tạo hotel image
    @PostMapping("/{room_id}")//dat ten api
    public ApiRespone<RoomImagesRespone> createRoomImage(@PathVariable Integer room_id,@RequestBody @Valid RoomImagesRequest request){
        return ApiRespone.<RoomImagesRespone>builder()
                .code(1000)
                .result(roomImagesService.createRoomImage(room_id,request))
                .build();
    }
    //xem all hotel của user hiện tại
    @GetMapping("/{room_id}")
    public ApiRespone<List<RoomImagesRespone>> getAllRoomImages(@PathVariable Integer room_id) {
        return ApiRespone.<List<RoomImagesRespone>>builder()
                .result(roomImagesService.getRoomImage(room_id))
                .build();
    }












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
