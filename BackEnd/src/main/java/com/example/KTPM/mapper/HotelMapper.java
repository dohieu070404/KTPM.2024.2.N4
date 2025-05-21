package com.example.KTPM.mapper;
import com.example.KTPM.dto.request.HotelRequest;
import com.example.KTPM.dto.response.HotelRespone;
import com.example.KTPM.entity.Hotel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel="spring")
public interface HotelMapper {
    @Mapping(target = "hotelAmenities",ignore = true)
    Hotel toHotel(HotelRequest request);
    @Mapping(source = "hotelAmenities", target = "hotelAmenities")
    HotelRespone toHotelRespone(Hotel hotel);
    @Mapping(target = "hotelAmenities", ignore = true)
    void updateHotel(@MappingTarget Hotel hotel, HotelRequest request);
}
