package com.example.KTPM.service;

import com.example.KTPM.dto.request.BookingStatusRequest;
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
import java.time.Instant;
import java.util.Arrays;
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

    public RoomBookingRespone updateBookingStatus(Integer bookingId, BookingStatusRequest newStatus) {
        log.info("Service: Update RoomBooking status to {} for ID: {}", newStatus, bookingId);
        log.info("New status received: {}", newStatus);
        // Xác thực trạng thái mới
        if (!Arrays.asList("pending", "confirmed", "cancelled", "completed").contains(newStatus.getStatus().toLowerCase())) {
            throw new AppException(ErrorCode.STATUS_NOT_EXITS);
        }

        // Tìm booking dựa trên ID
        RoomBooking roomBooking = roomBookingRepository.findById(bookingId)
                .orElseThrow(() -> new AppException(ErrorCode.BOOKING_NOT_EXISTED));
        String currentStatus = roomBooking.getStatus().toLowerCase();
        // Lấy thông tin người dùng hiện tại
        var context = SecurityContextHolder.getContext();
        String userName = context.getAuthentication().getName();
        User currentUser = userRepository.findByName(userName)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        // Kiểm tra quyền
        boolean isOwner = roomBooking.getUser().getId().equals(currentUser.getId());
        if (!isOwner) {
            throw new AppException(ErrorCode.USER_NOT_OWNER);
        }
        // Cập nhật trạng thái
        roomBooking.setStatus(newStatus.getStatus());
        roomBooking.setUpdatedAt(Instant.now());
        // Xử lý logic cụ thể cho từng trạng thái
        switch (newStatus.getStatus().toLowerCase()) {
            case "cancelled":
                // Trả lại số lượng phòng đã đặt (chỉ nếu đang từ pending hoặc confirmed)
                if ("pending".equals(currentStatus) || "confirmed".equals(currentStatus)) {
                    RoomType roomType = roomBooking.getRoomType();
                    Integer roomsToReturn = roomBooking.getNumberOfRooms();
                    roomRepository.updateAvailableRooms(roomType.getId(), -roomsToReturn);
                }
                break;

            case "completed":
            case "confirmed":
            case "pending":
                // Logic khác nếu cần
                break;
        }

        // Lưu thay đổi và trả về kết quả
        return roomBookingMapper.toRoomBookingRespone(roomBookingRepository.save(roomBooking));
    }
}
