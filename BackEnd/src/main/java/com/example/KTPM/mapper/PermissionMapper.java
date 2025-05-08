package com.example.KTPM.mapper;

import com.example.KTPM.dto.request.PermissionRequest;
import com.example.KTPM.dto.response.PermissionRespone;
import com.example.KTPM.entity.Permission;
import org.mapstruct.Mapper;

@Mapper(componentModel="spring")
public interface PermissionMapper {
    Permission toPermission(PermissionRequest request);
    PermissionRespone toPermissionRespone(Permission permission);
}
