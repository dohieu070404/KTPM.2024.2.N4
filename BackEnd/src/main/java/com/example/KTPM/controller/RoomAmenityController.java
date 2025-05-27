package com.example.KTPM.controller;

import com.example.KTPM.dto.request.ApiRespone;
import com.example.KTPM.dto.request.RoomAmenityRequest;
import com.example.KTPM.dto.response.RoomAmenityRespone;
import com.example.KTPM.service.RoomAmenityService;
import jakarta.validation.Valid;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Builder
@RestController
@RequestMapping("/roomAmenity")
public class RoomAmenityController {
    @Autowired
    private RoomAmenityService roomAmenityService;
    //tạo roomAmenity
    @PostMapping//dat ten api
    public ApiRespone<RoomAmenityRespone> createRoomAmenity(@RequestBody @Valid RoomAmenityRequest request){
        return ApiRespone.<RoomAmenityRespone>builder()
                .code(1000)
                .result(roomAmenityService.create(request))
                .build();
    }
    //lấy all roomAmenity của room hiện tại
    @GetMapping
    public ApiRespone<List<RoomAmenityRespone>> getAll() {
        return ApiRespone.<List<RoomAmenityRespone>>builder()
                .result(roomAmenityService.getAllRoomAmenitys())
                .build();
    }
    //cập nhật roomAmenity
    @PutMapping("/{roomAmenityId}")
    RoomAmenityRespone updateRoomAmenity(@PathVariable String roomAmenityId, @RequestBody RoomAmenityRequest request){
        return roomAmenityService.updateRoomAmenity(roomAmenityId,request);
    }

}
