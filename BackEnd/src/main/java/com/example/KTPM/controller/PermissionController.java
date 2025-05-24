package com.example.KTPM.controller;

import com.example.KTPM.dto.request.PermissionRequest;
import com.example.KTPM.dto.response.ApiRespone;
import com.example.KTPM.dto.response.PermissionRespone;
import com.example.KTPM.service.PermissionService;
import jakarta.validation.Valid;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Builder
@RestController
@RequestMapping("/permissions")
public class PermissionController {
    @Autowired
    private PermissionService permissionService;
    //tạo permission
    @PostMapping//dat ten api
    public ApiRespone<PermissionRespone> createPermission(@RequestBody @Valid PermissionRequest request){
        return ApiRespone.<PermissionRespone>builder()
                .code(1000)
                .result(permissionService.create(request))
                .build();
    }

    //lấy tất cả permission
    @GetMapping
    public ApiRespone<List<PermissionRespone>> getAll() {
        //SecurityContextHolder chứa thông tin đăng nhập của USER hiện tại
//         var securityContext = SecurityContextHolder.getContext().getAuthentication();
        return ApiRespone.<List<PermissionRespone>>builder()
                .result(permissionService.getAllPermissions())
                .build();
    }

    //xóa permission
    @DeleteMapping("/{permission}")
    ApiRespone<Void> delete(@PathVariable String permission) {
        permissionService.deletePermission(permission);
        return ApiRespone.<Void>builder().build();
    }
    /*
    @GetMapping("/{myInfo}")
    ApiRespone<UserRespone> getMyInfo(){
        return ApiRespone.<UserRespone>builder()
                .result(userService.getMyInfor())
                .build();
    }
    @PutMapping("/{userId}")
    UserRespone updateUser(@PathVariable String userId,@RequestBody UserUpdateRequest request){
        return userService.updateUser(userId,request);
    }
    * */
}
