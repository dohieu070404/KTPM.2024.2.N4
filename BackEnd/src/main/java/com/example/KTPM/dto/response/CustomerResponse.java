package com.example.KTPM.dto.response;

import lombok.Data;

@Data
public class CustomerResponse {
    private Integer id;
    private String name;
    private String phone;
    private String email;
    private String status;
}
