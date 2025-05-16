package com.example.KTPM.mapper;
import com.example.KTPM.dto.request.HotelImagesRequest;
import com.example.KTPM.dto.request.RoomImagesRequest;
import com.example.KTPM.dto.response.HotelImagesRespone;
import com.example.KTPM.dto.response.RoomImagesRespone;
import com.example.KTPM.entity.HotelImage;
import com.example.KTPM.entity.RoomImage;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel="spring")
public interface RoomImagesMapper {
    RoomImage toRoomImage(RoomImagesRequest request);
    RoomImagesRespone toRoomImagesRespone(RoomImage roomImage);
    void updateRoomImage(@MappingTarget RoomImage roomImage, RoomImagesRequest request);
}
