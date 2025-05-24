package com.example.KTPM.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CustomerRequest {
    @NotBlank
    private String name;

    private String phone;

    @NotBlank
    @Email
    private String email;
}
