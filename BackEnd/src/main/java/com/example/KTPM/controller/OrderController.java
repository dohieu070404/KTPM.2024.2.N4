package com.example.KTPM.controller;

import com.example.KTPM.dto.response.ApiRespone;
import com.example.KTPM.dto.request.BookingStatusRequest;
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
    //lấy all order của nguời dùng hiện tại
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

    @PutMapping("/{orderId}/status")
    public ApiRespone<OrderRespone> updateOrderStatus(@PathVariable Integer orderId, @RequestBody @Valid BookingStatusRequest request) {
        return ApiRespone.<OrderRespone>builder()
                .code(1000)
                .result(orderService.updateOrderStatus(orderId, request))
                .build();
    }

    @DeleteMapping("/{orderId}")
    public ApiRespone<Void> deleteOrder(@PathVariable Integer orderId) {
        orderService.deleteOrder(orderId);
        return ApiRespone.<Void>builder()
                .code(1000)
                .build();
    }

}
