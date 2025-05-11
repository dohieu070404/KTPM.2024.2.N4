package com.example.KTPM.controller;

import com.example.KTPM.dto.request.ApiRespone;
import com.example.KTPM.dto.request.UserCreationRequest;
import com.example.KTPM.dto.request.UserUpdateRequest;
import com.example.KTPM.dto.response.UserRespone;
import com.example.KTPM.entity.User;
import com.example.KTPM.service.UserService;
import jakarta.validation.Valid;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
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
        //SecurityContextHolder chứa thông tin đăng nhập của USER hiện tại
         var securityContext = SecurityContextHolder.getContext().getAuthentication();
        return ApiRespone.<List<UserRespone>>builder()
                .result(userService.getUsers())
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

    //xóa user
    @DeleteMapping("/{userId}")
    String deleteUser(@PathVariable Integer userId){
        userService.deleteUser(userId);
        return "Deleted Successfully";
    }
}
