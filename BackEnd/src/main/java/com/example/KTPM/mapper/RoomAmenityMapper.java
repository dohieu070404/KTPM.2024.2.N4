package com.example.KTPM.mapper;

import com.example.KTPM.dto.request.HotelAmenityRequest;
import com.example.KTPM.dto.request.RoomAmenityRequest;
import com.example.KTPM.dto.response.HotelAmenityRespone;
import com.example.KTPM.dto.response.RoomAmenityRespone;
import com.example.KTPM.entity.HotelAmenity;
import com.example.KTPM.entity.RoomAmenity;
import org.mapstruct.Mapper;

@Mapper(componentModel="spring")
public interface RoomAmenityMapper {
    RoomAmenity toRoomAmenity(RoomAmenityRequest request);
    RoomAmenityRespone toRoomAmenityResponse(RoomAmenity roomAmenity);
}
