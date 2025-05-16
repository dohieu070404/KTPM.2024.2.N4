package com.example.KTPM.mapper;
import com.example.KTPM.dto.request.HotelImagesRequest;
import com.example.KTPM.dto.request.UserCreationRequest;
import com.example.KTPM.dto.request.UserUpdateRequest;
import com.example.KTPM.dto.response.HotelImagesRespone;
import com.example.KTPM.dto.response.UserRespone;
import com.example.KTPM.entity.HotelImage;
import com.example.KTPM.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel="spring")
public interface HotelImagesMapper {
    HotelImage toHotelImage(HotelImagesRequest request);
    HotelImagesRespone toHotelImagesRespone(HotelImage hotelImage);
    void updateHotelImage(@MappingTarget HotelImage hotelImage, HotelImagesRequest request);
}
