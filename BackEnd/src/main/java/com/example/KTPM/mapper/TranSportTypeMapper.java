package com.example.KTPM.mapper;
import com.example.KTPM.dto.request.RoomRequest;
import com.example.KTPM.dto.request.TranSportTypeRequest;
import com.example.KTPM.dto.response.RoomRespone;
import com.example.KTPM.dto.response.TranSportCompanyRespone;
import com.example.KTPM.dto.response.TranSportTypeRespone;
import com.example.KTPM.entity.RoomType;
import com.example.KTPM.entity.TransportType;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel="spring")
public interface TranSportTypeMapper {
    //    @Mapping(target = "createat", source = "dob")
    TransportType toTransportType(TranSportTypeRequest request);
    //    @Mapping(source = "role", target = "roles")
    TranSportTypeRespone totranSportTypeRespone(TransportType transportType);
    //    @Mapping(target = "role", ignore = true)
    void updateRoom(@MappingTarget TransportType   transportType, RoomRequest request);
}
