package com.example.KTPM.controller;

import com.example.KTPM.dto.request.CustomerRequest;
import com.example.KTPM.dto.response.CustomerResponse;
import com.example.KTPM.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping
    public CustomerResponse create(@RequestBody CustomerRequest request) {
        return customerService.create(request);
    }

    @GetMapping
    public List<CustomerResponse> getAll() {
        return customerService.getAll();
    }

    @PatchMapping("/{id}/approve")
    public void approve(@PathVariable Integer id) {
        customerService.approve(id);
    }

    @PatchMapping("/{id}/reject")
    public void reject(@PathVariable Integer id) {
        customerService.reject(id);
    }
}
