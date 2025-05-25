
package com.example.KTPM.service;

import com.example.KTPM.dto.request.OrderRequest;
import com.example.KTPM.dto.response.OrderRespone;
import com.example.KTPM.entity.Order;
import com.example.KTPM.entity.User;
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
        var context= SecurityContextHolder.getContext();
        String name=context.getAuthentication().getName();
        User user=userRepository.findByName(name).orElseThrow(()->new AppException(ErrorCode.USER_NOT_EXISTED));
        Order order = orderMapper.toOrder(request);
        order.setUser(user);
        order.setStatus("pending");
        return orderMapper.toOrderRespone(orderRepository.save(order));

    }

    public List<OrderRespone> getMyOrder(){
        var context= SecurityContextHolder.getContext();
        String name=context.getAuthentication().getName();
        User user=userRepository.findByName(name).orElseThrow(()->new AppException(ErrorCode.USER_NOT_EXISTED));
        List<Order> orders = orderRepository.findAllByUser(user);
        return orders.stream()
            .map(orderMapper::toOrderRespone)
            .toList();
    }
    public OrderRespone getOrder(Integer id) {
        return orderMapper.toOrderRespone(orderRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_EXISTED)));
    }
    
}
