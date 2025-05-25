package com.example.KTPM.mapper;

import com.example.KTPM.dto.request.OrderDetailRequest;
import com.example.KTPM.dto.response.OrderDetailRespone;
import com.example.KTPM.entity.OrderDetail;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface OrderDetailMapper {
    @Mapping(target = "order", ignore = true)
    OrderDetail toOrderDetail(OrderDetailRequest request);
    OrderDetailRespone toOrderDetailRespone(OrderDetail orderDetail);
}