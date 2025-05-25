package com.example.KTPM.controller;

import com.example.KTPM.dto.request.UpdateRoleRequest;
import com.example.KTPM.dto.request.UserCreationRequest;
import com.example.KTPM.dto.request.UserUpdateRequest;
import com.example.KTPM.dto.response.ApiRespone;
import com.example.KTPM.dto.response.UserRespone;
import com.example.KTPM.entity.User;
import com.example.KTPM.service.UserService;
import jakarta.validation.Valid;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Builder
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;
    //tạo user
    @PostMapping//dat ten ap
    public ApiRespone<User> createUser(@RequestBody @Valid UserCreationRequest request){
        log.info("Controller: Create user");
        ApiRespone<User> apiRespone=new ApiRespone<>();
        apiRespone.setCode(1000);
        apiRespone.setResult(userService.createUser(request));
        return apiRespone;
    }
    //admin lấy thông tin của all user
    @GetMapping
    public ApiRespone<List<UserRespone>> getAllUsers(){
        return ApiRespone.<List<UserRespone>>builder()
                .result(userService.getUsers())
                .build();
    }
    //lấy thông tin  của user đang yêu cầu cấp quyền customer
    @GetMapping("/updateRoleUser")
    public ApiRespone<List<UserRespone>> getAllRequests(){
        return ApiRespone.<List<UserRespone>>builder()
                .result(userService.getRoleRequest())
                .build();
    }
    //lấy thông tin của user hiện tại
    @GetMapping("/{myInfo}")
    ApiRespone<UserRespone> getMyInfo(){
        return ApiRespone.<UserRespone>builder()
                .result(userService.getMyInfor())
                .build();
    }
    //cập nhật user
    @PutMapping("/{userId}")
    UserRespone updateUser(@PathVariable Integer userId, @RequestBody UserUpdateRequest request){
        return userService.updateUser(userId,request);
    }
    //yêu cầu nâng role
    @PutMapping("/requestRole")
    UserRespone requestUserRole(){
        return userService.requestRole();
    }
    //phản hồi nâng role
    @PutMapping("/reRole")
    UserRespone responeUserRole(@RequestBody UpdateRoleRequest request){
        return userService.responeRole(request);
    }


    //xóa user
    @DeleteMapping("/{userId}")
    String deleteUser(@PathVariable Integer userId){
        userService.deleteUser(userId);
        return "Deleted Successfully";
    }

    // Yêu cầu trở thành CUSTOMER
    @PatchMapping("/request-customer")
    public ResponseEntity<?> requestBecomeCustomer(@AuthenticationPrincipal UserDetails userDetails) {
        userService.upgradeToCustomer(userDetails.getUsername());
        return ResponseEntity.ok("Request thành công. Bạn đã trở thành CUSTOMER.");
    }

}
