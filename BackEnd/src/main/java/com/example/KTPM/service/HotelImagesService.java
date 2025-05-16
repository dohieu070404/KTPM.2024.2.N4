package com.example.KTPM.service;

import com.example.KTPM.dto.request.HotelImagesRequest;
import com.example.KTPM.dto.response.HotelImagesRespone;
import com.example.KTPM.entity.HotelImage;
import com.example.KTPM.exception.AppException;
import com.example.KTPM.exception.ErrorCode;
import com.example.KTPM.mapper.HotelImagesMapper;
import com.example.KTPM.mapper.HotelMapper;
import com.example.KTPM.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class HotelImagesService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private HotelImagesRepository hotelImagesRepository;
    @Autowired
    private HotelMapper hotelMapper;
    @Autowired
    private HotelImagesMapper hotelImagesMapper;
    @Autowired
    private HotelRepository hotelRepository;

    public HotelImagesRespone createHotelImage(Integer id,HotelImagesRequest request){
        log.info("Service: Create hotel");
        HotelImage hotelImage=hotelImagesMapper.toHotelImage(request);
        hotelImage.setHotels(hotelRepository.findById(id).orElseThrow(()->new AppException(ErrorCode.USER_NOT_EXISTED)));
        return hotelImagesMapper.toHotelImagesRespone(hotelImagesRepository.save(hotelImage));
    }
    public List<HotelImagesRespone> getMyHotelImage(Integer hotelId){
        return hotelImagesRepository.findAllByHotelId(hotelId).stream().map(hotelImagesMapper::toHotelImagesRespone).toList();
    }












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
