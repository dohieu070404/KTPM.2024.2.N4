package com.example.KTPM.service;

import com.example.KTPM.dto.request.TranSportRequest;
import com.example.KTPM.dto.response.TranSportRespone;
import com.example.KTPM.entity.Transport;
import com.example.KTPM.entity.TransportCompany;
import com.example.KTPM.entity.TransportType;
import com.example.KTPM.exception.AppException;
import com.example.KTPM.exception.ErrorCode;
import com.example.KTPM.mapper.TranSportMapper;
import com.example.KTPM.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
@RequiredArgsConstructor
@Slf4j
public class TranSportService {
    @Autowired
    private TranSportCompanyRepository tranSportCompanyRepository;
    @Autowired
    private TranSportTypeRepository tranSportTypeRepository;
    @Autowired
    private TranSportMapper tranSportMapper;
    @Autowired
    private TranSportRepository tranSportRepository;

    public TranSportRespone createTransport(Integer id,TranSportRequest request){
        log.info("Service: Create Transport");
        if(tranSportRepository.existsByName(request.getName())){
            throw new AppException(ErrorCode.TRANSPORT_EXISTED);
        }
        Transport transport=tranSportMapper.toTransport(request);
        Integer transportId=request.getTransportTypeId();
        TransportType transportType=tranSportTypeRepository.findById(transportId).orElseThrow(()->new AppException(ErrorCode.TRANSPORT_TYPE_NOT_EXISTED));
        transport.setTransportType(transportType);
        TransportCompany transportCompany=tranSportCompanyRepository.findById(id).orElseThrow(()->new AppException(ErrorCode.TRANSPORT_COMPANY_NOT_EXISTED));
        transport.setTransportCompany(transportCompany);
        transport.setIsActive(true);
        return tranSportMapper.toTranSportRespone(tranSportRepository.save(transport));
    }




}
