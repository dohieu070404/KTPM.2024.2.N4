package com.example.KTPM.controller;

import com.example.KTPM.dto.request.CustomerRequest;
import com.example.KTPM.dto.response.CustomerResponse;
import com.example.KTPM.dto.response.ApiRespone;
import com.example.KTPM.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/customer")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    // Gửi yêu cầu trở thành customer
    @PostMapping
    public ApiRespone<CustomerResponse> create(@RequestBody CustomerRequest request) {
        CustomerResponse response = customerService.create(request);
        return ApiRespone.<CustomerResponse>builder()
                .code(1000)
                .result(response)
                .build();
    }

    // Admin: lấy toàn bộ danh sách yêu cầu customer
    @GetMapping
    public ApiRespone<List<CustomerResponse>> getAll() {
        List<CustomerResponse> list = customerService.getAll();
        return ApiRespone.<List<CustomerResponse>>builder()
                .code(1000)
                .result(list)
                .build();
    }

    // Admin: duyệt yêu cầu
    @PatchMapping("/{id}/approve")
    public ApiRespone<Void> approve(@PathVariable Integer id) {
        customerService.approve(id);
        return ApiRespone.<Void>builder()
                .code(1000)
                .message("Duyệt yêu cầu thành công")
                .build();
    }

    // Admin: từ chối yêu cầu
    @PatchMapping("/{id}/reject")
    public ApiRespone<Void> reject(@PathVariable Integer id) {
        customerService.reject(id);
        return ApiRespone.<Void>builder()
                .code(1000)
                .message("Từ chối yêu cầu thành công")
                .build();
    }
}
