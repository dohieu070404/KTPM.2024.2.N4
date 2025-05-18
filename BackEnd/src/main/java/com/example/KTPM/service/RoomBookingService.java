package com.example.KTPM.service;

import com.example.KTPM.dto.request.RoomBookingRequest;
import com.example.KTPM.dto.response.RoomBookingRespone;
import com.example.KTPM.entity.RoomBooking;
import com.example.KTPM.entity.RoomType;
import com.example.KTPM.entity.User;
import com.example.KTPM.exception.AppException;
import com.example.KTPM.exception.ErrorCode;
import com.example.KTPM.mapper.RoomBookingMapper;
import com.example.KTPM.repository.RoomBookingRepository;
import com.example.KTPM.repository.RoomRepository;
import com.example.KTPM.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoomBookingService {
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoomBookingMapper roomBookingMapper;
    @Autowired
    private RoomBookingRepository roomBookingRepository;

    public RoomBookingRespone createRoomBooking(Integer room_id,RoomBookingRequest request) {
        log.info("Service: Create RoomBooking");
        RoomBooking roomBooking = roomBookingMapper.toRoomBooking(request);
        var context= SecurityContextHolder.getContext();
        String name=context.getAuthentication().getName();
        User user=userRepository.findByName(name).orElseThrow(()->new AppException(ErrorCode.USER_NOT_EXISTED));
        roomBooking.setUser(user);
        RoomType room=roomRepository.findById(room_id).orElseThrow(()->new AppException(ErrorCode.ROOM_NOT_EXISTED));
        roomBooking.setRoomType(room);
        BigDecimal price=roomRepository.totalRoomPrice(room_id,request.getNumberOfRooms());
        roomRepository.updateAvailableRooms(room_id,request.getNumberOfRooms());
        roomBooking.setTotalPrice(price);
        roomBooking.setStatus("pending");
        return roomBookingMapper.toRoomBookingRespone(roomBookingRepository.save(roomBooking));
    }
}
