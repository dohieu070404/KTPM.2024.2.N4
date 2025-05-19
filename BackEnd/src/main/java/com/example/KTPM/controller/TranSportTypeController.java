package com.example.KTPM.controller;

import com.example.KTPM.dto.request.ApiRespone;
import com.example.KTPM.dto.request.TranSportTypeRequest;
import com.example.KTPM.dto.response.TranSportTypeRespone;
import com.example.KTPM.dto.response.UserRespone;
import com.example.KTPM.service.TranSportTypeService;
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
@RequestMapping("/tranSportType")
public class TranSportTypeController {
    @Autowired
    private TranSportTypeService tranSportTypeService;
    //tạo tranSportType
    @PostMapping//dat ten api
    public ApiRespone<TranSportTypeRespone> createTranSportType(@RequestBody @Valid TranSportTypeRequest request){
        return ApiRespone.<TranSportTypeRespone>builder()
                .code(1000)
                .result(tranSportTypeService.createTranSportType(request))
                .build();
    }
    @GetMapping
    public ApiRespone<List<TranSportTypeRespone>> getAllTranSportType(){
        return ApiRespone.<List<TranSportTypeRespone>>builder()
                .result(tranSportTypeService.getTranSportType())
                .build();
    }
}
