package com.example.KTPM.service;

import com.example.KTPM.dto.request.OrderDetailRequest;
import com.example.KTPM.dto.response.OrderDetailRespone;
import com.example.KTPM.entity.Order;
import com.example.KTPM.entity.RoomType;
import com.example.KTPM.exception.AppException;
import com.example.KTPM.exception.ErrorCode;
import com.example.KTPM.mapper.OrderDetailMapper;
import com.example.KTPM.repository.OrderRepository;
import com.example.KTPM.repository.OrderDetailRepository;
import com.example.KTPM.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderDetailService {
    @Autowired
    private OrderDetailRepository orderDetailRepository;
    @Autowired
    private OrderDetailMapper orderDetailMapper;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private RoomRepository roomRepository;

    public OrderDetailRespone create(OrderDetailRequest request){
        Order order=orderRepository.findById(request.getOrder()).orElseThrow(()->new AppException(ErrorCode.ORDER_NOT_EXISTED));
        var orderDetail = orderDetailMapper.toOrderDetail(request);
        orderDetail.setOrder(order);
        orderDetail.setItemId(request.getItemId());
//        RoomType room=roomRepository.findById(request.getItemId()).orElseThrow(()->new AppException(ErrorCode.ROOM_NOT_EXISTED));

        return orderDetailMapper.toOrderDetailRespone(orderDetailRepository.save(orderDetail));
    }
    //@PreAuthorize("hasAuthority('ADMIN')")
    public List<OrderDetailRespone> getAllOrderDetails(Integer orderId) {
        return orderDetailRepository.findAllByOrderId(orderId).stream().map(orderDetailMapper::toOrderDetailRespone).toList();
    }


}
