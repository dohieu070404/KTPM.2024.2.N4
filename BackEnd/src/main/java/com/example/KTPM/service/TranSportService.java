package com.example.KTPM.service;

import com.example.KTPM.dto.request.TranSportRequest;
import com.example.KTPM.dto.response.TranSportRespone;
import com.example.KTPM.entity.Transport;
import com.example.KTPM.entity.TransportCompany;
import com.example.KTPM.entity.TransportType;
import com.example.KTPM.entity.User;
import com.example.KTPM.exception.AppException;
import com.example.KTPM.exception.ErrorCode;
import com.example.KTPM.mapper.TranSportMapper;
import com.example.KTPM.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
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
    @Autowired
    private UserRepository userRepository;

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

    // xem danh sách chuyến xe theo công ty
    public List<TranSportRespone> getTransportsByCompany(Integer companyId) {
        List<Transport> transports = tranSportRepository.findAllByCompanyId(companyId);
        return transports.stream().map(tranSportMapper::toTranSportRespone).toList();
    }

    // cập nhật chuyến xe
    public TranSportRespone updateTransport(Integer id, TranSportRequest request) {
        Transport transport = tranSportRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.TRANSPORT_NOT_EXISTED));

        // Kiểm tra quyền: user phải là người tạo công ty
        TransportCompany company = transport.getTransportCompany();
        if (company == null) throw new AppException(ErrorCode.TRANSPORT_COMPANY_NOT_EXISTED);

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByName(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        if (!company.getCreateUserId().equals(user.getId())) {
            throw new AppException(ErrorCode.USER_NOT_OWNER);
        }

        // Cập nhật thông tin
        tranSportMapper.updateTransport(transport, request);

        // Nếu người dùng cập nhật loại phương tiện
        if (request.getTransportTypeId() != null) {
            TransportType transportType = tranSportTypeRepository.findById(request.getTransportTypeId())
                    .orElseThrow(() -> new AppException(ErrorCode.TRANSPORT_TYPE_NOT_EXISTED));
            transport.setTransportType(transportType);
        }

        transport.setUpdatedAt(java.time.Instant.now());

        return tranSportMapper.toTranSportRespone(tranSportRepository.save(transport));
    }

    public void deleteTransport(Integer id) {
        Transport transport = tranSportRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.TRANSPORT_NOT_EXISTED));

        TransportCompany company = transport.getTransportCompany();
        if (company == null) throw new AppException(ErrorCode.TRANSPORT_COMPANY_NOT_EXISTED);

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByName(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        if (!company.getCreateUserId().equals(user.getId())) {
            throw new AppException(ErrorCode.USER_NOT_OWNER);
        }

        transport.setIsActive(false);
        transport.setUpdatedAt(java.time.Instant.now());

        tranSportRepository.save(transport);
    }

}
