package com.example.KTPM.service;

import com.example.KTPM.dto.request.RoomRequest;
import com.example.KTPM.dto.response.HotelRespone;
import com.example.KTPM.dto.response.RoomRespone;
import com.example.KTPM.entity.Hotel;
import com.example.KTPM.entity.RoomType;
import com.example.KTPM.entity.User;
import com.example.KTPM.exception.AppException;
import com.example.KTPM.exception.ErrorCode;
import com.example.KTPM.mapper.RoomMapper;
import com.example.KTPM.repository.HotelRepository;
import com.example.KTPM.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoomService {
    @Autowired
    private HotelRepository hotelRepository;
    @Autowired
    private RoomMapper roomMapper;
    @Autowired
    private RoomRepository roomRepository;

    public RoomRespone createRoom(Integer id,RoomRequest request) {
        log.info("Service: Create Room");
        if (roomRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.ROOM_EXISTED);
        }
        RoomType room = roomMapper.toRoomType(request);
        return roomMapper.toRoomRespone(roomRepository.save(room));

    }
    public List<RoomRespone> getHotelRoom(Integer id){
        return roomRepository.findByHotelsId(id).stream().map(roomMapper::toRoomRespone).toList();
    }
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
//    }
//    public List<RoomRespone> getFilterByRating() {
//        return roomRepository.findAllByRating().stream().map(roomMapper::toRoomRespone).toList();
//    }
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
