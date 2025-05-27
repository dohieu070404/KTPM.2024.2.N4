package com.example.KTPM.service.impl;

import com.example.KTPM.mapper.CustomerMapper;
import com.example.KTPM.repository.CustomerRepository;
import com.example.KTPM.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    @Override
    public CustomerResponse create(CustomerRequest request) {
        Customer customer = customerMapper.toEntity(request);
        customer = customerRepository.save(customer);
        return customerMapper.toResponse(customer);
    }

    @Override
    public List<CustomerResponse> getAll() {
        return customerRepository.findAll().stream()
                .map(customerMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void approve(Integer id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        customer.setStatus("APPROVED");
        customerRepository.save(customer);
    }

    @Override
    public void reject(Integer id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        customer.setStatus("REJECTED");
        customerRepository.save(customer);
    }
}
