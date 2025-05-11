package com.example.KTPM.controller;

import com.example.KTPM.dto.request.ApiRespone;
import com.example.KTPM.dto.request.HotelRequest;
import com.example.KTPM.dto.response.HotelRespone;
import com.example.KTPM.dto.response.UserRespone;
import com.example.KTPM.service.HotelService;
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
@RequestMapping("/hotel")
public class HotelController {
    @Autowired
    private HotelService hotelService;
    @PostMapping//dat ten api
    public ApiRespone<HotelRespone> createHotel(@RequestBody @Valid HotelRequest request){
        return ApiRespone.<HotelRespone>builder()
                .code(1000)
                .result(hotelService.createHotel(request))
                .build();
    }
    @GetMapping("/filter")
    public ApiRespone<List<HotelRespone>> getFilterByRating() {
        var securityContext = SecurityContextHolder.getContext().getAuthentication();
        return ApiRespone.<List<HotelRespone>>builder()
                .result(hotelService.getFilterByRating())
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
