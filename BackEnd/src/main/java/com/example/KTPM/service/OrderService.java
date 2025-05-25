package com.example.KTPM.service;

import com.example.KTPM.dto.request.BookingStatusRequest;
import com.example.KTPM.dto.request.OrderRequest;
import com.example.KTPM.dto.response.OrderRespone;
import com.example.KTPM.entity.Order;
import com.example.KTPM.entity.User;
import com.example.KTPM.enums.OrderStatus;
import com.example.KTPM.exception.AppException;
import com.example.KTPM.exception.ErrorCode;
import com.example.KTPM.mapper.OrderMapper;
import com.example.KTPM.repository.OrderRepository;
import com.example.KTPM.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrderMapper orderMapper;
    @Autowired
    private OrderRepository orderRepository;

    public OrderRespone createOrder(OrderRequest request) {
        log.info("Service: Create Order");

        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByName(name)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Order order = orderMapper.toOrder(request);
        order.setUser(user);
        order.setStatus(OrderStatus.pending);

        return orderMapper.toOrderRespone(orderRepository.save(order));
    }

    public List<OrderRespone> getMyOrder() {
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByName(name)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        List<Order> orders = orderRepository.findAllByUserAndIsDeletedFalse(user);
        return orders.stream().map(orderMapper::toOrderRespone).toList();
    }

    public OrderRespone getOrder(Integer id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_EXISTED));
        return orderMapper.toOrderRespone(order);
    }

    public OrderRespone updateOrderStatus(Integer orderId, BookingStatusRequest request) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_EXISTED));

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByName(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        if (!order.getUser().getId().equals(currentUser.getId())) {
            throw new AppException(ErrorCode.USER_NOT_OWNER);
        }

        try {
            OrderStatus newStatus = OrderStatus.valueOf(request.getStatus().toLowerCase());
            order.setStatus(newStatus);
        } catch (IllegalArgumentException e) {
            throw new AppException(ErrorCode.STATUS_NOT_EXITS);
        }

        return orderMapper.toOrderRespone(orderRepository.save(order));
    }

    public void deleteOrder(Integer id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_EXISTED));

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByName(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new AppException(ErrorCode.USER_NOT_OWNER);
        }

        order.setIsDeleted(true);
        order.setDeletedAt(Instant.now());
        orderRepository.save(order);
    }


}
