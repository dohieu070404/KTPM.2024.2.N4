package com.example.KTPM.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRespone {
    private Integer id; // Đồng bộ với kiểu dữ liệu của User entity
    private String name; // Thay `username` thành `name` nếu cần
//    private Set<RoleRespone> roles; // Bổ sung nếu cần
    private Set<RoleRespone> roles;
}
