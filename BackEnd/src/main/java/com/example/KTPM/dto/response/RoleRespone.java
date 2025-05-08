package com.example.KTPM.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoleRespone {
    private String name;
    private String description;
    private Set<PermissionRespone> permissions;
}
