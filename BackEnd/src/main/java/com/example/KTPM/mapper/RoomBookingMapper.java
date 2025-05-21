package com.example.KTPM.mapper;
import com.example.KTPM.dto.request.RoomBookingRequest;
import com.example.KTPM.dto.request.RoomRequest;
import com.example.KTPM.dto.response.RoomBookingRespone;
import com.example.KTPM.dto.response.RoomRespone;
import com.example.KTPM.entity.RoomBooking;
import com.example.KTPM.entity.RoomType;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel="spring")
public interface RoomBookingMapper {
    //    @Mapping(target = "createat", source = "dob")
        @Mapping(target = "user", ignore = true)
        @Mapping(target = "roomType", ignore = true)
        @Mapping(target = "totalPrice", ignore = true)
    RoomBooking toRoomBooking(RoomBookingRequest request);
    //    @Mapping(source = "role", target = "roles")
    RoomBookingRespone toRoomBookingRespone(RoomBooking roomBooking);
    //    @Mapping(target = "role", ignore = true)
    void updateRoom(@MappingTarget RoomBooking roomBooking, RoomBookingRequest request);
}
