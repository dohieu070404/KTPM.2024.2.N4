package com.example.KTPM.service;

import com.example.KTPM.dto.request.UserCreationRequest;
import com.example.KTPM.dto.request.UserUpdateRequest;
import com.example.KTPM.dto.response.UserRespone;
import com.example.KTPM.entity.Role;
import com.example.KTPM.entity.User;
import com.example.KTPM.enums.Roles;
import com.example.KTPM.exception.AppException;
import com.example.KTPM.exception.ErrorCode;
import com.example.KTPM.mapper.UserMapper;
import com.example.KTPM.repository.RoleRepository;
import com.example.KTPM.repository.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private RoleRepository roleRepository;
    public User createUser(UserCreationRequest request){
        log.info("Service: Create user");
        if(userRepository.existsByName(request.getName())){
            throw new RuntimeException("ErrorCode UNKNOWN_EXCEPTION");
//            throw new AppException(ErrorCode.USER_EXISTED);
        }
        User user=userMapper.toUser(request);
        PasswordEncoder passwordEncoder=new BCryptPasswordEncoder(10);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        HashSet<Role> roles=new HashSet<>();
        roleRepository.findById(Roles.USER.name()).ifPresent(roles::add);
        user.setRole(roles);
        user.setStatus("active");
        return userRepository.save(user);
    }
    public UserRespone getMyInfor(){
        var context=SecurityContextHolder.getContext();
        String name=context.getAuthentication().getName();
        User user=userRepository.findByName(name).orElseThrow(()->new AppException(ErrorCode.USER_NOT_EXISTED));
        return userMapper.toUserRespone(user);
    }
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public List<UserRespone> getUsers() {
        return userRepository.findAll().stream().map(userMapper::toUserRespone).toList();
    }
//    @PostAuthorize("returnObject.username==authentication.name||hasAuthority('SCOPE_ADMIN')")
//    public UserRespone getUser(String id) {
//        return userMapper.toUserRespone(userRepository.findById(id)
//                .orElseThrow(()->new RuntimeException("User not found")));
//    }
public UserRespone updateUser(Integer id,UserUpdateRequest request){
    User tmp=userRepository.findById(id).orElseThrow(()->new RuntimeException("User not found"));
    PasswordEncoder passwordEncoder=new BCryptPasswordEncoder(10);
    userMapper.updateUser(tmp,request);
    tmp.setPassword(passwordEncoder.encode(request.getPassword()));
    var role=roleRepository.findAllById(request.getRoles());
    tmp.setRole(new HashSet<>(role));
    return userMapper.toUserRespone(userRepository.save(tmp));
}
    public void deleteUser(Integer id){
        User user=userRepository.findById(id)
                .orElseThrow(()->new AppException(ErrorCode.USER_NOT_EXISTED));
        if(user.getIsDelete()){
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }
        user.setDeletedAt(Instant.now());
        user.setIsDelete(true);
        userRepository.save(user);
    }

}
