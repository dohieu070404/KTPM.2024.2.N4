package com.example.KTPM.mapper;
import com.example.KTPM.dto.request.OrderRequest;
import com.example.KTPM.dto.response.OrderRespone;
import com.example.KTPM.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel="spring")
public interface OrderMapper {
    @Mapping(target = "user", ignore = true)
//    @Mapping(target = "status", ignore = true)
    Order toOrder(OrderRequest request);
    OrderRespone toOrderRespone(Order order);
    void updateOrder(@MappingTarget Order order, OrderRequest request);
}