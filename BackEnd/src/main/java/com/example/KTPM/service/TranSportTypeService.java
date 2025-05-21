package com.example.KTPM.service;


import com.example.KTPM.dto.request.TranSportTypeRequest;
import com.example.KTPM.dto.response.TranSportTypeRespone;
import com.example.KTPM.dto.response.UserRespone;
import com.example.KTPM.entity.TransportType;
import com.example.KTPM.exception.AppException;
import com.example.KTPM.exception.ErrorCode;
import com.example.KTPM.mapper.TranSportTypeMapper;
import com.example.KTPM.repository.HotelRepository;
import com.example.KTPM.repository.TranSportTypeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
@Slf4j
public class TranSportTypeService {

    @Autowired
    private TranSportTypeMapper tranSportTypeMapper;
    @Autowired
    private TranSportTypeRepository tranSportTypeRepository;

    public TranSportTypeRespone createTranSportType(TranSportTypeRequest request) {
        log.info("Service: Create TranSport Type");
        
        if (tranSportTypeRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.TRANSPORT_TYPE_EXISTED);
        }
        TransportType tranSport = tranSportTypeMapper.toTransportType(request);
        tranSport.setIsActive(true);
        return tranSportTypeMapper.totranSportTypeRespone(tranSportTypeRepository.save(tranSport));
    }
    
    public List<TranSportTypeRespone> getTranSportType() {
        return tranSportTypeRepository.findAll().stream()
                .filter(TransportType::getIsActive)
                .map(tranSportTypeMapper::totranSportTypeRespone)
                .toList();
    }
    
    public TranSportTypeRespone updateTranSportType(Integer id, TranSportTypeRequest request) {
        TransportType tranSport = tranSportTypeRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.TRANSPORT_TYPE_NOT_EXISTED));
        tranSportTypeMapper.updateTranSportType(tranSport, request);
        tranSport.setUpdatedAt(java.time.Instant.now());
        return tranSportTypeMapper.totranSportTypeRespone(tranSportTypeRepository.save(tranSport));
    }
    public void deleteTranSportType(Integer id) {
        TransportType tranSport = tranSportTypeRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.TRANSPORT_TYPE_NOT_EXISTED));
        tranSport.setIsActive(false);
        tranSport.setUpdatedAt(java.time.Instant.now());
        tranSportTypeRepository.save(tranSport);
    }
}
