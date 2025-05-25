package com.example.KTPM.controller;

import com.example.KTPM.dto.request.ApiRespone;
import com.example.KTPM.dto.request.OrderRequest;
import com.example.KTPM.dto.response.OrderRespone;
import com.example.KTPM.service.OrderService;
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
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private OrderService orderService;
    //tạo order
    @PostMapping
    public ApiRespone<OrderRespone> createOrder(@RequestBody @Valid OrderRequest request){
        return ApiRespone.<OrderRespone>builder()
                .code(1000)
                .result(orderService.createOrder(request))
                .build();
    }
    //lấy all order của hotel
    @GetMapping
    public ApiRespone<List<OrderRespone>> getMyOrder() {
        return ApiRespone.<List<OrderRespone>>builder()
                .code(1000)
                .result(orderService.getMyOrder())
                .build();
    }
    @GetMapping("/{orderId}")
    public ApiRespone<OrderRespone> getOrder(@PathVariable Integer orderId) {
        return  ApiRespone.<OrderRespone>builder()
                .result(orderService.getOrder(orderId))
                .build();
    }

}
