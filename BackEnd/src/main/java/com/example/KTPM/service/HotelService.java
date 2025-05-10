package com.example.KTPM.service;

import com.example.KTPM.dto.request.HotelRequest;
import com.example.KTPM.dto.response.HotelRespone;
import com.example.KTPM.entity.Hotel;
import com.example.KTPM.entity.User;
import com.example.KTPM.exception.AppException;
import com.example.KTPM.exception.ErrorCode;
import com.example.KTPM.mapper.HotelMapper;
import com.example.KTPM.repository.HotelRepository;
import com.example.KTPM.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class HotelService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private HotelMapper hotelMapper;
    @Autowired
    private HotelRepository hotelRepository;

    public HotelRespone createHotel(HotelRequest request){
        log.info("Service: Create hotel");
        if(userRepository.existsByName(request.getName())){
            throw new AppException(ErrorCode.HOTEL_EXISTED);
        }
        Hotel hotel=hotelMapper.toHotel(request);
        var context= SecurityContextHolder.getContext();
        String name=context.getAuthentication().getName();
        User user=userRepository.findByName(name).orElseThrow(()->new AppException(ErrorCode.USER_NOT_EXISTED));
        Integer id=user.getId();
        hotel.setCreateUserId(id);
//        HashSet<Role> roles=new HashSet<>();
//        roleRepository.findById(Roles.USER.name()).ifPresent(roles::add);
//        user.setRole(roles);

        return hotelMapper.toHotelRespone(hotelRepository.save(hotel));
    }
//    public UserRespone getMyInfor(){
//        var context=SecurityContextHolder.getContext();
//        String name=context.getAuthentication().getName();
//        User user=userRepository.findByName(name).orElseThrow(()->new AppException(ErrorCode.USER_NOT_EXISTED));
//        return userMapper.toUserRespone(user);
//    }
//    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
//    public List<UserRespone> getUsers() {
//        return userRepository.findAll().stream().map(userMapper::toUserRespone).toList();
//    }
//    @PostAuthorize("returnObject.username==authentication.name||hasAuthority('SCOPE_ADMIN')")
//    public UserRespone getUser(String id) {
//        return userMapper.toUserRespone(userRepository.findById(id)
//                .orElseThrow(()->new RuntimeException("User not found")));
//    }
//public UserRespone updateUser(Integer id,UserUpdateRequest request){
//    User tmp=userRepository.findById(id).orElseThrow(()->new RuntimeException("User not found"));
//    PasswordEncoder passwordEncoder=new BCryptPasswordEncoder(10);
//    userMapper.updateUser(tmp,request);
//    tmp.setPassword(passwordEncoder.encode(request.getPassword()));
//    var role=roleRepository.findAllById(request.getRoles());
//    tmp.setRole(new HashSet<>(role));
//    return userMapper.toUserRespone(userRepository.save(tmp));
//}
//    public void deleteUser(Integer id){
//        User user=userRepository.findById(id)
//                .orElseThrow(()->new AppException(ErrorCode.USER_NOT_EXISTED));
//        if(user.getIsDelete()){
//            throw new AppException(ErrorCode.USER_NOT_EXISTED);
//        }
//        user.setDeletedAt(Instant.now());
//        user.setIsDelete(true);
//        userRepository.save(user);
//    }
}
