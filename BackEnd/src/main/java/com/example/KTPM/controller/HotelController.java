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
    //tạo hotel
    @PostMapping//dat ten api
    public ApiRespone<HotelRespone> createHotel(@RequestBody @Valid HotelRequest request){
        return ApiRespone.<HotelRespone>builder()
                .code(1000)
                .result(hotelService.createHotel(request))
                .build();
    }
    //lấy hotel theo rating thứ tự giảm dần
    @GetMapping("/filter")
    public ApiRespone<List<HotelRespone>> getFilterByRating() {
        var securityContext = SecurityContextHolder.getContext().getAuthentication();
        return ApiRespone.<List<HotelRespone>>builder()
                .result(hotelService.getFilterByRating())
                .build();
    }
    //xem all hotel của user hiện tại
    @GetMapping("/myHotel")
    public ApiRespone<List<HotelRespone>> getMyHotel() {
        var securityContext = SecurityContextHolder.getContext().getAuthentication();
        return ApiRespone.<List<HotelRespone>>builder()
                .result(hotelService.getMyHotel())
                .build();
    }
    @GetMapping("/{hotelId}")
    public ApiRespone<HotelRespone> getHotel(@PathVariable Integer hotelId) {
        return  ApiRespone.<HotelRespone>builder()
                .result(hotelService.getHotel(hotelId))
                .build();
    }
    @GetMapping()
    public ApiRespone<List<HotelRespone>> getAllHotel() {
        return  ApiRespone.<List<HotelRespone>>builder()
                .result(hotelService.getAllHotel())
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

    // update hotel
    @PutMapping("/{id}")
    public ApiRespone<HotelRespone> updateHotel(
            @PathVariable Integer id,
            @RequestBody @Valid HotelRequest request) {
        return ApiRespone.<HotelRespone>builder()
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
