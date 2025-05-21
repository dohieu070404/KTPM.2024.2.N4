package com.example.KTPM.mapper;
import com.example.KTPM.dto.request.RoomBookingRequest;
import com.example.KTPM.dto.request.TransportBookingRequest;
import com.example.KTPM.dto.response.RoomBookingRespone;
import com.example.KTPM.dto.response.TransportBookingRespone;
import com.example.KTPM.entity.RoomBooking;
import com.example.KTPM.entity.TransportBooking;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel="spring")
public interface TransportBookingMapper {
    //    @Mapping(target = "createat", source = "dob")
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "transport", ignore = true)
    @Mapping(target = "totalPrice", ignore = true)
    TransportBooking toTransportBooking(TransportBookingRequest request);
    //    @Mapping(source = "role", target = "roles")
    TransportBookingRespone toTransportBookingRespone(TransportBooking transportBooking);
    //    @Mapping(target = "role", ignore = true)
    void updateTransport(@MappingTarget TransportBooking transportBooking, TransportBookingRequest request);
}
