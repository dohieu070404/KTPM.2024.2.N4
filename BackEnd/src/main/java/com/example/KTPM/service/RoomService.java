package com.example.KTPM.service;

import com.example.KTPM.dto.request.RoomRequest;
import com.example.KTPM.dto.response.RoomRespone;
import com.example.KTPM.entity.Hotel;
import com.example.KTPM.entity.RoomType;
import com.example.KTPM.exception.AppException;
import com.example.KTPM.exception.ErrorCode;
import com.example.KTPM.mapper.RoomMapper;
import com.example.KTPM.repository.HotelRepository;
import com.example.KTPM.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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

        Hotel hotel = hotelRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.HOTEL_NOT_EXISTED));
        RoomType room = roomMapper.toRoomType(request);
        room.setHotels(hotel);

        return roomMapper.toRoomRespone(roomRepository.save(room));

    }

    public List<RoomRespone> getHotelRoom(Integer hotelId){
        log.info("Service: Get all rooms for hotel id {}", hotelId);
        hotelRepository.findById(hotelId)
            .orElseThrow(() -> new AppException(ErrorCode.HOTEL_NOT_EXISTED));

        List<RoomType> rooms = roomRepository.findByHotelsId(hotelId);
        return rooms.stream()
            .map(roomMapper::toRoomRespone)
            .toList();
    }
   
    // public List<RoomRespone> getFilterByRating() {
    //     return roomRepository.findAllByRating().stream().map(roomMapper::toRoomRespone).toList();
    // }

    public RoomRespone updateRoom(Integer hotelId, Integer roomId, RoomRequest request) {
        RoomType room = roomRepository.findById(roomId)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_EXISTED));

        if (!room.getHotels().getId().equals(hotelId)) {
            throw new AppException(ErrorCode.ROOM_NOT_EXISTED);
        }

        roomMapper.updateRoom(room, request);
        return roomMapper.toRoomRespone(roomRepository.save(room));
    }

    public void deleteRoom(Integer hotelId, Integer roomId) {
        RoomType room = roomRepository.findById(roomId)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_EXISTED));

        if (!room.getHotels().getId().equals(hotelId)) {
            throw new AppException(ErrorCode.ROOM_NOT_EXISTED);
        }

        roomRepository.delete(room);
    }

    // sắp xếp theo giá giảm dần
    public List<RoomRespone> getRoomsSortedByPrice() {
        return roomRepository.findAllOrderByPriceDesc()
                .stream()
                .map(roomMapper::toRoomRespone)
                .toList();
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
