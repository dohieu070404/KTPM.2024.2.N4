package com.example.KTPM.controller;

import com.example.KTPM.dto.request.TranSportCompanyRequest;
import com.example.KTPM.dto.response.ApiRespone;
import com.example.KTPM.dto.response.TranSportCompanyRespone;
import com.example.KTPM.service.TranSportCompanyService;
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
@RequestMapping("/transport")
public class TranSportCompanyController {
    @Autowired
    private TranSportCompanyService tranSportCompanyService;
    //tạo tranSportCompany
    @PostMapping//dat ten api
    public ApiRespone<TranSportCompanyRespone> createTransportCompany(@RequestBody @Valid TranSportCompanyRequest request){
        return ApiRespone.<TranSportCompanyRespone>builder()
                .code(1000)
                .result(tranSportCompanyService.createTranSportCompany(request))
                .build();
    }
    //xem all tranSportCompany của user hiện tại
    @GetMapping("/myTransportCompany")
    public ApiRespone<List<TranSportCompanyRespone>> getMyTransportCompany() {
        var securityContext = SecurityContextHolder.getContext().getAuthentication();
        return ApiRespone.<List<TranSportCompanyRespone>>builder()
                .result(tranSportCompanyService.getMyTranSportCompany())
                .build();
    }

    @PutMapping("/{companyId}")
    public ApiRespone<TranSportCompanyRespone> updateTransportCompany(
            @PathVariable Integer companyId,
            @RequestBody @Valid TranSportCompanyRequest request) {
        return ApiRespone.<TranSportCompanyRespone>builder()
                .code(1000)
                .result(tranSportCompanyService.updateTransportCompany(companyId, request))
                .build();
    }

    @DeleteMapping("/{companyId}")
    public ApiRespone<Void> deleteTransportCompany(@PathVariable Integer companyId) {
        tranSportCompanyService.deleteTransportCompany(companyId);
        return ApiRespone.<Void>builder().code(1000).build();
    }

}
