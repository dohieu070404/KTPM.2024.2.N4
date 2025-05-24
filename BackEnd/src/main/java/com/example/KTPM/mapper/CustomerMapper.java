package com.example.KTPM.mapper;

import com.example.KTPM.dto.request.CustomerRequest;
import com.example.KTPM.dto.response.CustomerResponse;
import com.example.KTPM.entity.Customer;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
public class CustomerMapper {

    public Customer toEntity(CustomerRequest request) {
        return Customer.builder()
                .name(request.getName())
                .phone(request.getPhone())
                .email(request.getEmail())
                .status("PENDING")
                .createdAt(Instant.now())
                .build();
    }

    public CustomerResponse toResponse(Customer customer) {
        CustomerResponse response = new CustomerResponse();
        response.setId(customer.getId());
        response.setName(customer.getName());
        response.setPhone(customer.getPhone());
        response.setEmail(customer.getEmail());
        response.setStatus(customer.getStatus());
        return response;
    }
}
