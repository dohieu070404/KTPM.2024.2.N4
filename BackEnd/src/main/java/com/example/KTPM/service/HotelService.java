package com.example.KTPM.service;

import com.example.KTPM.dto.request.HotelRequest;
import com.example.KTPM.dto.response.HotelRespone;
import com.example.KTPM.entity.*;
import com.example.KTPM.exception.AppException;
import com.example.KTPM.exception.ErrorCode;
import com.example.KTPM.mapper.HotelMapper;
import com.example.KTPM.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class HotelService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private HotelMapper hotelMapper;
    @Autowired
    private HotelRepository hotelRepository;
    @Autowired
    private HotelAmenityRepository hotelAmenityRepository;
    @Autowired
    private HotelImagesRepository hotelImagesRepository;

    public HotelRespone createHotel(HotelRequest request){
        log.info("Service: Create hotel");
        if(hotelRepository.existsByName(request.getName())){
            throw new AppException(ErrorCode.HOTEL_EXISTED);
        }
        Hotel hotel=hotelMapper.toHotel(request);
        var context= SecurityContextHolder.getContext();
        String name=context.getAuthentication().getName();
        User user=userRepository.findByName(name).orElseThrow(()->new AppException(ErrorCode.USER_NOT_EXISTED));
        Integer id=user.getId();
        hotel.setCreateUserId(id);
        var hotelAmenity=hotelAmenityRepository.findAllById(request.getHotelAmenities());
        hotel.setHotelAmenities(new HashSet<>(hotelAmenity));
        return hotelMapper.toHotelRespone(hotelRepository.save(hotel));
    }

    public List<HotelRespone> getFilterByRating() {
        return hotelRepository.findAllByRating().stream().map(hotelMapper::toHotelRespone).toList();
    }

    public List<HotelRespone> getMyHotel(){
        var context=SecurityContextHolder.getContext();
        String name=context.getAuthentication().getName();
        User user=userRepository.findByName(name).orElseThrow(()->new AppException(ErrorCode.USER_NOT_EXISTED));
        Integer id=user.getId();
        return hotelRepository.findAllByUserId(id).stream().map(hotelMapper::toHotelRespone).toList();
    }
    //cập nhật thêm update hotel phần hotel amenity
    public HotelRespone updateHotel(Integer id, HotelRequest request) {
        var context=SecurityContextHolder.getContext();
        String name=context.getAuthentication().getName();
        User user=userRepository.findByName(name)
                        .orElseThrow(()->new AppException(ErrorCode.USER_NOT_EXISTED));
        Integer userId=user.getId();
        Hotel hotel = hotelRepository.findById(id)
                        .orElseThrow(() -> new AppException(ErrorCode.HOTEL_NOT_EXISTED));
        
        if (!hotel.getCreateUserId().equals(userId)) {
            throw new AppException(ErrorCode.UNAUTHORIZED); // lỗi 403
        }

        hotelMapper.updateHotel(hotel, request);
        return hotelMapper.toHotelRespone(hotelRepository.save(hotel));
    }

    public void deleteHotel(Integer id) {
        var context=SecurityContextHolder.getContext();
        String username=context.getAuthentication().getName();
        User user=userRepository.findByName(username)
                        .orElseThrow(()->new AppException(ErrorCode.USER_NOT_EXISTED));
        Hotel hotel = hotelRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.HOTEL_NOT_EXISTED));

        // Chỉ cho phép xóa nếu là người tạo
        if (!hotel.getCreateUserId().equals(user.getId())) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }
        hotelRepository.delete(hotel);
    }
    public HotelRespone getHotel(Integer id) {
        return hotelMapper.toHotelRespone(hotelRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.HOTEL_NOT_EXISTED)));
    }

    public List<HotelRespone> getAllHotel() {
        return hotelRepository.findAll().stream().map(hotel->{
                HotelRespone hotelRespone = hotelMapper.toHotelRespone(hotel);
                String url=hotelImagesRepository.findPrimary(hotel.getId()).getImageUrl();
                hotelRespone.setImageUrl(url);
                return hotelRespone;
            }
        ).toList();
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
