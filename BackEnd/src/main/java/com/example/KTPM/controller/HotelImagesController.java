package com.example.KTPM.controller;

import com.example.KTPM.dto.request.ApiRespone;
import com.example.KTPM.dto.request.HotelImagesRequest;
import com.example.KTPM.dto.request.HotelRequest;
import com.example.KTPM.dto.response.HotelImagesRespone;
import com.example.KTPM.dto.response.HotelRespone;
import com.example.KTPM.service.HotelImagesService;
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
@RequestMapping("/hotel/images")
public class HotelImagesController {
    @Autowired
    private HotelImagesService hotelImagesService;
    //tạo hotel image
    @PostMapping("/{hotel_id}")//dat ten api
    public ApiRespone<HotelImagesRespone> createHotelImage(@PathVariable Integer hotel_id,@RequestBody @Valid HotelImagesRequest request){
        return ApiRespone.<HotelImagesRespone>builder()
                .code(1000)
                .result(hotelImagesService.createHotelImage(hotel_id,request))
                .build();
    }
    //xem all hotel của user hiện tại
    @GetMapping("/{hotel_id}")
    public ApiRespone<List<HotelImagesRespone>> getAllHotelImages(@PathVariable Integer hotel_id) {
        return ApiRespone.<List<HotelImagesRespone>>builder()
                .result(hotelImagesService.getMyHotelImage(hotel_id))
                .build();
    }

    //cập nhật hotel image
    @PutMapping("/update/{image_id}")
        public ApiRespone<HotelImagesRespone> updateHotelImage(
                @PathVariable Integer image_id,
                @RequestBody @Valid HotelImagesRequest request
        ) {
            return ApiRespone.<HotelImagesRespone>builder()
                    .code(1000)
                    .result(hotelImagesService.updateHotelImage(image_id, request))
                    .build();
        }

    //xóa hotel image
    @DeleteMapping("/delete/{image_id}")
    public ApiRespone<Void> deleteHotelImage(@PathVariable Integer image_id) {
        hotelImagesService.deleteHotelImage(image_id);
        return ApiRespone.<Void>builder()
                .code(1000)
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

}
