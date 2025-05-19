package com.example.KTPM.mapper;
import com.example.KTPM.dto.request.TranSportRequest;
import com.example.KTPM.dto.response.TranSportRespone;
import com.example.KTPM.entity.Transport;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel="spring")
public interface TranSportMapper {
    @Mapping(target = "transportType", ignore = true)
    @Mapping(target = "transportCompany", ignore = true)
    Transport toTransport(TranSportRequest request);
    TranSportRespone toTranSportRespone(Transport transport);
}
