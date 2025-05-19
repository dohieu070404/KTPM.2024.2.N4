package com.example.KTPM.service;

import com.example.KTPM.dto.request.BookingStatusRequest;
import com.example.KTPM.dto.request.TransportBookingRequest;
import com.example.KTPM.dto.response.TransportBookingRespone;
import com.example.KTPM.entity.Transport;
import com.example.KTPM.entity.TransportBooking;
import com.example.KTPM.entity.User;
import com.example.KTPM.exception.AppException;
import com.example.KTPM.exception.ErrorCode;
import com.example.KTPM.mapper.TransportBookingMapper;
import com.example.KTPM.repository.TranSportRepository;
import com.example.KTPM.repository.TransportBookingRepository;
import com.example.KTPM.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Arrays;

@Service
@RequiredArgsConstructor
@Slf4j
public class TransportBookingService {
    @Autowired
    private TranSportRepository transportRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TransportBookingMapper transportBookingMapper;
    @Autowired
    private TransportBookingRepository transportBookingRepository;

    public TransportBookingRespone createTransportBooking(Integer transport_id,TransportBookingRequest request) {
        log.info("Service: Create TransportBooking");
        TransportBooking transportBooking = transportBookingMapper.toTransportBooking(request);
        var context= SecurityContextHolder.getContext();
        String name=context.getAuthentication().getName();
        User user=userRepository.findByName(name).orElseThrow(()->new AppException(ErrorCode.USER_NOT_EXISTED));
        transportBooking.setUser(user);
        Transport transport=transportRepository.findById(transport_id).orElseThrow(()->new AppException(ErrorCode.TRANSPORT_NOT_EXISTED));
        transportBooking.setTransport(transport);
        BigDecimal price=transportRepository.totalTransportPrice(transport_id,request.getNumberOfSeats());
        transportRepository.updateAvailableTransports(transport_id,request.getNumberOfSeats());
        transportBooking.setTotalPrice(price);
        transportBooking.setStatus("pending");
        return transportBookingMapper.toTransportBookingRespone(transportBookingRepository.save(transportBooking));
    }

    public TransportBookingRespone updateBookingStatus(Integer bookingId, BookingStatusRequest newStatus) {
        log.info("Service: Update TransportBooking status to {} for ID: {}", newStatus, bookingId);
        log.info("New status received: {}", newStatus);
        // Xác thực trạng thái mới
        if (!Arrays.asList("pending", "confirmed", "cancelled", "completed").contains(newStatus.getStatus().toLowerCase())) {
            throw new AppException(ErrorCode.STATUS_NOT_EXITS);
        }

        // Tìm booking dựa trên ID
        TransportBooking transportBooking = transportBookingRepository.findById(bookingId)
                .orElseThrow(() -> new AppException(ErrorCode.BOOKING_NOT_EXISTED));
        String currentStatus = transportBooking.getStatus().toLowerCase();
        // Lấy thông tin người dùng hiện tại
        var context = SecurityContextHolder.getContext();
        String userName = context.getAuthentication().getName();
        User currentUser = userRepository.findByName(userName)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        // Kiểm tra quyền
        boolean isOwner = transportBooking.getTransport().getTransportCompany().getCreateUserId().equals(currentUser.getId());
        if (!isOwner) {
            throw new AppException(ErrorCode.USER_NOT_OWNER);
        }
        // Cập nhật trạng thái
        transportBooking.setStatus(newStatus.getStatus());
        transportBooking.setUpdatedAt(Instant.now());
        // Xử lý logic cụ thể cho từng trạng thái
        switch (newStatus.getStatus().toLowerCase()) {
            case "cancelled":
                // Trả lại số lượng phòng đã đặt (chỉ nếu đang từ pending hoặc confirmed)
                if ("pending".equals(currentStatus) || "confirmed".equals(currentStatus)) {
                    Transport transport = transportBooking.getTransport();
                    Integer transportsToReturn = transportBooking.getNumberOfSeats();
                    transportRepository.updateAvailableTransports(transport.getId(), -transportsToReturn);
                }
                break;

            case "completed":
            case "confirmed":
            case "pending":
                // Logic khác nếu cần
                break;
        }
        return transportBookingMapper.toTransportBookingRespone(transportBookingRepository.save(transportBooking));
    }
}
