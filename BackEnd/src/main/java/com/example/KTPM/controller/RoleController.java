package com.example.KTPM.controller;

import com.example.KTPM.dto.request.ApiRespone;
import com.example.KTPM.dto.request.RoleRequest;
import com.example.KTPM.dto.response.RoleRespone;
import com.example.KTPM.service.RoleService;
import jakarta.validation.Valid;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Builder
@RestController
@RequestMapping("/roles")
public class RoleController {
    @Autowired
    private RoleService roleService;
    @PostMapping//dat ten api
    public ApiRespone<RoleRespone> createRole(@RequestBody @Valid  RoleRequest request){
        return ApiRespone.<RoleRespone>builder()
                .code(1000)
                .result(roleService.create(request))
                .build();
    }
    @GetMapping
    public ApiRespone<List<RoleRespone>> getAll() {
        //SecurityContextHolder chứa thông tin đăng nhập của USER hiện tại
        // var securityContext = SecurityContextHolder.getContext().getAuthentication();
        return ApiRespone.<List<RoleRespone>>builder()
                .result(roleService.getAllRoles())
                .build();
    }
    @PutMapping("/{roleId}")
    RoleRespone updateRole(@PathVariable String roleId, @RequestBody RoleRequest request){
        return roleService.updateRole(roleId,request);
    }
//    @DeleteMapping("/{role}")
//    ApiRespone<Void> delete(@PathVariable Integer role) {
//        roleService.deleteRole(role);
//        return ApiRespone.<Void>builder().build();
//    }
}
