package com.example.KTPM.mapper;

import com.example.KTPM.dto.request.RoleRequest;
import com.example.KTPM.dto.request.UserUpdateRequest;
import com.example.KTPM.dto.response.RoleRespone;
import com.example.KTPM.entity.Role;
import com.example.KTPM.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel="spring")
public interface RoleMapper {
    @Mapping(target = "permission", ignore = true) // Để xử lý trong Service
    Role toRole(RoleRequest request);
    @Mapping(source = "permission", target = "permissions")
    RoleRespone toRoleResponse(Role role);
//    void updateRole(@MappingTarget Role role, RoleRequest request);
}
