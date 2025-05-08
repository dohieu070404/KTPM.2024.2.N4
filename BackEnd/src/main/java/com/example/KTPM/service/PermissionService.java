package com.example.KTPM.service;

import com.example.KTPM.dto.request.PermissionRequest;
import com.example.KTPM.dto.response.PermissionRespone;
import com.example.KTPM.entity.Permission;
import com.example.KTPM.mapper.PermissionMapper;
import com.example.KTPM.repository.PermissionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PermissionService {
    @Autowired
    private PermissionRepository permissionRepository;
    @Autowired
    private PermissionMapper permissionMapper;
    public PermissionRespone create(PermissionRequest request){
        Permission permission=permissionMapper.toPermission(request);
        return permissionMapper.toPermissionRespone(permissionRepository.save(permission));
    }
//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<PermissionRespone> getAllPermissions() {
        return permissionRepository.findAll().stream().map(permissionMapper::toPermissionRespone).toList();
    }
    public void deletePermission(String name){
        //userRepository.findById(id).orElseThrow(()->new RuntimeException("User not found"));
        permissionRepository.deleteById(name);
    }
    /*
    public UserRespone getMyInfor(){
        var context=SecurityContextHolder.getContext();
        String name=context.getAuthentication().getName();
        User user=userRepository.findByUsername(name).orElseThrow(()->new AppException(ErrorCode.USER_NOT_EXISTED));
        return userMapper.toUserRespone(user);
    }
    @PostAuthorize("returnObject.username==authentication.name||hasAuthority('SCOPE_ADMIN')")
    public UserRespone getUser(String id) {
        return userMapper.toUserRespone(userRepository.findById(id)
                .orElseThrow(()->new RuntimeException("User not found")));
    }
    public UserRespone updateUser(String id,UserUpdateRequest request){
        User tmp=userRepository.findById(id).orElseThrow(()->new RuntimeException("User not found"));
        userMapper.updateUser(tmp,request);

        // tmp.setPassword(request.getPassword());
        //tmp.setLastName(request.getLastName());
        //tmp.setFirstName(request.getFirstName());
        //tmp.setDob(request.getDob());

        return userMapper.toUserRespone(userRepository.save(tmp));
    }
     */
}
