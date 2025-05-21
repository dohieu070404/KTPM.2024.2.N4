package com.example.KTPM.mapper;
import com.example.KTPM.dto.request.RoomRequest;
import com.example.KTPM.dto.response.RoomRespone;
import com.example.KTPM.entity.RoomType;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel="spring")
public interface RoomMapper {
    //    @Mapping(target = "createat", source = "dob")
    RoomType toRoomType(RoomRequest request);
    //    @Mapping(source = "role", target = "roles")
    RoomRespone toRoomRespone(RoomType room);
    //    @Mapping(target = "role", ignore = true)
    void updateRoom(@MappingTarget RoomType room, RoomRequest request);
}
