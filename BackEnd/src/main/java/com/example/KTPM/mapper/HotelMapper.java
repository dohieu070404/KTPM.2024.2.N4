package com.example.KTPM.mapper;
import com.example.KTPM.dto.request.HotelRequest;
import com.example.KTPM.dto.response.HotelRespone;
import com.example.KTPM.entity.Hotel;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel="spring")
public interface HotelMapper {
//    @Mapping(target = "dob", source = "dob")
    Hotel toHotel(HotelRequest request);
//    @Mapping(source = "role", target = "roles")
    HotelRespone toHotelRespone(Hotel hotel);
//    @Mapping(target = "role", ignore = true)
    void updateHotel(@MappingTarget Hotel hotel, HotelRequest request);
}
