package com.example.KTPM.controller;

import com.example.KTPM.dto.request.ApiRespone;
import com.example.KTPM.dto.request.OrderDetailRequest;
import com.example.KTPM.dto.response.OrderDetailRespone;
import com.example.KTPM.service.OrderDetailService;
import jakarta.validation.Valid;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Builder
@RestController
@RequestMapping("/orderDetails")
public class OrderDetailController {
    @Autowired
    private OrderDetailService orderDetailService;
    //tạo orderDetail
    @PostMapping
    public ApiRespone<OrderDetailRespone> createOrderDetail(@RequestBody @Valid  OrderDetailRequest request){
        return ApiRespone.<OrderDetailRespone>builder()
                .code(1000)
                .result(orderDetailService.create(request))
                .build();
    }
    //lấy all orderDetail của order
    @GetMapping("/{orderId}")
    public ApiRespone<List<OrderDetailRespone>> getOrderDetails(@PathVariable Integer orderID) {
        return ApiRespone.<List<OrderDetailRespone>>builder()
                .result(orderDetailService.getAllOrderDetails(orderID))
                .build();
    }

}
