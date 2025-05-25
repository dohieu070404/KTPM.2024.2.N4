package com.example.KTPM.service;

import com.example.KTPM.dto.request.OrderDetailRequest;
import com.example.KTPM.dto.response.OrderDetailRespone;
import com.example.KTPM.entity.Order;
import com.example.KTPM.entity.OrderDetail;
import com.example.KTPM.entity.User;
import com.example.KTPM.exception.AppException;
import com.example.KTPM.exception.ErrorCode;
import com.example.KTPM.mapper.OrderDetailMapper;
import com.example.KTPM.repository.OrderRepository;
import com.example.KTPM.repository.PermissionRepository;
import com.example.KTPM.repository.OrderDetailRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
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

    public OrderDetailRespone create(OrderDetailRequest request){
        Order order=orderRepository.findById(request.getOrder())
                .orElseThrow(()->new AppException(ErrorCode.ORDER_NOT_EXISTED));
        if (order.getIsDeleted() != null && order.getIsDeleted()) {
            throw new AppException(ErrorCode.ORDER_NOT_EXISTED);
        }

        var orderDetail = orderDetailMapper.toOrderDetail(request);
        orderDetail.setOrder(order);
        return orderDetailMapper.toOrderDetailRespone(orderDetailRepository.save(orderDetail));
    }
    //@PreAuthorize("hasAuthority('ADMIN')")
    public List<OrderDetailRespone> getAllOrderDetails(Integer orderId) {
        return orderDetailRepository.findAllByOrderId(orderId).stream().map(orderDetailMapper::toOrderDetailRespone).toList();
    }

    public OrderDetailRespone update(Integer id, OrderDetailRequest request) {
        OrderDetail orderDetail = orderDetailRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_DETAIL_NOT_FOUND));

        Order order = orderRepository.findById(request.getOrder())
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_EXISTED));

        if (order.getIsDeleted() != null && order.getIsDeleted()) {
            throw new AppException(ErrorCode.ORDER_NOT_EXISTED);
        }

        orderDetail.setOrder(order);
        orderDetail.setItemType(request.getItemType());
        orderDetail.setItemId(request.getItemId());
        orderDetail.setPrice(request.getPrice());

        return orderDetailMapper.toOrderDetailRespone(orderDetailRepository.save(orderDetail));
    }

    public void delete(Integer id) {
        OrderDetail orderDetail = orderDetailRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_DETAIL_NOT_FOUND));
        orderDetailRepository.delete(orderDetail);
    }


}
