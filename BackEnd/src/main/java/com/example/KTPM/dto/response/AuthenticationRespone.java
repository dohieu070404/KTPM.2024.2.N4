package com.example.KTPM.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data//tu dong tao getter setter va ...
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthenticationRespone {
    private String token;
    boolean authenticated;
    private String role;
    private String name;
    private String email;
}
