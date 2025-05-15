package com.example.KTPM.service;

import com.example.KTPM.dto.request.RoomImagesRequest;
import com.example.KTPM.dto.response.RoomImagesRespone;
import com.example.KTPM.entity.RoomImage;
import com.example.KTPM.exception.AppException;
import com.example.KTPM.exception.ErrorCode;
import com.example.KTPM.mapper.HotelImagesMapper;
import com.example.KTPM.mapper.RoomImagesMapper;
import com.example.KTPM.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoomImagesService {
    @Autowired
    private HotelImagesRepository hotelImagesRepository;
    @Autowired
    private RoomImagesMapper roomImagesMapper;
    @Autowired
    private HotelImagesMapper hotelImagesMapper;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private RoomImagesRepository roomImagesRepository;


    public RoomImagesRespone createRoomImage(Integer id, RoomImagesRequest request){
        log.info("Service: Create room image");
        RoomImage roomImage=roomImagesMapper.toRoomImage(request);
        roomImage.setRoomType(roomRepository.findById(id).orElseThrow(()->new AppException(ErrorCode.USER_NOT_EXISTED)));
        return roomImagesMapper.toRoomImagesRespone(roomImagesRepository.save(roomImage));
    }
    public List<RoomImagesRespone> getRoomImage(Integer roomId){
        return roomImagesRepository.findAllByRoomId(roomId).stream().map(roomImagesMapper::toRoomImagesRespone).toList();
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
