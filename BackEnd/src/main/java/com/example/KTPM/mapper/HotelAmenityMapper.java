package com.example.KTPM.mapper;

import com.example.KTPM.dto.request.HotelAmenityRequest;
import com.example.KTPM.dto.response.HotelAmenityRespone;
import com.example.KTPM.entity.HotelAmenity;
import org.mapstruct.Mapper;

@Mapper(componentModel="spring")
public interface HotelAmenityMapper {
    HotelAmenity toHotelAmenity(HotelAmenityRequest request);
    HotelAmenityRespone toHotelAmenityResponse(HotelAmenity hotelAmenity);
//    void updateHotelAmenity(@MappingTarget HotelAmenity role, HotelAmenityRequest request);
}
