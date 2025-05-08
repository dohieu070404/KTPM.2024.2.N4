package com.example.KTPM.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data//tu dong tao getter setter va ...
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class AuthenticationRequest {
    private String user;
    private String password;
}
