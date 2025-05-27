package com.example.KTPM.service;

import java.util.List;

public interface CustomerService {
    CustomerResponse create(CustomerRequest request);

    List<CustomerResponse> getAll();

    void approve(Integer id);

    void reject(Integer id);
}

