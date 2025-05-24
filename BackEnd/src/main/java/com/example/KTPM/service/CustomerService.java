package com.example.KTPM.service;

import com.example.KTPM.dto.request.CustomerRequest;
import com.example.KTPM.dto.response.CustomerResponse;

import java.util.List;

public interface CustomerService {
    CustomerResponse create(CustomerRequest request);

    List<CustomerResponse> getAll();

    void approve(Integer id);

    void reject(Integer id);
}

