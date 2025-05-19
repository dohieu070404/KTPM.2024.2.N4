package com.example.KTPM.controller;

import com.example.KTPM.dto.request.ApiRespone;
import com.example.KTPM.dto.request.TranSportRequest;
import com.example.KTPM.dto.response.TranSportRespone;
import com.example.KTPM.service.TranSportService;
import jakarta.validation.Valid;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
@Slf4j
@Builder
@RestController
@RequestMapping("/tranSport")
public class TranSportController {
    @Autowired
    private TranSportService tranSportService;
    //tạo tranSport
    @PostMapping("/{company_id}")//dat ten api
    public ApiRespone<TranSportRespone> createTransport(@PathVariable Integer company_id,@RequestBody @Valid TranSportRequest request){
        return ApiRespone.<TranSportRespone>builder()
                .code(1000)
                .result(tranSportService.createTransport(company_id,request))
                .build();
    }
}
