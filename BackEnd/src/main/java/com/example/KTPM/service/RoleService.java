package com.example.KTPM.service;

import com.example.KTPM.dto.request.RoleRequest;
import com.example.KTPM.dto.request.UserUpdateRequest;
import com.example.KTPM.dto.response.RoleRespone;
import com.example.KTPM.dto.response.UserRespone;
import com.example.KTPM.entity.Role;
import com.example.KTPM.entity.User;
import com.example.KTPM.mapper.RoleMapper;
import com.example.KTPM.repository.PermissionRepository;
import com.example.KTPM.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private RoleMapper roleMapper;
    @Autowired
    private PermissionRepository permissionRepository;

    public RoleRespone create(RoleRequest request){
        var role = roleMapper.toRole(request);
        var permissions = permissionRepository.findAllById(request.getPermissions()); // Lấy danh sách Permission từ ID
        role.setPermission(new HashSet<>(permissions));
        return roleMapper.toRoleResponse(roleRepository.save(role));
    }
    public RoleRespone updateRole(String id, RoleRequest request){
        Role tmp=roleRepository.findById(id).orElseThrow(()->new RuntimeException("User not found"));
//        tmp.setName(request.getName());
        tmp.setDescription(request.getDescription());
        var permissions = permissionRepository.findAllById(request.getPermissions()); // Lấy danh sách Permission từ ID
        tmp.setPermission(new HashSet<>(permissions));
        return roleMapper.toRoleResponse(roleRepository.save(tmp));
    }
    //@PreAuthorize("hasAuthority('ADMIN')")
    public List<RoleRespone> getAllRoles() {
        return roleRepository.findAll().stream().map(roleMapper::toRoleResponse).toList();
    }
    public void deleteRole(String name){
        //userRepository.findById(id).orElseThrow(()->new RuntimeException("User not found"));
        roleRepository.deleteById(name);
    }

}
