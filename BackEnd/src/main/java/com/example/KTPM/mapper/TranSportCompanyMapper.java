package com.example.KTPM.mapper;
import com.example.KTPM.dto.request.TranSportCompanyRequest;
import com.example.KTPM.dto.response.TranSportCompanyRespone;
import com.example.KTPM.entity.TransportCompany;
import com.example.KTPM.entity.TransportCompany;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel="spring")
public interface TranSportCompanyMapper {
    TransportCompany toTranSportCompany(TranSportCompanyRequest request);
    TranSportCompanyRespone toTranSportCompanyRespone(TransportCompany hotel);
    void updateTranSportCompany(@MappingTarget TransportCompany hotel, TranSportCompanyRequest request);
}
